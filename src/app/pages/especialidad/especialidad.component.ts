import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { EspecialidadEdicionComponent } from './especialidad-edicion/especialidad-edicion.component';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  
  displayedColumns = ['id','nombre','acciones'];
  dataSource!: MatTableDataSource<Especialidad>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pacientes : Paciente[] | undefined ;
  
  constructor(private especialidadService : EspecialidadService ,
      private snackBar : MatSnackBar,
      public route : ActivatedRoute) { 
        
      }

  ngOnInit(): void {
    this.especialidadService.listar().subscribe(data => {
      //console.log(data);
      this.crearTabla(data);
    }); //RxJs

    this.especialidadService.getEspecialidadCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.especialidadService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data , 'AVISO' ,{duration:2000});
    });

  }

  filtrar(valor : string ){
    this.dataSource.filter=valor.trim().toLowerCase();
  }

  eliminar(idEspecialidad : number){
    //console.log("ELIMINO");
    this.especialidadService.eliminar(idEspecialidad).pipe(switchMap( () =>{
      return this.especialidadService.listar();
    })).subscribe(data => {
      this.especialidadService.setEspecialidadCambio(data);
      this.especialidadService.setMensajeCambio('SE ELIMINO');
    });
  }

  crearTabla(data : Especialidad[]){
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

}
