import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkersColor{
  color: string;
  marker?: mapboxgl.Marker;
  center?: [ number, number ]
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container{
      width: 100%;
      height: 100%;
    }
    
    ul {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
      cursor: pointer;

    }
    
    `
  ]
})
export class MarkersComponent implements OnInit, AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  @ViewChild('zoomInput') zoomInput!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  zoomRangeBar: number = 50;
  maxZoom: number = 18;
  minZoom: number = 0;
  center: [number, number] = [-70.702752, -33.411515];
  markersArray: MarkersColor[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom


    })
    this.getMarkersFromLocalStorage();


  }



  ngOnInit(): void {
  }

  goToMarker( marker: mapboxgl.Marker ) {
    this.map.flyTo(  {
      center: marker.getLngLat()
    }  )
  }


  addMarker( center: [ number, number ] = this.center ): void {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(center)
      .addTo(this.map)

      this.markersArray.push( { color, marker: newMarker } )       
      this.saveMarkerInLocalStorage();
      
      newMarker.on('dragend', () => {
        this.saveMarkerInLocalStorage();
      })
  }

  saveMarkerInLocalStorage(){

    const lngLatArr: MarkersColor[] = []

    this.markersArray.forEach( marker => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [ lng, lat ]
      })

      localStorage.setItem( 'markers', JSON.stringify( lngLatArr ))
      
    })
  }
  getMarkersFromLocalStorage(){
    
    if( !localStorage.getItem('markers') ){
      return
    }

    const lngLatArr: MarkersColor[] = JSON.parse( localStorage.getItem('markers' )! );

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.center! )
        .addTo( this.map )
      
        this.markersArray.push( {
          color : m.color,
          marker: newMarker
        } )

        newMarker.on('dragend', () => {
          this.saveMarkerInLocalStorage();
        })

    });

  }

  removeMarker( index: number ){
    
    this.markersArray[ index ].marker?.remove()
    this.markersArray.splice( index, 1 )

    this.saveMarkerInLocalStorage();
  }

}
