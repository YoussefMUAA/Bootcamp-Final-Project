import { Directive, ElementRef } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Directive({
  selector: '[appAdmin]'
})
  
export class AdminDirective {

  constructor(element:ElementRef) {
    
    const payload = jwt_decode(localStorage.getItem('token')!) as any;
    if (!payload.is_admin) {
      element.nativeElement.style.display = 'none';
    }
  }
}
