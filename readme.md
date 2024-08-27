## API-SHORTEN-URL

This is a URL shortening API, featuring a route to shorten URLs and another to access the shortened URL, returning the original URL. It includes middleware to handle a high volume of requests from a single IP address.

### How to run the project?

You will need to configure your `.env` file with the information for your MySQL database. You can set the password and database name to whatever you prefer, as this application is configured to run 2 Docker containers that communicate with each other through a bridge network. You can simply copy the `.env.example` file and rename it to `.env`. After that, you should run the command `docker compose up -d`, which will start the 2 containers necessary for the application.

### How to run the tests?

- `npm run test`

### What would I improve on this project?

- I would increase the unit test coverage and add integration tests.
- I would implement more dynamic error handling for the middleware and the cronjob.
- I would implement a generic repository class for basic operations to use in other contexts.

```
.
├── jest-unit-config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── src
│   ├── jest.setup.ts
│   ├── index.ts
│   ├── application
│   ├── di
│   │   ├── container.ts
│   │   └── tokens.ts
│   ├── domain
│   │   └── **
│   │       ├── entities
│   │       │   ├── **.ts
│   │       ├── infra
│   │       │   ├── **Repository.ts
│   │       ├── services
│   │       │   ├── **Service.ts
│   │       └── types
│   ├── infra
│   │   ├── migrations
│   │   │   └── **.SQL
│   │   └── mysql
│   │       └── MySQLConnection.ts
│   ├── presentation
│   │   ├── job
│   │   │   └── CronJob.ts
│   │   │   └── LogProcessor.ts
│   │   └── http
│   │       ├── controllers
│   │       │   └── **
│   │       ├── routes
│   │       └── types
│   └── shared
│       ├── exceptions
│       └── http
│           ├── adapters
│           ├── controller
│           └── interfaces
```

- **`src/`**: The main source code directory.

  - **`application/`**: Contains application logic, including use cases and application coordinators.

  - **`di/`**: Directory for dependency injection, including container configuration and dependency tokens.

  - **`domain/`**: Contains the core domain logic, including:

    - **`entities/`**: Definitions of domain entities.
    - **`infra/`**: Domain-specific repository implementations and related interfaces.
    - **`services/`**: Domain services encapsulating business logic.
    - **`types/`**: Domain types and interfaces.

  - **`infra/`**: Application infrastructure, including:

    - **`migrations/`**: Scripts for database migrations.
    - **`mysql/`**: MySQL-specific connection and operation implementations.

  - **`presentation/`**: Presentation layer, including:

    - **`job/`**: Scheduled tasks and log processors.
    - **`http/`**: HTTP route handling and controllers.

  - **`shared/`**: Shared components, such as:
    - **`exceptions/`**: Definitions and handling of exceptions.
    - **`http/`**: HTTP adapters and common interfaces for communication.

Each directory is designed to maintain a clear separation between different aspects of the application, promoting modularity and easier maintenance.
