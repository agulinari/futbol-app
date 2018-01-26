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
    VALUES ('Lina', 'Agustin', 'Linari', 186, 85, 'assets/img/13.png', 'Delantero', '1983-01-04');
INSERT INTO players (nickname, first_name, last_name, player_height, player_weight, player_photo, player_position, birth_date)
    VALUES ('Pato', 'Alejandro', 'Sanchez', 175, 75, 'assets/img/2.png', 'Delantero', '1986-02-06');