import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LogIn } from 'src/app/shared/state/auth/actions/auth.actions';
import { AppStore } from 'src/app/shared/state/store.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  environmentName = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppStore>,
  ) {
    this.environmentName = environment.environmentName;
  }

  ngOnInit() {
    this.buildForm();
  }

  /* Construye el formulario de login */
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  /* Realiza el proceso de login mediante email y contraseña */
  login() {
    this.store.dispatch(new LogIn({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }));
  }

}
