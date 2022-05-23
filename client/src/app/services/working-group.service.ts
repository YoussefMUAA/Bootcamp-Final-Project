import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingGroupService {

  private baseUrl: string; 
  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/working-groups'
  }

  getAll(): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  getByIdWG(pId: number): Promise <any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/' + pId));
  } 

  // Workings Group por ID User
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/getGroupByUser/' + pId));
  }

  // My Working Group
  getMyGW() {
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }
    
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/miWG', httpOptions));
  }

  // Nos devuelve los usuarios por working group
  getByUser(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/getUsersByGroup/' + pId));
  }

  // Add WG
  createWG(pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, pForm, httpOptions));
  }

  // Delete WG
  deleteWorkingGroup(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.delete<any>(this.baseUrl + '/' + pId, httpOptions))
  }

  // Editar WG
  editWG(editGW: any, pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(this.httpClient.put<any>(this.baseUrl + "/" + pId, editGW, httpOptions))
  }

  // **********
  // Delete MY WG
  deleteMyWG(pIdWG:number, pIdUser: number ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return this.httpClient.delete<any>(this.baseUrl + '/deleteGroup/' + pIdWG + '/' + pIdUser, httpOptions)
  }

  // Add MY WG
  addMyWG(pIdWG:number, pIdUser: number ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return this.httpClient.post<any>(this.baseUrl + '/unionGroupsAdmin/' + pIdWG + '/' + pIdUser, { }, httpOptions)


  }
}
