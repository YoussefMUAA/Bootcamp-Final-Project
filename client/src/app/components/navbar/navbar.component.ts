import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  YourName: string | any;
  logged: any;

  constructor(private profilesService: ProfilesService) {
    
  }
  
  ngOnChanges() {
  }
  
  async ngOnInit() {
    this.logged = await this.profilesService.myProfile()
    this.YourName = this.logged.name + ' ' + this.logged.surname;
  }
  
  ngDoCheck(): void {
    this.isLogin = (localStorage.getItem('token') !== null) ? true : false
  }
  
}

