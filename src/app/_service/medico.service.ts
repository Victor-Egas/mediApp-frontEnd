import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_model/medico';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {

  private medicoCambio = new Subject<Medico[]>();
  private mensajeCambio = new Subject<string>();
// ees como el autowired , inyeccion de dependencias
  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/medicos`
    );
  }
/*
  private url=`${environment.HOST}/medicos`;

  listar(){
    return this.http.get<Medico[]>(this.url);
   }

   listarPorId(id : number | undefined){
      return this.http.get<Medico>(`${this.url}/${id}`)
   }

   registrar(medico : Medico){
      return this.http.post(this.url,medico);
   }

   modificar(medico : Medico){
    return this.http.put(this.url,medico);
   }

   eliminar(id : number | undefined){
    // console.log("elimino service");
    return this.http.delete(`${this.url}/${id}`);
   }*/

   /* GETTERS AND SETTERS */
   getMedicoCambio(){
     return this.medicoCambio.asObservable();
   }

   setMedicoCambio(medicos : Medico[]){
     this.medicoCambio.next(medicos);
   }

   getMensajeCambio(){
     return this.mensajeCambio.asObservable();
   }

   setMensajeCambio(mensaje : string){
     return this.mensajeCambio.next(mensaje);
   }
}
