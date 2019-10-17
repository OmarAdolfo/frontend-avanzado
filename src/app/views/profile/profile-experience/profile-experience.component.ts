import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/shared/models/experience.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {

  model: Experience;

  experienceForm: FormGroup;

  /* ^\S.* */

  constructor() { }

  ngOnInit() {
  }

}
