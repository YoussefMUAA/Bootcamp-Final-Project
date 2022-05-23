import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.interface';
import { WorkingGroup } from 'src/app/interfaces/working-group';
import { WorkingGroupService } from 'src/app/services/working-group.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() myProfile: Profile | any;
  @Input() myWorkingGroup: WorkingGroup | any;
  arrWorking: [] | any;
  workingNames: string;
  rutaImg: string;

  constructor(private workingGroupService: WorkingGroupService) {
    this.workingNames = ' ';
    this.rutaImg = 'http://localhost:3000/images/'
  }

  async ngOnInit(): Promise<any> {
    this.myWorkingGroup = await this.workingGroupService.getById(this.myProfile.id_user);

        let nresponse = this.myWorkingGroup;
        let response = [];
        // recorremos el array y seleccionamos el nombre de los working groups del usuario
        for (let i in nresponse)
          response.push(nresponse[i].working_group_name)
          this.workingNames = response.join('\n')

  }
}
