
function irParaPaginaInicial() {
    document.getElementById('categorias').classList.remove('hidden');
    document.getElementById('subcategorias').classList.add('hidden');
    document.getElementById('produtos').classList.add('hidden');
    document.getElementById('carrinho').classList.add('hidden');
}

function irParaPaginaAnterior() {
    document.getElementById('subcategorias').classList.remove('hidden');
    document.getElementById('produtos').classList.add('hidden');
}

function mostrarSubcategorias(categoria) {
    const subcats = ['Eixo Comando', 'Eixo Virabrequim', 'Juntas', 'Cabeçote', 'Bloco', 'Biela', 'Pistão'];
    const subcategorias = document.getElementById('subcategorias');
    subcategorias.innerHTML = '';
    subcats.forEach(sub => {
        const div = document.createElement('div');
        div.className = 'subcategoria';
        div.innerText = sub;
        div.onclick = () => mostrarProdutos(sub);
        subcategorias.appendChild(div);
    });
    document.getElementById('categorias').classList.add('hidden');
    subcategorias.classList.remove('hidden');
}

function mostrarProdutos(subcategoria) {
    const produtos = [
        { nome: subcategoria + ' Produto 1', preco: 100 },
        { nome: subcategoria + ' Produto 2', preco: 150 }
    ];
    const produtosSection = document.getElementById('produtos');
    produtosSection.innerHTML = '';
    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `<h3>${produto.nome}</h3>
                         <p>Preço: R$ ${produto.preco}</p>
                         <input type="number" value="1" min="1" id="qtd-${produto.nome}">
                         <button onclick="adicionarCarrinho('${produto.nome}', ${produto.preco})">Adicionar</button>`;
        produtosSection.appendChild(div);
    });
    document.getElementById('subcategorias').classList.add('hidden');
    produtosSection.classList.remove('hidden');
}

function adicionarCarrinho(nome, preco) {
    const quantidade = document.getElementById('qtd-' + nome).value;
    const lista = document.getElementById('lista-carrinho');
    const item = document.createElement('li');
    item.innerHTML = `${nome} - ${quantidade}x R$${preco} <button onclick="this.parentNode.remove(); calcularTotal();">Remover</button>`;
    lista.appendChild(item);
    document.getElementById('carrinho').classList.remove('hidden');
    calcularTotal();
}

function calcularTotal() {
    const itens = document.querySelectorAll('#lista-carrinho li');
    let total = 0;
    itens.forEach(item => {
        const texto = item.innerText.split('x R$');
        if (texto[1]) total += parseFloat(texto[1]);
    });
    document.getElementById('total').innerText = 'Total: R$ ' + total.toFixed(2);
}

function finalizarCompra() {
    let mensagem = 'Olá, gostaria de finalizar a compra:%0A';
    document.querySelectorAll('#lista-carrinho li').forEach(item => {
        mensagem += '- ' + item.innerText.split('Remover')[0].trim() + '%0A';
    });
    window.open(`https://wa.me/5527995072994?text=${mensagem}`, '_blank');
}
