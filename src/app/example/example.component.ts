import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <input [(ngModel)]="message" />
    <p>{{ message }}</p>
  `,
})
export class ExampleComponent {
  message: string = 'Hello Angular!';
}
