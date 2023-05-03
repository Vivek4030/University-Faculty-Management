import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']
})
export class AboutUsComponent {
    
    constructor(private _router: Router) {

      /** If the user is already logged in, he is redirected to members Page instead of landing page */
      
    }    
}