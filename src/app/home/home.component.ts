import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemForm : FormGroup;

  constructor(private dialogRef: MatDialogRef<HomeComponent>) {}

	ngOnInit() {
    this.itemForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    }); 	   
  } 

  save() {
    if(!this.itemForm.valid) {
			return;
		}
    this.dialogRef.close(this.itemForm.value);
  }
  close() {
    this.dialogRef.close();
}

}
