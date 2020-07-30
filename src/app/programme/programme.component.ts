import { Component, OnInit } from '@angular/core';
import { CoursService } from '../services/cours.service';
import { Cours } from '../model/cours';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements OnInit {
  myClasses: Cours[] = [];

  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.getCours();
  }

  getCours(): void{
    this.coursService.getCours()
   .subscribe(
     (data)=> {
       this.myClasses = data;},
     (err)=> {
       Swal.fire(
       'Attention',
       'Une erreur c\'est produit lors du chargement des cours',
       'warning'  
     );}
   )
 }

}
