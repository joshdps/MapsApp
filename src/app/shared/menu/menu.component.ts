import { Component, OnInit } from '@angular/core';


interface MenuItems {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menuItems: MenuItems[] = [
    {
      route: '/maps/fullscreen',
      name: 'FullScreen' 
    },
    {
      route: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/maps/markers',
      name: 'Markers' 
    },
    {
      route: '/maps/properties',
      name: 'Properties'
    }    
  ]

  constructor() { }


  ngOnInit(): void {
  }

  
}
