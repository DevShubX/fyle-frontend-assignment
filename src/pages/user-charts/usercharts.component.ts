import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { WorkOutLocalStorage } from "../../services/workout-localstorage/workout-localstorage.service";
import { UserWorkOut, Workout } from "../../models/workout.model";
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'workout-charts',
    templateUrl: "./user-charts.component.html",
    imports: [ChartModule,CommonModule,RouterLink],

})


export class ChartBasicDemo implements OnInit {
    basicData: any;

    basicOptions: any;

    platformId = inject(PLATFORM_ID);
    
    workoutTypes: String[] = [];
    userWorkouts: UserWorkOut[] = [];
    userWorkMinutes : number[] = [];
    userWorkOut : any;

    constructor(private cd: ChangeDetectorRef, private workoutLocalStorageService: WorkOutLocalStorage) { }

    ngOnInit() {
        this.loadData();
        this.initChart();
    }

    loadData(): void {
        // Fetch the workout data from local storage
        this.userWorkouts = this.workoutLocalStorageService.getAll();
        this.selectedUser(1);
    }

    selectedUser (id : number) {

        this.userWorkOut = this.userWorkouts.find(user => user.id === id);
        // // Extract unique workout types
        this.workoutTypes = Array.from(new Set(this.userWorkOut?.workouts.map((workout : Workout) => workout.type)));
        this.userWorkMinutes = this.userWorkOut?.workouts.map((workout : Workout) => workout.minutes) ?? [];
        this.initChart();

    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            this.basicData = {
                labels: this.workoutTypes,
                datasets: [
                    {
                        label: 'Minutes',
                        data: this.userWorkMinutes,
                        backgroundColor: [
                            'rgba(6, 182, 212, 0.2)',
                        ],
                        borderColor: [ 'rgba(6, 182, 212)',],
                        borderWidth: 1,
                    },
                ],
            };
        }
    }
}