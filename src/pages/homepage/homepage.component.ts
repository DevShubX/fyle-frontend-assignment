import { Component } from "@angular/core";
import { WorkOutDialog } from "../../components/workout-dialog/workout-dialog.component";
import { WorkOutTable } from "../../components/workout-table/workout-table.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "home-page",
    templateUrl: './homepage.component.html',
    imports: [
    WorkOutDialog,
    WorkOutTable,
    RouterLink
],
})


export class HomePageComponent {};