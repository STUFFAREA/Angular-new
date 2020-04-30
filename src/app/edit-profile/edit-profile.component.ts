import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

 
editProfileForm : FormGroup;
gender: string[] = ['Male','Female','Other'];
profession: string[] = ['Student','Employee','Other'];
minDate: Date;
maxDate: Date;


  constructor(private dialogRef: MatDialogRef<EditProfileComponent>, 
    @Inject(MAT_DIALOG_DATA) private data : any)  {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 40, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

	ngOnInit(): void {
		this.editProfileForm = new FormGroup({
			'username' : new FormControl(this.data ? this.data.username :  null,[Validators.required]),
			'firstName' : new FormControl(this.data ? this.data.firstName :  null),
			'lastName' : new FormControl(this.data ? this.data.lastName :  null),
			'gender' : new FormControl(this.data ? this.data.gender : null),
			'DOB' : new FormControl(this.data ? this.data.DOB : null),
			'phoneNum' : new FormControl(this.data ? this.data.phoneNum : null),
			'profession' : new FormControl(this.data ? this.data.profession : null),
		});
  }
  
	onSubmit() {
		if(!this.editProfileForm.valid) {
			return;
    }  
  //   this.authService.changePassword(this.editProfileForm.value).subscribe(
  //     res => {
  //       this.error = null;
	// 	    console.log('Password changed succesfully')
  //       this.successMsg = res['message'];
  //       setTimeout(() => this.router.navigate(['/dashboard']),1000);
  //     },
  //     err => {
  //       this.successMsg = null;
  //       if(err.status === 400) {
  //       this.error = err.error['message'];
  //         const array = err.error;
  //         for(var i in array) {
  //           const validationErrors = err.error[i].path;
  //           Object.values(validationErrors).forEach((val:string) => {
  //             const formControl = this.editProfileForm.get(val);
  //             if (formControl) {
  //             formControl.setErrors({
  //               serverError: err.error[i].context.label
  //             });		
  //             }		
  //           });
  //         }	          
  //     }
  //   }
  //   );   
  }
  
  onReset() {
    this.editProfileForm.reset();
  }
  
  save() {
    if(!this.editProfileForm.valid) {
			return;
		}
    this.dialogRef.close(this.editProfileForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
