import { Component, OnInit } from '@angular/core';

import { Professeur } from '../model/prof';
import { ProfService } from '../services/prof.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
 
  myProfs: Professeur[] = [];
  isModalDisplayed: boolean;
  teacher: Professeur;
  constructor(private profService: ProfService) { }

  ngOnInit(): void {
    this.getProfs();
  }

  getProfs(): void{
    this.profService.getProfs()
    .subscribe(
      (data)=> { this.myProfs = data; },
      (err)=> { console.log(err)}
    );
  }

   addTeacher(){
    this.isModalDisplayed = true;
  }

  updateList(event: Professeur): void{
    let teacher = new Professeur(event.id, event.firstName, 
                    event.lastName, event.status, event.description);

    this.profService.postTeacher(teacher)
      .subscribe(
        (data)=> { 
          this.teacher = data;
          this.getProfs(); },
        (err)=> { console.log(err)}
      );
    this.isModalDisplayed = false;
  }

  closeModal(event : boolean): void{
    this.isModalDisplayed = event;
  }

  deleteProfs(): void {
    this.myProfs = this.profService.deleteProfs();
  }

  deleteProf(profId: number): void {
    this.profService.deleteProfById(profId)
    .subscribe(
      (data) => { 
        this.getProfs();},
      (err)=> { console.log(err)}
    );
  }

  reInitList(): void {
    this.getProfs();
  }

}
