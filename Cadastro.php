<?php
echo("Salvando no banco");
$nome = $_POST['nome'];
$data_aniversario = $_POST['data'];
$email = $_POST['email'];
$cpf = $_POST['cpf'];
$telefone = $_POST['telefone'];
$senha = $_POST['senha'];
$confirmar_senha = $_POST['senha2'];

$conexao = mysqli_connect("localhost", "root", "", "tocaliteraria");
$sql = "INSERT INTO usuarios (id, nome, data_nascimento, email, cpf, telefone, senha) VALUES (NULL, '$nome', '$data_aniversario', '$email', '$cpf', '$telefone', '$senha')";
$inserir = mysqli_query($conexao, $sql);

?>