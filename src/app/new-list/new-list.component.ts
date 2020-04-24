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
  
  updateListTitleForm : FormGroup;
  updateTaskTitleForm : FormGroup;
  taskForm :  FormGroup;

  list : List[];
  task : Task[] = [];

  id = [] ;

  editListIndex : number;
  editTaskIndex : string;

  constructor(private listService: ListService ,private router : Router, private route: ActivatedRoute) {
    console.log("I am new lits const")
  }

	ngOnInit() {    
    console.log("I am new lits ngononint")

    this.getList();
    
    this.updateListTitleForm = new FormGroup({
			'addList' : new FormControl(null,Validators.required)
    }); 
    this.updateTaskTitleForm = new FormGroup({
			'addTask' : new FormControl(null,Validators.required)
    }); 
    this.taskForm = new FormGroup({
			'addTask' : new FormControl(null)
    }); 		   
  }

  getList() {
    this.listService.getList().subscribe(
      res => {
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

  removeList(id:number) {
    for(var i in this.id) { 
      if(+i === +id){
        this.listService.removeItem(this.id[i]).subscribe(
          res => {
        this.list = this.listService.list; 
        this.id = this.listService.id;
        }); 
      }  
    }
  }

  removeTask(taskId : string) {    
    this.listService.removeTask(taskId).subscribe(
      res => {
        this.task = this.task.filter(f => f._id !== taskId)
    }); 
  }

  editListTitle(i : number) {
    this.editListIndex = i; 
  }

  update(title : string,listId : string) {    
      var data = {
        'addList' : title
      }
      this.listService.updateItem(data,listId).subscribe(
        res => {
          const index = this.list.findIndex(h => (h._id === listId))
          this.list[index]['addList'] = title;
        }); 
    this.editListIndex = null;
  }
  updateTask(title : string,taskId : string){
    var data = {
      'addTask' : title
    }
    this.listService.updateTask(data,taskId).subscribe(
      res => {
        const index = this.task.findIndex(h => (h._id === taskId))
        this.task[index]['addTask'] = title;
      }); 
  this.editTaskIndex = null;
  }
  editTaskTitle(i : string) {
    this.editTaskIndex = i; 
    console.log(this.editTaskIndex)

  }

  addTask(id : string) {
        this.listService.addTask(this.taskForm.value,id).subscribe(
          res => {
            console.log(res);
            this.task.push({_id : res['savedTask']['_id'],addTask : this.taskForm.value.addTask ,_listId : id});
            this.taskForm.reset();
          },
          err => {
            console.log(err, 'error')
          })
        }  
  }