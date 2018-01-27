const { Pool, Client, Query } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
});

const STATS = [
    {
        'id': 1,
        'attack': 70,
        'defense': 40,
        'vision': 20,
        'impact': 50,
        'physique': 55,
        'goals': 2,
        'assists': 4,
        'fouls': 3,
        'matches': 12
    },
    {
        'id': 2,
        'attack': 80,
        'defense': 50,
        'vision': 10,
        'impact': 60,
        'physique': 75,
        'goals': 7,
        'assists': 2,
        'fouls': 8,
        'matches': 11
    },
    {
        'id': 3,
        'attack': 30,
        'defense': 90,
        'vision': 60,
        'impact': 60,
        'physique': 85,
        'goals': 1,
        'assists': 7,
        'fouls': 8,
        'matches': 10
    },
    {
        'id': 4,
        'attack': 40,
        'defense': 40,
        'vision': 80,
        'impact': 50,
        'physique': 25,
        'goals': 6,
        'assists': 2,
        'fouls': 7,
        'matches': 11
    },
    {
        'id': 5,
        'attack': 40,
        'defense': 40,
        'vision': 80,
        'impact': 70,
        'physique': 25,
        'goals': 7,
        'assists': 1,
        'fouls': 8,
        'matches': 10
    },
    {
        'id': 6,
        'attack': 20,
        'defense': 90,
        'vision': 10,
        'impact': 60,
        'physique': 45,
        'goals': 1,
        'assists': 1,
        'fouls': 5,
        'matches': 10
    }
];

// Get list of players
exports.index = function (req, res) {
    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const querystring = 'SELECT player_id as id, player_photo as photo, nickname, first_name as firstname, last_name as lastname, birth_date as dateofbirth, player_position as position, player_height as height, player_weight as weight FROM players ORDER BY player_id ASC;'
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
};
// Get a single player
exports.show = function (req, res) {
    let id = req.params.id;
    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const querystring = 'SELECT player_id as id, player_photo as photo, nickname, first_name as firstname, last_name as lastname, birth_date as dateofbirth, player_position as position, player_height as height, player_weight as weight FROM players WHERE player_id=' + id + ';';
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results[0]);
        });
    });
};
// Get a single player stats
exports.stats = function (req, res) {
    let id = req.params.id;
    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const querystring = 'select s.player_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, COUNT(s.player_id) as matches from stats s '
        +' group by s.player_id having s.player_id = '+id+';';
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            let stats = {};
            stats.id = row.player_id;
            stats.goals = row.goals;
            stats.assists = row.assists;
            stats.fouls = row.fouls;
            stats.matches = row.matches;
            stats.vision = 50;
            stats.attack = 50;
            stats.defense = 50;
            stats.physique = 50;
            stats.impact = 50;
            results.push(stats);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
};
// Get a single player evolution
exports.evolution = function (req, res) {
    let id = req.params.id;
    const results = [];
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const querystring = 'SELECT s.match_id as id, s.score, s.goals, m.match_date as matchdate FROM stats s, matches m WHERE s.match_id = m.match_id AND s.player_id=' + id + ' ORDER BY m.match_date ASC;';
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
};

// Error function
function handleError(res, err) {
    return res.status(500).json(err);
}