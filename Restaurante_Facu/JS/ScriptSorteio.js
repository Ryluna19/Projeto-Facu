// Números armazenados no sistema, vulgo a resposta certa
const NUMEROS_SORTE = [4, 8, 5, 10, 2];

function verificarSorte() {
    // Obtem os números dados pelo cliente
    const numerosCliente = [
        parseInt(document.getElementById("num1").value) || 0,
        parseInt(document.getElementById("num2").value) || 0,
        parseInt(document.getElementById("num3").value) || 0,
        parseInt(document.getElementById("num4").value) || 0,
        parseInt(document.getElementById("num5").value) || 0,
        parseInt(document.getElementById("num6").value) || 0
    ];

    // Filtrar os números que estão nos números armazenados
    const acertos = numerosCliente.filter(num => NUMEROS_SORTE.includes(num));
    const quantidadeAcertos = acertos.length;
    // Verifica a quantiade de acertos pra dar o codigo de desconto certo
    let desconto = 0;
    let codigoDesconto = "";

    switch(quantidadeAcertos) {
        case 1:
            desconto = 5;
            codigoDesconto = "5555";
            break;
        case 2:
            desconto = 10;
            codigoDesconto = "1010";
            break;
        case 3:
            desconto = 15;
            codigoDesconto = "1515";
            break;
        case 4:
            desconto = 20;
            codigoDesconto = "2020";
            break;
        case 5:
            desconto = 25;
            codigoDesconto = "2525";
            break;
        case 6:
            desconto = 30;
            codigoDesconto = "3030";
            break;
        default:
            desconto = 0;
            codigoDesconto = "";
    }

    // Exibe o resultado
    let resultado = "";
    if (quantidadeAcertos > 0) {
        resultado += `<p class="sucesso">Parabéns! Você teve ${quantidadeAcertos} acerto(s): ${acertos.join(", ")}.</p>`;
        resultado += `<p class="sucesso">Desconto total: ${desconto}% - Seu código é: ${codigoDesconto}</p>`;
        
        // Quando acerta todos, gera a mensagem
        if (quantidadeAcertos > 5) {
            resultado += `<p class="sucesso">Sorte Grande! Você acertou todos!</p>`;
        }
    } else {
        resultado = `<p class="erro">Que pena! Você não acertou nenhum número. Tente novamente.</p>`;
        resultado += `<p class="erro">Desconto total: 0%</p>`;
    }

    document.getElementById("resultado").innerHTML = resultado;
}