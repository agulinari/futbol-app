export class MatchTeams {
    id: number;
    date: string;
    place: string;
    tournament: string;
    summary_title: string;
    summary_body: string;
    team1: {
        name: string;
        photo: string;
        players: [
            {
                id: number;
                photo: string;
                name: string;
                position: string;
                goals: number;
                shoots: number;
                assists: number;
                fouls: number;
                score: number;
            }
        ];
    };
    team2: {
        name: string;
        photo: string;
        players: [
            {
                id: number;
                photo: string;
                name: string;
                position: string;
                goals: number;
                shoots: number;
                assists: number;
                fouls: number;
                score: number;
            }
        ];
    };
}
