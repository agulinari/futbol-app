export class MatchTeams {
    id: number;
    date: string;
    team1: {
        name: string;
        players: [
            {
                id: number;
                photo: string;
                name: string;
                goals: number;
                assists: number;
                fouls: number;
                score: number;
            }
        ];
    };
    team2: {
        name: string;
        players: [
            {
                id: number;
                photo: string;
                name: string;
                goals: number;
                assists: number;
                fouls: number;
                score: number;
            }
        ];
    };
}
