# <p align = "center"> API RepoProvas </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4dd.svg" width="180"/>
</p>

##   Descrição

A API Repoprovas serve como uma plataforma para estudantes compartilharem provas antigas para que os próximos estudantes possam estudar com uma prova no modelo cobrado naquela disciplina, ou por determinado instrutor. Possui formas de obter todas as provas separadas por disciplina ou por instrutor, além de fluxo de login e a possibilidade de qualquer usuário logado inserir novas provas na plataforma.

***

## 	 Tecnologias e Conceitos

- REST APIs
- JWT tokens
- Node.js
- TypeScript
- PostgreSQL with Prisma

***

##  Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
            "email": "lorem@gmail.com",
            "password": "loremipsum",
            "confirmPasword": "loremipsum"
            }
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
            "email": "lorem@gmail.com",
            "password": "loremipsum"
            }
```
    
```yml 
POST /tests (autenticada)
    - Rota para listar todos os usuários
    - headers: { "Authorization": "Bearer $token" }
    - body: {
            "name": "Lorem ipsum",
            "pdfUrl": "https://www.google.com/",
            "categoryId": 1,
            "teacherDisciplineId": 1
            }
```

```yml
GET /testsByDiscipline (autenticada)
    - Rota para listar todas as provas organizadas por disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /testsByTeacher (autenticada)
    - Rota para listar todas as provas organizadas por instrutor
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/farias-77/projeto20-repoprovas
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Para o primeiro uso, crie um arquivo .env seguindo o modelo fornecido pelo .env.example, e rode o seguinte comando para gerar o banco de dados.

```
npx prisma migrate dev
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```