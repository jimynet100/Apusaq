import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { LoginComponent } from './login/login.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ModalModule } from 'ngx-bootstrap';
import { LockComponent } from './lock/lock.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    LockComponent
  ],
  declarations: [
    Error404Component,
    Error500Component,
    CaptchaComponent,
    LoginComponent,
    KeyboardComponent,
    LockComponent
  ],
  entryComponents: [
    LockComponent
  ]
})
export class PrincipalModule { }
