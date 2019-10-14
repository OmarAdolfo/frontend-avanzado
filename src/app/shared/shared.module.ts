import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/*
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; */

// COMPONENTS
import { HeaderComponent } from './components/header/header.component';
// DIRECTIVES

// PIPES

// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
import { UserService } from './services/user.service';
import { MunicipeService } from './services/municipe.service'
import { ProvinceService } from './services/province.service';
import { StudyService } from './services/study.service';
import { InstitutionService } from './services/institution.service';
import { GradeService } from './services/grade.service';
import { TitleService } from './services/title.service';
import { LanguageLevelService } from './services/language-level.service';
import { LanguageService } from './services/language.service';

const classesToInclude = [AppComfirmComponent, HeaderComponent];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],

  providers: [AppConfirmService],
  entryComponents: [AppComfirmComponent],
  declarations: classesToInclude,
  exports: [
    ...classesToInclude,
    ReactiveFormsModule
  ]

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UserService, 
        MunicipeService, 
        ProvinceService, 
        StudyService, 
        InstitutionService, 
        GradeService, 
        TitleService, 
        LanguageLevelService, 
        LanguageService
      ]
    };
  }
}
