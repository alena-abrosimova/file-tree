import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';

import { FileTreeInterface } from '../../../shared/interfaces';


export interface FileTreeFlatNode {
  level: number;
  expandable: boolean;
  name: string;
  comment: string;
  status: number;
}

@Component({
  selector: 'file-tree-card',
  templateUrl: './file-tree-card.component.html',
  styleUrls: ['./file-tree-card.component.scss']
})
export class FileTreeCardComponent implements OnInit, OnChanges {
  @Input() fileTree: FileTreeInterface[];

  @Output() commentChangedEvent = new EventEmitter<FileTreeInterface>();

  treeControl = new FlatTreeControl<FileTreeFlatNode>(
    item => item.level,
    item => item.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (item: FileTreeInterface, level: number) => {
      return {
        expandable: !!item.fileTree && item.fileTree.length > 0,
        name: item.name,
        comment: item.comment,
        level: level,
        id: item.id,
        status: item.status,
      };
    },
    item => item.level,
    item => item.expandable,
    item => item.fileTree
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, item: FileTreeFlatNode) => item.expandable;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fileTree && changes.fileTree.currentValue && changes.fileTree.currentValue !== changes.fileTree.previousValue) {
      this.dataSource.data = this.fileTree;
    }
  }

  commentChangedHandler(fileTreeItem: FileTreeInterface) {
    this.commentChangedEvent.emit(fileTreeItem);
  }
}
