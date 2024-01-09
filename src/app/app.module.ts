import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { AdminAccessGuard } from './guards/admin-access.guard';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from './http/http.module';
import { LoaderComponent } from './modules/shared/loader/loader.component';

const lang = "en-US";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule.forRoot(),
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoaderComponent

  ],
  providers: [
    AuthGuard,
    AdminAccessGuard,
    { provide: LOCALE_ID, useValue: lang },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}
