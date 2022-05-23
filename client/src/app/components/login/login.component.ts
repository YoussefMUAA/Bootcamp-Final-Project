import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private profilesService: ProfilesService,
  private router: Router) { }

  ngOnInit(): void {
    
  }

  getDataLogin(pForm: any) {
    this.profilesService.login(pForm.value).subscribe(response => {
      if (response.error) {
        alert(response.error)
      } else {
        localStorage.setItem('token', response.token)
        this.router.navigate(['/profile'])
      }
    })
  }

}
