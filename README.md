# O que este repositório possui?
Este repositório contém um CRUD feito com React, utilizando uma API que eu mesmo criei utilizando Express e MySQL como banco de dados.

# Como fazer para executar o projeto?
Como pode-se observar, fiz o upload de 3 pastas, elas são respectivamente:

- [apiCadUsuarios](https://github.com/enricovivan/crud-usuarios-react/tree/main/apiCadUsuarios)
- [backupDB](https://github.com/enricovivan/crud-usuarios-react/tree/main/backupDB)
- [cadUsuariosForms](https://github.com/enricovivan/crud-usuarios-react/tree/main/cadUsuariosForms)

Para executar de fato siga este passo a passo:

1. Abra a pasta ``backupDB`` e importe para o banco de dados o arquivo ``SQL``.
2. Após importar com sucesso para o banco de dados, abra a pasta ``apiCadUsuarios`` e configure sua conexão corretamente no arquivo [config](https://github.com/enricovivan/crud-usuarios-react/blob/main/apiCadUsuarios/src/config/db.js).
3. Após configurar, entre na pasta [apiCadUsuarios](https://github.com/enricovivan/crud-usuarios-react/tree/main/apiCadUsuarios) e execute o comando: `npm install` para instalar todas as dependências do projeto.
4. Depois de instalar as dependências, execute a API digitando o comando `node ./src/app.js` no terminal.

    4.1. Corrija possíveis erros de conexão caso ocorram, para prosseguir para o próximo passo.
5. Abra a pasta [cadUsuariosForms](https://github.com/enricovivan/crud-usuarios-react/tree/main/cadUsuariosForms) e execute também o comando `npm install`.
6. Se tudo correr bem, digite `npm run dev` para rodar o projeto no modo desenvolvedor.
7. A porta que está sendo usada para a API é a ``3000``, como pode ser observado no arquivo de [app.js](https://github.com/enricovivan/crud-usuarios-react/blob/main/apiCadUsuarios/src/app.js) dentro da pasta da API, mas caso deseja mudar o link da API, acesse o arquivo de configuração aqui: [api.ts](https://github.com/enricovivan/crud-usuarios-react/blob/main/cadUsuariosForms/src/configs/api.ts).
