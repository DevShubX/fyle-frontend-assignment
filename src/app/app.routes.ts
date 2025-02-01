import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/homepage/homepage.component';
import { ChartBasicDemo } from '../pages/user-charts/usercharts.component';

export const routes: Routes = [
    {
        path : "",
        component: HomePageComponent,
        title: "Health Tracker - Home"
    },
    {
        path : "charts",
        component : ChartBasicDemo,
        title : "Charts",
    }
];
