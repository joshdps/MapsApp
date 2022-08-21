import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    div{
      width: 100%;
      height: 150px;
      margin: 0;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [ number, number ] = [ 0,0 ]
  @ViewChild('map') divMap!: ElementRef;

//  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  zoomRangeBar: number = 50;
  maxZoom: number = 15;
  minZoom: number = 0;
  center: [number, number] = [-70.702752, -33.411515];
  
  constructor() { }

  ngAfterViewInit(): void {
      const map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
      interactive: false
    })

    new mapboxgl.Marker()
        .setLngLat( this.lngLat )
        .addTo( map )

  }


}
