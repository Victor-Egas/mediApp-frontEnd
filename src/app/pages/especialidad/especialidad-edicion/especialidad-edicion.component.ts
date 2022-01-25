import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  
  form: FormGroup | undefined;
  id: number | undefined;
  edicion : boolean | undefined;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private especialidadService : EspecialidadService
    
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombreEspecialidad' : new FormControl(''),
     
    
    })

    this.route.params.subscribe((data : Params) => {
      this.id=data['id'];
      this.edicion=data['id'] != null;
      this.initForm();
    });
  }
     initForm(){
      if(this.edicion){
        this.especialidadService.listarPorId(this.id).subscribe( data => {
          let id = data.idEspecialidad;
          let nombreEspecialidad = data.nombre;
          

          this.form = new FormGroup({
            'id' : new FormControl(data.idEspecialidad),
            'nombreEspecialidad' : new FormControl(data.nombre),
            
            
          });
        });
      }
    }

  

  operar(){

    
      let especialidad=new Especialidad();
      especialidad.idEspecialidad=this.form?.value['id'];
      especialidad.nombre=this.form?.value['nombreEspecialidad'];
      
    

      if(this.edicion){
        //MANERA COMUN
          /*this.examenService.modificar(examen).subscribe(() => {
            this.examenService.listar().subscribe(data => {
              this.examenService.setPacienteCambio(data);
              this.examenService.setMensajeCambio('SE MODIFICO');
            });
          });*/
          
          // BUENAS PRACTICAS (COMANDOS REACTIVOS)
          this.especialidadService.modificar(especialidad).pipe(switchMap( () =>{
            return this.especialidadService.listar();
          })).subscribe(data => {
            this.especialidadService.setEspecialidadCambio(data);
              this.especialidadService.setMensajeCambio('SE MODIFICO');
          });

      }else{
          this.especialidadService.registrar(especialidad).subscribe(() => {
            this.especialidadService.listar().subscribe(data => {
              this.especialidadService.setEspecialidadCambio(data);

              this.especialidadService.setMensajeCambio('SE REGISTRO');
            });
          });
      }

      this.router.navigate(['especialidad']);
      }


}
