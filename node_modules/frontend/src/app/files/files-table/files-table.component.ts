import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { FileDto, FilesApiService } from '../files-api.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-files-table',
  standalone: true,
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  providers: [FilesApiService],
  imports: [DatePipe, FormsModule, ReactiveFormsModule, NgIf, ImageViewerComponent],
})
export class FilesTableComponent {
  private readonly filesApiService = inject(FilesApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  files = signal<FileDto[]>([]);
  previewImageUrl = signal<string | null>(null);
  isViewerVisible = signal<boolean>(false);

  bucketSelector = new FormControl<string>('');

  fileToUpload: File | null = null;

  bucket = input.required<string>();

  constructor() {
    effect(() => {
      const currentBucket = this.bucket();
      if (currentBucket) {
        this.getFilesData(currentBucket);
      }
    });
  }

  getBucketFiles$(bucket: string) {
    return this.filesApiService.getBucketFiles$(bucket);
  }

  downloadFile(fileName: string) {
    this.filesApiService.downloadFile$(this.bucket(), fileName).subscribe();
  }

  deleteFile(fileName: string) {
    this.filesApiService.deleteFile$(this.bucket(), fileName).subscribe(() => {
      this.getFilesData(this.bucket()!);
    });
  }

  goBack() {
    this.router.navigate(['bucket']);
  }

  handleFileInput(event: Event | null) {
    const files = (event as any)?.target?.files;
    if (!files) {
      return;
    }

    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    if (!this.fileToUpload) {
      return;
    }

    this.filesApiService
      .uploadFile$(this.bucket(), this.fileToUpload)
      .subscribe();
  }

  openPreview(fileName: string) {
    this.filesApiService
      .getFileBlob$(this.bucket(), fileName)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.previewImageUrl.set(objectUrl);
        this.isViewerVisible.set(true);
      });
  }

  closePreview() {
    const currentUrl = this.previewImageUrl();
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    this.previewImageUrl.set(null);
    this.isViewerVisible.set(false);
  }

  private getFilesData(currentBucket: string) {
    this.getBucketFiles$(currentBucket)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((files) => {
        this.files.set(files);
      });
  }
}
