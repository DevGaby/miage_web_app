import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { rawClasses } from '../../data/classes-list';
import { Cours } from '../model/cours';
import { Unit } from '../model/unit';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursService {

  readonly URL = 'https://web-coaching-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  getCours(): Observable<Cours[]>  {
    return this.http.get<Cours[]>(this.URL + '/cours');
  }

  deleteAllClasses(): Cours[] {
    return [];
  }

  deleteClassById(id: number): Observable<Cours> {
    return this.http.delete<Cours>(this.URL + '/cours' + '/' + id);
  }

  postClass(cours: Cours): Observable<Cours>{
    return this.http.post<Cours>(this.URL + '/cours', cours);
  }
  
}
