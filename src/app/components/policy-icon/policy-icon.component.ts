import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-policy-icon',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './policy-icon.component.html',
  styleUrl: './policy-icon.component.scss'
})
export class PolicyIconComponent {
  @Input() policy: { type: string; state: string; step: string } = { type: 'regular-meeting', state: 'pending', step: '1' };

  @Output() updateState: EventEmitter<string> = new EventEmitter();

  policyIcons: any = {
    'regular-meeting': ['far', 'users'],
    'client-feedback': ['far', 'comment-alt'],
    'internal-review': ['far', 'file-alt'],
    'kickoff': ['far', 'rocket'],
    'bum-meeting': ['far', 'handshake'],
    'strategy-meeting': ['far', 'flag'],
    'new-project': ['far', 'thumbs-up'],
  };

  policyLabels: any = {
    'kickoff': 'Kickoff',
    'bum-meeting': 'BUM Meeting',
    'regular-meeting': 'Regular Meeting',
    'strategy-meeting': 'Strategy Meeting',
    'new-project': 'New project initiated',
    'internal-review': 'Review',
  };

  policyStates: any = {
    pending: { color: 'text-yellow-500', bgColor: 'bg-yellow-100', label: 'Pending' },
    inProgress: { color: 'text-blue-500', bgColor: 'bg-blue-100', label: 'In Progress' },
    done: { color: 'text-green-500', bgColor: 'bg-green-100', label: 'Done' },
    notStarted: { color: 'text-gray-400', bgColor: 'bg-gray-100', label: 'Not Started' },
    failed: { color: 'text-red-500', bgColor: 'bg-red-100', label: 'Failed' },
  };

  get policyIcon() {
    return this.policyIcons[this.policy.type];
  }

  get policyLabel() {
    return this.policyLabels[this.policy.type];
  }

  get stateStyle() {
    return this.policyStates[this.policy.state];
  }

  updatePolicyState() {
    const states = ['notStarted', 'pending', 'inProgress', 'done', 'failed'];

    const currentIndex = states.indexOf(this.policy.state);

    const newState = states[(currentIndex + 1) % states.length];

    this.updateState.emit(newState);
  }

}
