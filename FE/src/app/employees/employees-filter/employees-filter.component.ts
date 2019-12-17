import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, share } from 'rxjs/operators';

@Component({
  selector: 'app-employees-filter',
  templateUrl: './employees-filter.component.html'
})
export class EmployeesFilterComponent {
  private filterSubject$ = new Subject<string>();
  public value = '';

  filterChange$ = this.filterSubject$.asObservable().pipe(
    debounceTime(400),
    distinctUntilChanged(),
    share()
  );

  onSearch(value: string = '') {
    this.value = value.trim();
    this.filterSubject$.next(this.value);
  }

}
