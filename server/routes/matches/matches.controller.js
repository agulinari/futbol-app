const { Pool, Client, Query } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
});

// Get list of matches
exports.index = function(req, res) {

    let querymatches;
    if (req.query.player === undefined){
        querymatches = 'select m.match_id, m.match_date, m.place, m.tournament, m.team1, m.team1_photo, ' 
        + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team1) team1_goals, '
        + 'm.team2, m.team2_photo, '
        + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team2) team2_goals '
        + 'from matches m';
    }else{
        querymatches = 'select m.match_id, m.match_date, m.place, m.tournament, m.team1, m.team1_photo, '
        + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team1) team1_goals, '
        + 'm.team2, m.team2_photo, '
        + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team2) team2_goals '
        + 'from matches m, stats s '
        + 'where s.match_id = m.match_id '
        + 'and s.player_id = '+req.query.player;
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
exports.show = function(req, res) {
    
    const id = req.params.id;

    const querymatches = 'SELECT m.match_id, m.match_date, m.place, m.tournament, m.team1, m.team1_photo, t1.goals as team1_goals, t1.shoots as team1_shoots, t1.fouls as team1_fouls, t1.assists as team1_assists, m.team2, m.team2_photo, t2.goals as team2_goals, '
    + 't2.shoots as team2_shoots, t2.fouls as team2_fouls, t2.assists as team2_assists, chamigo.player_id as chamigo_id, chamigo.player_photo as chamigo_photo, chamigo.nickname as chamigo_name, chenemigo.player_id as chenemigo_id, chenemigo.player_photo as chenemigo_photo, chenemigo.nickname as chenemigo_name, '
    + 'goleador.player_id as goleador_id, goleador.player_photo as goleador_photo, goleador.nickname as goleador_name, terminator.player_id as terminator_id, terminator.player_photo as terminator_photo, terminator.nickname as terminator_name, m.summary_title, m.summary_body '
    +' FROM matches m, '
    +'(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
    +'from matches mat,stats s where team = mat.team1 and s.match_id = mat.match_id group by mat.match_id having mat.match_id = '+id+' ) t1, '
    +'(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
    +'from matches mat,stats s where team = mat.team2 and s.match_id = mat.match_id group by mat.match_id having mat.match_id = '+id+' ) t2, '
    +'(SELECT p.player_id, p.player_photo, p.nickname, s.score '
    +'from players p, stats s where s.player_id = p.player_id and s.match_id = '+id+' order by s.score DESC limit 1) chamigo, '
    +'(SELECT p.player_id, p.player_photo, p.nickname, s.score '
    +'from players p, stats s where s.player_id = p.player_id and s.match_id = '+id+' order by s.score ASC limit 1) chenemigo, '
    +'(SELECT p.player_id, p.player_photo, p.nickname, s.goals '
    +'from players p, stats s where s.player_id = p.player_id and s.match_id = '+id+' order by s.goals DESC limit 1) goleador, '
    +'(SELECT p.player_id, p.player_photo, p.nickname, s.fouls '
    +'from players p, stats s where s.player_id = p.player_id and s.match_id = '+id+' order by s.fouls DESC limit 1) terminator '
    +'where m.match_id = '+id+';';
    
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
            let summary = {};
            match.id = row.match_id;
            match.date = row.match_date;
            match.place = row.place;
            summary.title = row.summary_title;
            summary.body = row.summary_body;
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
            match.summary = summary;
            results.push(match);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results[0]);
        });
    });

};
// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}