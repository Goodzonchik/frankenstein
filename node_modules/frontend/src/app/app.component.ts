import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersTableComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
