import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cours } from '../model/cours';
import { CoursService } from '../services/cours.service';
import { Unit } from '../model/unit';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})

export class CoursComponent implements OnInit {
  myClasses: Cours[] = [];
  classForm: FormGroup;

  constructor(private coursService: CoursService, private formBuilder: FormBuilder) {
    this.classForm = this.formBuilder.group({
      label: ['', Validators.required],
      period: ['', Validators.required],
      nbHour: ['',Validators.required],
      teacher: ['', Validators.required],
      detail: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.myClasses = this.coursService.getCours();
  }

  deleteAll(): void {
    //this.myClasses = this.coursService.deleteAllClasses();
    this.myClasses = [];
  }

  deleteClass(id: number): void {
      const currentClasses = this.myClasses.slice(0, this.myClasses.length);
      this.myClasses = this.coursService.deleteClassById(currentClasses, id);
  }

  onSubmit(): void {
    if (this.classForm.invalid) {
      alert('Vous n\'avez pas remplis tous les champs');
      return;
    }
 
    const form = this.classForm.value;
    const newUnity = new Unit(form.nbHour,'heures');
    form.id = this.myClasses.length + 1;
    form.nbHour = newUnity;
    let newCours = new Cours(form.id, form.label, form.period, form.nbHour, form.teacher, form.detail);
    this.myClasses.push(newCours);
    this.clearInput();
  }

  clearInput(): void {
    this.classForm.reset();
  }

  reInitBtn(): void {
    this.deleteAll();
    this.myClasses = this.coursService.getCours();
  }
}
