import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faCalendar, faChevronDown, faCommentAlt, faFile, faFileAlt, faFlag, faHandshake, faHouse, faPlus, faRocket, faThumbsUp, faUser, faUsers } from '@fortawesome/pro-regular-svg-icons';

import { IStaticMethods } from 'preline/preline';
import { AoProjectListComponent } from './components/ao-project-list/ao-project-list.component';
import { MainNavigationComponent } from './globals/main-navigation/main-navigation.component';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, MainNavigationComponent, AoProjectListComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly projectService: ProjectService = inject(ProjectService);

  readonly form: FormGroup = this.fb.group({
    shortName: this.fb.control('', Validators.required),
    client: this.fb.control('', Validators.required),
    deadline: this.fb.control(''),
  });

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHouse, faFile, faBell, faPlus, faCalendar, faUsers, faCommentAlt, faFileAlt, faRocket, faUser, faHandshake, faFlag, faThumbsUp, faChevronDown
    );
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });

  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.projectService.create(this.form.value as Project).subscribe(() => {
        this.form.reset();
      });
    }
  }
}
