import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todo-list', component: TodoListComponent },
  {
    path: '**',
    redirectTo: 'login', // Redirect unknown paths to the home route
  },
];
