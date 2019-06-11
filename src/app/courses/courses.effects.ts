import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CourseRequested, CoursesActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from './courses.actions';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { allCoursesLoaded } from './courses.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class CoursesEffects {

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CoursesActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({course})),
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CoursesActionTypes.AllCoursesRequested),
        //              BEFORE REFACTOR
        // OPERATOR mergeMap() PARALLELIZES MULTIPLE REQUESTS IF THAT'S THE CASE
        //              AFTER REFACTOR
        //  Knowing if all courses have been loaded previously to the app's state
        // WithLatestFrom() ALLOWS US TO COMBINE VALUES OF 2 DIFFERENT OBSERVABLEs
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        //  filter TRIGGER ONLY THE REQUEST IF THE RECORDS HAVE NOT BEEN LOADED
        //  TUPLE WITH THE RESULT OF 1st (ofType) AND 2nd (withLatestFrom) OBSERVABLES
        filter(([action, coursesLoaded]) => !coursesLoaded),
        mergeMap(action => this.coursesService.findAllCourses()),
        //              FINALLY
        map(courses => new AllCoursesLoaded({ courses }))
    );

    constructor (private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
