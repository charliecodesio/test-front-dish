import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  email = '';
  code = '';

  successMessage = '';
  errorMessage = '';
  resendMessage = '';

  showConfirmation = false;

  constructor(private router: Router) {}

  async signUp() {
    try {
      await signUp({
        username: this.username,
        password: this.password,
        options: {
          userAttributes: {
            email: this.email
          }
        }
      });
      this.showConfirmation = true;
      this.successMessage = 'Registration successful! Please check your email for the confirmation code.';
      this.errorMessage = '';
    } catch (error: any) {
      this.successMessage = '';
      this.errorMessage = error.message || 'Error during registration';
    }
  }

  async confirm() {
    try {
      await confirmSignUp({ username: this.username, confirmationCode: this.code });
      this.successMessage = 'Email confirmed successfully!';
      this.errorMessage = '';
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.successMessage = '';
      this.errorMessage = error.message || 'Error during confirmation';
    }
  }

  async resendCode() {
    try {
      await resendSignUpCode({ username: this.username });
      this.resendMessage = 'Code resent successfully!';
      this.errorMessage = '';
    } catch (error: any) {
      this.resendMessage = '';
      this.errorMessage = error.message || 'Failed to resend code';
    }
  }
}
