import { Component, OnInit } from '@angular/core';
import { List } from '../shared/list.model';
import { ListService } from '../shared/list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  
  itemForm : FormGroup;
  
  error : string = null;
  successMsg : string = null;

  constructor(private listService: ListService) {}

	ngOnInit(): void {
		this.itemForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
		});
	}
 

  addItem() {
    this.listService.addItems(this.itemForm.value).subscribe(
      res => {
        this.successMsg = res['message'];
      },
      err => {
        this.error = err.error['message'];
      }
    );
  }


}