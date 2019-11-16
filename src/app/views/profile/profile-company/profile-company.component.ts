import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCompanyComponent implements OnInit {

  @Input() user: Enterprise;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {}

  goToPersonalInformation() {
    this.route.navigate(['./personal-information-company'], { relativeTo: this.activatedRoute });
  }

}
