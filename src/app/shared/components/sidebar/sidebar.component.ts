import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/store.interface';
import { Observable } from 'rxjs';
import { selectorUser } from '../../state/user/selectors/user.selectors';
import { LogoutAuth } from '../../state/auth/actions/auth.actions';
import { ROUTES_STUDENT, ROUTES_COMPANY } from '../../config/routes.config';

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
        private store: Store<AppStore>,
    ) {
        this.user$ = this.store.select(selectorUser);
        this.activeFontColor = 'black';
        this.normalFontColor = 'rgba(255,255,255,.8)';
        this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
    }

    ngOnInit() {
        this.color = this.settingsService.getSidebarFilter();
        this.store.select(selectorUser).subscribe(
            user => {
                if (user) {
                    if (user.roles.find(rol => rol === 'student')) {
                        this.menuItems = ROUTES_STUDENT;
                    } else {
                        this.menuItems = ROUTES_COMPANY;
                    }
                }
            }
        );
        this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
            this.color = filter;
            if (filter === '#fff') {
                this.activeFontColor = 'black';
            } else {
                this.activeFontColor = 'rgba(255,255,255,.8)';
            }
        });
        this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
            if (color === '#fff') {
                this.normalFontColor = 'black';
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