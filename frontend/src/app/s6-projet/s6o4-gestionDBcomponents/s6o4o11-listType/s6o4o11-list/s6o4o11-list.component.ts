import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { S6o4o11PredValComponent } from '../s6o4o11-predVal/s6o4o11-predVal.component';
import { S6o4o11ExcelListComponent } from '../s6o4o11-excelList/s6o4o11-excelList.component';
import { S6o4o11FromOurDBComponent } from '../s6o4o11-fromOurDB/s6o4o11-fromOurDB.component';

@Component({
  selector: 'app-s6o4o11-list',
  templateUrl: './s6o4o11-list.component.html',
  styleUrls: ['./s6o4o11-list.component.css']
})
export class S6o4o11ListComponent {
  @Output() listValuesUpdated = new EventEmitter<string[]>();
  currentListValues: string[] = [];

  constructor(public dialog: MatDialog) { }

  TS_openPredValDialog() {
  const dialogRef = this.dialog.open(S6o4o11PredValComponent, {
    width: '400px',
    height: '350px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Predefined values dialog was closed', result);
    if (result) {
      this.currentListValues = result;
    }
    if (result) {
      this.currentListValues = result;
      this.listValuesUpdated.emit(this.currentListValues);
    }
  });

}


TS_openExcelListDialog() {
  const dialogRef = this.dialog.open(S6o4o11ExcelListComponent, {
    width: '400px',
    height: '350px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Excel List dialog was closed', result);
    if (result) {
      this.currentListValues = result;
      this.listValuesUpdated.emit(this.currentListValues);
    }
  });
}

TS_openFromOurDBDialog() {
  const dialogRef = this.dialog.open(S6o4o11FromOurDBComponent, {
    width: '400px',
    height: '350px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('From our Database dialog was closed', result);
    if (result && result.length > 0) {
      this.currentListValues = result; // Update the currentListValues with the result
      this.listValuesUpdated.emit(this.currentListValues); // Emit the updated list values
    }
  });
}



}
