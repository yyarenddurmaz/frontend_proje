import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css'],
})
export class PipesComponent implements OnInit {
  name: string = 'john doe';
  currency: number = 1234.56;
  date: Date = new Date();
  pi: number = 3.14159265359;
  last$ = new BehaviorSubject<string>('Lorem');
  myObservable$: Observable<number> = of(42);
  object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {}
  staticArray = [
    { name: 'yaren', currency: 5678.9, date: new Date(), pi: 3.14159265359 },
    { name: 'bast', currency: 9876.54, date: new Date(), pi: 3.14159265359 },
    { name: 'ramses', currency: 9876.54, date: new Date(), pi: 3.14159265359 },
  ];
}
