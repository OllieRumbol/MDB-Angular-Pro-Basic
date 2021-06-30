import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../types';

@Injectable({
    providedIn: 'root'
})

export class CarService{
    public cars;
    baseUrl = 'https://localhost:44330/api/Car';

    constructor(private http: HttpClient){}

    getCars(){
        return this.http.get<Car>(this.baseUrl);
    }

    addCar(make, model, colour){
        return this.http.post<Car>(this.baseUrl, {
            make,
            model,
            colour
        });
    }

    deleteCar(id){
        return this.http.delete<Car>(this.baseUrl + '\\' + id);
    }

    editCar(car){
        return this.http.put<Car>(this.baseUrl, {
            carId: car.carId,
            make: car.make,
            model: car.model,
            colour: car.colour
        });
    }
}
