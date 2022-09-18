import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {


  constructor( private gifsService: GifsService ) { } 


  get historials (  ) : string [] {

    return  this.gifsService.historial;

  }

  buscar ( item : string ) {

    this.gifsService.buscarGifs(  item );

  }


  



}
