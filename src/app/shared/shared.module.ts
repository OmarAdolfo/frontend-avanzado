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
import { UserService } from './services/user.service';
import { MunicipeService } from './services/municipe.service'
import { ProvinceService } from './services/province.service';
import { StudyService } from './services/study.service';
import { InstitutionService } from './services/institution.service';
import { GradeService } from './services/grade.service';
import { TitleService } from './services/title.service';
import { LanguageLevelService } from './services/language-level.service';
import { LanguageNameService } from './services/language-name.service';
import { LanguageService } from './services/language.service';
import { OfferService } from './services/offer.service';
import { ExperienceService } from './services/experience.service';
import { MaterialModule } from './material.module';
import { SettingsService } from './services/settings.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RootComponent } from './components/root/root.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontSizeDirective } from './directives/fontsize.directive';

const classesToInclude = [HeaderComponent, SidebarComponent, RootComponent, NavbarComponent, FontSizeDirective];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  declarations: classesToInclude,
  exports: [
    ...classesToInclude,
    ReactiveFormsModule,
    MaterialModule
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
        LanguageNameService,
        LanguageService,
        OfferService,
        ExperienceService,
        SettingsService
      ]
    };
  }
}
