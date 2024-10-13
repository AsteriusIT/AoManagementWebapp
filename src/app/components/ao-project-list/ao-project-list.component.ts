import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Project } from '../../models/project';
import { PolicyIconComponent } from '../policy-icon/policy-icon.component';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ao-project-list',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, PolicyIconComponent],
  templateUrl: './ao-project-list.component.html',
  styleUrl: './ao-project-list.component.scss'
})
export class AoProjectListComponent {
  activeTab = 'active';
  showNewProjectModal = false;

  private readonly projectService: ProjectService = inject(ProjectService);

  projects$: Observable<Project[]> = this.projectService.list();

  updateStateOfPolicy(project: Project, policy: { type: string; state: string; step: string }, state: string) {
    const updatedProject = { ...project };
    const policyIndex = updatedProject.policies.findIndex(p => p.type === policy.type);
    updatedProject.policies[policyIndex] = { ...policy, state };
    this.projectService.update(updatedProject).subscribe();
  }
}
