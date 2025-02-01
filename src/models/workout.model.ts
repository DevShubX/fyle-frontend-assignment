export interface Workout{
    type : string;
    minutes : number;
}


export interface UserWorkOut{
    id : number;
    username : string;
    workouts : Workout[];
}
