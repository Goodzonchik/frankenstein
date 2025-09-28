import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, tap } from 'rxjs';

export type FileDto = {
  name: string;
  lastModified: string;
  etag: string;
  size: number;
};

@Injectable()
export class FilesApiService {
  httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/api/bucket';

  getBuckets$(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  getBucketFiles$(bucket: string): Observable<any[]> {
    return this.httpClient.get<FileDto[]>(`${this.baseUrl}/${bucket}`);
  }

  downloadFile$(bucket: string, name: string) {
    return this.httpClient
      .get(`${this.baseUrl}/${bucket}/file/${name}`, {
        responseType: 'blob',
      })
      .pipe(
        tap((res) => {
          saveAs(res as unknown as Blob, name);
        })
      );
  }

  uploadFile$(bucket: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    return this.httpClient.post(`${this.baseUrl}/${bucket}/file`, formData);
  }

  deleteFile$(bucket: string, filename: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${bucket}/file/${filename}`);
  }
}
