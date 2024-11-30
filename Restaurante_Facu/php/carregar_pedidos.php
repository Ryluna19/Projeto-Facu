<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'banco_restaurante');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados.']);
    exit;
}

$sql = "SELECT id, nome, telefone, email, pedidos, observacao, desconto, valor_final FROM pedidos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $pedidos = [];
    while ($row = $result->fetch_assoc()) {
        $row['desconto'] = (float)$row['desconto'];
        $row['valor_final'] = (float)$row['valor_final'];
        $pedidos[] = $row;
    }    
    echo json_encode(['success' => true, 'pedidos' => $pedidos]);
} else {
    echo json_encode(['success' => true, 'pedidos' => []]);
}

$conn->close();
