import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  
  displayedColumns = ['id','nombre','descripcion','acciones'];
  dataSource!: MatTableDataSource<Examen>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pacientes : Paciente[] | undefined ;
  
  constructor(private examenService : ExamenService ,
      private snackBar : MatSnackBar) { 
        
      }

  ngOnInit(): void {
    this.examenService.listar().subscribe(data => {
      //console.log(data);
      this.crearTabla(data);
    }); //RxJs

    this.examenService.getExamenCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.examenService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data , 'AVISO' ,{duration:2000});
    });

  }

  filtrar(valor : string ){
    this.dataSource.filter=valor.trim().toLowerCase();
  }

  eliminar(id : number){
    //console.log("ELIMINO");
    this.examenService.eliminar(id).pipe(switchMap( () =>{
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.setExamenCambio(data);
      this.examenService.setMensajeCambio('SE ELIMINO');
    });
  }

  crearTabla(data : Examen[]){
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

}
