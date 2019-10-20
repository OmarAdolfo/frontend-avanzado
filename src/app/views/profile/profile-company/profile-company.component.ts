import { Component, OnInit } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {

  user: Enterprise;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.user = Object.assign({}, (this.authService.getUserLoggedIn() as Enterprise));
  }

  goToPersonalInformation() {
    this.route.navigate(['./personal-information-company'], { relativeTo: this.activatedRoute });
  }

}
