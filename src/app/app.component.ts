import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { BackService } from './services/back.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalaPeliculaFilterDTO } from './interfaces/SalaPeliculaFilterDTO';
import { MatDialog } from '@angular/material/dialog';
import { FormReservarComponent } from './dialogs/form-reservar/form-reservar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fechaMin: Date = new Date();

  listGeneroPelicula : any[] = [];
  listSala : any[] = [];

  listPeliculas : any[] = [];

  fcSala = new FormControl<any>(null);
  fcGeneroPelicula = new FormControl<any>(null);
  fcTitulo = new FormControl<any>(null);
  fcFecha = new FormControl<any>(null);
  fcHora = new FormControl<any>(null);

  pageIndex = 0;
  pageSize = 6;

  @ViewChild('paginator', {static: false}) paginator! : MatPaginator;

  constructor(
    private service : BackService,
    private spinner : NgxSpinnerService,
    private formDialog : MatDialog,
  ){
    this.fnLoadSala();
    this.fnLoadGeneroPelicula();
    this.fnLoadPelicula({dFechaHoraInicio:this.fechaMin});
  }

  fnLoadSala(){
    this.spinner.show();
    this.service.GetListSala().subscribe({
      next: (res) => {
        if(res.success) {
          this.listSala = res.data;
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  fnLoadGeneroPelicula(){
    this.spinner.show();
    this.service.GetListGeneroPelicula().subscribe({
      next: (res) => {
        if(res.success) {
          this.listGeneroPelicula = res.data;
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  fnLoadPelicula(filtros : SalaPeliculaFilterDTO){
    this.spinner.show();
    this.service.getSalaPelicula(filtros).subscribe({
      next: (res) => {
        if(res.success) {
          this.listPeliculas = res.data;
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  fnAplicarFiltros(){
    this.fnLoadPelicula({nIdGenero : this.fcGeneroPelicula.value, nIdSala : this.fcSala.value, sTitulo : this.fcTitulo.value, dFechaHoraInicio:this.fcFecha.value});
  }

  odFormReserva(salaPelicula : any){
    const dialogResult = this.formDialog.open(
      FormReservarComponent,
      {
        width:'750px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          salaPelicula : salaPelicula,
        }
      }
    );
    
    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnAplicarFiltros(); 
        }
      }
    );
  }
}