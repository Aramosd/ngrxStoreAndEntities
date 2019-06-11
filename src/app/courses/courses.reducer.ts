import { Course } from './model/course';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CoursesActionTypes, CoursesActions } from './courses.actions';

/*
          WHY SHOULD WE USE ngrx/entity INSTEAD of this?

          export interface CoursesState {
            coursesEntities: { [key: number]: Course };
          }

          Because we cannot keep track of the original position of objects
          and sometimes we want to cut them out use them, and then
          insert their updated value in the same position
*/

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

/*
      tHEY MAKE AVAILABLE METHODS TO ACCESS SELECTORS SUCH AS
      -GetAll
      WE CAN ALSO FETCH THE ORIGINAL STATE
*/
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.CourseLoaded: {
      return adapter.addOne(action.payload.course, state);
    }
    case CoursesActionTypes.AllCoursesLoaded: {
      //            BEFORE REFACTOR
      // return adapter.addAll(action.payload.courses, state);
      //            AFTER REFACTOR
      return adapter.addAll(action.payload.courses, { ...state, allCoursesLoaded: true });
    }
    default:
      return state;
  }
}

// FOLLOWING COMMON RxJS CONVENTIONS WE WRITE SELECTORS FOR THE ADAPTERS AT THE BOTTOM
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
