import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact.interface';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];
  formContact: FormGroup;


  constructor(private contactsService: ContactsService) {
    this.formContact = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      organization: new FormControl('', []),
      email: new FormControl('', [
        Validators.required
      ])
    })
  }

  filterContacts = '';

  async ngOnInit(): Promise<void> {
    this.contacts = await this.contactsService.getAll();
  }

  registerContact() {
    this.contactsService.createContact(this.formContact.value).subscribe(response => {
    if (response.id_contact) {
      alert('Contact registered successfully')
      this.formContact.reset()
      this.contactsService.getAll()
      .then(contacts => this.contacts = contacts)
      .catch (error => console.log(error));
    } else {
      alert('Contact registration failed')
      }
    })
  }

  async onRefreshContacts() {
    this.contacts = await this.contactsService.getAll();
  }

  //* Validators
  // Required
  checkControl(controlName: string, errorName: string) {
    if (this.formContact.get(controlName)?.hasError(errorName) && this.formContact.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }
}
