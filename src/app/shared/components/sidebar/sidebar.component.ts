import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { SettingsService } from '../../services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/store.interface';
import { Observable } from 'rxjs';
import { selectorUser } from '../../state/user/selectors/user.selectors';
import { LogoutAuth } from '../../state/auth/actions/auth.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    public color: string;
    public menuItems: object;
    public activeFontColor: string;
    public normalFontColor: string;
    public dividerBgColor: string;
    user$: Observable<any>;
    constructor(
        public settingsService: SettingsService,
        private router: Router,
        private store: Store<AppStore>,
        private activatedRoute: ActivatedRoute
    ) {
        this.user$ = this.store.select(selectorUser);
        this.menuItems = ROUTES;
        this.activeFontColor = 'rgba(0,0,0,.6)';
        this.normalFontColor = 'rgba(255,255,255,.8)';
        this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
    }

    ngOnInit() {
        this.color = this.settingsService.getSidebarFilter();
        this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
            this.color = filter;
            if (filter === '#fff') {
                this.activeFontColor = 'rgba(0,0,0,.6)';
            } else {
                this.activeFontColor = 'rgba(255,255,255,.8)';
            }
        });
        this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
            if (color === '#fff') {
                this.normalFontColor = 'rgba(0,0,0,.6)';
                this.dividerBgColor = 'rgba(0,0,0,.1)';
            } else {
                this.normalFontColor = 'rgba(255,255,255,.8)';
                this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
            }
        });
    }
    ngOnDestroy() {
        this.settingsService.sidebarFilterUpdate.unsubscribe();
        this.settingsService.sidebarColorUpdate.unsubscribe();
    }

    ngAfterViewInit() {
    }

    logout() {
        this.store.dispatch(new LogoutAuth());
    }
}