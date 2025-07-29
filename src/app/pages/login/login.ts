import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signIn, confirmSignIn, getCurrentUser } from 'aws-amplify/auth';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit  {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      const user = await getCurrentUser();
      if (user) {
        this.router.navigate(['/tasks']);
      }
    } catch {
    }
  }
  async signIn() {
    try {
      const user = await signIn({ username: this.username, password: this.password });

      if (user.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        const newPassword = prompt('Please enter a new password:');
        if (newPassword) {
          await confirmSignIn({ challengeResponse: newPassword });
          console.log('Password updated and user signed in.');
        }
      }

      this.errorMessage = '';
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Sign-in error';
      console.error('Sign-in error:', err);
    }
  }
}
