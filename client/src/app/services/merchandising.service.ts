import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchandisingService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/messaging/mail';
  }

  sendEmail(pForm: string):Promise<any> {
    const response = lastValueFrom(this.httpClient.post<any>(this.baseUrl, pForm))
    return response;
  }
}
