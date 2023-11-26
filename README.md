# clone-tabnews

Implementação do https://www.tabnews.com.br para o https://curso.dev

# Install

Initialize a Codespaces and run

Initialize container docker and start project

```
npm run dev
```

Run tests

```
npm run test:watch
```

# Docker

Subir container

```
docker compose up -d
```

Parar container

```
docker compose down
```

Instalar o psql no linux

```
sudo apt install postgresql-client
```

Acessar o banco de dados

```
psql --host=localhost --username=postgres --port=5432
```

Recriar container do docker

```
docker compose up -d --force-recreate
```
