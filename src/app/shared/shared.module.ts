import { NgModule } from '@angular/core';
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

const classesToInclude = [AppComfirmComponent, HeaderComponent];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],

  providers: [AppConfirmService, UserService],
  entryComponents: [AppComfirmComponent],
  declarations: classesToInclude,
  exports: [
    ...classesToInclude,
    ReactiveFormsModule
  ]

})
export class SharedModule { }
