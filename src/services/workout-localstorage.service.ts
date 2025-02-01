import { Injectable } from "@angular/core";
import { UserWorkOut } from "../models/workout.model";



@Injectable({
    providedIn : 'root',
})

export class WorkOutLocalStorage{
    private key = "userWorkOuts";

    constructor() {}


    // GET the user workout list
    getAll():UserWorkOut[]{
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }


    // Add a new user workout
    addWorkOut(userWorkOut : Omit<UserWorkOut,'id'>):void{
        const data = this.getAll();
        const newId = data.length > 0 ? Math.max(...data.map(u => u.id)) + 1 : 1;
        const newWorkOut:UserWorkOut = {id : newId , ...userWorkOut};
        data.push(newWorkOut);
        localStorage.setItem(this.key,JSON.stringify(data));
    }


}
