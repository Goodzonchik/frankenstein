import { Routes } from '@angular/router';
import { FilesTableComponent } from './files-table/files-table.component';
import { BucketTableComponent } from './bucket-table/bucket-table.component';

export const filesRoutes: Routes = [
  {
    path: '',
    component: BucketTableComponent,
  },
  {
    path: ':bucket',
    component: FilesTableComponent,
  },
];
