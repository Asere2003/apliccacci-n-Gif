import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gif.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'AHGR3UE9DqMVNtlM6A4IlcKsMxs2tXsb';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif [] = [];

  get historial() {

    return [...this._historial];

  }

  constructor ( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];

    this.resultados = JSON.parse( localStorage.getItem( 'resultados' )! ) || [];

/*     if( localStorage.getItem( 'historial' )  ) {

      this._historial = JSON.parse( localStorage.getItem( 'historial' )! );

    } */


  };

   buscarGifs( query: string  = '') {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(  query ) ) {

      this._historial.unshift( query )

      this._historial =  this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) )
      
    }

    const params = new HttpParams().set('api_key', this.apiKey)
                                   .set('limit', '10')
                                   .set('q', query);
    /* Con el método fetch*/
   /*   fetch ('https://api.giphy.com/v1/gifs/search?api_key=AHGR3UE9DqMVNtlM6A4IlcKsMxs2tXsb&q=dragon ball z&limit=10'). then ( response => {
      console.log( response.json().then () )
    } ) */

    this.http.get< SearchGifsResponse >(`${this.servicioUrl}/search`, { params })
    /*suscribe es como el then en las promezas*/
      .subscribe( ( response   ) => {
        this.resultados = response.data;
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
      });
    
  }



}
