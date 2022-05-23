import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.interface';
import { WorkingGroup } from 'src/app/interfaces/working-group';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  memberList: Profile[] = [];

  constructor() { }

  ngOnInit(): void {

    

  }

}
