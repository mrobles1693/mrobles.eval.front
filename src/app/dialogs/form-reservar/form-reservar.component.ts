import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackService } from 'src/app/services/back.service';
import Swal from 'sweetalert2';
import { DetailReservaComponent } from '../detail-reserva/detail-reserva.component';

@Component({
  selector: 'app-form-reservar',
  templateUrl: './form-reservar.component.html',
  styleUrls: ['./form-reservar.component.css']
})
export class FormReservarComponent {
  exito = false;

  listTipoDocumento : any[] = [];
  listGenero : any[] = [];

  cliente : any = null;

  fcTipoDocumento = new FormControl<any>(null, [Validators.required]);
  fcDocumento = new FormControl<any>(null, [Validators.required]);
  fcApellidoP = new FormControl<any>(null, [Validators.required]);
  fcApellidoM = new FormControl<any>(null, [Validators.required]);
  fcNombres = new FormControl<any>(null, [Validators.required]);
  fcFechaNacimiento = new FormControl<any>(null, [Validators.required]);
  fcGenero = new FormControl<any>(null, [Validators.required]);

  fcCantidad = new FormControl<any>(null, [Validators.required, Validators.min(1), Validators.max(this.data.salaPelicula.nCantidadDisponible)]);

  constructor(
    public dialogRef : MatDialogRef<FormReservarComponent>,
    private service : BackService,
    private spinner: NgxSpinnerService,
    private formDialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : {salaPelicula : any} 
  ){
    this.fnIniciarForm();
    this.fnLoadTipoDocumento();
    this.fnLoadGenero();
  }

  //#region EVENTOS DIALOG
  onClose() {
    this.dialogRef.close({exito : this.exito});
  }
  //#endregion

  //#region LOAD DATA
  fnLoadTipoDocumento(){
    this.spinner.show();
    this.service.GetListTipoDocumento().subscribe({
      next: (res) => {
        if(res.success) {
          this.listTipoDocumento = res.data;
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  fnLoadGenero(){
    this.spinner.show();
    this.service.GetListGenero().subscribe({
      next: (res) => {
        if(res.success) {
          this.listGenero = res.data;
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }
  //#endregion

  //#region EVENTOS FORMULARIO
  fnIniciarForm(){
    this.fcDocumento.disable();
  }

  fnChgTipoDocumento(){
    if(this.fcTipoDocumento.value){
      this.fcDocumento.enable();
    }
  }

  fnChgDocumento(){
    if(!this.isInvalidFc(this.fcDocumento)){
      this.spinner.show();
      this.service.getClienteByTipoNroDoc(this.fcTipoDocumento.value, this.fcDocumento.value).subscribe({
        next: (res : any) => {
          if(res.success && res.data != null){
            this.cliente = res.data;
            this.fcApellidoP.setValue(this.cliente.sApellidoP);
            this.fcApellidoM.setValue(this.cliente.sApellidoM);
            this.fcNombres.setValue(this.cliente.sNombre);
            this.fcFechaNacimiento.setValue(this.cliente.dFechaNacimiento);
            this.fcGenero.setValue(this.cliente.nIdGenero);
          }
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  isInvalidFc(fc : FormControl){
    return (fc.status == 'INVALID' && fc.touched) ? true : false;
  }

  getErrorFC(fc : FormControl, msjPattern? : string, minlengt? : number, maxlengt? : number, msjMin? : string,  msjMax? : string){
    return fc.hasError('required') ? 'Campo requerido' 
    : fc.hasError('pattern') ? msjPattern
    : fc.hasError('minlength') ? 'Mínimo ' + minlengt + ' caracteres.'
    : fc.hasError('maxlength') ? 'Máximo ' + maxlengt + ' caracteres.'
    : fc.hasError('min') ? msjMin
    : fc.hasError('max') ? msjMax : '';
  }

  isValidForm(){
    this.fcTipoDocumento.markAsTouched();
    this.fcDocumento.markAsTouched();
    this.fcApellidoP.markAsTouched();
    this.fcApellidoM.markAsTouched();
    this.fcNombres.markAsTouched();
    this.fcFechaNacimiento.markAsTouched();
    this.fcGenero.markAsTouched();
    this.fcCantidad.markAsTouched();

    if(this.isInvalidFc(this.fcTipoDocumento)) return false;
    if(this.isInvalidFc(this.fcDocumento)) return false;
    if(this.isInvalidFc(this.fcApellidoP)) return false;
    if(this.isInvalidFc(this.fcApellidoM)) return false;
    if(this.isInvalidFc(this.fcNombres)) return false;
    if(this.isInvalidFc(this.fcFechaNacimiento)) return false;
    if(this.isInvalidFc(this.fcGenero)) return false;
    if(this.isInvalidFc(this.fcCantidad)) return false;

    return true;
  }

  fnGuardar(){
    if(this.isValidForm()){
      if(this.cliente == null){
        this.cliente = { 
          nIdTipoDocumento : this.fcTipoDocumento.value,
          sDocumento : this.fcDocumento.value,
          sApellidoP : this.fcApellidoP.value,
          sApellidoM : this.fcApellidoM.value,
          sNombre : this.fcNombres.value,
          dFechaNacimiento : this.fcFechaNacimiento.value,
          nIdGenero : this.fcGenero.value,
        }
        
        this.spinner.show();
        this.service.PostInsertarCliente(this.cliente).subscribe({
          next: (res : any) => {
            if(res.success){
              this.cliente = res.data;
              this.fnRegistrarReserva();
            } else {
              Swal.fire({
                icon: 'error',
                text: res.data.sMsj,
              });
            }
          },
          error: (err) => {
            console.log(err)
            this.cliente = null;
          },
          complete: () => this.spinner.hide()
        });
      } else {
        this.fnRegistrarReserva();
      }
    }
  }

  fnRegistrarReserva(){
    var reserva = { 
      nIdCliente : this.cliente.nIdCliente,
      nIdSalaPelicula : this.data.salaPelicula.nIdSalaPelicula,
      nCantidad : this.fcCantidad.value,
    }
    this.spinner.show();
    this.service.PostInsertarReserva(reserva).subscribe({
      next: (res : any) => {
        Swal.fire({
          icon: res.success ? 'success' : 'error',
          text: res.success ? 'Reserva exitosa' : res.data.sMsj,
        });
        this.exito = true;
        this.odFormDetailReserva(res.data);
        this.onClose();
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => this.spinner.hide()
    });
  }    
  //#endregion

  odFormDetailReserva(reserva : any){
    const dialogResult = this.formDialog.open(
      DetailReservaComponent,
      {
        width:'400px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          reserva : reserva,
        }
      }
    );
  }
}
