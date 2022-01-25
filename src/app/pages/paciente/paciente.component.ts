import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  displayedColumns = ['idPaciente','nombres','apellidos','acciones'];
  dataSource!: MatTableDataSource<Paciente>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pacientes : Paciente[] | undefined ;
  
  constructor(private pacienteService : PacienteService ,
      private snackBar : MatSnackBar) { 
        
      }

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(data => {
      //console.log(data);
      this.crearTabla(data);
    }); //RxJs

    this.pacienteService.getPacienteCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.pacienteService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data , 'AVISO' ,{duration:2000});
    });

  }

  filtrar(valor : string ){
    this.dataSource.filter=valor.trim().toLowerCase();
  }

  eliminar(idPaciente : number){
    //console.log("ELIMINO");
    this.pacienteService.eliminar(idPaciente).pipe(switchMap( () =>{
      return this.pacienteService.listar();
    })).subscribe(data => {
      this.pacienteService.setPacienteCambio(data);
      this.pacienteService.setMensajeCambio('SE ELIMINO');
    });
  }

  crearTabla(data : Paciente[]){
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

}
