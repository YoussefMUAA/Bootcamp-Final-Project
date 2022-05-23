import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/interfaces/event.interface';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[] = [];
  eventsFiltered: Event[] = [];
  eventsForm: FormGroup;

  

  constructor(private eventsService: EventsService,
  private router: Router) {
  this.eventsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    location: new FormControl('', [])
  })
    
  }

  async ngOnInit(): Promise<void> {
    this.events = await this.eventsService.getAll();
    this.eventsFiltered = [...this.events]

  }
  
  onSubmit() {
    // Hora UTC
    this.eventsForm.value.date = moment(this.eventsForm.value.date).format("YYYY-MM-DD HH:mm");
    this.eventsService.createEvent(this.eventsForm.value).subscribe(async response =>
      {
        if (response.id_event) {
          alert('Event registered successfully')
          this.eventsForm.reset()
          this.eventsFiltered = await this.eventsService.getAll();
          
          // actualizar aqui
          this.router.navigateByUrl('calendar')
        } else {
          alert('Event registration failed')
        }
      })      
  }

  // Validador
    checkControl(controlName: string, errorName: string) {
        if (this.eventsForm.get(controlName)?.hasError(errorName) && this.eventsForm.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  // Filtramos los eventos
  async onDateSelected($event: any) {
    this.eventsFiltered = await this.eventsService.filterEvent($event)
  }

  // Refresh events list
  async onRefreshEvents() {
    this.eventsFiltered = await this.eventsService.getAll()
  }

}
