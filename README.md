# Blog
> Este é um projeto back-end de um blog.

Passos para rodar o projeto:

Clone o projeto:

```
git clone https://github.com/lucasrluz/blog-backend.git
```

Entre na raiz do projeto e crie o arquivo ```.env``` de acordo com o [.env.example](https://github.com/lucasrluz/blog-backend/blob/main/.env.example).

Instale as dependências do projeto:

```
yarn install
```

Rode as migrações do banco de dados:
```
yarn prisma migrate dev
```

