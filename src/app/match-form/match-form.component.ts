import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../player.service';
import { MatchService } from '../match.service';
import { Player } from '../model/player';
import { MatchTeams } from '../model/match-teams';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss']
})
export class MatchFormComponent implements OnInit {

  match: MatchTeams;
  matchForm: FormGroup;
  players: Player[];
  playersSelected: number[];

  constructor(private fb: FormBuilder, private playerService: PlayerService, private matchService: MatchService) {
    this.createForm();
    this.playersSelected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => {
        this.players = players;
      });
  }

  onChanges(): void {
    this.matchForm.get('team1.player1.id').valueChanges.subscribe(id => {
      this.playersSelected[0] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team1.player2.id').valueChanges.subscribe(id => {
      this.playersSelected[1] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team1.player3.id').valueChanges.subscribe(id => {
      this.playersSelected[2] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team1.player4.id').valueChanges.subscribe(id => {
      this.playersSelected[3] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team1.player5.id').valueChanges.subscribe(id => {
      this.playersSelected[4] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team2.player1.id').valueChanges.subscribe(id => {
      this.playersSelected[5] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team2.player2.id').valueChanges.subscribe(id => {
      this.playersSelected[6] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team2.player3.id').valueChanges.subscribe(id => {
      this.playersSelected[7] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team2.player4.id').valueChanges.subscribe(id => {
      this.playersSelected[8] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
    this.matchForm.get('team2.player5.id').valueChanges.subscribe(id => {
      this.playersSelected[9] = +id;
      this.playersSelected = this.playersSelected.slice();
    });
  }

  createForm() {
    this.matchForm = this.fb.group({
      tournament: ['', Validators.required],
      place: ['', Validators.required],
      date: ['', Validators.required],
      team1: this.fb.group({
        name: ['Los amigos de Pato', Validators.required],
        photo: ['assets/img/2.png', Validators.required],
        player1: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player2: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player3: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player4: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player5: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        })
      }),
      team2: this.fb.group({
        name: ['Los amigos de Guille', Validators.required],
        photo: ['assets/img/13.png', Validators.required],
        player1: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required, Validators.min(0), Validators.max(50)],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player2: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player3: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player4: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player5: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          shoots: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        })
      }),
      summaryTitle: ['', Validators.required],
      summaryBody: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getPlayers();
    this.onChanges();
  }

  onSubmit() {
    this.match = this.prepareSaveMatch();
    this.matchService.postMatch(this.match).subscribe(/* error handling */);
  }

  prepareSaveMatch(): MatchTeams {
    const formModel = this.matchForm.value;

    const saveMatch: MatchTeams = {
      id: 0,
      date: formModel.date as string,
      place: formModel.place as string,
      tournament: formModel.tournament as string,
      summary_title: formModel.summary_title as string,
      summary_body: formModel.summary_body as string,
      team1: {
        name: formModel.team1.name as string,
        photo: formModel.team1.photo as string,
        players: [
          {
            id: formModel.team1.player1.id as number,
            photo: '',
            name: '',
            position: 'Arquero',
            goals: formModel.team1.player1.goals as number,
            shoots: formModel.team1.player1.shoots as number,
            assists: formModel.team1.player1.assists as number,
            fouls: formModel.team1.player1.fouls as number,
            score: formModel.team1.player1.score as number
          },
          {
            id: formModel.team1.player2.id as number,
            photo: '',
            name: '',
            position: 'Defensor',
            goals: formModel.team1.player2.goals as number,
            shoots: formModel.team1.player2.shoots as number,
            assists: formModel.team1.player2.assists as number,
            fouls: formModel.team1.player2.fouls as number,
            score: formModel.team1.player2.score as number
          },
          {
            id: formModel.team1.player3.id as number,
            photo: '',
            name: '',
            position: 'Defensor',
            goals: formModel.team1.player3.goals as number,
            shoots: formModel.team1.player3.shoots as number,
            assists: formModel.team1.player3.assists as number,
            fouls: formModel.team1.player3.fouls as number,
            score: formModel.team1.player3.score as number
          },
          {
            id: formModel.team1.player4.id as number,
            photo: '',
            name: '',
            position: 'Volante',
            goals: formModel.team1.player4.goals as number,
            shoots: formModel.team1.player4.shoots as number,
            assists: formModel.team1.player4.assists as number,
            fouls: formModel.team1.player4.fouls as number,
            score: formModel.team1.player4.score as number
          },
          {
            id: formModel.team1.player5.id as number,
            photo: '',
            name: '',
            position: 'Delantero',
            goals: formModel.team1.player5.goals as number,
            shoots: formModel.team1.player5.shoots as number,
            assists: formModel.team1.player5.assists as number,
            fouls: formModel.team1.player5.fouls as number,
            score: formModel.team1.player5.score as number
          }
        ]
      },
      team2: {
        name: formModel.team2.name as string,
        photo: formModel.team2.photo as string,
        players: [
          {
            id: formModel.team2.player1.id as number,
            photo: '',
            name: '',
            position: 'Arquero',
            goals: formModel.team2.player1.goals as number,
            shoots: formModel.team2.player1.shoots as number,
            assists: formModel.team2.player1.assists as number,
            fouls: formModel.team2.player1.fouls as number,
            score: formModel.team2.player1.score as number
          },
          {
            id: formModel.team2.player2.id as number,
            photo: '',
            name: '',
            position: 'Defensor',
            goals: formModel.team2.player2.goals as number,
            shoots: formModel.team2.player2.shoots as number,
            assists: formModel.team2.player2.assists as number,
            fouls: formModel.team2.player2.fouls as number,
            score: formModel.team2.player2.score as number
          },
          {
            id: formModel.team2.player3.id as number,
            photo: '',
            name: '',
            position: 'Defensor',
            goals: formModel.team2.player3.goals as number,
            shoots: formModel.team2.player3.shoots as number,
            assists: formModel.team2.player3.assists as number,
            fouls: formModel.team2.player3.fouls as number,
            score: formModel.team2.player3.score as number
          },
          {
            id: formModel.team2.player4.id as number,
            photo: '',
            name: '',
            position: 'Volante',
            goals: formModel.team2.player4.goals as number,
            shoots: formModel.team2.player4.shoots as number,
            assists: formModel.team2.player4.assists as number,
            fouls: formModel.team2.player4.fouls as number,
            score: formModel.team2.player4.score as number
          },
          {
            id: formModel.team2.player5.id as number,
            photo: '',
            name: '',
            position: 'Delantero',
            goals: formModel.team2.player5.goals as number,
            shoots: formModel.team2.player5.shoots as number,
            assists: formModel.team2.player5.assists as number,
            fouls: formModel.team2.player5.fouls as number,
            score: formModel.team2.player5.score as number
          }
        ]
      }
    };

    return saveMatch;
  }
}
