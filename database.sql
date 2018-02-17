CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    nickname VARCHAR(30),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    player_height INTEGER,
    player_weight INTEGER,
    player_photo VARCHAR(40),
    player_position VARCHAR(30),
    birth_date DATE
);

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,
    place VARCHAR(30) NOT NULL,
    tournament VARCHAR(30) NOT NULL,
    team1 VARCHAR(30) NOT NULL,
    team2 VARCHAR(30) NOT NULL,
    team1_photo VARCHAR(40) NOT NULL,
    team2_photo VARCHAR(40) NOT NULL,
    summary_title VARCHAR(30),
    summary_body TEXT
);

CREATE TABLE stats (
    stat_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players,
    match_id INTEGER REFERENCES matches,
    team VARCHAR(30) NOT NULL,
    position VARCHAR(30) NOT NULL,
    goals INTEGER DEFAULT 0,
    shoots INTEGER DEFAULT 0,
    fouls INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    score INTEGER NOT NULL,
    UNIQUE (player_id, match_id)
);

INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Lina', 'Agustin', 'Linari', 186, 85, 'assets/img/14.png', 'Delantero', '1983-01-04');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Pato', 'Alejandro', 'Sanchez', 175, 75, 'assets/img/2.png', 'Delantero', '1986-02-06');  
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Leo', 'Leandro', 'Cairo', 182, 80, 'assets/img/1.png', 'Volante', '1983-10-29');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Negro', 'Juan Martin', 'Criniti', 173, 70, 'assets/img/13.png', 'Defensor', '1983-03-24');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Guille', 'Guillermo', 'Maquieira', 168, 60, 'assets/img/13.png', 'Delantero', '1983-01-01');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Diegote', 'Diego', 'Angelone', 172, 80, 'assets/img/1.png', 'Arquero', '1983-09-17');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Marianito', 'Mariano', 'Giacoletto', 168, 70, 'assets/img/15.png', 'Volante', '1982-10-15');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Pablito', 'Pablo Nicolas', 'Perez', 180, 73, 'assets/img/15.png', 'Volante', '1986-01-31');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Alan', 'Alan', 'Heilwel', 190, 80, 'assets/img/14.png', 'Arquero', '1982-01-01');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Acu', 'Acu', 'Salamo', 185, 75, 'assets/img/1.png', 'Delantero', '1992-09-17');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Picci', 'Luis Emilio', 'Piccinali', 175, 70, 'assets/img/14.png', 'Arquero', '1983-05-16');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Quique', 'Quique', 'Quique', 173, 78, 'assets/img/1.png', 'Defensor', '1978-01-01');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Gonza', 'Gonzalo', 'Sanroma', 180, 78, 'assets/img/1.png', 'Defensor', '1982-10-13');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Max', 'Maximiliano', 'Gattas', 178, 85, 'assets/img/1.png', 'Defensor', '1982-10-13');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Brunito', 'Bruno', 'Lanzilotta', 173, 74, 'assets/img/1.png', 'Delantero', '1984-01-24');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Gabi', 'Gabriel', 'Lasca', 187, 89, 'assets/img/1.png', 'Delantero', '1983-01-13');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('El Gato', 'Santiago', 'Francescoli', 178, 85, 'assets/img/15.png', 'Arquero', '1983-01-13');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('', 'Amigo', 'De Acu', 190, 85, 'assets/img/15.png', 'Volante', '1990-01-01');


INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-01-24', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'Ningunos Piccis', '');
INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-01-18', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'El Grafico', '');
INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-01-03', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'Siempre hay revancha', '');
INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-01-10', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'Pato al horno', '');
INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-01-31', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'Solos contra Quique', '');
INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body)
    VALUES ('2018-02-14', 'Pedernera', 'Empanadas Revancha 2018', 'Los Amigos de Pato', 'Los Amigos de Guille', 'assets/img/2.png', 'assets/img/13.png', 'En la ultima jugada', '');



INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 1, 'Los Amigos de Pato', 'Delantero', 3, 6, 1, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 1, 'Los Amigos de Pato', 'Delantero', 4, 20, 1, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 1, 'Los Amigos de Pato', 'Volante', 3, 6, 1, 1, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (4, 1, 'Los Amigos de Pato', 'Defensor', 4, 6, 1, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 1, 'Los Amigos de Guille', 'Defensor', 1, 2, 0, 1, 5);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (6, 1, 'Los Amigos de Pato', 'Arquero', 0, 0, 0, 0, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (7, 1, 'Los Amigos de Guille', 'Volante', 3, 6, 1, 5, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (8, 1, 'Los Amigos de Guille', 'Defensor', 2, 6, 0, 2, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (9, 1, 'Los Amigos de Guille', 'Arquero', 0, 0, 0, 0, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (10, 1, 'Los Amigos de Guille', 'Delantero', 3, 5, 3, 2, 6);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 2, 'Los Amigos de Pato', 'Delantero', 3, 6, 1, 1, 2);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 2, 'Los Amigos de Pato', 'Delantero', 0, 5, 1, 1, 2);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 2, 'Los Amigos de Pato', 'Volante', 4, 6, 1, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (4, 2, 'Los Amigos de Pato', 'Defensor', 2, 4, 1, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (11, 2, 'Los Amigos de Pato', 'Arquero', 0, 0, 0, 0, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (8, 2, 'Los Amigos de Guille', 'Volante', 3, 5, 1, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (7, 2, 'Los Amigos de Guille', 'Volante', 3, 6, 0, 4, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (12, 2, 'Los Amigos de Guille', 'Defensor', 1, 6, 1, 1, 9);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 2, 'Los Amigos de Guille', 'Delantero', 2, 0, 0, 0, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (14, 2, 'Los Amigos de Guille', 'Arquero', 3, 5, 3, 2, 7);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 3, 'Los Amigos de Pato', 'Delantero', 2, 6, 1, 1, 2);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 3, 'Los Amigos de Pato', 'Delantero', 0, 4, 1, 1, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 3, 'Los Amigos de Pato', 'Volante', 1, 3, 0, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (4, 3, 'Los Amigos de Pato', 'Defensor', 2, 4, 1, 2, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (11, 3, 'Los Amigos de Pato', 'Arquero', 0, 0, 0, 0, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 3, 'Los Amigos de Guille', 'Delantero', 1, 4, 0, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (12, 3, 'Los Amigos de Guille', 'Defensor', 0, 2, 3, 3, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (8, 3, 'Los Amigos de Guille', 'Volante', 3, 6, 0, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (13, 3, 'Los Amigos de Guille', 'Defensor', 0, 2, 0, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (14, 3, 'Los Amigos de Guille', 'Arquero', 1, 2, 1, 0, 7);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 3, 'Los Amigos de Pato', 'Delantero', 2, 6, 1, 1, 2);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 3, 'Los Amigos de Pato', 'Delantero', 0, 4, 1, 1, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 3, 'Los Amigos de Pato', 'Volante', 1, 3, 0, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (4, 3, 'Los Amigos de Pato', 'Defensor', 2, 4, 1, 2, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (11, 3, 'Los Amigos de Pato', 'Arquero', 0, 0, 0, 0, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 3, 'Los Amigos de Guille', 'Delantero', 1, 4, 0, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (12, 3, 'Los Amigos de Guille', 'Defensor', 0, 2, 1, 3, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (8, 3, 'Los Amigos de Guille', 'Volante', 3, 6, 0, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (13, 3, 'Los Amigos de Guille', 'Defensor', 0, 2, 0, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (14, 3, 'Los Amigos de Guille', 'Arquero', 1, 2, 1, 0, 7);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (15, 4, 'Los Amigos de Pato', 'Delantero', 2, 4, 1, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 4, 'Los Amigos de Pato', 'Delantero', 0, 3, 1, 1, 3);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 4, 'Los Amigos de Pato', 'Volante', 5, 3, 0, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (4, 4, 'Los Amigos de Pato', 'Defensor', 1, 4, 1, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (11, 4, 'Los Amigos de Pato', 'Arquero', 0, 0, 4, 0, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 4, 'Los Amigos de Guille', 'Delantero', 0, 3, 0, 1, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (7, 4, 'Los Amigos de Guille', 'Volante', 5, 2, 0, 3, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (8, 4, 'Los Amigos de Guille', 'Volante', 0, 3, 1, 2, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (9, 4, 'Los Amigos de Guille', 'Arquero', 0, 0, 0, 0, 5);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (13, 4, 'Los Amigos de Guille', 'Defensor', 4, 2, 1, 0, 8);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 5, 'Los Amigos de Pato', 'Delantero', 2, 5, 0, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 5, 'Los Amigos de Pato', 'Delantero', 2, 3, 0, 4, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 5, 'Los Amigos de Pato', 'Volante', 6, 7, 0, 1, 9);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (13, 5, 'Los Amigos de Pato', 'Defensor', 1, 2, 0, 3, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (11, 5, 'Los Amigos de Pato', 'Arquero', 0, 0, 1, 0, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (16, 5, 'Los Amigos de Guille', 'Delantero', 2, 4, 0, 1, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (7, 5, 'Los Amigos de Guille', 'Volante', 4, 8, 0, 4, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (14, 5, 'Los Amigos de Guille', 'Delantero', 2, 8, 1, 1, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (17, 5, 'Los Amigos de Guille', 'Arquero', 0, 0, 0, 0, 5);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (12, 5, 'Los Amigos de Guille', 'Defensor', 0, 2, 2, 0, 8);

INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (1, 6, 'Los Amigos de Pato', 'Defensor', 0, 4, 0, 0, 5);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (2, 6, 'Los Amigos de Pato', 'Arquero', 0, 2, 0, 1, 5);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (3, 6, 'Los Amigos de Pato', 'Volante', 5, 7, 0, 3, 8);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (10, 6, 'Los Amigos de Pato', 'Delantero', 3, 5, 1, 3, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (15, 6, 'Los Amigos de Pato', 'Delantero', 3, 4, 0, 2, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (5, 6, 'Los Amigos de Guille', 'Arquero', 0, 1, 0, 0, 4);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (7, 6, 'Los Amigos de Guille', 'Delantero', 8, 10, 2, 1, 9);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (13, 6, 'Los Amigos de Guille', 'Defensor', 0, 8, 1, 1, 6);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (16, 6, 'Los Amigos de Guille', 'Delantero', 2, 5, 0, 1, 7);
INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score)
    VALUES (18, 6, 'Los Amigos de Guille', 'Volante', 2, 3, 1, 2, 7);
