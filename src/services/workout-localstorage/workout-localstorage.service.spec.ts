import { TestBed } from '@angular/core/testing';
import { WorkOutLocalStorage } from './workout-localstorage.service';
import { UserWorkOut } from '../../models/workout.model';


describe('WorkOutLocalStorage Service', () => {
  let service: WorkOutLocalStorage;
  const storageKey = 'userWorkOuts';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOutLocalStorage);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array when there are no workouts in localStorage', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should return stored workouts from localStorage', () => {
    const mockWorkouts: UserWorkOut[] = [
      { id: 1, username: 'JohnDoe', workouts: [{ type: 'Push-ups', minutes: 30 }] },
      { id: 2, username: 'JaneDoe', workouts: [{ type: 'Sit-ups', minutes: 20 }] },
    ];
    localStorage.setItem(storageKey, JSON.stringify(mockWorkouts));
    expect(service.getAll()).toEqual(mockWorkouts);
  });

  it('should add a new workout to localStorage', () => {
    const newWorkout = { username: 'NewUser', workouts: [{ type: 'Squats', minutes: 15 }] };
    service.addWorkOut(newWorkout);
    
    const storedWorkouts = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(storedWorkouts.length).toBe(1);
    expect(storedWorkouts[0].id).toBe(1);
    expect(storedWorkouts[0].username).toBe('NewUser');
  });

  it('should increment id correctly when adding multiple workouts', () => {
    service.addWorkOut({ username: 'User1', workouts: [{ type: 'Jumping Jacks', minutes: 10 }] });
    service.addWorkOut({ username: 'User2', workouts: [{ type: 'Lunges', minutes: 20 }] });
    
    const storedWorkouts = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(storedWorkouts.length).toBe(2);
    expect(storedWorkouts[0].id).toBe(1);
    expect(storedWorkouts[1].id).toBe(2);
  });

  it('should handle localStorage being null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getAll()).toEqual([]);
  });
});
