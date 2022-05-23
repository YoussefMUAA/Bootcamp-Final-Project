import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/events'
  }

  // getAll
  getAll(): Promise <any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  // Recuperar por ID
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + '/' + pId))
  }

  // Create Event
  createEvent(pForm: any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl, pForm)
  }

  // Filter Events
  filterEvent(pDate: string): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl + '/eventday/' + pDate));
  }

  // delete
  deleteEvent(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(this.baseUrl + '/' + pId))
  }

  // edit
  editEvents(pForm: any, pId: number): Promise <any> {
    return lastValueFrom(this.httpClient.put<any>(this.baseUrl + '/' + pId, pForm))
  }
}
