import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CourseRequested, CoursesActionTypes, CourseLoaded } from './courses.actions';
import { mergeMap, map } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';

@Injectable()
export class CoursesEffects {

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CoursesActionTypes.CourseRequested),
        // OPERATOR mergeMap() PARALLELIZES MULTIPLE REQUESTS IF THAT'S THE CASE
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({course}))
    );

    constructor (private actions$: Actions, private coursesService: CoursesService) {}
}
