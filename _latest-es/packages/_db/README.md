# Database

Drizzle schema, migrations, PostgreSQL access, and Studio for backend feature packages. The complete
local infrastructure stack is composed by `apps/server/docker-compose.yml`; the PostgreSQL image
ships pgvector and enables the `vector` extension on first initialization.
