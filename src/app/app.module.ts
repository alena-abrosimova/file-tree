import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FileTreeModule } from './file-tree/file-tree.module';


const modules = [
  SharedModule,

  FileTreeModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
