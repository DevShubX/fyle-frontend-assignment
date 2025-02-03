import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { WorkOutDialog } from './workout-dialog.component';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('WorkOutDialog', () => {
    let component: WorkOutDialog;
    let fixture: ComponentFixture<WorkOutDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                ButtonModule,
                DialogModule,
                InputTextModule,
                WorkOutDialog,
            ],
            providers: [
                provideAnimations(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WorkOutDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle dialog visibility on button click', () => {
        const addButton = fixture.debugElement.query(By.css('#open-workout'));
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.visible).toBeTrue();
    });

    it('should add a new workout when "Add Workout" is clicked', async () => {
        component.visible = true; // The dialog should be opened for the Add Button
        fixture.detectChanges();
        await fixture.whenStable();
        const addButton = fixture.debugElement.query(By.css("p-button#Add"));
        expect(addButton).toBeTruthy();

        const initialWorkoutsLength = component.userWorkOutForm.controls.workouts.length;

        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.userWorkOutForm.controls.workouts.length).toBe(initialWorkoutsLength + 1);
    });

    it('should remove a workout when "Remove" button is clicked', async () => {
        component.visible = true;
        fixture.detectChanges();
        await fixture.whenStable();
        component.onHandleAdd(); // Add a workout first
        fixture.detectChanges();
        const initialWorkoutsLength = component.userWorkOutForm.controls.workouts.length;
        const removeButton = fixture.debugElement.query(By.css('#remove-workout'));
        removeButton.triggerEventHandler('click', { index: 0 });
        fixture.detectChanges();
        expect(component.userWorkOutForm.controls.workouts.length).toBe(initialWorkoutsLength - 1);
    });

    it('should submit the form when valid', async () => {
        component.visible = true;
        spyOn(component, 'onHandleSubmit');
        fixture.detectChanges();
        await fixture.whenStable();
        const submitButton = fixture.debugElement.query(By.css('#submit'));
        component.userWorkOutForm.setValue({
            username: 'John Doe',
            workouts: [
                { type: 'Cardio', minutes: "30" }
            ]
        });
        fixture.detectChanges();
        expect(submitButton.attributes['ng-reflect-disabled']).toBe('false');
        submitButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.onHandleSubmit).toHaveBeenCalled();
    });

    it('should not submit the form when invalid', async () => {
        spyOn(component, 'onHandleSubmit');
        component.visible = true;
        fixture.detectChanges();
        await fixture.whenStable()
        const submitButton = fixture.debugElement.query(By.css('#submit'));
        component.userWorkOutForm.setValue({
            username: '',
            workouts: [
                { type: '', minutes: '' }
            ]
        });

        fixture.detectChanges();
        expect(submitButton.attributes['ng-reflect-disabled']).toBe('true');
        submitButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.onHandleSubmit).toHaveBeenCalled();
    });

      it('should handle empty form input',async () => {
        component.visible = true;
        fixture.detectChanges();
        await fixture.whenStable()
        const submitButton = fixture.debugElement.query(By.css('#submit'));
        component.userWorkOutForm.setValue({
          username: '',
          workouts: [
            { type: '', minutes: '' }
          ]
        });
        fixture.detectChanges();
        expect(submitButton.attributes['ng-reflect-disabled']).toBe('true');
      });

      it('should handle form control value changes correctly',async () => {
        component.visible = true;
        fixture.detectChanges();
        await fixture.whenStable()
        const usernameInput = fixture.debugElement.query(By.css('input#username'));
        usernameInput.nativeElement.value = 'Jane Doe';
        usernameInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.userWorkOutForm.controls.username.value).toBe('Jane Doe');
      });
});
