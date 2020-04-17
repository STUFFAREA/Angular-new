import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class ListService {


constructor(private http : HttpClient,private authService : AuthService) {}
list ;

getList() {
    return this.http.get(environment.apiBaseUrl+'/list',
            { headers: { Authorization: this.authService.getToken() }})
            
}


addItems(item : string) {               
    return this.http.post(environment.apiBaseUrl+'/list', item, 
    {  headers: { Authorization: this.authService.getToken() }   });      
}

updateItem(data : string) {
    console.log(data);
    return this.http.put(environment.apiBaseUrl+'/list/edit/'+data,
    {  headers: { Authorization: this.authService.getToken() }   });
}

// removeItems(id : number) {
//     this.worklist.splice(id,1);
// }
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