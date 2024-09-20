import { ChangeDetectorRef, Component } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'cmp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  protected loading: boolean = false;

  constructor(private loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {
    this.loadingService.isLoading().subscribe(b => {
      setTimeout(() => {
        this.loading = b;
        this.changeDetectorRef.detectChanges();
      })
    })
  }
}
