const { Pool, Client, Query } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
});


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
            return res.json(results[0]);
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