import { FileInterface, FileTreeInterface } from './interfaces';

// отправляем на сортировку файловое дерево вместе с вхождениями
export function sortFileTree(fileTree: FileTreeInterface[]) {
  fileTree = _sortFileTree(fileTree);
  fileTree.map(item => {
    if (item.fileTree.length > 0) sortFileTree(item.fileTree);
  });
}

// сортировка списка
export function _sortFileTree(fileTree: FileTreeInterface[]): FileTreeInterface[] {
  fileTree
    .sort((a, b) => _sortBy(a, b, 'name'))
    .sort((a, b) => _sortByTree(a, b));

  return fileTree;
}

// сортировка по алфавиту
export function _sortBy(a: FileInterface | FileTreeInterface, b: FileInterface | FileTreeInterface, parameter: string): number {
  if (a[parameter] < b[parameter]) return -1;
  if (a[parameter] > b[parameter]) return 0;
  return 1;
}

// сортировка по наличию вхождения
export function _sortByTree(a: FileTreeInterface, b: FileTreeInterface): number {
  if (a.fileTree.length > 0 && b.fileTree.length === 0) return -1;
  if (a.fileTree.length === 0 && b.fileTree.length > 0) return 0;
  return 1;
}
