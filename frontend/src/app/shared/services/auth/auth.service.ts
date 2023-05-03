import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { User} from "src/app/shared/models/User.model";
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  adminUser: User = {
    email: 'admin@123.com',
    password: '12345678',
  };

  constructor(
    private _router: Router,
    private _snackbarService: SnackbarService
  ) {}

  /**
   * Function that validates the data of login user and if validated creates a token for
   * user in localStorage redirects to Members Page. Gives an alert if credentials are invalid
   * @param loginData - The details of the user that he entered in login form
   */
  public login(loginData: User): void {
    if (
      loginData.email === this.adminUser.email &&
      loginData.password === this.adminUser.password
    ) {
      console.log('login successful');

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', loginData.email);
      this._snackbarService.openSnackBar('Logged In Successfully', '');
      this._router.navigate(['members/faculty']);
    } else {
      alert('Login Failed: Email or Password is wrong');
    }
  }

  /**
   * Function that logs the user out by removing the token from local storage and redirects
   * the user to landing page
   */
  public logout(): void {
    console.log('Logged out successfully');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this._snackbarService.openSnackBar('Logged out Successfully', '');
    this._router.navigate(['']);
  }

  /**
   * Function that uses localStorage to find whether user is logged in or not
   * @returns login status of the user
   */
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
