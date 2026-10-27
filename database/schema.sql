CREATE DATABASE IF NOT EXISTS bd_dsapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bd_dsapi;

CREATE TABLE IF NOT EXISTS cidades (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS categorias (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS clientes (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 altura DOUBLE NULL,
 nascimento DATE NOT NULL,
 cidade_id INT NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 senha_hash VARCHAR(255) NOT NULL,
 papel ENUM('cliente','admin') NOT NULL DEFAULT 'cliente',
 CONSTRAINT fk_cliente_cidade FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);
CREATE TABLE IF NOT EXISTS produtos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 preco DOUBLE NOT NULL,
 quantidade DOUBLE NOT NULL DEFAULT 0,
 categoria_id INT NOT NULL,
 CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id),
 CONSTRAINT chk_preco CHECK (preco >= 0),
 CONSTRAINT chk_quantidade CHECK (quantidade >= 0)
);
CREATE TABLE IF NOT EXISTS pedidos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 horario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 endereco VARCHAR(200) NOT NULL,
 cliente_id INT NOT NULL,
 status ENUM('recebido','preparando','enviado','entregue','cancelado') NOT NULL DEFAULT 'recebido',
 CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE TABLE IF NOT EXISTS pedidos_produtos (
 pedido_id INT NOT NULL,
 produto_id INT NOT NULL,
 preco DOUBLE NOT NULL,
 quantidade DOUBLE NOT NULL,
 PRIMARY KEY (pedido_id, produto_id),
 CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
 CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produtos(id),
 CONSTRAINT chk_item_preco CHECK (preco >= 0),
 CONSTRAINT chk_item_quantidade CHECK (quantidade > 0)
);
INSERT INTO cidades (nome) SELECT 'Gravataí' WHERE NOT EXISTS (SELECT 1 FROM cidades WHERE nome='Gravataí');
INSERT INTO cidades (nome) SELECT 'Porto Alegre' WHERE NOT EXISTS (SELECT 1 FROM cidades WHERE nome='Porto Alegre');
INSERT INTO categorias (nome) VALUES ('Eletrônicos'), ('Acessórios'), ('Casa') ON DUPLICATE KEY UPDATE nome=VALUES(nome);
