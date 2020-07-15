import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToProgramme(){
    this.router.navigate(['/programme']);
  }

}
