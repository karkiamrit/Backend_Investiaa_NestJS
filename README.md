# NestJS/TypeORM/GraphQL/PostgresQL

Backend with TypeORM, GraphQL and PostgreSQL

## [NestJS](https://docs.nestjs.com/)

Base NestJS

## [TypeORM](https://typeorm.io/)

We use [Nestjs/TypeORM](https://docs.nestjs.com/techniques/database)
In this project, I've been trying not to use `Pure SQL` to make the most of TypeORM.

## [PostgresQL Database](https://www.postgresql.org/)

I've used postgresQL for backend database, The default database taht will be used is named 'postgres'
You have to have postgresql Database server before getting started.
You can use [Docker postgresQL](https://hub.docker.com/_/postgres) to have server easily

## [GraphQL](https://graphql.org/)

##### packages: graphql, apollo-server-express and @nestjs/graphql, [graphqlUpload](https://www.npmjs.com/package/graphql-upload) ...

We use GraphQL in a Code First approach (our code will create the GraphQL Schemas).

You can see [playground](http://localhost:8000/graphql) for documentation.

I have used apollographql as playground. but if you want to use default playground, you can do like below.

```js
// app.modules.js

GraphQLModule.forRootAsync <
  ApolloDriverConfig >
  {
    ...
    useFactory: (configService: ConfigService) => ({
      ...
      playground: true,
      ...
    }),
    ...
  };
```

### Protected queries/mutation by user role with guard

Some of the GraphQL queries are protected by a NestJS Guard (`GraphqlPassportAuthGuard`) and requires you to be authenticated (and some also requires to have the Admin role).
You can solve them with Sending JWT token in `Http Header` with the `Authorization`.

```json
# Http Header
{
  "Authorization": "Bearer TOKEN"
}
```

#### Example of some protected GraphQL

- getMe (must be authenticated)
- All the other generated by generator (must be authenticated and must be admin)

## License

MIT

## Custom CRUD

To make most of GraphQL's advantage, We created its own api, such as GetMany or GetOne.
We tried to make it as comfortable as possible, but if you find any mistakes or improvements, please point them out or promote them.

You can see detail in `declare.module.ts`, `processWhere.ts` and `custom.input.ts`

```js
// query
query($input:GetManyInput) {
  getManyPlaces(input:$input){
    data{
      id
      logitude
      count
    }
  }
}
```

```js
// variables
{
  input: {
    pagination: {
      size: 10,
      page: 0, // Started from 0
    },
    order: { id: 'DESC' },
    dataType: 'data', //all or count or data - default: all
    where: {
      id: 3,
    },
  },
};
```

You can see detail of operators in where below or in code.
![image](https://bewave.s3.ap-northeast-2.amazonaws.com/docs.png)

## Code generator

There is [CRUD Generator in NestJS](https://docs.nestjs.com/recipes/crud-generator).
In this repository, It has its own generator.
You can use like below.

```bash
$ yarn g
```

## Getting Started

### Installation

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment _>=14.0_ with NPM 6 or Yarn.

The first thing you will need is to install NestJS CLI.

```bash
$ yarn -g @nestjs/cli
```

And do install the dependencies

```bash
$ yarn install # or npm install
```

### Run

for development

```bash
$ yarn dev # or npm run dev
```

for production

```bash
$ yarn build # or npm run build
$ yarn start # or npm run start
```

or run with docker following below

## Docker

### Docker-compose installation

Download docker from [Official website](https://docs.docker.com/compose/install)

### Run

Open terminal and navigate to project directory and run the following command.

```bash
# Only for prduction
$ docker-compose --env-file ./.production.env up
```

### Note

If you want to use docker, you have to set DB_HOST in .production.env to be `postgres`.
The default set is `postgres`

### Only database

You can just create postgresql by below code, sync with .development.env

```bash
$ docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=1q2w3e4r -d postgres
```

- [x] Divide usefactory
- [ ] Redis
- [ ] ElasticSearch
- [ ] Caching
- [ ] Graphql Subscription
