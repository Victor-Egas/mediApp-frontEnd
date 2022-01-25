import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  
  form: FormGroup | undefined;
  id: number | undefined;
  edicion : boolean | undefined;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private examenService : ExamenService
    
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl(''),
      'descripcion' : new FormControl(''),
    
    })

    this.route.params.subscribe((data : Params) => {
      this.id=data['id'];
      this.edicion=data['id'] != null;
      this.initForm();
    });
  }
     initForm(){
      if(this.edicion){
        this.examenService.listarPorId(this.id).subscribe( data => {
          let id = data.idExamen;
          let nombre = data.nombre;
          let descripcion = data.descripcion;

          this.form = new FormGroup({
            'id' : new FormControl(data.idExamen),
            'nombre' : new FormControl(data.nombre),
            'descripcion' : new FormControl(data.descripcion),
            
          });
        });
      }
    }

  

  operar(){

    
      let examen=new Examen();
      examen.idExamen=this.form?.value['id'];
      examen.nombre=this.form?.value['nombre'];
      examen.descripcion=this.form?.value['adescripcion'];
    

      if(this.edicion){
        //MANERA COMUN
          /*this.examenService.modificar(examen).subscribe(() => {
            this.examenService.listar().subscribe(data => {
              this.examenService.setPacienteCambio(data);
              this.examenService.setMensajeCambio('SE MODIFICO');
            });
          });*/
          
          // BUENAS PRACTICAS (COMANDOS REACTIVOS)
          this.examenService.modificar(examen).pipe(switchMap( () =>{
            return this.examenService.listar();
          })).subscribe(data => {
            this.examenService.setExamenCambio(data);
              this.examenService.setMensajeCambio('SE MODIFICO');
          });

      }else{
          this.examenService.registrar(examen).subscribe(() => {
            this.examenService.listar().subscribe(data => {
              this.examenService.setExamenCambio(data);

              this.examenService.setMensajeCambio('SE REGISTRO');
            });
          });
      }

      this.router.navigate(['examen']);
      }

}
