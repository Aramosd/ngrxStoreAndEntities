import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    //HERE GOES THE PROJECTOR
    (auth) => auth.loggedIn
);

export const isLoggedOut = createSelector(
    // HOW TO COMBINE SELECTORS :?
    isLoggedIn,
    (loggedIn) => !loggedIn
);
