import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsFormsService {

  baseUrl: string = "http://localhost:3000/contact";

  constructor(private _http: HttpClient) { }

  /**
   * Function that sends a POST request to server to add new member 
   * @param contactForm - The details of the new contact form to be added in database
   * @returns Observable Response object containing details of the form added  
   *           received from server
   */
  public addContactForm(contactForm: any)
   {
      return this._http.post(`${this.baseUrl}/add`,contactForm);
   }
}
