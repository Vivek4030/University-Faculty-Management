import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** MatImportsModule is a custom module created using CLI and contain imports of every 
 *  required Material Module */
import { MatImportsModule } from './mat-imports/mat-imports.module';

import { AppComponent } from './app.component';
import { FacultyMembersComponent } from './pages/books/facultyMembers.component';
import { MemberComponent } from './pages/books/member/member.component';
import { HeaderComponent } from './commons/header/header.component'
import { NavbarComponent } from './commons/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';

@NgModule({
  declarations: [
    AppComponent,
    FacultyMembersComponent,
    MemberComponent,
    HeaderComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
