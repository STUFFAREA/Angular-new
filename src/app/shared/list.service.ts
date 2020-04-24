import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { List } from './list';
import { Task } from './task';

// export interface List {
//     listId : string;
//     addList : string
// }
// export interface Task {
//     listId : string;
//     task : [{taskId : string,
//             taskTitle : string}]
// }

@Injectable()
export class ListService {


constructor(private http : HttpClient,private authService : AuthService) {}

list : List[] = [];
task : Task[] = [];

id = [];


// public getPosts() {
//     // this.list = [];
//     this.getList().subscribe(
//       res => {
//         for(var i in res) {
//            this.list.push({ listId : res[i]['_id'],addList : res[i].addList });
//         } 
//         return this.list;
//         // this.getTasks();

//     })
//     // console.log('list out in serv',this.list)
// }

// public getTasks() {   
//     // this.task = [];
//     // console.log(this.list[i]['listId'])
//     // for(var i in this.list) { 
//     this.getTask('5ea0288619985c30dcc3420a').subscribe(
//       res => {
//           console.log(res,'task');return;
//         for(var index in res) {
//             this.task.push({
//                     _id : res[index]['_id'],
//                 addList : res[index]['addTask'],
//                 _listId : res[index]['_listId']
//             });
//             }    
//     }
//     );
// // }
// return this.task;
// console.log([this.task,this.list,'task'])
// }

getList() : Observable<List[]> {
    return this.http.get<List[]>(environment.apiBaseUrl+'/list',
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

updateTask(data,id: string) {    
    console.log(data,id)
    return this.http.put(environment.apiBaseUrl+'/list/tasks/'+id,data,
    {  headers: { Authorization: this.authService.getToken() }   });
}
removeItem(id : string) {
    return this.http.delete(environment.apiBaseUrl+'/list/'+id,
    {  headers: { Authorization: this.authService.getToken() }   });
}
removeTask(id : string) {
    return this.http.delete(environment.apiBaseUrl+'/list/tasks/'+id,
    {  headers: { Authorization: this.authService.getToken() }   });
}
getTask(id : string) : Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiBaseUrl+'/list/'+id+'/tasks');            
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