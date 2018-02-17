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

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.createForm();
   }

   getPlayers(): void {
    this.playerService.getPlayers()
        .subscribe(players => {
          this.players = players;
        });
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
  }

}
