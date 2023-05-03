import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { FacultyMembersService } from 'src/app/shared/services/facultyMembers/facultyMembers.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-faculty-members',
  templateUrl: './facultyMembers.component.html',
  styleUrls: ['./facultyMembers.component.css'],
})
export class FacultyMembersComponent implements OnInit {
  memberForm: FormGroup;
  showModal: boolean = false;
  isAdmin: boolean = false;
  type: any = 'faculty';

  members: any = [];

  mouseOvered: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _facultyMembersService: FacultyMembersService,
    private _authService: AuthService,
    private _snackbarService: SnackbarService,
  ) {
    this.memberForm = new FormGroup({
      type: new FormControl(null),
      fullName: new FormControl(null),
      designation: new FormControl(null),
      department: new FormControl(null),
      profilePic: new FormControl(null),
      addressLine1: new FormControl(null),
      addressLine2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      googleScholar: new FormControl(null),
      researchGate: new FormControl(null),
      cv: new FormControl(null),
      education: new FormControl(null),
      interests: new FormControl(null),
      honors: new FormControl(null),
      publications: new FormControl(null),
      projects: new FormControl(null),
      achievements: new FormControl(null),
    });

    this._router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        /* Your code goes here on every router change */
        this.type = this._route.snapshot.paramMap.get('type');
        if(this.type) {
          this.getMembers();
        }
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = this._authService.isLoggedIn();

    this.type = this._route.snapshot.paramMap.get('type');

    if(this.type) {
      this.getMembers();
    }

    this.memberForm = this.fb.group({
      type: [null, [Validators.required ]],
      fullName: [null, [Validators.required, Validators.minLength(3)]],
      designation: [null, [Validators.required, Validators.minLength(2)]],
      department: [null, [Validators.required, Validators.minLength(2)]],
      profilePic: [null],
      addressLine1: [null, [Validators.required, Validators.minLength(3)]],
      addressLine2: [null],
      city: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, [Validators.required, Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [null, [Validators.required]],
      googleScholar: [null, [Validators.minLength(3)]],
      researchGate: [null, [Validators.minLength(3)]],
      cv: [null, [Validators.minLength(3)]],
      education: [null, [Validators.required, Validators.minLength(3)]],
      interests: [null, [Validators.required, Validators.minLength(3)]],
      honors: [null],
      publications: [null],
      projects: [null],
      achievements: [null],
    });
  }

  /**
   * Function gets called when Add member form is submitted and if values are valid, new member
   * details are passed at backend through service else error alert is given to user
   */
  public onAddMemberSubmit(): void {
    if (this.memberForm.valid) {
      if (this.memberForm.value.profilePic === null)
        delete this.memberForm.value.profilePic;

      if(this.memberForm.value.profilePic) {
        this.formImgUrl(this.memberForm.value.profilePic);
      }  

      this._facultyMembersService.addMember(this.memberForm.value).subscribe(
        (res) => {
          console.log('New member Added successfully');
          console.log(res);
          this._snackbarService.openSnackBar('Member Added successfully', '');
          this.getMembers();
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);

          if (err.error.message === 'Error adding new member: Validation error')
            alert('This member already exists');
          else {
            alert('An error occurred while adding the member');
          }
        }
      );

      console.log(this.memberForm.value);

      this.memberForm.reset();
      this.onCloseModal();
    } else {
      let key = Object.keys(this.memberForm.controls);
      // console.log(key);

      key.filter((data) => {
        // console.log(data);
        let control = this.memberForm.controls[data];
        // console.log(control);
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }

  /**
   * Function that fetches array of members through service from backend 
   */
  public getMembers(): void {
    this._facultyMembersService.getMembersList(this.type).subscribe(
      (res: any) => {
        console.log(res);
        this.members = res.data;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /**
   * Function that opens the modal containing Add member form on clicking Add Button
   */
  public onAddMember() {
    this.showModal = true;
  }

  /**
   * Function that closes the modal containing Add member form on clicking Close Button
   */
  public onCloseModal() {
    this.showModal = false;
    this.memberForm.reset();
  }

  public formImgUrl(url: any) {
    let found = url.match( /d\/([A-Za-z0-9\-]+)/ );
    
    if ( found && found[1].length ) {
      this.memberForm.get('profilePic')?.setValue('https://drive.google.com/uc?export=view&id=' + found[1]);     
    }
    else {
      this.memberForm.get('profilePic')?.setValue("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAz5ZMtOlPePvdHVDVKsx5LwBg2I6P7lAPb3kiqwa1C4MBqoByPu_NSKt9vybLck-jUciP5GLmtFE&usqp=CAU&ec=48665698");
    }
  }
}
