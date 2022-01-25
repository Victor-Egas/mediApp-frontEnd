import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../_model/examen';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {

  private examenCambio = new Subject<Examen[]>();
  private mensajeCambio = new Subject<string>();
// ees como el autowired , inyeccion de dependencias
  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/examenes`
    );
  }

  getExamenCambio(){
    return this.examenCambio.asObservable();
  }

  setExamenCambio(medicos : Examen[]){
    this.examenCambio.next(medicos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje : string){
    return this.mensajeCambio.next(mensaje);
  } 

}
