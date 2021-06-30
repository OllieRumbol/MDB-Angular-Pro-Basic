import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { Car } from '../types';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {
  car: Car;
  action: Subject<Car> = new Subject();

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {
  }

  saveModal(): void{
    this.action.next(this.car);
    this.modalRef.hide();
  }
}
