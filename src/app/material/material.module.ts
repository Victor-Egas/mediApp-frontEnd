import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CdkTableModule } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog/dialog-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
    //MatTableModule  --> No lo reconoce desde otra carpeta, por eso se creare el exports
  ],
    exports:[
      MatTableModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatMenuModule,
      MatToolbarModule,
      MatDividerModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      MatSortModule,
      MatPaginatorModule,
      MatDialogModule,
      
    ]

})
export class MaterialModule { }
