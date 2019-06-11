import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

import * as fromCourse from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(c => c.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(c => c.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(c => c.promo).length
);

export const allCoursesLoaded = createSelector(
    selectCoursesState,
    coursesState => coursesState.allCoursesLoaded
);
