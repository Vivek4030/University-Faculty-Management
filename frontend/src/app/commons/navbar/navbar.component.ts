import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private _authService: AuthService
  ) {}

  public logout() {
    this._authService.logout();
  }

  /**
   * Function that checks whether user is authenticated or not based on token in local storage
   * @returns true if user is authenticated otherwise false
   */
  public isAuthenticated(): boolean 
  {
      return localStorage.getItem('isLoggedIn') == "true"
  }
}
