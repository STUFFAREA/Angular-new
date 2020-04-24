import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/shared/list.service';
import { List } from 'src/app/shared/list';
import { Task } from '../shared/task';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  
  updateTitleForm : FormGroup;
  taskForm :  FormGroup;

  list : List[];
  task : Task[] = [];

  id = [] ;

  editIndex : number;

  constructor(private listService: ListService ,private router : Router, private route: ActivatedRoute) {}

	ngOnInit() {    
    this.getList();
    
    this.updateTitleForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    }); 
    this.taskForm = new FormGroup({
			'addTask' : new FormControl(null)
    }); 		   
  }

  getList() {
    this.listService.getList().subscribe(
      res => {
        console.log(res,'getList')
        this.list = res;
        for(var i in res) {
          this.getTask(res[i]['_id']);
        }
      })
  }
  getTask(id : string) {    
    this.listService.getTask(id).subscribe(
      res => {  
        for(var i in res) {
        this.task.push({_id : res[i]['_id'],addTask : res[i]['addTask'],_listId : res[i]['_listId']});
        }
        // "5ea0288619985c30dcc3420a"
      })
  }

  removeItem(id:number) {
    for(var i in this.id) { 
      if(+i === +id){
        this.listService.removeItem(this.id[i]).subscribe(
          res => {
        // this.listService.getPosts();
        this.list = this.listService.list; 
        this.id = this.listService.id;
        }); 
      }  
    }
  }

  editListTitle(i : number) {
    this.editIndex = i; 
  }

  update(title : string) {
    for(var index in this.id) { 
      var data = {
        'addList' : title
      }
      if(+index === +this.editIndex){
        this.listService.updateItem(data,this.id[index]).subscribe(
          res => {
            // this.listService.getPosts();    
            this.list = this.listService.list; 
            this.id = this.listService.id;
          }
        );
      }              
    }    
    this.editIndex = null;
  }
  // editTaskTitle(i : number) {
  //   this.editIndex = i; 
  // }

  addTask(id : string) {
        this.listService.addTask(this.taskForm.value,id).subscribe(
          res => {
            console.log(res);
            this.task.push({_id : 'id',addTask : this.taskForm.value.addTask ,_listId : id});
            this.taskForm.reset();
          },
          err => {
            console.log(err, 'error')
          })
        }  
  }