import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-s6o4o11-predVal',
  templateUrl: './s6o4o11-predVal.component.html',
  styleUrls: ['./s6o4o11-predVal.component.css']
})
export class S6o4o11PredValComponent  {

  newValue: string = '';
  values: string[] = [];

  constructor(public dialogRef: MatDialogRef<S6o4o11PredValComponent>) {}


  TS_addValue(): void {
    if (this.newValue.trim()) {
      this.values.push(this.newValue.trim());
      this.newValue = ''; // Reset the input field
    }
  }

  TS_closeDialog(): void {
    this.dialogRef.close(this.values);
  }
}
