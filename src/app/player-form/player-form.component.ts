import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../model/player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  player: Player;
  playerForm: FormGroup;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
      this.playerForm = this.fb.group({
        nickname: ['',  Validators.compose([Validators.required, Validators.maxLength(30)])],
        firstname: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        lastname: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        birthdate: ['', Validators.required],
        position: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        weight: [75, Validators.compose([Validators.required, Validators.min(20), Validators.max(150)])],
        height: [180, Validators.compose([Validators.required, Validators.min(100), Validators.max(250)])],
        photo: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
    });
  }

  onSubmit() {
    this.player = this.prepareSavePlayer();
    this.playerService.postPlayer(this.player).subscribe(/* error handling */);
  }

  prepareSavePlayer(): Player {
    const formModel = this.playerForm.value;

    const savePlayer: Player = {
      id: 0,
      photo: formModel.photo as string,
      nickname: formModel.nickname as string,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      dateofbirth: formModel.birthdate as string,
      position: formModel.position as string,
      height: formModel.height as number,
      weight: formModel.weight as number
    };

    return savePlayer;
  }
}
