# Skilltree 🌳

Website e E-commerce da Skilltree - Escola de Arte Digital.

## 🚀 Sobre o Projeto

Este é o site da Skilltree, uma das melhores e maiores escolas online de arte digital do Brasil. O site foi reconstruído em HTML, CSS e JavaScript puro para máxima performance e velocidade, migrando do WordPress para uma versão estática moderna e otimizada.

## ✨ Características

- **Performance**: Site estático ultra-rápido sem dependências de banco de dados
- **Responsivo**: Design adaptável para todos os dispositivos (mobile, tablet, desktop)
- **Moderno**: Design limpo e contemporâneo com animações suaves
- **SEO Friendly**: Estrutura semântica HTML5 otimizada para mecanismos de busca
- **Acessível**: Navegação por teclado e suporte a leitores de tela
- **E-commerce Completo**: Sistema de carrinho, checkout, upsell e order bump

## 📁 Estrutura do Projeto

```
skilltree/
├── index.html              # Página principal
├── checkout/               # Página de checkout
│   └── index.html
├── upsell/                 # Página de upsell pós-checkout
│   └── index.html
├── obrigado/               # Página de obrigado (thank you)
│   └── index.html
├── cursos/                 # Página de cursos (a criar)
├── gratuitos/              # Conteúdo gratuito/blog (a criar)
├── professores/            # Página de professores (a criar)
├── galeria/                # Galeria de trabalhos (a criar)
├── politica-de-privacidade/ # Política de privacidade (a criar)
├── trabalhe-conosco/       # Trabalhe conosco (a criar)
├── assets/
│   ├── css/
│   │   ├── styles.css      # Estilos principais
│   │   ├── checkout.css    # Estilos do checkout
│   │   ├── upsell.css      # Estilos do upsell
│   │   └── thankyou.css    # Estilos da página de obrigado
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   ├── cart.js         # Sistema de carrinho
│   │   └── checkout.js     # Lógica do checkout
│   └── images/
│       └── favicon.svg     # Favicon do site
└── README.md
```

## 🛒 Sistema de E-commerce

### Funcionalidades

1. **Carrinho de Compras**
   - Persistência em LocalStorage
   - Mini-cart no header
   - Adição/remoção de produtos
   - Contador de itens

2. **Checkout Moderno**
   - Formulário de dados pessoais
   - Múltiplos métodos de pagamento (Cartão, PIX, Boleto)
   - Desconto automático para PIX (5%)
   - Sistema de cupons de desconto
   - Order Bump (oferta complementar)
   - Máscaras de input para CPF, telefone, cartão

3. **Página de Upsell**
   - Timer de escassez
   - Oferta exclusiva pós-compra
   - Design persuasivo
   - Confirmação antes de recusar

4. **Página de Obrigado**
   - Animação de confetti
   - Resumo do pedido
   - Próximos passos
   - Links para redes sociais
   - Informações de suporte

### Cupons Disponíveis

- `ARTE10` - 10% de desconto
- `SKILLTREE50` - R$ 50,00 de desconto
- `BEMVINDO` - 15% de desconto

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox e Grid
- **JavaScript ES6+** - Interatividade e animações
- **LocalStorage** - Persistência do carrinho
- **Font Awesome** - Ícones
- **Google Fonts (Inter)** - Tipografia
- **Canvas Confetti** - Animação de celebração

## 🎨 Seções do Site

1. **Header** - Navegação fixa com menu responsivo e carrinho
2. **Hero** - "Estude Arte Digital na Skilltree"
3. **Features** - Benefícios (100% Online, Direcionamento Personalizado, Comunidade, Foco na Carreira)
4. **Cursos** - Catálogo de cursos com preços e botões de compra:
   - Fundamentos da Arte (R$ 497,00)
   - Concept Art de Cenários (R$ 697,00)
   - Anatomia Para Artistas (R$ 597,00)
   - Design de Personagens e Worldbuilding (R$ 797,00)
   - Pintura Digital (R$ 647,00)
   - Yucca Club (R$ 97,00/mês)
5. **Gratuitos** - Blog de Arte Digital e conteúdo gratuito
6. **Professores** - Instrutores profissionais
7. **Galeria** - Portfólio de alunos
8. **Parcerias** - Parcerias com condições especiais para alunos
9. **CTA** - Chamada para ação
10. **Contato** - Formulário de contato
11. **Footer** - Links institucionais e redes sociais

## 🚀 Como Usar

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador
3. Ou sirva com um servidor local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (npx)
npx serve

# Com PHP
php -S localhost:8000
```

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **576px** - Smartphones
- **992px** - Tablets e laptops

## 🔧 Customização

### Cores
As cores podem ser alteradas nas variáveis CSS no início do arquivo `styles.css`:

```css
:root {
    --color-primary: #22c55e;
    --color-secondary: #0f172a;
    /* ... outras variáveis */
}
```

### Produtos
Edite o arquivo `assets/js/cart.js` para atualizar preços, descrições e produtos.

### Conteúdo
Edite o arquivo `index.html` para atualizar textos, cursos e informações de contato.

## 📄 Licença

Este projeto é propriedade da Skilltree.

## 📞 Contato

- **Email**: atendimento@skilltree.com.br
- **Instagram**: [@skilltreecursos](https://instagram.com/skilltreecursos)
- **Facebook**: [/skilltreecursos](https://facebook.com/skilltreecursos)
- **Website**: [skilltreecursos.com](https://skilltreecursos.com)