# Guia de Teste - Empório Sophia

## Como Testar a Aplicação

### 1. Iniciar o Frontend

```bash
cd frontend
npm start
```

A aplicação abrirá em `http://localhost:3001` (ou outra porta disponível)

### 2. Testar MODO OFFLINE (Sem Backend)

O sistema agora funciona completamente offline usando dados fictícios!

#### Teste 1: Navegar no Cardápio
1. Acesse a página inicial `/`
2. Clique em "Ver Cardápio"
3. Veja os 6 produtos fictícios organizados por categoria
4. Use os filtros: Todos, lanches, bebidas, acompanhamentos, sobremesas
5. Clique em um produto para ver detalhes no modal
6. Adicione produtos ao carrinho

#### Teste 2: Finalizar Pedido
1. Com itens no carrinho, vá para `/carrinho`
2. Ajuste quantidades com os botões + e -
3. Preencha o formulário:
   - Nome: Seu nome
   - Telefone: Qualquer telefone
   - Pagamento: Escolha uma opção
4. Clique em "Finalizar Pedido"
5. **Nota**: Sem backend, você verá um erro, mas isso é esperado

#### Teste 3: Consultar Pedidos Fictícios
1. Acesse `/meus-pedidos`
2. Digite um dos telefones fictícios:
   - **11999998888** (Pedido #1 - em_preparo - R$ 55,90)
   - **11988887777** (Pedido #2 - pronto - R$ 44,90)
3. Clique em "Buscar Pedidos"
4. Veja os pedidos com status coloridos
5. Clique em um pedido para ver detalhes

### 3. Testar COM Backend

Se o backend estiver rodando em `http://localhost:3000`:

#### Teste 1: Área Administrativa
1. Acesse `/admin`
2. Login: `admin` / Senha: `admin123`
3. Dashboard de Pedidos:
   - Veja todos os pedidos
   - Filtre por status
   - Atualize status dos pedidos
   - Atualização automática a cada 5 segundos
4. Gerenciar Produtos:
   - Acesse `/admin/produtos`
   - Cadastre novo produto
   - Edite produtos existentes
   - Delete produtos

#### Teste 2: Fluxo Completo Cliente
1. Navegue pelo cardápio real (dados do banco)
2. Adicione produtos ao carrinho
3. Finalize o pedido com seus dados
4. Anote o número do pedido
5. Busque seu pedido em "Meus Pedidos"
6. Acompanhe as mudanças de status em tempo real

### 4. Testar Responsividade

#### Desktop (> 768px)
- Menu horizontal sempre visível
- Grid de produtos com 3-4 colunas
- Layout amplo e espaçado

#### Mobile (< 768px)
- Menu hambúrguer (≡) no topo
- Menu dropdown ao clicar
- Grid de produtos em 1 coluna
- Botões e cards adaptados

### 5. Recursos para Testar

#### Design
- ✅ Cores da marca (bordô #5A0B1E, bege #F0E6D2, verde #28a745)
- ✅ Gradiente na Home (bordô escuro para claro)
- ✅ Logo lanche.png centralizado
- ✅ Cards com sombra e hover effect
- ✅ Botões com transições suaves
- ✅ Sem emojis (exceto ícones de status ⚡ e ★)

#### Funcionalidades
- ✅ Navegação entre páginas
- ✅ Filtro de categorias
- ✅ Modal de detalhes do produto
- ✅ Carrinho com ajuste de quantidade
- ✅ Formulário de checkout
- ✅ Busca de pedidos por telefone
- ✅ Status coloridos (azul, amarelo, verde, cinza)
- ✅ Atualização automática (área admin)
- ✅ Dados fictícios como fallback

#### Performance
- Tempo de carregamento rápido
- Transições suaves (0.2s)
- Sem travamentos
- Responsivo em todos dispositivos

### 6. Checklist de Teste Completo

- [ ] Home carrega com logo e botões
- [ ] Cardápio mostra produtos em cards organizados
- [ ] Filtros de categoria funcionam
- [ ] Modal de produto abre e fecha corretamente
- [ ] Adicionar ao carrinho funciona
- [ ] Badge de contagem no ícone do carrinho atualiza
- [ ] Página do carrinho mostra itens corretamente
- [ ] Botões +/- ajustam quantidade
- [ ] Botão Remover funciona
- [ ] Total é calculado corretamente
- [ ] Formulário de checkout valida campos obrigatórios
- [ ] Busca de pedidos funciona com telefones fictícios
- [ ] Pedidos são exibidos com status coloridos
- [ ] Links de navegação destacam página ativa
- [ ] Menu mobile abre e fecha corretamente
- [ ] Todas as páginas são responsivas
- [ ] Não há erros no console do navegador

### 7. Problemas Conhecidos

1. **Sem Backend**: 
   - Finalização de pedidos retorna erro
   - Login admin não funciona
   - Alterações não são salvas

2. **Soluções**:
   - Use os telefones fictícios para consultar pedidos
   - Produtos fictícios aparecem automaticamente
   - Modo offline é totalmente funcional para navegação

### 8. Dados Fictícios de Referência

**Produtos:**
- X-Burger Clássico - R$ 25,90 (lanches)
- X-Bacon Especial - R$ 29,90 (lanches)
- Refrigerante Lata - R$ 5,00 (bebidas)
- Suco Natural - R$ 8,00 (bebidas)
- Batata Frita - R$ 15,00 (acompanhamentos)
- Milkshake - R$ 12,00 (sobremesas)

**Pedidos:**
- Pedido #1 (João Silva) - 11999998888 - R$ 55,90 - em_preparo
- Pedido #2 (Maria Santos) - 11988887777 - R$ 44,90 - pronto

---

**Dica**: Para melhor experiência, teste primeiro o modo offline navegando pelo cardápio e consultando pedidos fictícios. Depois, com o backend rodando, teste o fluxo completo incluindo área administrativa.
