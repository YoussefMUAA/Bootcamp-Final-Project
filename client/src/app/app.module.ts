import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MembersComponent } from './components/members/members.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { ContactCardComponent } from './components/contacts/contact-card/contact-card.component';
import { DocumentCardComponent } from './components/documents/document-card/document-card.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { EventsComponent } from './components/calendar/events/events.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarViewComponent } from './components/calendar/calendar-view/calendar-view.component';
import { EditGroupsComponent } from './components/profile/edit-groups/edit-groups.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// Pipes
import { FilterPipe } from './pipes/filter-contacts.pipe';
import { FilterDocumentsPipe } from './pipes/filter-documents.pipe';
import { FilterMembersPipe } from './pipes/filter-members.pipe';
import { SafePipe } from './pipes/SafePipe.pipe';
// Directive
import { AdminDirective } from './directives/admin.directive';
// Exportaciones Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PasswordComponent } from './components/profile/password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    MembersComponent,
    ContactsComponent,
    DocumentsComponent,
    CalendarComponent,
    MerchandisingComponent,
    MemberListComponent,
    MemberCardComponent,
    ContactCardComponent,
    DocumentCardComponent,
    FilterPipe,
    FilterDocumentsPipe,
    FilterMembersPipe,
    SafePipe,
    ProfileEditComponent,
    AdminDirective,
    CalendarViewComponent,
    EventsComponent,
    EditGroupsComponent,
    NotFoundComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
