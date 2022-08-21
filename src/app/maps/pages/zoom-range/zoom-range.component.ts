import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container{
        width: 100%;
        height: 100%;
      }
      
      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999; 
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef;
  @ViewChild('zoomInput') zoomInput!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  zoomRangeBar: number = 50;
  maxZoom: number = 18;
  minZoom: number = 0;
  center: [ number,number ] = [ -70.702752, -33.411515 ];

  constructor() { }
  ngOnDestroy(): void {

    this.map.off('zoom', ()=>{} )
    this.map.off('zoomend', ()=>{} )
    this.map.off('move', ()=>{} )
  
  }


  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom

      //  projection: 'globe' // display the map as a 3D globe
    });
    this.map.on('style.load', () => {
      this.map.setFog({}); // Set the default atmosphere style
    });

    // Zoom level listener 
    this.map.on('zoom', (_) => this.zoomLevel = this.map.getZoom());

    // Zoom end move listener 
    this.map.on('zoomend', (_) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(this.maxZoom)
      }
    })

    // Map Move Listener
    this.map.on('move', ( event ) => {
      
      const   { lng , lat } = event.target.getCenter();

      this.center = [ lng, lat ]

    })

    
  }

  ngOnInit(): void {


  }

  zoomIt(zoomType: string) {
    switch (zoomType) {
      case 'in': {
        this.map.zoomIn();
        break;
      }

      default: this.map.zoomOut();
        break;
    }

    this.zoomLevel = this.getZoom();
  }
  getZoom() {
    return this.map.getZoom();
  }

  zoomChange( zoomValue: string ){
    this.map.zoomTo( Number(zoomValue) )
  }
}
