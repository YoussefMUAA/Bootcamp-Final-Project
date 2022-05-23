import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @Output() refreshProfile: EventEmitter<boolean>
  @Input() myProfile: Profile | any;
  editMemberForm: FormGroup;
  files: any;


  constructor(private profilesService: ProfilesService,
    private router: Router) { 
    
    this.refreshProfile = new EventEmitter();

    this.editMemberForm = new FormGroup({
      id_user: new FormControl('',[]),
      name: new FormControl('',[]),
      surname: new FormControl('',[]),
      email: new FormControl('', []),
      phone_number: new FormControl('',[]),
      address: new FormControl('',[]),
      location: new FormControl('',[]),
      is_admin: new FormControl('0',[]),
      rs_instagram: new FormControl('',[]),
      rs_linkedin: new FormControl('',[]),
      rs_facebook: new FormControl('',[]),
      rs_twitter: new FormControl('',[]),
    }, []);
    
  }

  async ngOnInit(){
    
    let id = this.myProfile.id_user
    const updateProfile = await this.profilesService.getById(id)
    this.editMemberForm = new FormGroup({
          id_user: new FormControl(updateProfile?.id_user,[]),
          name: new FormControl(updateProfile?.name, []),
          surname: new FormControl(updateProfile?.surname),
          email: new FormControl(updateProfile?.email, []),
          phone_number: new FormControl(updateProfile?.phone_number),
          address: new FormControl(updateProfile?.address),
          location: new FormControl(updateProfile?.location),
          is_admin: new FormControl(updateProfile?.is_admin),
          rs_instagram: new FormControl(updateProfile?.rs_instagram),
          rs_linkedin: new FormControl(updateProfile?.rs_linkedin),
          rs_facebook: new FormControl(updateProfile?.rs_facebook),
          rs_twitter: new FormControl(updateProfile?.rs_twitter),
          })
  }

  // CheckControl
    checkControl(controlName: string, errorName: string) {
    if (this.editMemberForm.get(controlName)?.hasError(errorName) && this.editMemberForm.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }
    
  async editMember() {
    // img
    let fd = new FormData();
    fd.append('id_user', this.editMemberForm.value.id_user);
    fd.append('name', this.editMemberForm.value.name);
    fd.append('surname', this.editMemberForm.value.surname);
    fd.append('email', this.editMemberForm.value.email);
    fd.append('phone_number', this.editMemberForm.value.phone_number);
    fd.append('address', this.editMemberForm.value.address);
    fd.append('location', this.editMemberForm.value.location);
    fd.append('is_admin', this.editMemberForm.value.is_admin);
    fd.append('rs_instagram', this.editMemberForm.value.rs_instagram);
    fd.append('rs_linkedin', this.editMemberForm.value.rs_linkedin);
    fd.append('rs_facebook', this.editMemberForm.value.rs_facebook);
    fd.append('rs_twitter', this.editMemberForm.value.rs_twitter);
    if (this.files == null) {
      const response = await this.profilesService.editUserData(this.editMemberForm.value, this.editMemberForm.value.id_user)
      this.refreshProfile.emit(true);
      if (response[0].affectedRows) {
      alert('Data updated correctly')
      } else {
      alert('Changes could not be saved')
      }
    } else {
      fd.append('img_avatar', this.files[0]);
      const response = await this.profilesService.editUser(fd, this.editMemberForm.value.id_user)
      this.refreshProfile.emit(true);
      if (response[0].affectedRows) {
        alert('Data updated correctly')
      } else {
        alert('Changes could not be saved')
      }
    }
    

  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  async deleteProfile(pId: number) {
    const alert = confirm('Are you sure you want to delete this user?')
    if (alert) {
      const response = await this.profilesService.deleteUser(pId);
      this.router.navigate(['/members']);
      this.refreshProfile.emit(true);
    }
  }
}
