import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent, Observable} from "rxjs";
import {LessonsDataSource} from '../services/lessons.datasource';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { PageQuery } from '../course.actions';
import { selectLoadingLessons } from '../course.selectors';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;

    dataSource: LessonsDataSource;

    displayedColumns= ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    loading$: Observable<boolean>;


    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data['course'];

        this.dataSource = new LessonsDataSource(this.store);

        const initialPage: PageQuery = {
            pageIndex: 0,
            pageSize: 3
        };

        this.dataSource.loadLessons(this.course.id, initialPage);

        this.loading$ = this.store.pipe(select(selectLoadingLessons));
    }

    ngAfterViewInit() {

        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();

    }

    loadLessonsPage() {

        const newPage: PageQuery = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
        };

        this.dataSource.loadLessons(this.course.id, newPage);

    }


}
