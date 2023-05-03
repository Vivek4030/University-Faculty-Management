import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyMembersComponent } from './pages/books/facultyMembers.component';
import { MemberComponent } from './pages/books/member/member.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/services/auth/auth.guard';

const routes: Routes = [
  {
    path: "", component: LandingPageComponent,
  },
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "about", component: AboutUsComponent,
  },
  {
    path: "contact", component: ContactUsComponent,
  },
  {
    path: "members/:type", component: FacultyMembersComponent,
  },
  {
    path: "members/id/:id", component: MemberComponent
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
