import { Component, OnInit } from '@angular/core';
import { ListService } from '../shared/list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  
  itemForm : FormGroup;
  list = [];
  id = [] ;
  urlId: string;

  error : string = null;
  successMsg : string = null;
  editMode : boolean = false;
  idByUrl : Subscription;
  constructor(private listService: ListService,private router : Router, private route: ActivatedRoute) {}

	ngOnInit() {
    this.getPosts();
    this.itemForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    }); 
    this.route.params.subscribe( (params : Params) => this.urlId = params['id'] );
    
		   
	} 

public getPosts() {
  this.list =[];
  this.listService.getList().subscribe(
    res => {
      for(var i in res) {
        this.list.push(res[i].addList);
        this.id.push(res[i]['_id']);
      }
    })
}

addItem(title : string) { 
  if(!this.editMode) {                                        //Add new item
    this.listService.addItems(this.itemForm.value).subscribe(
      res => {
        this.error = null;
        this.successMsg = res['message'];
        this.itemForm.reset();
        this.router.navigate(['dashboard/new-list'])
      },
      err => {
        this.successMsg = null;
      });
  }else {     
    this.listService.updateItem(this.itemForm.value,this.urlId).subscribe(res => { console.log(res, 'Updated') });    
    this.itemForm.reset();
  }   
  this.getPosts();
}

addnewItem() {
  this.editMode = false;    
  this.itemForm.reset();
  this.router.navigate(['dashboard/new-list'])
}

editItem(id : number,title : string) {  
  this.editMode = true;     
  this.error = null;
  this.successMsg = null;
  this.itemForm.patchValue({ addList: title });  
        for(var i in this.id) { 
          if(+i === +id){
            this.router.navigate(['/dashboard','new-list',this.id[i]])  
        }              
      }     
}

removeItem(id:number) {
  for(var i in this.id) { 
    if(+i === +id){
      this.listService.removeItem(this.id[i]).subscribe(
        res => {
        console.log("item removed")
        }
      ); 
  }  
}
}


}