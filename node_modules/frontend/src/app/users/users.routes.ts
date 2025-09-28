import { Routes } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UsersTableComponent,
  },
];
