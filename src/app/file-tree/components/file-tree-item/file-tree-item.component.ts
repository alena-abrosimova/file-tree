import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FileTreeInterface } from '../../../shared/interfaces';
import { MatDialog } from '@angular/material';
import { CommentDialogComponent } from '../../../shared/dialogs/comment-dialog/comment-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'file-tree-item',
  templateUrl: './file-tree-item.component.html',
  styleUrls: ['./file-tree-item.component.scss']
})
export class FileTreeItemComponent implements OnInit, OnDestroy {
  @Input() fileTreeItem: FileTreeInterface;

  @Output() commentChangedEvent = new EventEmitter<FileTreeInterface>();

  destroy$ = new Subject();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  get isNew() {
    return this.fileTreeItem && this.fileTreeItem.status === 1;
  }

  get isChanged() {
    return this.fileTreeItem && this.fileTreeItem.status === 2;
  }

  get isDeleted() {
    return this.fileTreeItem && this.fileTreeItem.status === 3;
  }

  openCommentDialog() {
    this.dialog.open(CommentDialogComponent, {
      width: '50vw',
      disableClose: true,
      data: this.fileTreeItem.comment
    })
      .afterClosed()
      .pipe(
        tap((result: string) => this.updateComment(result)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  updateComment(result: string) {
    if (typeof result === 'string') {
      this.fileTreeItem.comment = result;
      this.commentChangedEvent.emit(this.fileTreeItem);
    }
  }

  deleteComment() {
    this.fileTreeItem.comment = null;
    this.commentChangedEvent.emit(this.fileTreeItem);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
