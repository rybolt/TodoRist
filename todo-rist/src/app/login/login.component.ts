import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email == "ryan@nospam.com" && this.password == "please")
    {
      //route to todo list
      localStorage.setItem('todo-email', this.email);
      this.router.navigate(['/todo-list']);
    }
    else
    {
      this.errorMessage = 'Sorry, could not log in!'
    }
  }
}
