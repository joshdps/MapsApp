import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #map{
        width: 100%;
        height: 100%;
      }  
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {




    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-70.702752, -33.411515], // starting position [lng, lat]
      zoom: 14, // starting zoom
      //  projection: 'globe' // display the map as a 3D globe
    });
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });


  }

}
