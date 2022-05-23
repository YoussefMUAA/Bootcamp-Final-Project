import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';;
import { Event } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @Input() events: Event[] = []
  @Output() dateSelected: EventEmitter<string>
  
  week: any = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any;

  constructor() {
    this.dateSelected = new EventEmitter()
  }

  ngOnChanges() {
    // Capturamos el mes y año actuales
    // console.log(moment().format('MM'));
    // console.log(moment().format('YYYY'));
    
    // fecha de inicio
    this.getDaysFromDate(moment().format('MM'), moment().format('YYYY')) 


  }
  ngOnInit() {
  }

  //* Calendario
  getDaysFromDate(month: any, year: any) {
    // Libreria moment
    // necesitamos una constante para cuando empieza el mes, y otra para terminarlo.
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
    // diffDays: Cantidad de días que existe entre startDate y endDate
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      // Fecha:
      const dayObject = moment(`${year}-${month}-${a}`);
      
      const hasEvent = this.events.find(event => {
        let onlyDay = dayObject.isSame(moment(event.date),'day')
        return onlyDay
      })
      
      return {
        name: dayObject.format("dddd"),
        value: a,
        // dia de la semana
        indexWeek: dayObject.isoWeekday(),
        hasEvent: hasEvent ? true : false
        
      };
      
    });

    this.monthSelect = arrayDays;

  }

  // cambiar el mes
    changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
    }
  
  async clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    let date = this.dateValue._i;

    if (date !== "") {
      this.dateSelected.emit(date)
    }
  }

}
