import { Component } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Plus } from 'lucide-angular';
import { WorkOutLocalStorage } from "../../services/workout-localstorage/workout-localstorage.service";
import { RefreshService } from "../../services/data-refresh/data-refresh.service";

@Component({
    selector: "workout-dialog",
    templateUrl: './workout-dialog.component.html',
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        FloatLabel,
        ReactiveFormsModule,
        CommonModule,
        LucideAngularModule,
    ],
})


export class WorkOutDialog {

    constructor(
        private workOutLocalStorageService : WorkOutLocalStorage,
        private refreshService:RefreshService
    ){}

    readonly Plus = Plus;
    visible: boolean = false;

    userWorkOutForm = new FormGroup({
        username: new FormControl("",[Validators.required]),
        workouts: new FormArray([
            new FormGroup({
                type: new FormControl("",[Validators.required]),
                minutes: new FormControl("",[Validators.required]),
            },),
        ]),
    })


    onAddWorkOutVisible() {
        this.visible = true;
    }

    onHandleRemove(index: number) {
        if (this.userWorkOutForm.controls.workouts.length > 1) {
            this.userWorkOutForm.controls.workouts.removeAt(index);
        }
    }

    onHandleAdd() {
        this.userWorkOutForm.controls.workouts.push(
            new FormGroup({
                type: new FormControl("",[Validators.required]),
                minutes: new FormControl("",[Validators.required]),
            })
        )
    }

    onSubmitFormReset(){
        this.userWorkOutForm.reset();
        this.userWorkOutForm.controls.workouts.clear();
        this.onHandleAdd();
    }

    onHandleSubmit() {
        if (this.userWorkOutForm.valid) {
            const formData = this.userWorkOutForm.value; // Get form values
            const userWorkout = {
                username: formData.username!, // Ensure name is a string
                workouts: formData.workouts?.map(workout => ({
                    type: workout?.type!, // Ensure type is a string
                    minutes: parseInt(workout?.minutes!), // Ensure minutes is a number
                })) ?? [],
            };
            this.workOutLocalStorageService.addWorkOut(userWorkout);
            this.onSubmitFormReset(); // Reset form after submission
            this.refreshService.triggerRefresh();
        }
    }
   
}