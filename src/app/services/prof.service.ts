import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Professeur } from '../model/prof';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  readonly URL = 'https://web-coaching-api.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  getProfs(): Observable <Professeur []> {
     return this.http.get<Professeur []>(this.URL + '/professeurs');
  }

  postTeacher(prof: Professeur): Observable<Professeur>{
    return this.http.post<Professeur>(this.URL + '/professeurs', prof);
  }

  deleteProfById(id: number): Observable<Professeur> {
    return this.http.delete<Professeur>(this.URL + '/professeurs' + '/' + id);
  }
  
}
