
<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

if ($dados) {
    $nome = $dados['nome'];
    $telefone = $dados['telefone'];
    $email = $dados['email'];
    $pedidos = implode(', ', $dados['pedidos']);
    $observacao = $dados['observacao'];
    $valorDesconto = $dados['valorDesconto'];
    $valorFinal = $dados['valorFinal'];

    // Conexão com o banco de dados
    $conn = new mysqli('localhost', 'root', '', 'banco_restaurante');

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados']);
        exit;
    }

    $sql = "INSERT INTO pedidos (nome, telefone, email, pedidos, observacao, desconto, valor_final) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdds", $nome, $telefone, $email, $pedidos, $observacao, $valorDesconto, $valorFinal);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao gravar pedido']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
}
?>
