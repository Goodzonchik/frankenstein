import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilesApiService } from '../files-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-table',
  standalone: true,
  templateUrl: './bucket-table.component.html',
  styleUrl: './bucket-table.component.scss',
  providers: [FilesApiService],
  imports: [DatePipe],
})
export class BucketTableComponent {
  private readonly filesApiService = inject(FilesApiService);
  private readonly router = inject(Router);

  buckets = toSignal(this.filesApiService.getBuckets$());

  navigateToBacket(bucket: string) {
    this.router.navigate(['bucket', bucket]);
  }
}
