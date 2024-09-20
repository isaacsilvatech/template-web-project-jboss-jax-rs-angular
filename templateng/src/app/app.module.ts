import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpAuthInterceptor } from './core/http/http-auth.interceptor';
import { HttpDestroyerInterceptor } from './core/http/http-destroyer.interceptor';
import { HttpErrorMessageInterceptor } from './core/http/http-error-message.interceptor';
import { HttpLoadingInterceptor } from './core/http/http-loading.interceptor';
import { ACCESS_TOKEN_STORAGE_KEY } from './core/service/auth.service';
import { DialogModule } from './shared/components/dialog/dialog.module';
import { LoadingModule } from './shared/template/loading/loading.module';
import { NavModule } from './shared/template/nav/nav.module';
import { HttpBodyInterceptor } from './core/http/http-body.interceptor';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
      }
    }),
    NavModule,
    LoadingModule,
    DialogModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL', },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpDestroyerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorMessageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpBodyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
