# Empório Sophia - Sistema de Pedidos Online

Sistema completo de cardápio e pedidos online desenvolvido em React.js + Node.js para a lanchonete Empório Sophia.

## Funcionalidades Implementadas

### Requisitos Funcionais (RF001 - RF008)

✅ **RF001** - Visualização do cardápio com produtos organizados por categoria  
✅ **RF002** - Adicionar produtos ao carrinho com quantidade  
✅ **RF003** - Finalizar pedido com informações de contato e pagamento  
✅ **RF004** - Acompanhar status do pedido por telefone  
✅ **RF005** - Login administrativo com autenticação JWT  
✅ **RF006** - Gerenciar pedidos (visualizar, atualizar status)  
✅ **RF007** - Gerenciar produtos (criar, editar, excluir)  
✅ **RF008** - Relatórios e dashboard de pedidos

### Recursos Adicionais

- Design responsivo para desktop e mobile
- Filtro de categorias no cardápio
- Atualização automática de pedidos (5 segundos)
- Interface moderna com gradientes e animações
- Modo offline com dados fictícios
- Navegação intuitiva

## Tecnologias Utilizadas

- **Frontend**: React 19.2.0, React Router DOM 7.9.6
- **Backend**: Node.js, Express.js
- **Autenticação**: JWT (JSON Web Token)
- **HTTP Client**: Axios 1.13.2
- **Estilização**: CSS customizado com inline styles

## Instalação

### Frontend

```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em: `http://localhost:3001` (ou outra porta se 3000 estiver ocupada)

### Backend

```bash
cd backend
npm install
npm start
```

O backend estará disponível em: `http://localhost:3000`

## Modo de Teste (Offline)

O sistema possui dados fictícios integrados que permitem testar todas as funcionalidades mesmo sem o backend rodando:

### Produtos Fictícios
- X-Burger Clássico (R$ 25,90)
- X-Bacon Especial (R$ 29,90)
- Refrigerante Lata (R$ 5,00)
- Suco Natural (R$ 8,00)
- Batata Frita (R$ 15,00)
- Milkshake (R$ 12,00)

### Pedidos Fictícios para Teste

**Telefone: 11999998888**
- Pedido #1 - Status: em_preparo
- Total: R$ 55,90

**Telefone: 11988887777**
- Pedido #2 - Status: pronto
- Total: R$ 44,90

## Estrutura do Projeto

```
frontend/
├── public/
│   ├── index.html
│   ├── lanche.png (logo da lanchonete)
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Button.jsx (botão reutilizável)
│   │   ├── Card.jsx (card container)
│   │   ├── Modal.jsx (modal genérico)
│   │   ├── Navbar.jsx (navegação)
│   │   └── ProdutoCard.jsx (card de produto)
│   ├── data/
│   │   └── mockData.json (dados fictícios)
│   ├── pages/
│   │   ├── Home.jsx (página inicial)
│   │   ├── Cardapio.jsx (listagem de produtos)
│   │   ├── Carrinho.jsx (checkout)
│   │   ├── MeuPedidos.jsx (buscar pedidos)
│   │   ├── StatusPedido.jsx (acompanhamento)
│   │   ├── LoginAdmin.jsx (login)
│   │   ├── AdminPedidos.jsx (gerenciar pedidos)
│   │   └── AdminProdutos.jsx (CRUD produtos)
│   ├── App.jsx (rotas)
│   ├── index.css (estilos globais)
│   └── index.js (entry point)
└── package.json
```

## Rotas da Aplicação

### Público
- `/` - Página inicial (Home)
- `/cardapio` - Visualizar cardápio
- `/carrinho` - Finalizar pedido
- `/meus-pedidos` - Buscar pedidos por telefone
- `/status-pedido/:id` - Acompanhar pedido específico

### Administrativo
- `/admin` - Login do administrador
- `/admin/pedidos` - Dashboard de pedidos
- `/admin/produtos` - Gerenciar produtos

## Credenciais de Teste (Backend)

**Admin:**
- Usuário: `admin`
- Senha: `admin123`

## Design System

### Cores
- **Primary**: #5A0B1E (bordô)
- **Secondary**: #F0E6D2 (bege)
- **Accent**: #28a745 (verde)

### Breakpoints
- Mobile: < 768px
- Desktop: ≥ 768px

## Funcionalidades por Tela

### Home
- Apresentação da lanchonete
- Logo (lanche.png)
- Botões de ação: Ver Cardápio, Acompanhar Pedido
- Features: Entrega Rápida, Qualidade, Pagamento Fácil

### Cardápio
- Grid responsivo de produtos
- Filtro por categoria
- Modal com detalhes do produto
- Adicionar ao carrinho com quantidade

### Carrinho
- Lista de itens com ajuste de quantidade
- Formulário de checkout (nome, telefone, pagamento)
- Cálculo de total
- Confirmação de pedido

### Meus Pedidos
- Busca por telefone
- Lista de pedidos ativos
- Badges de status coloridos
- Atualização automática a cada 5 segundos

### Admin - Pedidos
- Dashboard com todos os pedidos
- Filtros por status
- Botões de ação para mudar status
- Detalhes de cada pedido (itens, cliente, pagamento)

### Admin - Produtos
- Lista de produtos por categoria
- Formulário de cadastro/edição
- Deletar produtos
- Upload de imagem (URL)

## Status de Pedidos

1. **recebido** (azul) - Pedido foi recebido
2. **em_preparo** (amarelo) - Pedido está sendo preparado
3. **pronto** (verde) - Pedido está pronto
4. **entregue** (cinza) - Pedido foi entregue

## Observações Importantes

- O sistema funciona em modo offline usando dados fictícios do arquivo `mockData.json`
- Sem backend, as alterações não são persistidas
- A autenticação admin requer o backend rodando
- Imagens de produtos usam URLs externas (Unsplash)
- O logo `lanche.png` deve estar em `public/`

## Melhorias Futuras

- [ ] Integração com API de pagamento
- [ ] Sistema de notificações push
- [ ] Histórico completo de pedidos
- [ ] Relatórios de vendas
- [ ] Upload de imagens local
- [ ] Tema escuro
- [ ] Internacionalização (i18n)

---

**Desenvolvido para Empório Sophia**


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
