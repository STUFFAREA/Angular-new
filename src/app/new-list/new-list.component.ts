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
  list = [];
  
  error : string = null;
  successMsg : string = null;

  constructor(private listService: ListService) {}

	ngOnInit() {
    this.getPosts();

		this.itemForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    });    
	} 

public getPosts() {
  this.listService.getList().subscribe(
    res => {
      console.log(res)
      // this.list = res['posts'];
      for(var i in res) {
        this.list.push(res[i].addList);
      }
      console.log(this.list)
    }
  )
}

public getPost() {
  this.listService.getList().subscribe()
}
addItem() {
    this.listService.addItems(this.itemForm.value).subscribe(
      res => {
        this.error = null;
        this.successMsg = res['message'];
        this.itemForm.reset();
      },
      err => {
        this.successMsg = null;
        this.error = err.error['message'];
      }
    );
    this.getPost();
  }


}