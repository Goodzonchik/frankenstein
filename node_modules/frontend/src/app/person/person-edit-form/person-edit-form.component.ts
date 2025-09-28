import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { PersonApiService } from '../person-api.service';

@Component({
  selector: 'app-person-edit-form',
  standalone: true,
  templateUrl: './person-edit-form.component.html',
  styleUrl: './person-edit-form.component.scss',
  providers: [PersonApiService],
  imports: [AsyncPipe, ReactiveFormsModule],
})
export class PersonEditFormComponent {
  private personApiService = inject(PersonApiService);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: [null, Validators.required],
    last_name: [null, Validators.required],
    birth_date: [null, Validators.required],
  });

  createPerson() {
    if (this.form.invalid) {
      return;
    }

    this.personApiService.createPerson$(this.form.value as any).subscribe();
  }
}
