import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faCalendar, faChevronDown, faCommentAlt, faExclamationTriangle, faFile, faFileAlt, faFlag, faHandshake, faHouse, faPlus, faRocket, faThumbsUp, faUser, faUsers } from '@fortawesome/pro-regular-svg-icons';

import { IStaticMethods } from 'preline/preline';
import { AoProjectListComponent } from './components/ao-project-list/ao-project-list.component';
import { MainNavigationComponent } from './globals/main-navigation/main-navigation.component';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
type ProfileType = {
  displayName?: string,
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

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
  private readonly client: HttpClient = inject(HttpClient);
  private readonly authService: MsalService = inject(MsalService);

  readonly form: FormGroup = this.fb.group({
    shortName: this.fb.control('', Validators.required),
    client: this.fb.control('', Validators.required),
    deadline: this.fb.control(''),
  });

  userAvatarUrl: string = 'https://via.placeholder.com/150';
  username: string = 'User';

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHouse, faFile, faBell, faPlus, faCalendar, faUsers, faCommentAlt, faFileAlt, faRocket, faUser, faHandshake, faFlag, faThumbsUp, faChevronDown, faExclamationTriangle
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

    this.client.get('https://graph.microsoft.com/v1.0/me').pipe(
      tap((user: ProfileType) => this.username = user.displayName ?? user.userPrincipalName ?? 'User'),
      switchMap(() => this.getUserAvatar())
    ).subscribe(
      url => this.userAvatarUrl = url
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.projectService.create(this.form.value as Project).subscribe(() => {
        this.form.reset();
      });
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private getUserAvatar(): Observable<string> {
    return this.client.get(`https://graph.microsoft.com/v1.0/me/photo/$value`, {
      responseType: 'blob'
    }).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }
}
