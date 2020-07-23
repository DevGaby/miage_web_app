import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CoursService } from '../services/cours.service';
import { ProfService } from '../services/prof.service';
import { Cours } from '../model/cours';
import { Professeur } from '../model/prof';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})

export class CoursComponent implements OnInit {
  myClasses: Cours[] = []; classForm: FormGroup; profSelect: string;
  profs: Professeur []; professor: Professeur [];

  constructor(private coursService: CoursService, 
              private profService: ProfService) {
                
    this.classForm = new FormGroup({
      label: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      hours: new FormControl('',Validators.required),
      professor: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
   this.getCours();
   this.getProfs();
  }

  getCours(): void{
     this.coursService.getCours()
    .subscribe(
      (data)=> {
        this.myClasses = data;},
      (err)=> { console.error(err);}
    )
  }

  getProfs(){
    this.profService.getProfs()
    .subscribe(
      (data)=> {
        this.profs = data;},
      (err)=> {
        console.error(err)}
    ) 
  }

  deleteAll(): void {
    this.myClasses = this.coursService.deleteAllClasses();
  }

  deleteClass(id: number): void {
    this.coursService.deleteClassById(id)
    .subscribe(
      (data) => {
        let oldClasses = this.myClasses.slice(0, this.myClasses.length);
        const idClass = oldClasses.findIndex(c => c.id === id);
        if(idClass !== -1){
          oldClasses.splice(idClass, 1); 
          this.myClasses = oldClasses;
        } else {
          console.log('error id');
        } 
      },
      (err)=> { console.error(err)}
    );
  }


  onSubmit(): void {
    const form = this.classForm.value;
    if (this.classForm.invalid) 
      return alert('Vous n\'avez pas remplis tous les champs');
    else {
      form.label = form.label.charAt(0).toUpperCase() + form.label.slice(1);
      form.professor = this.profSelect;

      this.coursService.postClass(form)
      .subscribe(
        (data)=> { this.getCours() },
        (err)=> {
          console.error(err)}
      )    
    }
    this.clearInput();
  }

  clearInput(): void {
    this.classForm.reset();
  }

  reInitBtn(): void {
    this.getCours();
  }

  onTeacherChange(): void {
    let id = (<HTMLInputElement>document.getElementById("teacher")).value;

    this.profs.forEach((p) => {
      if(p.id === parseInt(id)){
        this.profSelect = p.firstName + " " + p.lastName;
        console.log(this.profSelect);
      }
    });
  }
}
