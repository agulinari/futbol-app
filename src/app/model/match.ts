export class Match {
    id: number;
    date: string;
    place: string;
    tournament: string;
    team1: {
        name: string;
        photo: string;
        goals: number;
        shoots: number;
        fouls: number;
        possession: number;
    };
    team2: {
        name: string;
        photo: string;
        goals: number;
        shoots: number;
        fouls: number;
        possession: number;
    };
    awards: {
        chamigo: {
            idplayer: number;
            photo: string;
            name: string;
        };
        chenemigo: {
            idplayer: number;
            photo: string;
            name: string;
        };
        goleador: {
            idplayer: number;
            photo: string;
            name: string;
        };
        terminator: {
            idplayer: number;
            photo: string;
            name: string;
        };
    };
    summary: {
        title: string;
        body: string;
    };
}
