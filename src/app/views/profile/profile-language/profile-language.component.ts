import { Component, OnInit } from '@angular/core';
import { Language, LanguageLevel, LanguageName } from 'src/app/shared/models/language.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { LanguageLevelService } from 'src/app/shared/services/language-level.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NoWhitespaceValidator } from 'src/app/shared/validators/noWhitespace.validator';

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
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    if (!this.model) {
      this.model = {
        uid: -1,
        level: null,
        name: null,
        date: ''
      };
    }
    this.getLanguageLevels();
    this.getLanguages();
    this.buildForm();
  }

  getLanguageLevels() {
    this.languageLevelService.getLanguageLevels().subscribe(
      languageLevels => {
        this.languageLevels = languageLevels;
      }
    )
  }

  getLanguages() {
    this.languageService.getLanguages().subscribe(
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
      otherLanguage: new FormControl('', [Validators.minLength(3), Validators.maxLength(255), NoWhitespaceValidator])
    });
  }

  compare(val1: any, val2: any) {
    return val1 && val2 ? val1.id === val2.id : val1 === val2;
  }

  compareUid(val1: any, val2: any) {
    return val1 && val2 ? val1.uid === val2.uid : val1 === val2;
  }

  saveOtherLanguage() {
    this.languageService.addLanguage({ id: -1, name: this.languageForm.get('otherLanguage').value }).subscribe(
      language => {
        this.model.name = language;
        console.log(this.model);
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
    }
  }

}
