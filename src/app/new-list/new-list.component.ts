import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from 'src/app/shared/list.service';
import { List } from '../shared/list';
import { Task } from '../shared/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  connectedTo = [];

  id = [] ;

  editListIndex : number;
  editTaskIndex : string;

  constructor(private listService: ListService) {
    
  }

	ngOnInit() {    
    console.log("I am new list")

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
          this.connectedTo.push(res[i]['_id']);            
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
    var orderId = this.task.length;
        this.listService.addTask(this.taskForm.value,id,orderId).subscribe(
          res => {
            console.log(res);
            this.task.push({_id : res['savedTask']['_id'],addTask : this.taskForm.value.addTask ,_listId : id});
            this.taskForm.reset();
          },
          err => {
            console.log(err, 'error')
          })
        }
        
drop(event: CdkDragDrop<string[]>,listId : string) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);

  }
    console.log('here')
    var data = {
      'addTask' : event.container['data'][event.currentIndex]['addTask']
    }
  
  this.listService.updateTaskOrder(data, listId,event.currentIndex).subscribe(
    res =>{console.log("updated")});
}
removeList(listId : string) {
  this.listService.removeList(listId).subscribe(
    res => {
      this.list = this.list.filter(f => f._id !== listId)      
    }
  )
}

}