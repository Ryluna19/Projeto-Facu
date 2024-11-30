<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'banco_restaurante');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados.']);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $sql = "DELETE FROM pedidos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao deletar o pedido.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID inválido.']);
}

$conn->close();
