


import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './courses.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import { selectCourseById } from '../courses.selectors';
import { CourseRequested } from '../courses.actions';



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService:CoursesService,
        private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        /*
                Problems on this implementeation

                Whenever we go back using the browser buttons we readch the backend
                So multiple loads  of repetitive data result

                const courseId = route.params['id'];

                return this.coursesService.findCourseById(courseId);
        */

        //  FIRST CHECK IF THE Course ALREADY EXISTS IN THE STORE
        const courseId = route.params['id'];

        return this.store.pipe(
            select(selectCourseById(courseId)),
            tap(course => {
                if (!course) {
                    this.store.dispatch(new CourseRequested({ courseId }));
                }
            }),
            // Filter undefined values, so that we don';t send it to the Router
            filter(course => !!course),
            // Only when the Observable is ocmpleted the Router will consider transition
            // That is why we add the first() method, so that we reach the target route
            first()
        );
    }

}

