import { Injectable } from '@angular/core';
import { rawProfs } from '../../data/teachers-list';
import { Professeur } from '../model/prof';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor() { }

  getProfs(): Professeur[] {
   return rawProfs.map(p => new Professeur(p.id, p.lastname, p.firstname, p.statut, p.description));
  }

  deleteProfs(): Professeur[] {
    return [];
  }

  deleteProfById(oldList: Professeur[], id: number): Professeur[] {
    const idTeacher = oldList.findIndex(c => c.id === id);
    if(idTeacher !== -1){
      oldList.splice(idTeacher, 1);
      return oldList;
    }else {
      console.log('error id')
    }
  }

  postTeacher(oldList: Professeur[], newTeacher: any): Professeur[] {
    oldList.map(p => new Professeur(p.id, p.firstname, p.lastname, p.statut, p.description));
    newTeacher = new Professeur((oldList.length + 1), newTeacher.firstname, newTeacher.lastname, newTeacher.state, newTeacher.description);
    oldList.push(newTeacher);
    return oldList;
  }

}
