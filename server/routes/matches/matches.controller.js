const { Pool, Client, Query } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
});

// Get list of matches
exports.index = function (req, res) {

    let querymatches;
    if (Object.keys(req.query).length === 0) {
        querymatches = 'select m.match_id, to_char(m.match_date,\'DD/MM/YYYY\') as match_date, m.place, m.tournament, m.team1, m.team1_photo, '
            + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team1) team1_goals, '
            + 'm.team2, m.team2_photo, '
            + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team2) team2_goals '
            + 'from matches m order by m.match_date desc';
    } else {
        querymatches = 'select m.match_id, to_char(m.match_date,\'DD/MM/YYYY\') as match_date, m.place, m.tournament, m.team1, m.team1_photo, '
            + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team1) team1_goals, '
            + 'm.team2, m.team2_photo, '
            + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team2) team2_goals '
            + 'from matches m, stats s '
            + 'where s.match_id = m.match_id '
            + 'and s.player_id = ' + req.query.player + ' order by m.match_date desc';
    }

    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query(new Query(querymatches));
        // Stream results back one row at a time
        query.on('row', (row) => {
            let match = {};
            let team1 = {};
            let team2 = {};
            match.id = row.match_id;
            match.date = row.match_date;
            match.place = row.place;
            match.tournament = row.tournament;
            team1.name = row.team1;
            team1.photo = row.team1_photo;
            team1.goals = row.team1_goals;
            team2.name = row.team2;
            team2.photo = row.team2_photo;
            team2.goals = row.team2_goals;
            match.team1 = team1;
            match.team2 = team2;
            results.push(match);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
};

// Get a single match
exports.show = function (req, res) {

    const id = req.params.id;

    const querymatches = 'SELECT m.match_id, to_char(m.match_date,\'DD/MM/YYYY\') as match_date, m.place, m.tournament, m.team1, m.team1_photo, t1.goals as team1_goals, t1.shoots as team1_shoots, t1.fouls as team1_fouls, t1.assists as team1_assists, m.team2, m.team2_photo, t2.goals as team2_goals, '
        + 't2.shoots as team2_shoots, t2.fouls as team2_fouls, t2.assists as team2_assists, chamigo.player_id as chamigo_id, chamigo.player_photo as chamigo_photo, chamigo.nickname as chamigo_name, chenemigo.player_id as chenemigo_id, chenemigo.player_photo as chenemigo_photo, chenemigo.nickname as chenemigo_name, '
        + 'goleador.player_id as goleador_id, goleador.player_photo as goleador_photo, goleador.nickname as goleador_name, terminator.player_id as terminator_id, terminator.player_photo as terminator_photo, terminator.nickname as terminator_name '
        + ' FROM matches m, '
        + '(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
        + 'from matches mat,stats s where team = mat.team1 and s.match_id = mat.match_id group by mat.match_id having mat.match_id = ' + id + ' ) t1, '
        + '(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
        + 'from matches mat,stats s where team = mat.team2 and s.match_id = mat.match_id group by mat.match_id having mat.match_id = ' + id + ' ) t2, '
        + '(SELECT p.player_id, p.player_photo, p.nickname, s.score '
        + 'from players p, stats s where s.player_id = p.player_id and s.match_id = ' + id + ' order by s.score DESC limit 1) chamigo, '
        + '(SELECT p.player_id, p.player_photo, p.nickname, s.score '
        + 'from players p, stats s where s.player_id = p.player_id and s.match_id = ' + id + ' order by s.score ASC limit 1) chenemigo, '
        + '(SELECT p.player_id, p.player_photo, p.nickname, s.goals '
        + 'from players p, stats s where s.player_id = p.player_id and s.match_id = ' + id + ' order by s.goals DESC limit 1) goleador, '
        + '(SELECT p.player_id, p.player_photo, p.nickname, s.fouls '
        + 'from players p, stats s where s.player_id = p.player_id and s.match_id = ' + id + ' order by s.fouls DESC limit 1) terminator '
        + 'where m.match_id = ' + id + ';';

    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query(new Query(querymatches));
        // Stream results back one row at a time
        query.on('row', (row) => {
            let match = {};
            let team1 = {};
            let team2 = {};
            let awards = {};
            let chamigo = {};
            let chenemigo = {};
            let goleador = {};
            let terminator = {};
            match.id = row.match_id;
            match.date = row.match_date;
            match.place = row.place;
            match.tournament = row.tournament;
            team1.name = row.team1;
            team1.photo = row.team1_photo;
            team1.goals = row.team1_goals;
            team1.shoots = row.team1_shoots;
            team1.fouls = row.team1_fouls;
            team1.assists = row.team1_assists;
            team2.name = row.team2;
            team2.photo = row.team2_photo;
            team2.goals = row.team2_goals;
            team2.shoots = row.team2_shoots;
            team2.fouls = row.team2_fouls;
            team2.assists = row.team2_assists;
            chamigo.idplayer = row.chamigo_id;
            chamigo.name = row.chamigo_name;
            chamigo.photo = row.chamigo_photo;
            chenemigo.idplayer = row.chenemigo_id;
            chenemigo.name = row.chenemigo_name;
            chenemigo.photo = row.chenemigo_photo;
            goleador.idplayer = row.goleador_id;
            goleador.name = row.goleador_name;
            goleador.photo = row.goleador_photo;
            terminator.idplayer = row.terminator_id;
            terminator.name = row.terminator_name;
            terminator.photo = row.terminator_photo;
            awards.chamigo = chamigo;
            awards.chenemigo = chenemigo;
            awards.goleador = goleador;
            awards.terminator = terminator;
            match.team1 = team1;
            match.team2 = team2;
            match.awards = awards;
            results.push(match);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results[0]);
        });
    });

};

exports.teams = function (req, res) {

    const id = req.params.id;

    const querystring = 'select  m.match_id, to_char(m.match_date,\'DD/MM/YYYY\') as match_date, s.player_id, p.nickname, p.player_photo, s.team, s.position, s.goals, s.shoots, s.assists, s.fouls, s.score '
        + ' from stats s, players p, matches m where p.player_id = s.player_id and m.match_id = s.match_id and s.match_id = ' + id + ' order by s.team, s.position asc';

    let match = {};
    let team1 = {};
    let team2 = {};
    let team1_players = [];
    let team2_players = [];
    const pos1 = [{ x: 50, y: 80 }, { x: 30, y: 65 }, { x: 70, y: 65 }, { x: 50, y: 15 }, { x: 50, y: 45 }];
    const pos2 = [{ x: 50, y: 10 }, { x: 30, y: 25 }, { x: 70, y: 25 }, { x: 50, y: 70 }, { x: 50, y: 45 }];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            let player = {};
            match.id = row.match_id;
            match.date = row.match_date;
            player.id = row.player_id;
            player.photo = row.player_photo;
            player.name = row.nickname;
            player.position = row.position;
            player.goals = row.goals;
            player.assists = row.assists;
            player.fouls = row.fouls;
            player.score = row.score;

            if (team1_players.length < 5) {
                player.x = pos1[team1_players.length].x;
                player.y = pos1[team1_players.length].y;
                team1_players.push(player);
                team1.name = row.team;
            } else {
                player.x = pos2[team2_players.length].x;
                player.y = pos2[team2_players.length].y;
                team2_players.push(player);
                team2.name = row.team;
            }
        });
        team1.players = team1_players;
        team2.players = team2_players;
        match.team1 = team1;
        match.team2 = team2;

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(match);
        });
    });

}

// Get a single match summary
exports.summary = function (req, res) {

    const id = req.params.id;

    const querystring = 'select m.match_id, to_char(m.match_date,\'DD/MM/YYYY\') as match_date, m.summary_title, m.summary_body '
        + 'from matches m where m.match_id = ' + id;

    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            let summary = {};
            summary.date = row.match_date;
            summary.title = row.summary_title;
            summary.body = row.summary_body;
            results.push(summary);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results[0]);
        });
    });

};

exports.create = function (req, res) {
    const data = req.body;
    (async () => {
        const client = await pool.connect()
        
        try {
            await client.query('BEGIN')
            const { rows } = await client.query('INSERT INTO matches (match_date, place, tournament, team1, team2, team1_photo, team2_photo, summary_title, summary_body) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
        [data.date, data.place, data.tournament, data.team1.name, data.team2.name, data.team1.photo, data.team2.photo, data.summary_title, data.summary_body]);
            const matchid = res.rows[0].id;
            const insertStatsTeam1Player1 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam1Player1Values = [data.team1.player1.id, matchid, data.team1.name, data.team1.player1.position, data.team1.player1.goals, data.team1.player1.shoots, data.team1.player1.fouls, data.team1.player1.assists, data.team1.player1.score];
            await client.query(insertStatsTeam1Player1, insertStatsTeam1Player1Values);
            const insertStatsTeam1Player2 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam1Player2Values = [data.team1.player2.id, matchid, data.team1.name, data.team1.player2.position, data.team1.player2.goals, data.team1.player2.shoots, data.team1.player2.fouls, data.team1.player2.assists, data.team1.player2.score];
            await client.query(insertStatsTeam1Player2, insertStatsTeam1Player2Values);
            const insertStatsTeam1Player3 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam1Player3Values = [data.team1.player3.id, matchid, data.team1.name, data.team1.player3.position, data.team1.player3.goals, data.team1.player3.shoots, data.team1.player3.fouls, data.team1.player3.assists, data.team1.player3.score];
            await client.query(insertStatsTeam1Player3, insertStatsTeam1Player3Values);
            const insertStatsTeam1Player4 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam1Player4Values = [data.team1.player4.id, matchid, data.team1.name, data.team1.player4.position, data.team1.player4.goals, data.team1.player4.shoots, data.team1.player4.fouls, data.team1.player4.assists, data.team1.player4.score];
            await client.query(insertStatsTeam1Player4, insertStatsTeam1Player4Values);
            const insertStatsTeam1Player5 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam1Player5Values = [data.team1.player5.id, matchid, data.team1.name, data.team1.player5.position, data.team1.player5.goals, data.team1.player5.shoots, data.team1.player5.fouls, data.team1.player5.assists, data.team1.player5.score];
            await client.query(insertStatsTeam1Player5, insertStatsTeam1Player5Values);
            const insertStatsTeam2Player1 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam2Player1Values = [data.team2.player1.id, matchid, data.team2.name, data.team2.player1.position, data.team2.player1.goals, data.team2.player1.shoots, data.team2.player1.fouls, data.team2.player1.assists, data.team2.player1.score];
            await client.query(insertStatsTeam2Player1, insertStatsTeam2Player1Values);
            const insertStatsTeam2Player2 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam2Player2Values = [data.team2.player2.id, matchid, data.team2.name, data.team2.player2.position, data.team2.player2.goals, data.team2.player2.shoots, data.team2.player2.fouls, data.team2.player2.assists, data.team2.player2.score];
            await client.query(insertStatsTeam2Player2, insertStatsTeam2Player2Values);
            const insertStatsTeam2Player3 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam2Player3Values = [data.team2.player3.id, matchid, data.team2.name, data.team2.player3.position, data.team2.player3.goals, data.team2.player3.shoots, data.team2.player3.fouls, data.team2.player3.assists, data.team2.player3.score];
            await client.query(insertStatsTeam2Player3, insertStatsTeam2Player3Values);
            const insertStatsTeam2Player4 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam2Player4Values = [data.team2.player4.id, matchid, data.team2.name, data.team2.player4.position, data.team2.player4.goals, data.team2.player4.shoots, data.team2.player4.fouls, data.team2.player4.assists, data.team2.player4.score];
            await client.query(insertStatsTeam2Player4, insertStatsTeam2Player4Values);
            const insertStatsTeam2Player5 = 'INSERT INTO stats (player_id, match_id, team, position, goals, shoots, fouls, assists, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const insertStatsTeam2Player5Values = [data.team2.player5.id, matchid, data.team2.name, data.team2.player5.position, data.team2.player5.goals, data.team2.player5.shoots, data.team2.player5.fouls, data.team2.player5.assists, data.team2.player5.score];
            await client.query(insertStatsTeam2Player5, insertStatsTeam2Player5Values);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(e => { 
        console.error(e.stack);
        return res.status(500).json({ success: false, data: err });        
    })
    return res.status(201).json(data);
};

// Error function
function handleError(res, err) {
    return res.status(500).json(err);
}