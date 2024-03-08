import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-reserva',
  templateUrl: './detail-reserva.component.html',
  styleUrls: ['./detail-reserva.component.css']
})
export class DetailReservaComponent {

  constructor(
    public dialogRef : MatDialogRef<DetailReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {reserva : any} 
  ){
  }

  //#region EVENTOS DIALOG
  onClose() {
    this.dialogRef.close();
  }
  //#endregion
}
