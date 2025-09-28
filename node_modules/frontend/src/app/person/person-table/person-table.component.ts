import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { PersonApiService } from '../person-api.service';

@Component({
  selector: 'app-person-table',
  standalone: true,
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.scss',
  providers: [PersonApiService],
  imports: [AsyncPipe, ReactiveFormsModule],
})
export class PersonTableComponent {
  private personApiService = inject(PersonApiService);

  users$ = this.loadData$();

  name = new FormControl('', Validators.required);
  label = new FormControl('', Validators.required);

  parent: string | null = null;
  child: string | null = null;
  loadData$() {
    return this.personApiService.getPersons$();
  }

  /* 

  createUser() {
    if (this.name.value && this.label.value) {
      this.personApiService
        .createUsers$('Person', 'name', this.name.value, this.label.value)
        .subscribe(() => {
          this.name.reset();
          this.users$ = this.loadData$();
        });
    }
  }

  deleteUser(user: string) {
    this.usersApiService.deleteUser$(user).subscribe(() => {
      this.name.reset();
      this.users$ = this.loadData$();
    });
  } */
}
