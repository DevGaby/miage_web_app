import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CoursService } from '../services/cours.service';
import { ProfService } from '../services/prof.service';
import { Cours } from '../model/cours';
import { Professeur } from '../model/prof';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})

export class CoursComponent implements OnInit {
  myClasses: Cours[] = []; classForm: FormGroup;  
  selectedProf: string; profs: Professeur [];

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
      (err)=> {Swal.fire(
        'Attention',
        'Une erreur c\'est produit lors du chargement des cours',
        'warning'  
      );}
    )
  }

  getProfs(){
    this.profService.getProfs()
    .subscribe(
      (data)=> {
        this.profs = data;},
      (err)=> {
        Swal.fire(
          'Attention',
          'Une erreur c\'est produit lors du chargement des professeurs',
          'warning'  
        );}
    ) 
  }

  deleteAll(): void {
    this.myClasses =[];
  }

  deleteClass(id: number, coursName: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Confirmez-vous la suppression du cours '+ coursName +' ?',
      text: "Cette action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.coursService.deleteClassById(id)
        .subscribe(
          (data) => {
            let oldClasses = this.myClasses.slice(0, this.myClasses.length);
            const idClass = oldClasses.findIndex(c => c.id === id);
            if(idClass !== -1){
              oldClasses.splice(idClass, 1); 
              this.myClasses = oldClasses;
              swalWithBootstrapButtons.fire(
                'Suppression',
                'Le cours '+ coursName + ' à bien été supprimé',
                'success'
              )
            } else {
              console.error('error id');
            }  
          },
          (err)=> { console.error(err)}
        );
       
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulation',
          'Suppresion interrompue',
          'error'
        )
      }
    })

    this.coursService.deleteClassById(id)
    .subscribe(
      (data) => {
        let oldClasses = this.myClasses.slice(0, this.myClasses.length);
        const idClass = oldClasses.findIndex(c => c.id === id);
        if(idClass !== -1){
          oldClasses.splice(idClass, 1); 
          this.myClasses = oldClasses;
        } else {
          console.error('error id');
        } 
      },
      (err)=> { console.error(err)}
    );
  }

  onSubmit(): void {
    const form = this.classForm.value;
    if (this.classForm.invalid) {
      Swal.fire(
        'Attention',
        'Vous n\'avez pas remplis tous les champs',
        'warning'  
      );
    }
    else {
      form.label = form.label.charAt(0).toUpperCase() + form.label.slice(1);
      form.professor = this.selectedProf;

      this.coursService.postClass(form)
      .subscribe(
        (data)=> { 
          this.myClasses.push(data);
          Swal.fire(
            'Bravo',
            'Votre cours a bien été rajouté',
            'success'  
          );
        },
        (err)=> {
          Swal.fire(
            'Oups',
            'Une erreur c\'est produite durant l\'ajout',
            'error'  
          );
        }
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
    let id = (<HTMLInputElement>document.getElementById("teacher")).value

    this.profs.forEach((p) => {
      if(p.id === parseInt(id)){
        this.selectedProf = p.firstName + " " + p.lastName;
      }
    });
  }
}
