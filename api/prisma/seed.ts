import bcrypt from 'bcryptjs';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/utils';

const adapter = new PrismaPg({ connectionString: env('DATABASE_URL') });
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

  const user = await prisma.users.findUnique({
    where: { email: 'test@test.com' },
  });

  if (!user) {
    await prisma.users.create({
      data: {
        name: 'Test User',
        email: 'test@test.com',
        password: passwordTest,
        tenantId: tenant.id,
      },
    });
  }

  const adminUser = await prisma.adminUsers.findUnique({
    where: { email: 'admin@admin.com' },
  });

  if (!adminUser) {
    await prisma.adminUsers.create({
      data: {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: passwordTest,
      },
    });
  }

  console.log('Successfully init');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
