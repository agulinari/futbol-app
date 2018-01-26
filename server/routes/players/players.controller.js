// Import model

const PLAYERS = [
    {
      'id': 1,
      'photo': 'assets/img/3.png',
      'nickname': 'Pato',
      'firstname': 'Alejandro',
      'lastname': 'Sanchez',
      'dateofbirth': 'June 27, 2013',
      'position': 'Delantero',
      'height' : 175,
      'weight' : 75
    },
    {
      'id': 2,
      'photo': 'assets/img/2.png',
      'nickname': 'Guille',
      'firstname': 'Guillermo',
      'lastname': 'Maqueira',
      'dateofbirth': 'June 27, 2013',
      'position': 'Delantero',
      'height' : 175,
      'weight' : 75
    },
    {
      'id': 3,
      'photo': 'assets/img/1.png',
      'nickname': 'Picci',
      'firstname': 'Luis Emilio',
      'lastname': 'Piccinali',
      'dateofbirth': 'June 27, 2013',
      'position': 'Arquero',
      'height' : 175,
      'weight' : 75
    },
    {
      'id': 4,
      'photo': 'assets/img/13.png',
      'nickname': 'El Lina',
      'firstname': 'Agustin',
      'lastname': 'Linari',
      'dateofbirth': 'June 27, 2013',
      'position': 'Delantero',
      'height' : 175,
      'weight' : 75
    },
    {
      'id': 5,
      'photo': 'assets/img/14.png',
      'nickname': 'El Negro',
      'firstname': 'Juan Martin',
      'lastname': 'Criniti',
      'dateofbirth': 'June 27, 2013',
      'position': 'Defensor',
      'height' : 175,
      'weight' : 75
    },
    {
      'id': 6,
      'photo': 'assets/img/1.png',
      'nickname': 'Marianito',
      'firstname': 'Mariano',
      'lastname': 'Giacoletto',
      'dateofbirth': 'June 27, 2013',
      'position': 'Volante',
      'height' : 175,
      'weight' : 75
    }
  ];
  
  
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
  
  const EVOLUTION = [
    {
      'id': 1,
      'score': 7,
      'goals': 3,
      'matchdate': '02/01/2018'
    },
    {
      'id': 2,
      'score': 9,
      'goals': 6,
      'matchdate': '03/01/2018'
    },
    {
      'id': 3,
      'score': 2,
      'goals': 0,
      'matchdate': '04/01/2018'
    },
    {
      'id': 4,
      'score': 8,
      'goals': 2,
      'matchdate': '05/01/2018'
    },
    {
      'id': 5,
      'score': 5,
      'goals': 1,
      'matchdate': '06/01/2018'
    },
    {
      'id': 6,
      'score': 9,
      'goals': 6,
      'matchdate': '07/01/2018'
    },
    {
      'id': 7,
      'score': 6,
      'goals': 3,
      'matchdate': '08/01/2018'
    }
  ];

// Get list of players
exports.index = function(req, res) {
    return res.status(200).json(PLAYERS);
};
// Get a single player
exports.show = function(req, res) {
    let id = req.params.id;
    return res.status(200).json(PLAYERS[--id]);
};
// Get a single player stats
exports.stats = function(req, res) {
    let id = req.params.id;
    return res.status(200).json(STATS[--id]);
};
// Get a single player evolution
exports.evolution = function(req, res) {
    let id = req.params.id;
    return res.status(200).json(EVOLUTION);
};

// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}