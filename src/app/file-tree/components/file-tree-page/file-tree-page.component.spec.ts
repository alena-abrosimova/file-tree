import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTreePageComponent } from './file-tree-page.component';

describe('FileTreePageComponent', () => {
  let component: FileTreePageComponent;
  let fixture: ComponentFixture<FileTreePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTreePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTreePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
