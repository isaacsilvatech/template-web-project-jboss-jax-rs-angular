import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countLoading: number = 0;

  constructor() { }

  loading(b: boolean) {
    if (b) {
      this.countLoading++;
      this.loadingSubject.next(true);
    } else {
      if (this.countLoading > 0) {
        this.countLoading--;
      }
      if (this.countLoading == 0) {
        this.loadingSubject.next(false);
      }
    }
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
