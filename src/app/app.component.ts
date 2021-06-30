import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { FormBuilder } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { CarModalComponent } from './car-modal/car-modal.component';
import { Car } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cars;
  carForm = this.formBuilder.group({
    make: '',
    model: '',
    colour: ''
  });
  modalRef: MDBModalRef;

  constructor(private carService: CarService, private formBuilder: FormBuilder, private modalService: MDBModalService){}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

  clear(): void{
    this.carForm.reset();
  }

  onSubmit(): void{
    const make = this.carForm.get('make').value;
    const model = this.carForm.get('model').value;
    const colour = this.carForm.get('colour').value;
    this.carService.addCar(make, model, colour).subscribe(data => {
      this.cars = this.carService.getCars();
    });
  }

  deleteCar(id): void{
    this.carService.deleteCar(id).subscribe(data => {
      this.cars = this.carService.getCars();
    });
  }

  openModal(car) {
    const modalOptions = {
      data: {
        car
      }
    };

    this.modalRef = this.modalService.show(CarModalComponent, modalOptions);

    this.modalRef.content.action.subscribe( (result: Car) => {
      this.carService.editCar(result).subscribe(data => {
        this.cars = this.carService.getCars();
      });
    });
  }
}
