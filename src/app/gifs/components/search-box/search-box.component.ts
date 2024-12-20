import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  standalone: false,
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

//#txtTagInput es una variable de referencia

export class SearchBoxComponent {

  //Viewchild permite que accedamos a ese elemetno del DOM
  @ViewChild('txtTagInput')
  //ElementRef es una clase de Angular que permite envolver elementos HTML y hacer referencia a ellos
  //Desde el componente donde se renderizan
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) { }


  searchTag () {
    //Obtenemos el valor del input y se guarda en newTag
    const newTag = this.tagInput.nativeElement.value;

    //Se llama al metodo searchTag y pasamos newTag
    this.gifsService.searchTag(newTag);

    //Se limpia el input
    this.tagInput.nativeElement.value = '';
  }
}
