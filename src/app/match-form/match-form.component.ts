import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss']
})
export class MatchFormComponent implements OnInit {

  matchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
     this.matchForm = this.fb.group({
      date: ['', Validators.required],
     });
   }

  ngOnInit() {
  }

}
