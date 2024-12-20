import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  standalone: false,
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  constructor ( private gifsService: GifsService ){}

  //Metodo getter para obtener el tagHistory
  get tagsList(): string[] {
    return this.gifsService.tagsHistory;
  }

}
