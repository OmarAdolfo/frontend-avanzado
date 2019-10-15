import { Component, OnInit } from '@angular/core';
import { Language, LanguageLevel, LanguageName } from 'src/app/shared/models/language.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { LanguageLevelService } from 'src/app/shared/services/language-level.service';
import { LanguageNameService } from 'src/app/shared/services/language-name.service';
import { NoWhitespaceValidator } from 'src/app/shared/validators/noWhitespace.validator';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { LanguageService } from 'src/app/shared/services/language.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {

  selectUndefinedOptionValue: any;

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
      this.model = this.userService.getUserLoggedIn().languages.find(studie => studie.id == id);
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

  getLanguageLevels() {
    this.languageLevelService.getLanguageLevels().subscribe(
      languageLevels => {
        this.languageLevels = languageLevels;
      }
    )
  }

  getLanguageNames() {
    this.languageNameService.getLanguageNames().subscribe(
      languages => {
        this.languages = languages;
        this.languages.push({ id: -1, name: 'Otro' });
      }
    )
  }

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
            this.languageForm.get('otherLanguage').setValidators([Validators.minLength(3), Validators.maxLength(255), NoWhitespaceValidator]);
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

  saveOtherLanguage() {
    this.languageNameService.addLanguageName({ id: -1, name: this.languageForm.get('otherLanguage').value }).subscribe(
      language => {
        this.model.name = language;
        this.saveLanguage();
      }
    )
  }

  saveLanguage() {
    this.languageService.saveLanguage(this.model).subscribe(
      language => {
        const user = this.userService.getUserLoggedIn();
        let index = user.languages.findIndex(({ id }) => id === language.id);
        if (index === -1) {
          user.languages.push(language);
        } else {
          user.languages[index] = language;
        }
        this.updateUser(user);
      }
    )
  }

  updateUser(user: User) {
    this.userService.saveUser(user).subscribe(
      () => {
        this.location.back();
      }
    )
  }

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

}
