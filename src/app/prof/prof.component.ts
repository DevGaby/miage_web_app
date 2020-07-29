import { Component, OnInit } from '@angular/core';

import { Professeur } from '../model/prof';
import { ProfService } from '../services/prof.service';
import Swal from 'sweetalert2';

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

  getProfs(){
    this.profService.getProfs()
    .subscribe(
      (data)=> {
        this.myProfs = data;},
      (err)=> {
        Swal.fire(
          'Attention',
          'Une erreur c\'est produit lors du chargement des professeurs',
          'warning'  
        );}
    ) 
  }

   addTeacher():void {
    this.isModalDisplayed = true;
  }

  updateList(event: Professeur): void{
    let teacher = new Professeur(event.id, event.firstName, 
                    event.lastName, event.status, event.description);

    this.profService.postTeacher(teacher)
      .subscribe(
        (data)=> { 
          this.teacher = data;
          this.myProfs.push(this.teacher);
          //this.getProfs();
          Swal.fire(
            'Bravo',
            'Votre formateur a bien été rajouté',
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
      );
    this.isModalDisplayed = false;
  }

  closeModal(event : boolean): void{
    this.isModalDisplayed = event;
  }

  deleteProfs(): void {
    this.myProfs = [];
  }

  deleteProf(profId: number, prenom: string, nom: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirmez-vous la suppression du professeur '+ prenom +' '+ nom +' ?',
      text: "Cette action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
          this.profService.deleteProfById(profId)
          .subscribe(
            (data) => { 
              //ne pas faire this.getProfs
              //retirer le prof du this.myProfs
              this.getProfs(); 
              swalWithBootstrapButtons.fire(
              'Suppression',
              'Le professeur '+ prenom +' '+ nom +' à bien été supprimé',
              'success'
            )
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
  }

  reInitList(): void {
    this.getProfs();
  }

}
