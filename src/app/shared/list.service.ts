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


public getPosts() {
    this.list =[];
    this.getList().subscribe(
      res => {
        for(var i in res) {
          this.list.push(res[i].addList);
          this.id.push(res[i]['_id']);          
        }
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

updateItem(data : string,id: string) {
    return this.http.put(environment.apiBaseUrl+'/list/'+id,data,
    {  headers: { Authorization: this.authService.getToken() }   });
}

removeItem(id : string) {
    return this.http.delete(environment.apiBaseUrl+'/list/'+id,
    {  headers: { Authorization: this.authService.getToken() }   });
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
}