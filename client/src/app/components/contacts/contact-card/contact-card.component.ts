import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact.interface';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  @Output() refreshContacts: EventEmitter<boolean>;
  @Input() myContacts: Contact | any;
  editContactForm: FormGroup;

  constructor(private contactsService: ContactsService) {
    this.refreshContacts = new EventEmitter();

    this.editContactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      organization: new FormControl('', []),
      email: new FormControl('', [
        Validators.required
      ])
    })
  }

  async ngOnInit() {
    let id = this.myContacts.id_contact
    const updateContact = await this.contactsService.getById(id)
        this.editContactForm = new FormGroup({
          id_contact: new FormControl(updateContact?.id_contact),
          // ! Probar quitar id
          name: new FormControl(updateContact?.name, []),
          organization: new FormControl(updateContact?.organization),
          email: new FormControl(updateContact?.email, [])
          })
  }


  // edit contact
  async editContact(pId: number) {    
    const response = await this.contactsService.editContact(this.editContactForm.value, pId)
    this.refreshContacts.emit(true);
  }

  //  delete contact
  async deleteContact(pId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      const response = await this.contactsService.deleteContact(pId)
      this.refreshContacts.emit(true);
    }
  }
}
