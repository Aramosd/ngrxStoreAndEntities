import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesService} from '../services/courses.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import { AllCoursesRequested } from '../courses.actions';
import { selectAllCourses, selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from '../courses.selectors';
import { map } from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
        // No longer needed after setting up Actions/Effets
        // private coursesService: CoursesService,
        private store: Store<AppState>) {

    }

    ngOnInit() {

        //  BEFORE THE MAGIC
        // const courses$ = this.coursesService.findAllCourses();

        this.store.dispatch(new AllCoursesRequested());

        const courses$ = this.store
            .pipe(
                select(selectAllCourses)
            );

        /*
                    NO NEED FOR THESE SELECTION LOGIC TO BE PRESENT
                    AFTER WE DEFINE SELECTORS USING THE OOB ADAPTER

                    this.beginnerCourses$ = courses$.pipe(
                        map(courses => courses.filter(course => course.category === 'BEGINNER') )
                    );

                    this.advancedCourses$ = courses$.pipe(
                        map(courses => courses.filter(course => course.category === 'ADVANCED') )
                    );

                    this.promoTotal$ = courses$.pipe(
                        map(courses => courses.filter(course => course.promo).length)
                    );
        */
        // WE TURN IT INTO A PURE PROJECTION OF STATE

        this.beginnerCourses$ = this.store.pipe(
            select(selectBeginnerCourses)
        );

        this.advancedCourses$ = this.store.pipe(
            select(selectAdvancedCourses)
        );

        this.promoTotal$ = this.store.pipe(
            select(selectPromoTotal)
        );
        /*
            BENEFITS:
            -WE ELIMINATE DUPLICATES, DEPENDEING ON THE CHANGE DETECTION STRATEGY
            THIS MIGHT BE BENEFITIAL !
        */
    }

}
