import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Language, LanguageLevel, LanguageName } from 'src/app/shared/models/language.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { LanguageLevelService } from 'src/app/shared/services/language-level.service';
import { LanguageNameService } from 'src/app/shared/services/language-name.service';
import { NoWhitespaceStartAndEndValidator } from 'src/app/shared/validators/noWhitespace.validator';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { LanguageService } from 'src/app/shared/services/language.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User, Student } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileLanguageComponent implements OnInit {

  model: Language;

  languageForm: FormGroup;

  languageLevels: LanguageLevel[];

  languages: LanguageName[];

  constructor(
    private fb: FormBuilder,
    private languageLevelService: LanguageLevelService,
    private languageNameService: LanguageNameService,
    private languageService: LanguageService,
    private userService: UserService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      //this.model = (this.authService.getUserLoggedIn() as Student).languages.find(studie => studie.id == id);
    } else {
      this.model = {
        id: -1,
        level: null,
        name: null,
        date: ''
      };
    }
    this.getLanguageLevels();
    this.getLanguageNames();
    this.buildForm();
  }

  /* Obtienes los niveles de idiomas */
  getLanguageLevels() {
    this.languageLevelService.getLanguageLevels().subscribe(
      languageLevels => {
        this.languageLevels = languageLevels;
      }
    )
  }

  /* Obtiene los nombre de los idiomas */
  getLanguageNames() {
    this.languageNameService.getLanguageNames().subscribe(
      languages => {
        this.languages = languages;
        this.languages.push({ id: -1, name: 'Otro' });
      }
    )
  }

  /* Construye el formulario de idioma */
  buildForm() {
    this.languageForm = this.fb.group({
      date: new FormControl(this.model.date, DateValidator),
      level: new FormControl(this.model.level),
      languageName: new FormControl(this.model.name),
      otherLanguage: new FormControl('')
    });

    this.languageForm.get('languageName').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          if (data.name === 'Otro') {
            this.languageForm.get('otherLanguage').setValidators([
              Validators.minLength(3), 
              Validators.maxLength(255), 
              NoWhitespaceStartAndEndValidator
            ]);
          } else {
            this.languageForm.get('otherLanguage').clearValidators();
          }
          this.languageForm.get('otherLanguage').updateValueAndValidity();
        }
      )
  }

  compare(val1: any, val2: any) {
    return val1 && val2 ? val1.id === val2.id : val1 === val2;
  }

  compareUid(val1: any, val2: any) {
    return val1 && val2 ? val1.uid === val2.uid : val1 === val2;
  }

  /* Guardar un idioma escrito en el input de Otros */
  saveOtherLanguage() {
    this.languageNameService.addLanguageName({ id: -1, name: this.languageForm.get('otherLanguage').value }).subscribe(
      language => {
        this.model.name = language;
        this.saveLanguage();
      }
    )
  }

  /* Guardar idioma del estudiante */
  saveLanguage() {
    this.languageService.saveLanguage(this.model).subscribe(
      language => {
        /*const user = (this.authService.getUserLoggedIn() as Student);
        let index = user.languages.findIndex(({ id }) => id === language.id);
        if (index === -1) {
          user.languages.push(language);
        } else {
          user.languages[index] = language;
        }
        this.updateUser(user);*/
      }
    )
  }

  /* Actualiza el usuario */
  updateUser(user: User) {
    this.userService.saveUser(user).subscribe(
      () => {
        this.back();
      }
    )
  }

  /* Comienza el proceso de guardar cuando el usuario pulsa sobre el botón Guardar */
  save() {
    this.model.date = this.languageForm.get('date').value;
    this.model.level = this.languageForm.get('level').value;
    if (this.languageForm.get('languageName').value.name === 'Otro') {
      this.saveOtherLanguage();
    } else {
      this.model.name = this.languageForm.get('languageName').value;
      this.saveLanguage();
    }
  }

  back() {
    this.location.back();
  }

}
