## Description

projectname API

## Installation

```bash
# installation
$ pnpm install

# preparation
$ pnpm prepare

```

## Running the app

```bash
# development
$ pnpm dev

# watch mode
$ pnpm start:debug

# production mode
$ pnpm start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## Development

```bash
# create a new module
$ nest g resource core/my-module

# update db migration
$ npx prisma db push

# start console to run commands
$ pnpm console

```

### File Structure

- dto - request parameters validation

- entity - response formatter

- module - module dependencies, imports and definitions

- controller - routes and controllers

- service - model and database operations

- processor - task queue handler

### DTO Usage

it depends on [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer)

- for normal validation, here is the documentation: [Types and parameters](https://docs.nestjs.com/openapi/types-and-parameters)
- for custom validation, here is the documentation: [class-transformer-validator](https://github.com/MichalLytek/class-transformer-validator)

```bash
  # define options for transformAndValidate
  const options: TransformValidationOptions = {
    validator: {
      forbidUnknownValues: true,
      // stripe out unknown properties
      whitelist: true,
      // do not attach to error object an entity being validated
      validationError: { target: false },
    },
    transformer: {
      enableImplicitConversion: true,
    },
  };

  # validation with Dto, transformer and options
  const accountObjects = await transformAndValidate(ImportAccountDto, accounts, options);

```
