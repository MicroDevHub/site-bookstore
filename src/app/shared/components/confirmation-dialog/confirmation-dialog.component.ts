import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  confirmMessage: string;
  confirmTitle: string;
  callbackMethod: () => void
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  handleEvent() {
    this.callbackMethod();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
