import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SharedDialogsModule } from './dialogs/shared-dialogs.module';


const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  BrowserModule,

  SharedDialogsModule
];

@NgModule({
  imports: [
    ...modules,
    LocalStorageModule.forRoot({
      prefix: '',
      storageType: 'localStorage'
    })
  ],
  exports: [
    ...modules,
    LocalStorageModule
  ]
})

export class SharedModule {
}
