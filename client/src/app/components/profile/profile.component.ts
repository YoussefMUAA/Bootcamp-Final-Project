import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfilesService } from 'src/app/services/profiles.service';
import jwt_decode from 'jwt-decode';
import { WorkingGroup } from 'src/app/interfaces/working-group';
import { WorkingGroupService } from 'src/app/services/working-group.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myProfile: Profile | any;
  myWorkingGroup: WorkingGroup | any;
  payload: any;
  workingNames: string;
  allWorkignGroup: WorkingGroup | any;
  rutaImg: string;

  constructor(private activateRoute: ActivatedRoute,
    private profilesService: ProfilesService,
    private workingGroupService: WorkingGroupService,
    public router: Router) {
    // Img
    this.rutaImg = this.rutaImg = 'http://localhost:3000/images/';
    
    // paiload
    this.payload = jwt_decode(localStorage.getItem('token')!) as any;

    this.workingNames = ' ';
  }
  
  async ngOnInit() {   
    // all working groups
    this.allWorkignGroup = await this.workingGroupService.getAll();
    
    // * Datos del perfil
    // capturar ruta activa por cada perfil
    this.activateRoute.params.subscribe(async params => {
      const id = parseInt(params['idprofile']);

      if (params['idprofile']){
        this.myProfile = await this.profilesService.getById(id);
      } else {
        // my profile
        this.myProfile = await this.profilesService.myProfile();
      }
    })
    
    // Workings groups en cada perfil
    this.workingGroupNames()
  }
  
  // Working Names
  workingGroupNames() {
    //* working group
    this.activateRoute.params.subscribe(async params => {
      const id = parseInt(params['idprofile']);
      
      if (params['idprofile']) {
        // Lista de working groups por ruta ID
        this.myWorkingGroup = await this.workingGroupService.getById(id);
  
        let nresponse = this.myWorkingGroup;
        let response = [];
        // recorremos el array y seleccionamos el nombre de los working groups del usuario
        for (let i in nresponse)
          response.push(nresponse[i].working_group_name)
  
          // conseguimos sus working groups
        this.workingNames = response.join('\n')
        if (this.workingNames === '') {
          this.workingNames = 'Working group is not asigned';
        }
        
      } else {
        this.myWorkingGroup = await this.workingGroupService.getMyGW();
        let nresponse = this.myWorkingGroup;
        let response = [];
        // recorremos el array y seleccionamos el nombre de los working groups del usuario
        for (let i in nresponse)
          response.push(nresponse[i].working_group_name)
  
          // conseguimos sus working groups
        this.workingNames = response.join('\n')
        if (this.workingNames === '') {
          this.workingNames = 'Working group is not asigned';
        }
      }
    })
  }

  // refrescar perfil
  onRefreshProfile() {
    this.activateRoute.params.subscribe(async params => {
      let id = parseInt(params['idprofile']);

      if (params['idprofile']){
        this.myProfile = await this.profilesService.getById(id);
        this.myWorkingGroup = await this.workingGroupService.getById(id);
      } else {
        this.myProfile = await this.profilesService.myProfile();
      }
    })
  }

  // Refresh WG
  onRefreshWG() {
    this.workingGroupNames()
  }
  
  // cerrar sesión
  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

}
