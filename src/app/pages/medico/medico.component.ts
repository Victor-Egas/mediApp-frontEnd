import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { MatDialog } from '@angular/material/dialog';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  
  displayedColumns = ['idMedico','nombres','apellidos','cmp','acciones'];
  dataSource!: MatTableDataSource<Medico>;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  //pacientes : Paciente[] | undefined ;
  

  constructor(private medicoService : MedicoService ,
              private dialog : MatDialog ,
              private snackBar: MatSnackBar){
    } 
   

  ngOnInit(): void {
    console.log("Entro a medico");
    this.medicoService.getMedicoCambio().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });

    this.medicoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data,'AVISO', {duration : 2000});
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });


  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(medico : Medico){
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap( () =>{
      return this.medicoService.listar();
    } )).subscribe(data => {
      this.medicoService.setMedicoCambio(data);
      this.medicoService.setMensajeCambio('SE ELIMINO');
    });
  }

  abrirDialogo(medico?: Medico){
    console.log("hola pes");
      let med=medico !=null ? medico : new Medico();
    
    this.dialog.open(MedicoDialogoComponent,{
        width : '250px',
        data:   med
      });
  }

}
