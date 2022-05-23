import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { WorkingGroup } from 'src/app/interfaces/working-group';
import { ProfilesService } from 'src/app/services/profiles.service';
import { WorkingGroupService } from 'src/app/services/working-group.service';

@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.css']
})
export class EditGroupsComponent implements OnInit {

  editMyWGForm: FormGroup;
  @Input() myWorkingGroups: WorkingGroup | any;
  @Input() myProfile: Profile | any;
  @Output() onRefreshWG: EventEmitter<boolean>
  @Input() workingNames: WorkingGroup | any;

  constructor(private workingGroupsService: WorkingGroupService, private activateRoute: ActivatedRoute) {
    
    this.onRefreshWG = new EventEmitter();
    
    this.editMyWGForm = new FormGroup({
      working_groups: new FormArray([
        new FormControl(null)
      ])
    })
  }
  ngOnInit() {

  }

  onCheckbox($event: any) {
    const arrWorkingsGroups: FormArray = this.editMyWGForm.get('working_groups') as FormArray;
    if ($event.target.checked) {
      arrWorkingsGroups.push(new FormControl($event.target.value));
      // añadir WG
      this.activateRoute.params.subscribe(params => {
        if (params['idprofile']) {
          const id = parseInt(params['idprofile']);
          this.workingGroupsService.addMyWG($event.target.value, id).subscribe(response => {
          })
        } else {
          const id = this.myProfile.id_user;
          this.workingGroupsService.addMyWG($event.target.value, id).subscribe(response => {
          })
        }
      })
    } else {
      arrWorkingsGroups.push(new FormControl($event.target.value));
        this.activateRoute.params.subscribe(params => {
        if (params['idprofile']) {
          const id = parseInt(params['idprofile']);
          this.workingGroupsService.deleteMyWG($event.target.value, id).subscribe(response => {
          });
        } else {
          const id = this.myProfile.id_user;
          this.workingGroupsService.deleteMyWG($event.target.value, id).subscribe(response => {
          });
        }
      })

    }
  }

  // Refresh
  async editMyWG() {
    this.onRefreshWG.emit(true);
  }

  checkWorkingGroup(pName: string) {
    return this.workingNames.includes(pName)
  }
}
