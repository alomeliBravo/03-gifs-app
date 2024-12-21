import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  //Informacion para peticiones a la API de GIPHY
  private apiKey:       string = 'nUASxaIaDWi8xFtNqMZjkooANAraP1ME';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs'; //EndPoint

  constructor( private http: HttpClient ) { } //Servicio que permite realizar peticiones HTTP a una API

  //Devuelve el arreglo desestructurado
  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }


  //Organiza el historial de busquedas de gifs
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); //Convierte el input a lowercase

    //Si ya existe esa busqueda regresa un nuevo arreglo donde no exista
    if ( this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    //se inserta la busqueda
    this._tagsHistory.unshift( tag );

    //Evita que existan más de 10 elementos en el arreglo
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }


  searchTag( tag: string ):void {
    //Si el tag es un string vacío no hará anda
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    //Parametros para la petición
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //Petición HTTP a la API

    //get es un obsevable y es de tipo generico por lo que le damos el tipo de dato
    //de nuestra interfaz, las interfaces sirven para darle estructura a un objeto
    //pero no lo fuerzan a lucir de esa manera
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params } )
      .subscribe( (resp) => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      } );

    //Obtiene la data de la API, se suscribe porque es un observable y todo el rato
    //puede estar mandando data.

  }

}
