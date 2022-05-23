import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { MerchandisingService } from 'src/app/services/merchandising.service';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent implements OnInit {

  formMerchandising: FormGroup;

  constructor(private contactsService: ContactsService,
  private merchandisingService: MerchandisingService) {
    this.formMerchandising = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }

  async sendEmail() {
    const response = await this.merchandisingService.sendEmail(this.formMerchandising.value)
    alert('Your email was sent')
    this.formMerchandising.reset()
  }

      //* Validators
  // Required
  checkControl(controlName: string, errorName: string) {
    if (this.formMerchandising.get(controlName)?.hasError(errorName) && this.formMerchandising.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }
}
