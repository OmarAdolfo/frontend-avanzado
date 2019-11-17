import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Language, LanguageLevel, LanguageName } from 'src/app/shared/models/language.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { LanguageLevelService } from 'src/app/shared/services/language-level.service';
import { LanguageNameService } from 'src/app/shared/services/language-name.service';
import { NoWhitespaceStartAndEndValidator } from 'src/app/shared/validators/noWhitespace.validator';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Student } from 'src/app/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {

  @Input() user: Student;
  @Input() language: Language;

  @Output() updateUser = new EventEmitter();

  languageForm: FormGroup;

  languageLevels: LanguageLevel[];

  languages: LanguageName[];

  constructor(
    private fb: FormBuilder,
    private languageLevelService: LanguageLevelService,
    private languageNameService: LanguageNameService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      this.language = this.user.languages.find(studie => studie.id == id);
    } else {
      this.language = {
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
      date: new FormControl(this.language.date, DateValidator),
      level: new FormControl(this.language.level),
      languageName: new FormControl(this.language.name),
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
  saveOtherLanguage(language: Language) {
    this.languageNameService.addLanguageName({ id: -1, name: this.languageForm.get('otherLanguage').value }).subscribe(
      languageName => {
        language.name = languageName;
        this.saveLanguage(language);
      }
    )
  }

  /* Guardar idioma del estudiante */
  saveLanguage(language: Language) {
    this.languageService.saveLanguage(language).subscribe(
      languageSave => {
        let languages = [...this.user.languages];
        let index = languages.findIndex(({ id }) => id === languageSave.id);
        if (index === -1) {
          languages.push(languageSave);
        } else {
          languages[index] = languageSave;
        }
        const user: Student = {...this.user, languages};
        this.updateUser.emit(user);
      }
    )
  }

  /* Comienza el proceso de guardar cuando el usuario pulsa sobre el botón Guardar */
  save() {
    const language = {...this.language}
    language.date = this.languageForm.get('date').value;
    language.level = this.languageForm.get('level').value;
    if (this.languageForm.get('languageName').value.name === 'Otro') {
      this.saveOtherLanguage(language);
    } else {
      language.name = this.languageForm.get('languageName').value;
      this.saveLanguage(language);
    }
  }

  back() {
    this.location.back();
  }

}
