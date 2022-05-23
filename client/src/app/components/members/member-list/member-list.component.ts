import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/interfaces/profile.interface';
import { WorkingGroup } from 'src/app/interfaces/working-group';
import { ProfilesService } from 'src/app/services/profiles.service';
import { WorkingGroupService } from 'src/app/services/working-group.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  

  @Input() members: Profile[] = [];
  @Input() myWorkingGroups: WorkingGroup | any;
  formNewMember: FormGroup;
  formNewWorkingGroup: FormGroup;
  btn_wg: boolean = true;
  idWorkingGroup: any;
  files: any;
  imgDefault: any;
  
  constructor(private workingGroupService: WorkingGroupService,
    private profilesService: ProfilesService,
  ) {
    //* Form New Member
    this.formNewMember = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('',[]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/\S+\@\S+\.\S+/)
      ]),
      phone_number: new FormControl('',[]),
      img_avatar: new FormControl('',[]),
      working_groups: new FormArray([
        new FormControl(null)
      ]),
      address: new FormControl('',[]),
      location: new FormControl('',[]),
      is_admin: new FormControl('0',[]),
      rs_instagram: new FormControl('',[]),
      rs_linkedin: new FormControl('',[]),
      rs_facebook: new FormControl('',[]),
      rs_twitter: new FormControl('',[]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repeatpass: new FormControl('', [
        Validators.required
      ]),
    }, [this.passCompare]);

    // * Form Working Goup
    this.formNewWorkingGroup = new FormGroup({
      working_group_name: new FormControl('', [
        Validators.required
      ])
    });
  }
  
  // Filter
  filterMembers = '';
  
  
  ngOnInit(): void {
    this.profilesService.getAll()
    .then(members => this.members = members)
    .catch(error => console.log(error));
    
    
    this.workingGroupService.getAll()
    .then(myWorkingGroups => this.myWorkingGroups = myWorkingGroups)
    .catch(error => console.log(error));
    
  }
  
  // Btn EDIT / CREATE
  async btnChange(pId: number) {
    this.btn_wg = false;
    this.idWorkingGroup = pId;
    let id = this.idWorkingGroup;
      const updateWG = await this.workingGroupService.getByIdWG(id)
      this.formNewWorkingGroup = new FormGroup({
        working_group_name: new FormControl(updateWG?.working_group_name, [
        Validators.required
      ])
      
      });
  }

  btnAdd() {
    this.btn_wg = true;
  }

  //* Create Working Group
  async registerGroup(pFormWorking: any) {
    if (this.btn_wg === true) {
      const response = await this.workingGroupService.createWG(this.formNewWorkingGroup.value)
      if (response.id_working_group) {
        alert('Working Group registered successfully')
        this.myWorkingGroups = await this.workingGroupService.getAll();
      } else {
        alert('Working Group registration failed')
      }
    } else {
      let id = this.idWorkingGroup;
      const response = await this.workingGroupService.editWG(this.formNewWorkingGroup.value, id)
        if (response[0].changedRows) {
          alert('Working Group edited successfully')
          this.myWorkingGroups = await this.workingGroupService.getAll();
          this.members = await this.profilesService.getAll();
      } else {
        alert('Working Group edition failed')
      }
    }
  }


  // Delete Working Group
  async deleteWorkingGroup(pId: number) {
    const alert = confirm('Are you sure you want to delete this working group?')
    if (alert) {
      const response = await this.workingGroupService.deleteWorkingGroup(pId);
      this.myWorkingGroups = await this.workingGroupService.getAll();
      this.members = await this.profilesService.getAll();
    }
  }
  
  // filter working group
  async group($event: any) {
    if ($event.target.value !== "") {
      let id = $event.target.value;
      let members = await this.workingGroupService.getByUser(id);
      this.members = members;
    } else {
      this.members = await this.profilesService.getAll();
    }
  }

  //* Add Working Group User
  onCheckbox($event: any) {
    const arrWorkingsGroups: FormArray = this.formNewMember.get('working_groups') as FormArray;
    if ($event.target.checked) {
      arrWorkingsGroups.push(new FormControl($event.target.value));
    } else {
      let i = 0;
      arrWorkingsGroups.controls.forEach((item: any) => {
        if (item.value == $event.target.value) {
          arrWorkingsGroups.removeAt(i);
          return
        }
        i++
      });
    }
  }

  //* add Member
  onSubmit() {
    let fd = new FormData();
    fd.append('name', this.formNewMember.value.name);
    fd.append('surname', this.formNewMember.value.surname);
    fd.append('email', this.formNewMember.value.email);
    fd.append('phone_number', this.formNewMember.value.phone_number);
    fd.append('address', this.formNewMember.value.address);
    fd.append('location', this.formNewMember.value.location);
    fd.append('is_admin', this.formNewMember.value.is_admin);
    fd.append('rs_instagram', this.formNewMember.value.rs_instagram);
    fd.append('rs_linkedin', this.formNewMember.value.rs_linkedin);
    fd.append('rs_facebook', this.formNewMember.value.rs_facebook);
    fd.append('rs_twitter', this.formNewMember.value.rs_twitter);
    fd.append('password', this.formNewMember.value.password);
    fd.append('working_groups', this.formNewMember.value.working_groups);
    if (this.files == null) {
      this.files = '';
    } else {
      fd.append('img_avatar', this.files[0]);
    }

    // registro
    this.profilesService.createUser(fd).subscribe(response => {
      if (response.id_user) {
        // Añadir workings groups
        const groups = this.formNewMember.value.working_groups;
        for (let group of groups) {
          if (group !== null) {
            this.workingGroupService.addMyWG(group, response.id_user).subscribe(response => {
            })
          }
        }                
        alert('User registered successfully')
        this.formNewMember.reset()
          //redirigir a la lista de usuarios
        this.profilesService.getAll()
          .then(members => this.members = members)
          .catch(error => console.log(error));
      } else {
        alert('User registration failed')
      }
    })
  }
  
  // Documents event
  onChange($event: any) {
    this.files = $event.target.files;
  }
  
  //* Validators
  // Required
  checkControl(controlName: string, errorName: string) {
    if (this.formNewMember.get(controlName)?.hasError(errorName) && this.formNewMember.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  //* passCompare
  passCompare(form: AbstractControl) {
    const passValue = form.get('password')?.value;
    const repeatpassValue = form.get('repeatpass')?.value;

    if (passValue === repeatpassValue) {
      return null
    } else {
      return { passcompare: true }
    }
  }

  //* touched reset pass
  touchedReset(resetPass: string) {
    if (this.formNewMember.get(resetPass)?.touched) {
      return true
    } else {
      return false
    }
  }

}

