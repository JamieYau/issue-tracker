import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  title = input('');
  private visibleState = signal(false);

  close = output<void>();

  get isVisible(): boolean {
    return this.visibleState();
  }

  show(): void {
    this.visibleState.set(true);
  }

  hide(): void {
    this.visibleState.set(false);
    this.close.emit();
  }
}
