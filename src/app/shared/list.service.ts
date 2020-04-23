import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class ListService {


constructor(private http : HttpClient,private authService : AuthService) {
    this.getPosts();
}

list = [];
id = [];
task = [];


public getPosts() {
    this.list = [];
    // this.id= [];
    this.getList().subscribe(
      res => {
        for(var i in res) {
          this.list.push(res[i].addList);
          this.id.push(res[i]['_id']); 
        }
    this.getTasks();

    })
}

getList() {
    return this.http.get(environment.apiBaseUrl+'/list',
            { headers: { Authorization: this.authService.getToken() }})            
}

addItems(item : string) {               
    return this.http.post(environment.apiBaseUrl+'/list', item, 
    {  headers: { Authorization: this.authService.getToken() }   });      
}

updateItem(data,id: string) {
    return this.http.put(environment.apiBaseUrl+'/list/'+id,data,
    {  headers: { Authorization: this.authService.getToken() }   });
}

removeItem(id : string) {
    return this.http.delete(environment.apiBaseUrl+'/list/'+id,
    {  headers: { Authorization: this.authService.getToken() }   });
}

public getTasks() {   
    this.task =[];

    for(var i in this.id) { 

    this.getTask(this.id[i]).subscribe(
      res => {
        for(var index in res) {
          this.task.push(res[index]['addTask']);       
        }
        console.log(this.task);

    })
}
}

getTask(id : string) {
    return this.http.get(environment.apiBaseUrl+'/list/'+id+'/tasks');            
}

addTask(data,id: string) {            
    return this.http.post(environment.apiBaseUrl+'/list/'+id+'/tasks', data, 
    {  headers: { Authorization: this.authService.getToken() }   });      
}
}

// toggleCompleted(index:number, status : boolean) {
//     this.worklist[index].isComplete = status;
// }
// remaining() : number {
//     return this.val = this.worklist.filter(function(item) { return !item.isComplete } ).length;
// }
// completed() : number {
//     return this.val = this.worklist.filter(function(item) { return  item.isComplete } ).length;
// }
// applyFilter(filter : string) {
//     if(filter === 'all') { 
//         return this.worklist; 
//     }
//     else if(filter === 'remaining') {  
//         return this.worklist.filter(function(item) { 
//           return !item.isComplete; 
//       }) 
//     } 
//       else if(filter === 'completed') {  
//         return this.worklist.filter(function(item) {  
//           return item.isComplete; 
//         }) 
//     }   
// }