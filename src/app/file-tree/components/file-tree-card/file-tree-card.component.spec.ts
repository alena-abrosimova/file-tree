import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTreeCardComponent } from './file-tree-card.component';

describe('FileTreeCardComponent', () => {
  let component: FileTreeCardComponent;
  let fixture: ComponentFixture<FileTreeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTreeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
