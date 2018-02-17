import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../player.service';
import { Player } from '../model/player';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss']
})
export class MatchFormComponent implements OnInit {

  matchForm: FormGroup;
  players: Player[];
  playersSelected: number[];

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
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
    this.matchForm.get('team1.player1.id').valueChanges.subscribe(id => this.playersSelected[0] = id);
    this.matchForm.get('team1.player2.id').valueChanges.subscribe(id => this.playersSelected[1] = id);
    this.matchForm.get('team1.player3.id').valueChanges.subscribe(id => this.playersSelected[2] = id);
    this.matchForm.get('team1.player4.id').valueChanges.subscribe(id => this.playersSelected[3] = id);
    this.matchForm.get('team1.player5.id').valueChanges.subscribe(id => this.playersSelected[4] = id);
    this.matchForm.get('team2.player1.id').valueChanges.subscribe(id => this.playersSelected[5] = id);
    this.matchForm.get('team2.player2.id').valueChanges.subscribe(id => this.playersSelected[6] = id);
    this.matchForm.get('team2.player3.id').valueChanges.subscribe(id => this.playersSelected[7] = id);
    this.matchForm.get('team2.player4.id').valueChanges.subscribe(id => this.playersSelected[8] = id);
    this.matchForm.get('team2.player5.id').valueChanges.subscribe(id => this.playersSelected[9] = id);
  }

  selectPlayer(index: number): void {
    const formModel = this.matchForm.value;
    this.playersSelected[index] = formModel.team2.player1.id;
  }

   createForm() {
     this.matchForm = this.fb.group({
      tournament: ['', Validators.required],
      place: ['', Validators.required],
      date: ['', Validators.required],
      team1: this.fb.group({
        name: ['Los amigos de Pato', Validators.required],
        player1: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player2: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player3: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player4: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player5: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        })
      }),
      team2: this.fb.group({
        name: ['Los amigos de Guille', Validators.required],
        player1: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player2: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player3: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player4: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
          assists: [0, Validators.required],
          fouls: [0, Validators.required],
          score: [0, Validators.required]
        }),
        player5: this.fb.group({
          id: ['', Validators.required],
          goals: [0, Validators.required],
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

}
