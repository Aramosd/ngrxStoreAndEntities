import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AllCoursesLoaded, AllCoursesRequested, CourseActionTypes,
  CourseLoaded, CourseRequested, LessonsPageRequested, LessonsPageLoaded, LessonsPageCancelled} from './course.actions';
import {throwError, of} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {CoursesService} from './services/courses.service';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {allCoursesLoaded} from './course.selectors';

@Injectable()
export class CourseEffects {

  @Effect()
  loadCourse$ = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
      map(course => new CourseLoaded({course})),
      catchError(err => {
        console.log('error loading course ', err);
        return throwError(err);
      })

  );

  @Effect()
  loadAllCourses$ = this.actions$
    .pipe(
      ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
      withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
      filter(([action, allCourses]) => !allCourses),
      mergeMap(() => this.coursesService.findAllCourses()),
      map(courses => new AllCoursesLoaded({courses})),
      catchError(err => {
        console.log('error loading all courses ', err);
        return throwError(err);
      })
    );

    @Effect()
    loadLessonsPage$ = this.actions$
      .pipe(
        ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
        //            DONT DO THIS
        /*
        mergeMap(({ payload }) => this.coursesService.findLessons(payload.courseId,
          payload.page.pageIndex,
          payload.page.pageSize)
        ),
         CATCH ERROR IN THE WONRG PLACE BECAUSE
        WE WANT TO RECOVER THE OBSERVABLE FETCHED BY THE BACKEND
        NOT THE OUTSIDE OBSERVABLE CHAIN !!!
        map(lessons => new LessonsPageLoaded({ lessons })),
        catchError(err => {
          console.log('SOMETHING WENT WRONG', err);
          this.store.dispatch(new LessonsPageCancelled());
          return of([]);
        }),
            INSTEAD HOOK THE ERROR HANDLER IN THE INNER OBSERVABLE
            THE API CALL !
        */
       mergeMap(({ payload }) => {
        return this.coursesService.findLessons(payload.courseId,
          payload.page.pageIndex,
          payload.page.pageSize)
            .pipe(
              catchError((error) => {
                console.log('SOMETHING WENT WRONG', error);
                this.store.dispatch(new LessonsPageCancelled());
                return of([]);
              })
            );
       }),
       map(lessons => new LessonsPageLoaded({ lessons })),
      );

  constructor(private actions$ :Actions, private coursesService: CoursesService,
              private store: Store<AppState>) {

  }

}
