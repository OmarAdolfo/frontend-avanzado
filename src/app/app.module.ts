import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { rootRouterConfig } from './app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { preloadingStrategy: PreloadAllModules, useHash: false }),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
