import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { WorkOutLocalStorage } from "../../services/workout-localstorage/workout-localstorage.service";
import { UserWorkOut, Workout } from "../../models/workout.model";
import { ButtonModule } from "primeng/button";
import { TableModule } from 'primeng/table'
import { CommonModule } from "@angular/common";
import { PaginatorModule } from "primeng/paginator";
import { RefreshService } from "../../services/data-refresh/data-refresh.service";

@Component({
    selector: "workout-table",
    templateUrl: "./workout-table.component.html",
    imports: [
        FormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        TableModule,
        CommonModule,
        PaginatorModule,
    ],
})


export class WorkOutTable implements OnInit {
    searchTerm: string = '';
    userWorkOuts: UserWorkOut[] = [];
    filteredWorkOuts: UserWorkOut[] = [];
    workoutTypes: string[] = [];
    selectedWorkOutType = "";

    constructor(
        private workOutLocalStorageService: WorkOutLocalStorage,
        private refreshService : RefreshService,
    ) { }


    ngOnInit(): void {
        this.loadData();
        this.refreshService.refreshDataIndicator$.subscribe(()=>{
            this.loadData();
        })
    }


    loadData() {
        this.userWorkOuts = this.workOutLocalStorageService.getAll();
        this.filteredWorkOuts = [...this.userWorkOuts];

        // Extract unique workout types
        const allWorkOuts = this.userWorkOuts.flatMap(user => user.workouts);
        this.workoutTypes = Array.from(new Set(allWorkOuts.map(workout => workout.type)));

    }

    filterTable() {
        this.filteredWorkOuts = this.userWorkOuts.filter(user => 
            user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        );

        if(this.selectedWorkOutType){
            this.filteredWorkOuts = this.filteredWorkOuts.filter(user => 
                user.workouts.some(workout => workout.type === this.selectedWorkOutType)
            )
        }

    }

    clearFilters() {
        this.selectedWorkOutType = "";
        this.filteredWorkOuts = [...this.userWorkOuts];
    }

    // This is a helper function to get the workout types as a comma-separated string
    getWorkoutTypes(workouts: Workout[]): string {
        return workouts.map(workout => workout.type).join(", ");
    }

    // This is a helper function to calculate the total workout minutes
    getTotalMinutes(workouts: Workout[]): number {
        return workouts.reduce((total, workout) => total + workout.minutes, 0);
    }
}