import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { AppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { map } from 'rxjs/operators';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;


    constructor(private store: Store<AppState>, private router: Router) {    }

    ngOnInit() {
      this.isLoggedIn$ = this.store
        .pipe(
          // THIS ELIMINATES DUPLICATE CALLLS
          // SELECT, FILTERS THE FACT THAT LAST STATE IS NOT MODIFIED
          select(isLoggedIn)
        );
      this.isLoggedOut$ = this.store
          .pipe(
            select(isLoggedOut)
          );
      /*
                OBSERVABLE COOL WAY
          this.isLoggedIn$ = this.store
            .pipe(
              map(state => state.auth.loggedIn)
            );
          this.isLoggedOut$ = this.store
              .pipe(
                map(state => !state.auth.loggedIn)
              );
      */
      /*
              ORIGINAL SIMPLE WAY
          this.store
            .pipe(
              map(state => state.auth.loggedIn)
            )
            .subscribe(loggedIn => console.log(loggedIn));
          //  BEFORE ADDING map()
          // .subscribe(state => console.log(state));
      */

    }

    logout() {
      this.store.dispatch(new Logout());
      this.router.navigateByUrl('/login');
    }


}
