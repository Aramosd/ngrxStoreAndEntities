import { Action } from '@ngrx/store';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';

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
  CourseSaved = '[Edit Course Dialog] Update Course Entity',
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

export class CourseSaved implements Action {
  readonly type = CoursesActionTypes.CourseSaved;
  //  NEW rxJS SPECIFIC TYPE CONTAINS ALL INFO NEEDED TO UPDATE A GIVEN ENTITY IN MEMORY
  // THIS WAY WE IDENTIFY THE ID OF THE Entity AND THE PROPERTIES THAT HAVE CHANGED
  constructor (public payload: { course: Update<Course> }) {}
}

export type CoursesActions = CourseRequested |
  CourseLoaded |
  AllCoursesRequested |
  AllCoursesLoaded |
  CourseSaved;
