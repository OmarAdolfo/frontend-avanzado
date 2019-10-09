import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './data-profile.component.html'
})
export class DataProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserLoggedIn();
  }

  goToPersonalInformationForm() {
    this.route.navigate(['./personal-information'], { relativeTo: this.activatedRoute });
  }

}
