import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { materialModules } from '../../shared/material.module';
import { FileTreePageComponent } from './file-tree-page/file-tree-page.component';
import { FileTreeCardComponent } from './file-tree-card/file-tree-card.component';
import { FileTreeItemComponent } from './file-tree-item/file-tree-item.component';


@NgModule({
  declarations: [
    FileTreePageComponent,
    FileTreeCardComponent,
    FileTreeItemComponent
  ],
  imports: [
    SharedModule,
    ...materialModules
  ],
  exports: [FileTreePageComponent]
})

export class FileTreeComponentsModule {
}
