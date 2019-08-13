import { Component, OnInit } from '@angular/core';

import { FileInterface, FileTreeInterface } from '../../../shared/interfaces';
import { _sortBy, sortFileTree } from '../../../shared/utils';


@Component({
  selector: 'file-tree-page',
  templateUrl: './file-tree-page.component.html',
  styleUrls: ['./file-tree-page.component.scss']
})
export class FileTreePageComponent implements OnInit {
  uploadedFile: File;
  files: FileInterface[] = [];
  doubleFiles: FileInterface[] = [];
  fileTree: FileTreeInterface[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  // Привязка комментария к файлу
  commentChangedHandler(fileTreeItem: FileTreeInterface) {
    let fileItem = this.files.find(item => item.id === fileTreeItem.id);
    let index = this.files.indexOf(fileItem);
    this.files[index].comment = fileTreeItem.comment;
  }

  // Проверка на наличие загруженного дерева файлов
  get filesAlreadyExist(): boolean {
    return this.files.length > 0;
  }

  // Проверка на идентичность первых элементов
  get filesIsIdentical(): boolean {
    return this.files[0] && this.doubleFiles[0] && this.files[0].id === this.doubleFiles[0].id;
  }

  // Очистка
  clearFileTree() {
    this.uploadedFile = null;
    this.files = [];
    this.doubleFiles = [];
    this.fileTree = [];
  }

  // Распознавание содержимого и подготовка его для обработки
  prepareFile(event: Event) {
    let self = this;
    if (event.target['files'][0]) {
      this.uploadedFile = event.target['files'][0];
    }
    let reader = new FileReader();
    reader.onloadend = function (e) {
      self.prepareFileContents(e.target['result']);
    };
    reader.readAsText(this.uploadedFile);
  }

  // Подготовка списка файлов, проверка на существование, формирование файлового дерева, сортировка результата
  private prepareFileContents(contents: string) {
    this.doubleFiles = [];
    if (this.filesAlreadyExist) {
      this.doubleFiles = this.generateFiles(contents);
      this.compareFilesByDoubleFiles();
    } else {
      this.files = this.generateFiles(contents);
    }

    this.generateFileTree();
    sortFileTree(this.fileTree);
  }

  // Сравнение старого списка файлов с новым
  private compareFilesByDoubleFiles() {
    if (this.filesIsIdentical) {
      this.mergeFiles();
    } else {
      this.files = [];
      this.files = this.doubleFiles.slice(0);
      this.doubleFiles = [];
    }
  }

  // Слияние списка файлов с дублирующим
  private mergeFiles() {
    this.mergeDoubleWithFiles();
    this.mergeFilesWithDouble();
    this.files.sort((a, b) => _sortBy(a, b, 'id'));
  }

  // Добавление новых и пометка измененных файлов
  private mergeDoubleWithFiles() {
    this.doubleFiles.map(double => {
      let fileItem = this.files.find(item => item.id === double.id);
      let index = this.files.indexOf(fileItem);
      if (fileItem) {
        if (fileItem.name !== double.name || fileItem.parent !== double.parent) {
          this.files[index].name = double.name;
          this.files[index].status = 2;
        } else {
          this.files[index].status = 0;
        }
      } else {
        double.status = 1;
        this.files.push(double);
      }
    });
  }

  // Пометка удаленных
  private mergeFilesWithDouble() {
    this.files.map(item => {
      let fileItem = this.doubleFiles.find(double => double.id === item.id);
      if (!fileItem) {
        item.status = 3;
      }
    });
  }

  // Генерация списка файлов
  private generateFiles(contents: string): FileInterface[] {
    let newFiles: FileInterface[] = [];
    contents.split('\n').map(item => {
      let newFileArray: string[] = item.split(',');
      if (newFileArray[0] && newFileArray[1]) {
        newFiles.push({
          id: Number(newFileArray[0]),
          name: newFileArray[1],
          parent: Number(newFileArray[2]),
          status: 0
        });
      }
    });

    newFiles.sort((a, b) => _sortBy(a, b, 'id'));

    return newFiles
  }

  // Генерация файлового дерева
  private generateFileTree() {
    this.fileTree = [];

    let firstItem = this.files.find(item => item.parent === -1);
    this.fileTree.push({
      id: firstItem.id,
      name: firstItem.name,
      fileTree: [],
      status: firstItem.status,
      comment: firstItem.comment
    });

    this.files.map(item => {
      if (item.parent > -1) {
        this.findFileTreeItem(item, this.fileTree);
      }
    });
  }

  // Поиск родителя для нового item
  private findFileTreeItem(item: FileInterface, fileTree: FileTreeInterface[]) {
    let fileItem: FileTreeInterface = fileTree.find(file => file.id === item.parent);
    if (fileItem) {
      fileItem.fileTree.push({
        id: item.id,
        name: item.name,
        fileTree: [],
        status: item.status,
        comment: item.comment
      });
    } else {
      fileTree.map(fileTreeItem => this.findFileTreeItem(item, fileTreeItem.fileTree));
    }
  }
}
