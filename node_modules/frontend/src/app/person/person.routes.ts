import { Routes } from '@angular/router';
import { PersonTableComponent } from './person-table/person-table.component';
import { PersonEditFormComponent } from './person-edit-form/person-edit-form.component';

export const personRoutes: Routes = [
  {
    path: '',
    component: PersonTableComponent,
  },
  {
    path: 'create',
    component: PersonEditFormComponent,
  },
];
