import { Injectable } from '@angular/core';
import { rawClasses } from '../../data/classes-list';
import { Cours } from '../model/cours';
import { Unit } from '../model/unit';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor() { }

  getCours(): Cours[] {
    return rawClasses.map(c => new Cours(c.id, c.label, c.period, c.nbHour, c.teacher, c.detail));
  }

  deleteAllClasses(): Cours[] {
    return [];
  }

  deleteClassById(oldClasses: Cours[], id: number): Cours[] {
    const idClass = oldClasses.findIndex(c => c.id === id);
    if(idClass !== -1){
      oldClasses.splice(idClass, 1);
      return oldClasses; 
      /*J'ai décomposé : Qd je fais directement return oldClasses.splice(idClass, 1);
      Cela me renvoie un tableau avec uniquement lélement que je veux supprimer
      */
    }else {
      console.log('error id');
    }
  
  }

  postClasse(oldClasses: Cours[], newClasses: any): Cours[] {
    const hour = new Unit(newClasses.nbHourInput, 'heures');
    oldClasses.map(c => new Cours(c.id, c.label, c.period, c.nbHour, c.teacher, c.detail));
    newClasses = new Cours((oldClasses.length + 1), newClasses.titleInput, newClasses.periodInput, hour, newClasses.teacherInput, newClasses.descriptionInput);
    oldClasses.push(newClasses);
    // La méthode fonctionne mais ca me creer un tableau cours dans mon tableau Cous existant pkoi?
    return oldClasses;
  }
}
