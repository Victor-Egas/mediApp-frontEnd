import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
      protected http : HttpClient ,
      @Inject(String) protected url:string
  ) { }

    listar(){
      return this.http.get<T[]>(this.url)
    }

    listarPorId(id : number | undefined){
      return this.http.get<T>(`${this.url}/${id}`)
   }

   registrar(t : T){
      return this.http.post(this.url,t);
   }

   modificar(t : T){
    return this.http.put(this.url,t);
   }

   eliminar(id : number | undefined){
    // console.log("elimino service");
    return this.http.delete(`${this.url}/${id}`);
   }


}
