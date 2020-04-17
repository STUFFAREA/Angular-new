import { Component, OnInit, ViewChild } from '@angular/core';
import { List } from '../shared/list.model';
import { ListService } from '../shared/list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  
  itemForm : FormGroup;
  list = [];
  id : string ;

  error : string = null;
  successMsg : string = null;
  editMode : boolean = false;

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
      for(var i in res) {
        this.list.push(res[i].addList);
      }
    })
}

addItem(title : string) { 

  if(!this.editMode) {                                        //Add new item
    this.listService.addItems(this.itemForm.value).subscribe(
      res => {
        this.list.push(title);
        this.listService.getList().subscribe();
        this.error = null;
        this.successMsg = res['message'];
        this.itemForm.reset();
      },
      err => {
        this.successMsg = null;
      });
  }else {                                               //Edit item
    console.log("yet to be updated");
  }   
}

addnewItem() {
  this.editMode = false;    
  this.itemForm.reset();
}
editItem(id : string,title : string) {
  this.editMode = true;    
  this.itemForm.patchValue({ addList: title });
  this.listService.getList().subscribe(
    res => {
      for(let i in res) {
        if(+id === +i){
          this.id = res[i]['_id'];
      return this.listService.updateItem(this.id);
        }
      }
    }
  )
}

}