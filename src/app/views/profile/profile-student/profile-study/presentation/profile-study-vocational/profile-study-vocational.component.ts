import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VocationalStudy, Institution, Category, Grade, TitleStudy } from 'src/app/shared/models/study.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { InstitutionService } from 'src/app/shared/services/institution.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GradeService } from 'src/app/shared/services/grade.service';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
  selector: 'app-profile-study-vocational',
  templateUrl: './profile-study-vocational.component.html',
  styleUrls: ['./profile-study-vocational.component.scss']
})
export class ProfileStudyVocationalComponent implements OnInit {

  @Input()
  model: VocationalStudy = {
    id: -1,
    level: { uid: -1, name: '' },
    title: { uid: -1, name: '' },
    certificate: false,
    date: '',
    bilingue: false,
    institution: { uid: -1, name: '' },
    category: { uid: -1, name: '' },
    grade: { uid: -1, name: '' },
    dual: false
  };

  @Output()
  saveProfileStudy = new EventEmitter();

  institutions: Institution[];

  categories: Category[];

  grades: Grade[];

  titles: TitleStudy[];

  profileStudyVocationalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    private categoryService: CategoryService,
    private gradeService: GradeService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    if (!this.model) {
      this.model = {
        id: -1,
        level: { uid: -1, name: '' },
        title: { uid: -1, name: '' },
        certificate: false,
        date: '',
        bilingue: false,
        institution: { uid: -1, name: '' },
        category: { uid: -1, name: '' },
        grade: { uid: -1, name: '' },
        dual: false
      };
    }
    this.getInstitutions();
    this.getCategories();
    this.getGrades();
    this.getTitles();
    this.buildForm();
  }

  /* Obtienes los centros educativos */
  getInstitutions() {
    this.institutionService.getInstitutions().subscribe(
      institutions => {
        this.institutions = institutions;
      }
    )
  }

  /* Obtiene las familias profesionales */
  getCategories() {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    )
  }

  /* Obtiene los grados */
  getGrades() {
    this.gradeService.getGrades().subscribe(
      grades => {
        this.grades = grades;
      }
    )
  }

  /* Obtiene los títulos */
  getTitles() {
    this.titleService.getTitleStudies().subscribe(
      titles => {
        this.titles = titles;
      }
    )
  }

  /* Construye el formulario de estudios del estudiante */
  buildForm() {
    this.profileStudyVocationalForm = this.fb.group({
      institution: new FormControl(this.model.institution),
      category: new FormControl(this.model.category),
      grade: new FormControl(this.model.grade),
      title: new FormControl(this.model.title),
      date: new FormControl(this.model.date, DateValidator),
      dual: new FormControl(this.model.dual),
      bilingue: new FormControl(this.model.bilingue),
      certificate: new FormControl(this.model.certificate)
    });
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  /* Checkea si se sube un fichero */
  handleFileInput(eve: any) {
    if (eve) {
      this.profileStudyVocationalForm.get('certificate').setValue(true);
    } else {
      this.profileStudyVocationalForm.get('certificate').setValue(false);
    }
  }

  /* Guarda la información relativa a un ciclo formativo */
  save() {
    const vocationalStudy: VocationalStudy = { ...this.model, ...this.profileStudyVocationalForm.value };
    this.saveProfileStudy.emit(vocationalStudy);
  }

}
