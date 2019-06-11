import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Lesson } from './lesson.model';
import { LessonActions, LessonActionTypes } from './lesson.actions';
import { CourseActions } from './courses/course.actions';

export interface LessonsState extends EntityState<Lesson> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

export const initialLessonsState: LessonsState = adapter.getInitialState();

export function lessonsReducer(
  state = initialLessonsState,
  action: CourseActions
): LessonsState {
  switch (action.type) {
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
