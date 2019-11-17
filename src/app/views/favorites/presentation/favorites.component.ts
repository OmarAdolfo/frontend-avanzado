import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Configuration, NotificationProvince, User } from 'src/app/shared/models/user.model';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { LanguageNameService } from 'src/app/shared/services/language-name.service';
import { LanguageName } from 'src/app/shared/models/language.model';
import { ProvinceService } from 'src/app/shared/services/province.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  @Input() user: User;
  @Input() configuration: Configuration;

  @Output() updateUser = new EventEmitter();

  configurationForm: FormGroup;
  languageNames: LanguageName[];
  public checks: Array<NotificationProvince> = [];

  constructor(
    private fb: FormBuilder,
    private languageNameService: LanguageNameService,
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.getLanguageNames();
    this.buildForm();
  }

  /* Obtiene los idiomas */
  getLanguageNames() {
    this.languageNameService.getLanguageNames().subscribe(
      languageNames => {
        this.languageNames = languageNames;
      }
    )
  }

  /* Construye el formulario de configuración */
  buildForm() {
    this.configurationForm = this.fb.group({
      languageName: new FormControl(this.configuration.languageName),
      notifications: this.fb.array([])
    });
    //this.getProvinces();
  }

  /* Obtiene las provincias */
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

  /* Obtiene el nombre de la provincia */
  getNameProvince(index) {
    const notifications = this.configurationForm.get('notifications') as FormArray;
    const formGroup = notifications.controls[index] as FormGroup;
    return formGroup.value.province ? formGroup.value.province.name : 'Todos';
  }

  /* Se marca o desmarca todos los checkbox */
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

  /* Guarda la información de configuración */
  save() {
    const configuration = {...this.configurationForm.value};
    const user = {...this.user, configuration};
    this.updateUser.emit(user);
  }

}
