import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMonths,
  addWeeks
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

interface SprinklerEvent extends CalendarEvent {
  controllerArea: string;
  eventId: string;
  eventCreated: Date;
  valveNum: number;
}

interface SprinklerEventAction extends CalendarEventAction {
  onClick({ event }: {
    event: SprinklerEvent;
  }): any;
}

interface SprinklerEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  event: SprinklerEvent;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: SprinklerEvent;
  };

  duration: string[] = [];
  repeatEvery: string[] = [];
  repeatAndDuration: string[] = [];

  id: number = 1;

  actions: SprinklerEventAction[] = [
    {
      label: 'Delete',
      onClick: ({ event }: { event: SprinklerEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: SprinklerEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private http: HttpClient) {}

  ngOnInit(){
    /*this.events.push({
      eventCreated: new Date(),
      controllerArea: 'Orange Grove',
      eventId: this.createRandomId(),
      start: new Date(),
      end: addHours(startOfDay(new Date()), 2),
      valveNum: 4,
      title: 'A 1 day event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
    });*/
  }

  dayClicked({ date, events }: { date: Date; events: SprinklerEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: SprinklerEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: SprinklerEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    if(action === 'Clicked'){
      // print json of event in console
      console.log(this.getJson());
    }
  }

  addEvent(): void {
    this.events.push({
      eventCreated: new Date(),
      eventId: this.createRandomId(),
      controllerArea: '',
      title: '',
      start: startOfDay(new Date()),
      valveNum: 0,
      color: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
  }

  deleteEvent(eventToDelete: SprinklerEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createRandomId(){
    let num = '_' + Math.random().toString(36).substr(2, 9);
    return num;
  }

  eventHappened(){
    console.log('event happened');
    localStorage.setItem('event', JSON.stringify(this.events));
  }

  getJson(){
    return JSON.stringify(this.modalData.event);
  }

  setRepeat(id: string, event: any){
    //console.log(id + ',' + event.target.value);
    // save duration repeat value if not set as once and id not in the repeat every array save it
    if(event.target.value !== 'Once'){
      this.repeatEvery = this.repeatEvery.filter(elem => elem.split(',')[0] !== id);
      this.repeatEvery.push(id + ',' + event.target.value);
    }else if(this.repeatEvery.length !== 0 && event.target.value === 'Once'){
      this.repeatEvery = this.repeatEvery.filter(elem => elem.split(',')[0] !== id);
    }
    //console.log('repeat list ' + this.repeatEvery.length);
  }

  setDuration(id: string, event: any){
    //console.log(id + ' ' + event.target.value);
    //check if set to repeat
    const temp = this.repeatEvery.find(elem => elem.split(',')[0] === id);
    //console.log(temp);
    //check if already in array and repeat and duration match
    if(temp.split(',')[0] === id){
      this.repeatAndDuration = this.repeatAndDuration.filter(elem => elem.split(',')[0] !== id);
      //id, repeat interval, duration
      this.repeatAndDuration.push(id + ',' + temp.split(',')[1] + ',' + event.target.value);
      //console.log('found');
    }
    console.log(this.repeatAndDuration.toString());
    this.dupEvent();
  }

  dupEvent(){
    const temp = this.repeatAndDuration.pop();
    const id = temp.split(',')[0].toString();
    const interval = temp.split(',')[1].toString();
    const duration = Number(temp.split(',')[2].toString());
    //first event
    const event = this.events.find(elem => elem.eventId === id);
    //console.log(id + ' ' + interval + ' ' + duration);
    for(let i = 1; i <= duration - 1; i++){
      const copy = { ...event };
      if(interval === 'Daily'){
        copy.start = addDays(event.start,i);
        copy.end = addDays(event.end,i);
        copy.eventCreated = new Date();
        this.events.push(copy);
        console.log(i);
      }else if(interval === 'Weekly'){
        copy.start = addWeeks(event.start,(i));
        copy.end = addWeeks(event.end,(i));
        copy.eventCreated = new Date();
        this.events.push(copy);
        console.log('test1');
      }else if(interval === 'Monthly'){
        copy.start = addMonths(event.start,(i));
        copy.end = addMonths(event.end,(i));
        copy.eventCreated = new Date();
        this.events.push(copy);
        console.log('test2');
      }else if(interval == 'Bi-Weekly'){
        copy.start = addWeeks(event.start,(2*i));
        copy.end = addWeeks(event.end,(2*i));
        copy.eventCreated = new Date();
        this.events.push(copy);
      }
    }
  }

  saveEvents(){
    /*let jsonData = JSON.stringify({event: this.events, "id":this.id});
    localStorage.setItem('event', jsonData);*/
    //console.log(jsonData);
    const url = `http://localhost:3000/data/${this.id}`;
    this.http.delete(url, httpOptions)
      .subscribe(
        //if not found add new events with same id
        (data:any) => {console.log('found event so deleting');
          this.addEvents();
        },
        error => {console.log('not found so adding events');
         this.addEvents();
        }
      )
  }

  addEvents(){
    let jsonData = JSON.stringify({event: this.events, "id":this.id});
    this.http.post('http://localhost:3000/data', jsonData, httpOptions).subscribe((data:any) => {console.log(data);})
  }
}