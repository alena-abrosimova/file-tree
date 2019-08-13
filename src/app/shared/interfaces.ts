export interface FileInterface {
  id: number;
  name: string;
  status: number;
  parent?: number;
  comment?: string;
}

export interface FileTreeInterface extends FileInterface{
  fileTree?: FileTreeInterface[];
}

// Перечень статусов
// 0 - default
// 1 - new
// 2 - changed
// 3 - deleted
