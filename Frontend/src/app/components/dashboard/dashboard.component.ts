import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';

interface Marker {
	lat: number;
	lng: number;
  label?: string;
  draggable: true;
}

interface Area {
  north: number;
  south: number;
  east: number;
  west: number;
  draggable: true;
  color: string;
  editable: true;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


// google maps zoom level
  zoom: number = 17;
  
  // location details
  lat: number = 0;
  lng: number = 0;
  city: string = '';
  state: string = '';
  country: string = '';
  mapClicked = false;
  pos: any;

  // array of markers
  markers: Marker[] = [];
  
  // array of areas
  areas: Area[] = [];
  color: string = '';


  constructor(private map: MapsService) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('mark')) != null){
      this.markers = JSON.parse(localStorage.getItem('mark'));
    }
    if( JSON.parse(localStorage.getItem('areas')) != null){
      this.areas =  JSON.parse(localStorage.getItem('areas'));
    }
    this.resetLocation();
  }

  onMapDblClick(event){
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    });
    localStorage.setItem('mark', JSON.stringify(this.markers));
  }

  onMapRtClick(event){
    this.generateColor();
    this.areas.push({
      north: event.coords.lat + 0.0005,
      south: event.coords.lat - 0.0005,
      east: event.coords.lng + 0.0005,
      west: event.coords.lng - 0.0005,
      draggable: true,
      color: this.color,
      editable: true
    });
    localStorage.setItem('areas', JSON.stringify(this.areas));
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: Marker, event) {
    console.log('old : ' + m .lat + ' new: ' +  event.coords.lat);
    // remove old
    this.markers = this.markers.filter(( obj ) => {
      return obj.lat !== m.lat;
    });
    // add new
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    });
    localStorage.setItem('mark', JSON.stringify(this.markers));
  }

  areaDragEnd(a: Area, event){
    this.areas = this.areas.filter(( obj ) => {
      return (obj.north !== a.north) || (obj.south !== a.south) || (obj.east !== a.east) || (obj.west !== a.west);
    });
    // add new
    this.areas.push({
      north: event.north,
      south: event.south,
      east: event.east,
      west: event.west,
      draggable: true,
      color: a.color,
      editable: true
    });
    localStorage.setItem('areas', JSON.stringify(this.areas));
  }

  getPosition() {
    if(!!navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        console.log(pos.coords);
      });
    }
  }

  generateColor(){
    this.color = '#' + (Math.random().toString(16) + '000000').substring(2, 8);
  }

  resetLocation(){
    this.getPosition();
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.city = data.city;
      this.state = data.region_code;
      this.country = data.country_name;
    });
  }

  markRtClick(lat: number, lng: number){
    this.markers = this.markers.filter(( obj ) => {
      return obj.lat !== lat;
    });
    localStorage.setItem('mark', JSON.stringify(this.markers));
    console.log('amount of markers is ' + this.markers.length);
  }

  areaRtClick(north: number){
    this.areas = this.areas.filter(( obj ) => {
      return obj.north !== north;
    });
    localStorage.setItem('areas', JSON.stringify(this.areas));
    console.log('amount of areas is ' + this.areas.length);
  }
}
