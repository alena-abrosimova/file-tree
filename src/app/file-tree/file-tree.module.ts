import { NgModule } from '@angular/core';
import { FileTreeComponentsModule } from './components/file-tree-components.module';


@NgModule({
  imports: [FileTreeComponentsModule],
  exports: [FileTreeComponentsModule]
})

export class FileTreeModule {
}
