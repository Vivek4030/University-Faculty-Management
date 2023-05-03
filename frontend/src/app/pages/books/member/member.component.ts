import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { FacultyMembersService } from 'src/app/shared/services/facultyMembers/facultyMembers.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  @Input() member: any = {};

  mouseOvered: boolean = false;

  clickedMemberId: string | null = null;
  clickedMemberInfo: any = {};
  memberCardInfo: any = {};
  isAdmin: boolean = false;
  
  memberForm: FormGroup;
  showModal: boolean = false;

  portfolioDetails = {
    fullName: "Arogyaswami Paulraj",
    designation: "Professor Emeritus",
    department: "Department of Electrical Engineering",
    profilePic: "http://web.stanford.edu/~apaulraj/images/paulraj.full.png",
    addressLine1: "Room 232, Packard Building",
    addressLine2: "350 Serra Mall, MC 9510",
    city: "Stanford",
    state: "CA",
    phone: "+1 (650) 723-8473",
    email: "apaulraj@stanford.edu",
    googleScholar: "http://web.stanford.edu/~apaulraj/pdf/Brief-Bio.pdf",
    researchGate: "http://web.stanford.edu/~apaulraj/pdf/PublicationList.pdf",
    cv: "http://web.stanford.edu/~apaulraj/pdf/CV.pdf",
    education: "B.E., Naval College of Engineering, Lonavala (1966) & Ph.D., Indian Institute of Technology, Delhi (1973)",
    interests: "MIMO Wireless Theory & Artificial Intelligence & Wireless Networks & Societal Impact of Information Technology",
    honors: "Member, American Academy of Arts and Sciences @ http://web.stanford.edu/~apaulraj/pdf/AAAS_2020.pdf & Member, American Academy of Arts and Sciences @ http://web.stanford.edu/~apaulraj/pdf/AAAS_2020.pdf & Member, American Academy of Arts and Sciences @ http://web.stanford.edu/~apaulraj/pdf/AAAS_2020.pdf"
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _facultyMembersService: FacultyMembersService,
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) {
    this.memberForm = new FormGroup({
      id: new FormControl(null),
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
  }

  /**
   * When the component is mounted, Activated Route is used to get the current url. If null is
   * returned, it means, user is on members page and members card need to be rendered. Else if some 
   * id is returned, it means we need to render details of that id's member 
   */
  ngOnInit(): void {
    this.isAdmin = this._authService.isLoggedIn();
    this.clickedMemberId = this._route.snapshot.paramMap.get('id');
    if (this.clickedMemberId !== null) {
      this.getMemberById(parseFloat(this.clickedMemberId));
      console.log(this.clickedMemberId);
      console.log(this.memberCardInfo);
    } else {
      this.memberCardInfo = this.member;
    }

    console.log(this.member.achievements.split('&'))
  }

  /**
   * Function gets called when Edit Form is submitted. If values of form are valid, updated values are
   * passed to backend through service else alert is given to user regarding error
   */
  public onUpdateMemberSubmit(): void {
    if (this.memberForm.valid) {
      console.log(this.memberForm.value);

      if(this.memberForm.value.profilePic) {
        this.formImgUrl(this.memberForm.value.profilePic);
      } 

      this._facultyMembersService.updateMember(this.memberForm.value).subscribe(
        (res: any) => {
          console.log('Updated member successfully');
          console.log(res);
          this._snackbarService.openSnackBar('Member Updated successfully', '');
          if (this.clickedMemberId === null) {
            //console.log(this.clickedmemberId);
            this.reloadComponent([`members/faculty`]);
          } else this.reloadComponent(['members/id', this.clickedMemberId]);
        },
        (err: any) => {
          console.log(err);
          if (err.error.message === 'Error updating the member: Validation error')
            alert('This member already exists');
          else alert('An error occurred while updating the member');
        }
      );

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
   * Function opens edit form when clicked on Edit button. stopPropagation is used to
   * prevent click event from spreading the whole parent div that will open that member's details
   * @param member - Gives the current details of the member
   * @param event - MouseEvent object representing the click event
   */
  public onEditClick(member: any, event: MouseEvent): void {
    console.log(member);
    event.stopPropagation();
    this.showModal = true;
    this.memberForm.patchValue(member);
  }

  /**
   * Function that redirects the user to details page of member when clicked on particular member card
   * @param member - Details of the member whose card is clicked
   */
  public onMemberClick(member: any): void {
    this._router.navigate(['members/id', member.id]);
  }


  /**
   * Function that fetches details of particular member from backend through the service
   * @param id - The id of the member whose details are required
   */
  public getMemberById(id: number): void {
    this._facultyMembersService.getMemberById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.clickedMemberInfo = res.data;
        this.memberCardInfo = this.clickedMemberInfo;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Function that deletes particular member through the service. Opens confirm dialog and asks user for
   * confirmation
   * @param id - The id of the member to be deleted
   * @param event - MouseClick Event object passed to prevent spread of click simulation to parent div 
   */
  public  onDeleteMember(id: number, event: MouseEvent) {
    event.stopPropagation();
    if (confirm('Do you want to delete this member?')) {
      this._facultyMembersService.deleteMember(id).subscribe(
        (res) => {
          console.log('Deleted successfully');
          this._snackbarService.openSnackBar('Member Deleted successfully', '');
          this.reloadComponent([`members/${this.member.type}`]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  /**
   * Function that closes modal when close button is clicked
   */
  public onCloseModal() {
    this.showModal = false;
    this.memberForm.reset();
  }

  /**
   * Function that makes changes in router service so that reloading page can be done using 
   * navigate method
   * @param route  - Route of the component that is to be rendered
   */
  public reloadComponent(route: Array<string>) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(route);
  }

  public formImgUrl(url: any) {
    let found = url.match( /d\/([A-Za-z0-9\-]+)/ );
    
    if ( found && found[1].length ) {
      this.memberForm.get('profilePic')?.setValue('https://drive.google.com/uc?export=view&id=' + found[1]);     
    }
  }
}
