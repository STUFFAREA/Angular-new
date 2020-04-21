import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/shared/list.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit,OnChanges {
  
  itemForm : FormGroup;
  list = [];
  id = [] ;
  urlId: string;

  active :  boolean = false;
  error : string = null;
  successMsg : string = null;
  editMode : boolean = false;
  idByUrl : Subscription;
  
  constructor(private listService: ListService ,private router : Router, private route: ActivatedRoute) {}

	ngOnInit() {
    console.log("i am newlit")
    // this.listService.getPosts();

    this.list = this.listService.list; 
    this.itemForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    }); 
    this.route.params.subscribe( (params : Params) => this.urlId = params['id'] );
		   
  } 
  ngOnChanges() {
    this.ngOnInit();
  }

editItem(id : number,title : string) {  
  this.active=true;
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
        this.itemForm.reset();
        this.listService.getPosts();
        }
      ); 
  }  
}
}


}