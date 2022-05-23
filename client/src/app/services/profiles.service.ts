import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private baseUrl: string; 
  private baseUrlAdmin: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/users/'
    this.baseUrlAdmin = 'http://localhost:3000/api/admins/'
  }

  // login
  login(pForm: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'login', pForm, httpOptions)
  }

  // Return all profiles
  getAll(): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl + '/All'));
  }

  // by Id
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + "profile/" + pId));
  }

  // my profile
  myProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }
    console.log(localStorage.getItem('token'))
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + 'profile', httpOptions));
  }

  // Create User
  createUser(pForm: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return this.httpClient.post<any>(this.baseUrlAdmin + 'register', pForm, httpOptions)
    
  }

  // editar usuario
  editUser(pForm: FormData, pId: number): Promise <any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.put<any>(this.baseUrl + 'profile/update', pForm, httpOptions))
  }

  // Editar usuario sin foto
  editUserData(pForm: any, pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.put<any>(this.baseUrl + pId, pForm, httpOptions))
  }

  // eliminar usuario
  deleteUser(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.delete<any>(this.baseUrlAdmin + '/' + pId, httpOptions))
  }

  // Reset Password
  resetPassword(pForm: any, pId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    const response = this.httpClient.put<any>(this.baseUrl + 'resetPassword/' + pId, pForm, httpOptions)
    return response
  }
}
