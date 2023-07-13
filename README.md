## Setup

Ensure you have postgres running on port 5432 or setup docker:

```bash
docker container run --env POSTGRES_PASSWORD=password  -p 5432:5432 --name open-fc-db -d postgres:15.3
```

Perform current migrations on DB

```bash
npx prisma migrate dev
```

Run project:

```bash
npm run dev
```

[http://localhost:3000/](http://localhost:3000/)

pre-commit hook:

We use [husky](https://github.com/typicode/husky) together with
[lint-staged](https://github.com/okonet/lint-staged) for pre-commit prettifying.
To set up the hook, run

```bash
npm run prepare
```

`lint-staged` config is in `package.json`

## Useful commands

Create new migration based on changes to schema file and run it for DB

```bash
npx prisma migrate dev --name <migration_name>
```
