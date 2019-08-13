import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';

import { materialModules } from '../material.module';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { FormsModule } from '@angular/forms';


const modules = [
  CommonModule,
  FlexLayoutModule,
  FormsModule
];

const dialogs = [CommentDialogComponent];

@NgModule({
  declarations: [
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  imports: [
    ...modules,
    ...materialModules,
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ]
})

export class SharedDialogsModule {

}
