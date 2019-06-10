import { Action } from '@ngrx/store';
import { Course } from './model/course';

export enum CoursesActionTypes {
  /*
        By convention,

        INSIDE THE SQUARE BRACKETS SHOULD BE SPECIFIED THE SOURCE OF THE ACTION
        AFTER THAT THE EVENT ITSELF !
   */
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Card List] All Courses',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
}

export class CourseRequested implements Action {
  readonly type = CoursesActionTypes.CourseRequested;
  constructor (public payload: { courseId: number }) {}
}

export class CourseLoaded implements Action {
  readonly type = CoursesActionTypes.CourseLoaded;
  constructor (public payload: { course: Course }) {}
}

export class AllCoursesRequested implements Action {
  readonly type = CoursesActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CoursesActionTypes.AllCoursesLoaded;
  constructor (public payload: { courses: Course[] }) {}
}

export type CoursesActions = CourseRequested |
  CourseLoaded |
  AllCoursesRequested |
  AllCoursesLoaded;
