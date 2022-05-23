import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/contacts'
  }

  // Recuperar todos los contactos
  getAll(): Promise<Contact[]> {
    return lastValueFrom(this.httpClient.get<Contact[]>(this.baseUrl))
  }

  // por id
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + "/" + pId));
  }

  // crear contacto
  createContact(pForm: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }

    return this.httpClient.post<any>(this.baseUrl, pForm, httpOptions)
  }

  // editar contacto
  editContact(pForm: any, pId: number): Promise<Contact> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(this.httpClient.put<any>((this.baseUrl + "/" + pId), pForm, httpOptions))
  }

  // borrar contacto
  deleteContact(pId: number): Promise<Contact> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(this.httpClient.delete<any>((this.baseUrl + "/" + pId), httpOptions))
  }
}

