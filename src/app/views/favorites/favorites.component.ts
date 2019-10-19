import { Component, OnInit } from '@angular/core';
import { Configuration, NotificationProvince, User } from 'src/app/shared/models/user.model';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageNameService } from 'src/app/shared/services/language-name.service';
import { LanguageName } from 'src/app/shared/models/language.model';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  user: User;
  model: Configuration;
  configurationForm: FormGroup;
  languageNames: LanguageName[];
  isUserUpdate = false;
  public checks: Array<NotificationProvince> = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private languageNameService: LanguageNameService,
    private provinceService: ProvinceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.model = this.authService.getUserLoggedIn().configuration;
    this.user = this.authService.getUserLoggedIn();
    if (this.user.configuration) {
      this.model = this.user.configuration;
    }
    this.getLanguageNames();
    this.buildForm();
  }

  getLanguageNames() {
    this.languageNameService.getLanguageNames().subscribe(
      languageNames => {
        this.languageNames = languageNames;
      }
    )
  }

  buildForm() {
    this.configurationForm = this.fb.group({
      languageName: new FormControl(this.model.languageName),
      notifications: this.fb.array([])
    });
    this.getProvinces();
  }

  getProvinces() {
    const notifications = this.configurationForm.get('notifications') as FormArray;
    this.provinceService.getProvinces().subscribe(
      provinces => {
        provinces.forEach(province => {
          const notification = this.user.configuration.notifications.find(notification => notification.province.uid === province.uid);
          const notified = notification ? notification.notified : false;
          notifications.push(this.fb.group({
            notified: notified,
            province: province
          }));
        });
      }
    )
  }

  getNameProvince(index) {
    const notifications = this.configurationForm.get('notifications') as FormArray;
    const formGroup = notifications.controls[index] as FormGroup;
    return formGroup.value.province ? formGroup.value.province.name : 'Todos';
  }

  handleSelected(eve: any) {
    const notifications = this.configurationForm.get('notifications') as FormArray;
    for (let index in notifications.value) {
      notifications.controls[index].get('notified').setValue(eve);
    }
    this.configurationForm.updateValueAndValidity();
  }

  compare(val1: any, val2: any) {
    return val1 && val2 ? val1.id === val2.id : val1 === val2;
  }

  save() {
    this.model = Object.assign(this.model, this.configurationForm.value);
    this.user.configuration = this.model;
    this.userService.updateUser(this.user).subscribe(
      () => {
        this.isUserUpdate = true;
      }
    );
  }

}
