import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Document } from '../interfaces/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/documents'
  }

  getAll(): Promise<Document[]> {
    return lastValueFrom(this.httpClient.get<Document[]>(this.baseUrl))
  }

  createDocument(pForm: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return this.httpClient.post<any>(this.baseUrl, pForm, httpOptions)
  }

  // recuperar por id
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/' + pId))
  }

  // editar documento
  editDocument(pForm: FormData, pId: number): Promise<Document> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.put<any>((this.baseUrl + '/' + pId), pForm, httpOptions))
  }

  // Editar documento DATA
  editDocumentData(pForm: any, pId: number): Promise<Document> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return lastValueFrom(this.httpClient.put<any>((this.baseUrl + '/data/' + pId), pForm, httpOptions))
  }


  // delete
  deleteDocument(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(this.httpClient.delete<any>((this.baseUrl + "/" + pId), httpOptions))
    return response
  }

}
