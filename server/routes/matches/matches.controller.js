


const MATCHES = [
    {
        'id': 1,
        'date': 'Enero 22, 2018',
        'place': 'Pergamino',
        'tournament': 'Pato Capitan',
        'team1': {
            'name': 'Los Amigos de Pato',
            'photo': 'assets/img/1.png',
            'goals': 4,
            'shoots': 11,
            'fouls': 7,
            'possession': 56
        },
        'team2': {
            'name': 'Los Amigos de Guille',
            'photo': 'assets/img/2.png',
            'goals': 3,
            'shoots': 9,
            'fouls': 8,
            'possession': 44
        },
        'awards': {
            'chamigo': {
                'idplayer': 1,
                'photo': 'assets/img/3.png',
                'name': 'Pato'
            },
            'chenemigo': {
                'idplayer': 2,
                'photo': 'assets/img/1.png',
                'name': 'Guille'
            },
            'goleador': {
                'idplayer': 3,
                'photo': 'assets/img/13.png',
                'name': 'Picci'
            },
            'terminator': {
                'idplayer': 4,
                'photo': 'assets/img/14.png',
                'name': 'El Lina'
            }
        },
        'summary': {
            'title': 'Siempre hay revancha',
            'body': 'En otra calurosa noche, comienza el torneo "Empanadas Revancha 2018".'
        }
    }
];


// Get list of matches
exports.index = function(req, res) {
    const querymatches = 'select m.match_id, m.match_date, m.place, m.tournament, m.team1, m.team1_photo, ' 
    + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team1) team1_goals, '
    + 'm.team2, m.team2_photo, '
    + '(select sum(s.goals) from stats s where s.match_id = m.match_id and s.team = m.team2) team2_goals '
    + 'from matches m';

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
            console.log(row);
            results.push(row);
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

    const querymatches = 'SELECT m.match_id, m.match_date, m.place, m.tournament, m.team1, m.team1_photo, t1.goals, t2.shoots, t2.fouls, t2.assists, m.team2, m.team2_photo, t2.goals, '
    + 't2.goals, t2.shoots, t2.fouls, t2.assists, chamigo.player_id, chamigo.player_photo, chamigo.nickname, chenemigo.player_id, chenemigo.player_photo, chenemigo.nickname, '
    + 'goleador.player_id, goleador.player_photo, goleador.nickname, terminator.player_id, terminator.player_photo, terminator.nickname, m.summary_title, m.summary_body '
    +' FROM matches m, '
    +'(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
    +'from matches mat,stats s where team = mat.team1 group by mat.match_id having mat.match_id = '+id+' ) t1, '
    +'(SELECT mat.match_id, SUM(s.goals) as goals, SUM(s.assists) as assists, SUM(s.fouls) as fouls, SUM(s.shoots) as shoots '
    +'from matches mat,stats s where team = mat.team2 group by mat.match_id having mat.match_id = '+id+' ) t2, '
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
        const querystring = 'SELECT player_id as id, player_photo as photo, nickname, first_name as firstname, last_name as lastname, birth_date as dateofbirth, player_position as position, player_height as height, player_weight as weight FROM players ORDER BY player_id ASC;'
        // SQL Query > Select Data
        const query = client.query(new Query(querystring));
        // Stream results back one row at a time
        query.on('row', (row) => {
            console.log(row);
            results.push(row);
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