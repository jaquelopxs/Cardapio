# Guia de Configuração do Projeto Cardápio

npm init -y

Cria o arquivo package.json\, que armazena as dependências e configurações do projeto.
A opção \-y aceita todas as opções padrão automaticamente\ash

npm install express cors dotenv pg

- **express:** framework para criar servidores e rotas HTTP.
- **cors:** permite que o frontend acesse a API.
- **dotenv:** carrega variáveis de ambiente a partir de um arquivo \.env\.
- **pg:** módulo que conecta o Node.js ao PostgreSQL.

Arquivo principal do servidor:

New-Item server.js
