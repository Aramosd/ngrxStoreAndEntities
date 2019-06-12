import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {filter, map, tap, withLatestFrom} from "rxjs/operators";
import {CoursesService} from "../services/courses.service";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectAllCourses} from '../course.selectors';
import {AllCoursesRequested} from '../course.actions';

/*
                CHANGE DETECION AND REACTIVE EXTENSIONS
  COMMON MISCONCEPTION
  OnPush IS ONLY ABOUT THE COMPONETNS UPDATING THEMSELVES WHENEVER THE COMPONENT's @Input() CHANGES

  ALSO
  WHEN OBSERVABLE EMITS NEW VALUE AS LONG AS IT'S PLUGGED VIA THE async PIPE

  DOESNT WORK
  WHEN WE TRY TO MUTATE THE DATA DIRECTLY AT A COMPONENT LEVEL


*/
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
    /**
     *  ONLY NEED TO CHANGE IT HERE
     * 
     * IF THERE ARE OTHER COMPONETNS THAT WOULD HAVE DIFFERENT DET. STRATEGY
     * AS LONG AS ROOT COMPONENT USES OnPush ALL CHILD COMPONENTS INHERIT
     * 
     */
})

export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {

        this.store.dispatch(new AllCoursesRequested());

        const courses$ = this.store
          .pipe(
            select(selectAllCourses)
          );

        this.beginnerCourses$ = courses$.pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );

        this.promoTotal$ = courses$.pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

    }

}
