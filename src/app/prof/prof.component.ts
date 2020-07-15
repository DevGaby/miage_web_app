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
  sizeMyProfsInitial: number;
  isModalDisplayed: boolean;
  constructor(private profService: ProfService) { }

  ngOnInit(): void {
    this.getProfs();
  }

  getProfs(): void{
    this.myProfs = this.profService.getProfs();
    this.sizeMyProfsInitial = this.myProfs.length;
  }

  deleteProfs(): void {
    this.myProfs = this.profService.deleteProfs();
  }

  deleteProf(profId: number): void {
    const currentList = this.myProfs.slice(0, this.myProfs.length);
    this.myProfs = this.profService.deleteProfById(currentList, profId);
  }

  reInitList(): void {
    const currentList = this.profService.getProfs();
    currentList.slice(0, this.myProfs.length);
    currentList.map(c => new Professeur(c.id, c.firstname, c.lastname, c.statut, c.description));
    this.myProfs = currentList;
  }

  addTeacher(){
    this.isModalDisplayed = true;
  }

  updateList(event: Professeur): void{
    let newTeacher = new Professeur(event.id, event.firstname, event.lastname, event.statut, event.description);
    const currentList = this.myProfs.slice(0, this.myProfs.length);
    event.id = this.myProfs.length + 1;
    currentList.push(newTeacher);
    this.myProfs = currentList.slice(0, currentList.length);
    this.isModalDisplayed = false;
  }

  closeModal(event : boolean): void{
    this.isModalDisplayed = event;
  }
}
