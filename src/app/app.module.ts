import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './views/dashboard/dashboard.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    BrowserAnimationsModule,
    DashboardModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
