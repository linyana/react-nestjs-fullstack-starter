import bcrypt from 'bcryptjs';
import { PrismaClient } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const roundsOfHashing = 10;

async function main() {
  const passwordTest = await bcrypt.hash('Abc123456', roundsOfHashing);

  let tenant = await prisma.tenants.findUnique({
    where: { businessName: 'TEST' },
  });

  if (!tenant) {
    tenant = await prisma.tenants.create({
      data: { businessName: 'TEST' },
    });
  }

  let user = await prisma.users.findUnique({
    where: { email: 'test@test.com' },
  });

  if (!user) {
    user = await prisma.users.create({
      data: {
        name: 'test',
        email: 'test@test.com',
        password: passwordTest,
        tenantId: tenant.id,
      },
    });
  }

  await prisma.users.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      name: 'test',
      email: 'test@test.com',
      password: passwordTest,
      tenantId: tenant.id,
    },
  });

  console.log('Successfully init');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
