import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
})
export class ImageViewerComponent {
  @Input() imageUrl: string | null = null;
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  onBackdropClick() {
    this.closed.emit();
  }
}


