// Setta quanto custa cada item 
const valoresPedidos = {
    "Mega Stacker Atômico": 50,
    "Triplo Cheedar": 40,
    "Whopper": 30,
    "Big King": 25
};

// Inicio da Função para criar um pedido
function adicionarPedido() {
    const novoPedido = document.createElement('div');
    novoPedido.classList.add('pedido-item');
    novoPedido.innerHTML = `
        <select name="pedido" class="pedido-dropdown">
            <option value="">Selecione um pedido</option>
            <option value="Mega Stacker Atômico">Mega Stacker Atômico R$ 50</option>
            <option value="Triplo Cheedar">Triplo Cheedar R$ 40</option>
            <option value="Whopper">Whopper R$ 30</option>
            <option value="Big King">Big King R$ 25</option>
        </select>
        <button type="button" onclick="adicionarPedido()">+</button>
        <button type="button" onclick="removerPedido(this)">−</button>
    `;
    document.getElementById('pedidoContainer').appendChild(novoPedido);
}

function removerPedido(button) {
    const pedidoItem = button.parentElement;
    pedidoItem.remove();
}

function calcularDesconto(codigoDesconto, totalPedido) {
    let desconto = 0;
    
    switch(codigoDesconto) {
        case "5555":
            desconto = 5;
            break;
        case "1010":
            desconto = 10;
            break;
        case "1515":
            desconto = 15;
            break;
        case "2020":
            desconto = 20;
            break;
        case "2525":
            desconto = 25;
            break;
        case "3030":
            desconto = 30;
            break;
        default:
            desconto = 0;
    }
    
    return totalPedido * (desconto / 100);
}

document.getElementById('pedidoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const descontoCodigo = document.getElementById('desconto').value;

    const pedidos = Array.from(document.querySelectorAll('.pedido-dropdown'))
        .map(select => select.value)
        .filter(value => value);

    const totalPedido = pedidos.reduce((total, pedido) => total + (valoresPedidos[pedido] || 0), 0);
    const valorDesconto = calcularDesconto(descontoCodigo, totalPedido);
    const valorFinal = totalPedido - valorDesconto;

    const observacao = document.getElementById('observacao').value;

    // Envia os dados para o PHP
    fetch('php/gravar_pedidos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            telefone,
            email,
            pedidos,
            observacao,
            valorDesconto,
            valorFinal,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pedido gravado com sucesso!');
        } else {
            alert('Erro ao gravar pedido.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o pedido.');
    });

    // Atualiza a exibição no HTML
    document.getElementById('outputNome').textContent = nome;
    document.getElementById('outputTelefone').textContent = telefone;
    document.getElementById('outputEmail').textContent = email;
    document.getElementById('outputPedido').textContent = pedidos.join(', ');
    document.getElementById('outputPreferencia').textContent = observacao;
    document.getElementById('outputDesconto').textContent = `R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById('outputValorFinal').textContent = valorFinal.toFixed(2);

    document.getElementById('output').style.display = 'block';
});
// Carregar pedidos do banco de dados
document.getElementById('carregarPedidos').addEventListener('click', function () {
    fetch('php/carregar_pedidos.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tabela = document.getElementById('tabelaPedidos');
            const tbody = tabela.querySelector('tbody');

            // Limpa a tabela antes de carregar novos dados
            tbody.innerHTML = '';

            // Adiciona cada pedido à tabela
            data.pedidos.forEach(pedido => {
                const tr = document.createElement('tr');
            
                // Converta desconto e valor_final para números
                const desconto = parseFloat(pedido.desconto) || 0; // Usa 0 como valor padrão se for NaN
                const valorFinal = parseFloat(pedido.valor_final) || 0;
            
                tr.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.nome}</td>
                    <td>${pedido.telefone}</td>
                    <td>${pedido.email}</td>
                    <td>${pedido.pedidos}</td>
                    <td>${pedido.observacao}</td>
                    <td>R$ ${desconto.toFixed(2)}</td>
                    <td>R$ ${valorFinal.toFixed(2)}</td>
                    <td><button class="deletar" onclick="deletarPedido(${pedido.id})">Deletar</button></td>
                `;
                tbody.appendChild(tr);
            });
            

            tabela.style.display = 'table';
        } else {
            alert('Erro ao carregar pedidos.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao carregar os pedidos.');
    });
});

// Deletar pedido do banco de dados
function deletarPedido(id) {
    fetch(`php/deletar_pedidos.php?id=${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pedido deletado com sucesso!');
            document.getElementById('carregarPedidos').click(); // Recarrega os pedidos
        } else {
            alert('Erro ao deletar o pedido.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao deletar o pedido.');
    });
}


// Redireciona a pessoa para a pagina de sorteio ao clicar na mensagem
function redirecionar() {
    // Faz a mensagem desaparecer
    var mensagem = document.getElementById("mensagem");

    // Adiciona a classe que faz a mensagem sumir
    mensagem.classList.add("esconder");

    // Desabilita a interação com o elemento
    mensagem.classList.add("disabled");

    // Redireciona para a nova página após o clique (em uma nova aba)
    window.open("sorteio.html", "_blank");  

    // Evita qualquer clique ou interação após a remoção
    return false; // Previne a ação padrão (se necessário)
}



