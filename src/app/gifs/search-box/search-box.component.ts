import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs...">
  `,
})

export class SearchBoxComponent {
  constructor() { }

  ngOnInit() { }
}
