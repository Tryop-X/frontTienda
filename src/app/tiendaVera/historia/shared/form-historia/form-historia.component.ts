import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Historia} from "../historia.model";
import { HistoriaService } from '../historia.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-historia',
  templateUrl: './form-historia.component.html',
  styleUrls: ['./form-historia.component.css']
})
export class FormHistoriaComponent implements OnInit {

  form: FormGroup;

  @Input() historia:Historia= new Historia();
  @Output() onSubmit: EventEmitter<any>= new EventEmitter();
  constructor(private formBuilder:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      nombreHistoria:[
        this.historia.nombreHistoria,[
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      descripcionHistoria:[
        this.historia.descripcionHistoria,[
          Validators.required,
          Validators.minLength(5),
        ]
      ],
      imagenPortada:[
        this.historia.imagenPortada,[
          Validators.required,
          Validators.minLength(5),
        ]
      ],
    })
  }


  save(){
    this.onSubmit.emit(this.form.value)
  }

}
