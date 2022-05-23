import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  editPassword: FormGroup;
  @Input() myProfile: Profile[] | any;

  constructor(private profilesService: ProfilesService,
  private activateRoute: ActivatedRoute) {
    this.editPassword = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repeatpass: new FormControl('', [
        Validators.required
      ]),
    }, [this.passCompare])
  }

  ngOnInit(): void {
  }

  passCompare(form: AbstractControl) {
    const passValue = form.get('password')?.value;
    const repeatpassValue = form.get('repeatpass')?.value;

    if (passValue === repeatpassValue) {
      return null
    } else {
      return { passcompare: true }
    }
  }

    //* Validators
  // Required
  checkControl(controlName: string, errorName: string) {
    if (this.editPassword.get(controlName)?.hasError(errorName) && this.editPassword.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  //* touched reset pass
  touchedReset(resetPass: string) {
    if (this.editPassword.get(resetPass)?.touched) {
      return true
    } else {
      return false
    }
  }

  editMyPassword() {
    this.activateRoute.params.subscribe(params => {
      if (params['idprofile']) {
        const id = parseInt(params['idprofile']);
        this.profilesService.resetPassword(this.editPassword.value, id).subscribe(response => {
          if (response[0].changedRows) {
            alert('Your password has been changed successfully')
          } else {
            alert('Password could not be changed successfully')
          }
          
        });
      } else {
        const id = this.myProfile.id_user;
        this.profilesService.resetPassword(this.editPassword.value, id).subscribe(response => {
          if (response[0].changedRows) {
            alert('Your password has been changed successfully')
          } else {
            alert('Password could not be changed successfully')
          }
        })
      }
    })
  }
}
