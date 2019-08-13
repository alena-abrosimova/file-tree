import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  @HostListener('window:keyup.esc') onKeyUp() { this.closeDialog(); }

  comment: string;

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
    if (this.data && this.data.length > 0) {
      this.comment = this.data;
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
