import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = []

  constructor() {

    const projectsJson = localStorage.getItem('projects');

    if (projectsJson) {
      this.projects = JSON.parse(projectsJson);
    }
  }

  list(): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      observer.next(this.projects);
      observer.complete();
    });
  }

  create(project: Project): Observable<Project> {

    project.id = `AO-${project.client}-${project.shortName}`;
    project.policies = [
      { type: 'kickoff', state: 'notStarted', step: 'Kickoff meeting held' },
      { type: 'bum-meeting', state: 'notStarted', step: 'BUM meeting' },
      { type: 'regular-meeting', state: 'notStarted', step: 'BUM and Customer regular meeting' },
      { type: 'strategy-meeting', state: 'notStarted', step: 'Customer meeting when 80% of project' },
      { type: 'new-project', state: 'notStarted', step: 'Waiting for client response' },
      { type: 'internal-review', state: 'notStarted', step: 'Review of the project' },
    ]

    this.projects.push(project);
    this.save();

    return new Observable<Project>(observer => {
      observer.next(project);
      observer.complete();
    });
  }

  read(id: string): Observable<Project | undefined> {
    return new Observable<Project | undefined>(observer => {
      const project = this.projects.find(p => p.id === id);
      observer.next(project);
      observer.complete();
    });
  }

  update(project: Project): Observable<Project> {
    const index = this.projects.findIndex(p => p.id === project.id);
    this.projects[index] = project;
    this.save();

    return new Observable<Project>(observer => {
      observer.next(project);
      observer.complete();
    });
  }

  delete(id: string): Observable<void> {
    const index = this.projects.findIndex(project => project.id === id);
    this.projects.splice(index, 1);
    this.save();

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  private save(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

}
