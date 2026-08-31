import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.scss'],
})
export class UrlInputComponent {
  inputUrl: string = '';

  @Output() urlSubmitted = new EventEmitter<string>();

  onSubmit(): void {
    if (!this.inputUrl.trim()) return;

    this.urlSubmitted.emit(this.inputUrl);
    this.inputUrl = '';
  }
}
