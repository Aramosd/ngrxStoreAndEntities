import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLogged = createSelector(
    selectAuthState,
    //HERE GOES THE PROJECTOR
    (auth) => auth.loggedIn
);

export const isLoggedOut = createSelector(
    // HOW TO COMBINE SELECTORS :?
    isLogged,
    (loggedIn) => !loggedIn
);
