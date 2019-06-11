


import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from './courses.service';
import {catchError, finalize, tap} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { PageQuery, LessonsPageRequested } from '../course.actions';
import { selectLessonsPage } from '../course.selectors';



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor(private store: Store<AppState>) {

    }

    loadLessons(courseId: number, page: PageQuery) {
        // CHECK IF DATA IS PRESENT, IF NOT QUERY THE API
        this.store.pipe(
            select(selectLessonsPage(courseId, page)),
            // ADD ANY KIND OF LOGIC BEFORE EMITTING DATA TO LISTENER
            tap(lessons => {
                if (lessons.length) {
                    this.lessonsSubject.next(lessons);
                } else {
                    this.store.dispatch(
                        new LessonsPageRequested({ courseId, page })
                    );
                }
            }),
            catchError(err => of([]))
        )
        .subscribe();
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

}

