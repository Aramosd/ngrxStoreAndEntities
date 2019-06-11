import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LessonActions, LessonActionTypes } from './lesson.actions';
import { CourseActions, CourseActionTypes } from './courses/course.actions';
import { Lesson } from './courses/model/lesson';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSequenceNumber (l1: Lesson, l2: Lesson): number {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  } else {
    return l1.seqNo - l2.seqNo;
  }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSequenceNumber
});

export const initialLessonsState: LessonsState = adapter.getInitialState({
  loading: false
});

export function lessonsReducer(
  state = initialLessonsState,
  action: CourseActions
): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageCancelled: {
      return {
        ...state,
        loading: false
      };
    }
    case CourseActionTypes.LessonsPageLoaded: {
      return adapter.addMany(action.payload.lessons, {
        ...state,
        loading: false
      });
    }
    case CourseActionTypes.LessonsPageRequested: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
