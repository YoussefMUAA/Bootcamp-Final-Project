import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "/profile" },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  { path: "members", component: MembersComponent, canActivate: [LoginGuard] },
  { path: "members/:idprofile", component: ProfileComponent, canActivate: [LoginGuard] },
  { path: "contacts", component: ContactsComponent, canActivate: [LoginGuard] },
  { path: "documents", component: DocumentsComponent, canActivate: [LoginGuard] },
  { path: "calendar", component: CalendarComponent, canActivate: [LoginGuard] },
  { path: "merchandising", component: MerchandisingComponent, canActivate: [LoginGuard] },
  { path: "**", component: NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
