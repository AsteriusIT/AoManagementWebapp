import { Component } from '@angular/core';
import { AoProjectListComponent } from '../../components/ao-project-list/ao-project-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AoProjectListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
