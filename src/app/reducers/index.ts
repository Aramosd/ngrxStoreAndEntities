import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {User} from '../model/user.model';
import {storeFreeze} from 'ngrx-store-freeze';
import { AuthActionTypes } from '../auth/auth.actions';

type AuthState = {
  loggedIn: boolean,
  user: User,
};

const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

export interface AppState {
//   auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  // auth: authReducer
  // router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze] : [];

  /*
  Everything scaffolded to its own reducers using:

      ng generate reducer Auth --flat=false --module auth/auth.module.ts

      function authReducer(state: AuthState = initialAuthState, action): AuthState {
      switch (action.type) {
        case AuthActionTypes.LoginAction: {
          return {
            loggedIn: true,
            user: action.payload.user
          };
        }
        default: {
          return state;
        }
      }
    }
  */
