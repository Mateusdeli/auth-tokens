## Sobre aplicação
Desenvolvida uma aplicação que simula a autenticação baseada em tokens. É usado o access token para realização do login e o refresh token para renovação.

#### Rotas:
- /auth/login
- /auth/logout
- /auth/refresh
- /auth/loadSession

#### Rota Protegida (Necessária autorização):
- /

___
## .Env
Fazer uma copia do ".env.example" para ".env" e setar as configurações!
___
## Docker
### Executa o build das imagens
> docker-compose build

### Inicializa os containers
> docker-compose up -d
