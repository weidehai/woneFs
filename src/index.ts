import fsPromises, { FileHandle } from 'fs/promises';
import { accessSync, constants } from 'fs';

async function openFile(filePath: string): Promise<FileHandle> {
  return await fsPromises.open(filePath, 'r');
}

async function getContent(fd: FileHandle): Promise<string> {
  return await fd.readFile({ encoding: 'utf8' });
}

/*
在读取文件完成后自动结束程序对文件资源的占用
*/
async function withGetContent(fd: FileHandle): Promise<string> {
  const content = await fd.readFile({ encoding: 'utf8' });
  fd.close();
  return content;
}

/*
flag: Default:w
'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
*/
async function writeFile(filePath: string, content: string): Promise<any> {
  await fsPromises.writeFile(filePath, content);
}

async function appendFile(filePath: string, content: string): Promise<any> {
  await fsPromises.writeFile(filePath, content, { flag: 'a' });
}

function isDirectoryExists(path: string): boolean {
  try {
    accessSync(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export { openFile, getContent, withGetContent, writeFile, appendFile, isDirectoryExists };
