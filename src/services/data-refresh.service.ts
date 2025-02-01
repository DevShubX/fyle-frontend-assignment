import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})

export class RefreshService{

    // Shared Service for refreshing the data on dialog box submission

    refreshDataIndicator$ = new EventEmitter<void>();


    triggerRefresh(){
        this.refreshDataIndicator$.emit();
    }
    

}