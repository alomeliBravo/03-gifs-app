import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'nUASxaIaDWi8xFtNqMZjkooANAraP1ME';

  constructor() { }

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


  searchTag( tag: string ) {
    //Si el tag es un string vacío no hará anda
    if (tag.length === 0) return;

    this.organizeHistory(tag);

  }

}
