import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/interfaces/event.interface';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Output() refreshEvents: EventEmitter<boolean>;
  @Input() event: Event | any;
  editEvent: FormGroup;

  constructor(private eventService: EventsService) {

    this.refreshEvents = new EventEmitter();
    
    this.editEvent = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [

      ]),
      description: new FormControl ('', [])
    })
  }
  
  async ngOnInit() {
    let id = this.event.id_event
    const updateEvent = await this.eventService.getById(id)
    this.editEvent = new FormGroup({
      name: new FormControl(updateEvent?.name, []),
      location: new FormControl(updateEvent?.location, []),
      date: new FormControl(moment(updateEvent?.date).format('YYYY-MM-DDThh:mm'), []),
      description: new FormControl (updateEvent?.description, [])
    })
  }

  async deleteEvent(pId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      const response = await this.eventService.deleteEvent(pId);
      this.refreshEvents.emit(true)
    }
  }

  async editEvents(pId: number) {
    const response = await this.eventService.editEvents(this.editEvent.value, pId)
    this.refreshEvents.emit(true);
  }

}

