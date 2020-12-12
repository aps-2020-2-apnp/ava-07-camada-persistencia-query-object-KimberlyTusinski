DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pets;

CREATE TABLE users (
  id        INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
  name      VARCHAR(20) NOT NULL CHECK(LENGTH(name) >= 2),
  lastname VARCHAR(20)     NULL
);

CREATE TABLE pets (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(10) NOT NULL,
  kind VARCHAR(10) NOT NULL,
  age INTEGER NOT NULL,
  gender CHAR(1),
  owner INTEGER NOT NULL REFERENCES users(id)
);

INSERT INTO users (name, lastname)
VALUES ('Kimberly', 'Tusinski');

INSERT INTO users (name, lastname)
VALUES ('João', 'Salinas');

INSERT INTO users (name, lastname)
VALUES ('Alexandra', 'Tusinski');

INSERT INTO pets (name, kind, age, gender, owner)
VALUES ('Lissa', 'Cachorro', 16, 'F', 1);

INSERT INTO pets (name, kind, age, gender, owner)
VALUES ('Marcy', 'Gato', 4, 'F', 2);

INSERT INTO pets (name, kind, age, gender, owner)
VALUES ('Mimi', 'Gato', 32, 'M', 3);

INSERT INTO pets (name, kind, age, gender, owner)
VALUES ('Gatão', 'Cachorro', 5, 'M', 3);
