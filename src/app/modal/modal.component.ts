import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professeur } from '../model/prof';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  teacherForm: FormGroup;
  @Output() teacherEventEmitter: EventEmitter<Professeur> = new EventEmitter;
  @Output() modalEventEmitter: EventEmitter<boolean> = new EventEmitter;
  @Input('showModal') public isModalDisplayed;

  constructor(private formBuilder: FormBuilder) { 
    this.teacherForm = this.formBuilder.group({
      lastName: '',
      firstName: '',
      status: '',
      description: ''
    });
  }

  ngOnInit(): void{
  }

  onSubmit(): void{
    let form = this.teacherForm.value;
    if (!form ||!form.lastName || !form.firstName || !form.status || !form.description)
      return alert('Vous n\'avez pas remplis tous les champs');
    else{
      form.lastName = form.lastName.toUpperCase();
      form.firstName = form.firstName.charAt(0).toUpperCase() + form.firstName.slice(1);
      form.status = form.status.toLowerCase();
    }
     
  
    this.teacherEventEmitter.emit(form);
    this.teacherForm.reset();
  }

  closeModal(){
   this.modalEventEmitter.emit(false);
  }

}
