import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import * as fromAuth from '../../store/reducers/auth.reducer';
import { AuthEffects } from '../../store/effects/auth.effects';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  declarations: [LoginComponent, AuthLinksComponent, LoginModalComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [AuthLinksComponent],
})
export class AuthModule {}
