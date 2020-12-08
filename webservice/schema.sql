DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id        INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
  nome      VARCHAR(20) NOT NULL CHECK(LENGTH(nome) >= 2),
  sobrenome VARCHAR(20)     NULL
);

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Ricardo', 'Pereira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Eduardo', 'Silveira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Renata', 'Lopes');
