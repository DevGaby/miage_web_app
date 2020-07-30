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

  myClasses: Cours[] = []; 
  classForm: FormGroup;  
  profs: Professeur [];

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
    // essayer d'utiliser le forkJoin de RXJS
    //https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
   this.getCours();
   this.getProfs();
  }

  getCours(): void{
     this.coursService.getCours()
    .subscribe(
      (data)=> {
        this.myClasses = data;
      },
      (err)=> {
        Swal.fire(
        'Attention',
        'Une erreur c\'est produit lors du chargement des cours',
        'warning');
      }
    )
  }

  getProfs(){
    this.profService.getProfs()
    .subscribe(
      (data)=> {
        this.profs = data;
      },
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
  //essayer de créer des sous fonctions pour réduire la taille de la fonction
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
          () => {
            //supprimer le cours
            const classIndex = this.myClasses.findIndex(c => c.id === id);
            if(classIndex !== -1){
              this.myClasses.splice(classIndex, 1); 
              swalWithBootstrapButtons.fire(
                'Suppression',
                'Le cours '+ coursName + ' à bien été supprimé',
                'success'
              )
            } else {
              console.error('error id');
            }  
          },
          (err)=> { 
            //afficher l'erreur à l'utilisateur
            console.error(err)
          }
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

  getProfCompleteName(prof):string {
    return prof?.firstName + " " + prof?.lastName;
  }
}
