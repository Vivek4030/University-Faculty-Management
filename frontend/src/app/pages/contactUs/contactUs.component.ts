import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { ContactUsFormsService } from 'src/app/shared/services/contactUSForms/contactUsForms.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css'],
})
export class ContactUsComponent {
  contactUsForm: FormGroup;

  constructor(
    private _contactUsFormsService: ContactUsFormsService,
    private fb: FormBuilder,
    private _snackbarService: SnackbarService
  ) {
    this.contactUsForm = new FormGroup({
      fullName: new FormControl(null),
      email: new FormControl(null),
      message: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.minLength(3)]],

      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      message: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  public onContactUsSubmit(): void {
    if (this.contactUsForm.valid) {
      this._contactUsFormsService
        .addContactForm(this.contactUsForm.value)
        .subscribe(
          (res) => {
            console.log('New form Added successfully');
            console.log(res);
            this._snackbarService.openSnackBar(
              'Form submitted successfully',
              ''
            );
          },
          (err) => {
            console.log(err.error);

            alert('An error occurred while adding the member');
          }
        );

      console.log(this.contactUsForm.value);

      this.contactUsForm.reset();
    } else {
      let key = Object.keys(this.contactUsForm.controls);
      // console.log(key);

      key.filter((data) => {
        // console.log(data);
        let control = this.contactUsForm.controls[data];
        // console.log(control);
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }
}