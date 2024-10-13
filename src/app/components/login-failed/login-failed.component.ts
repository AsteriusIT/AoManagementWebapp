import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-failed-login',
    standalone: true,
    imports: [FontAwesomeModule],
    template: `
      <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <fa-icon [icon]="['far', 'exclamation-triangle']" class="text-red-600" size="lg"></fa-icon>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Login Failed</h3>
            <p class="text-sm text-gray-500 mb-6">
              The username or password you entered is incorrect. Please try again.
            </p>
          </div>
          <div class="flex justify-center">
            <button 
              (click)="onTryAgain()"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    `,
    styles: []
})
export class LoginFailedComponent {
    @Output() tryAgain = new EventEmitter<void>();

    onTryAgain() {
        this.tryAgain.emit();
    }
}
