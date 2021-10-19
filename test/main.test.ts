import {
  openFile,
  getContent,
  withGetContent,
  writeFile,
  appendFile,
  isDirectoryExists,
} from '../src/index';
import path from 'path';
import { constants } from 'fs';

console.log(constants);

const filePath = path.join(__dirname, './exmaple.txt');
const filePath2 = path.join(__dirname, './exmaple2.txt');
const filePath3 = path.join(__dirname, './exmaple3.txt');

test('openFile', async () => {
  async function testOpenFile() {
    try {
      await openFile(filePath);
    } catch (e) {
      return 'fail';
    }
  }
  let result = await testOpenFile();
  expect(result).not.toBe('fail');
});

test('getContent', async () => {
  async function testGetContent() {
    try {
      let fd = await openFile(filePath);
      let result = await getContent(fd);
      return result;
    } catch (e) {
      return 'fail';
    }
  }
  async function testGetContent2() {
    try {
      let fd = await openFile(filePath);
      let result = await withGetContent(fd);
      return result;
    } catch (e) {
      return 'fail';
    }
  }
  let result = await testGetContent();
  let result2 = await testGetContent();
  expect(result).toMatch('hello world');
  expect(result2).toMatch('hello world');
});

test('writeFile', async () => {
  async function testWriteFile() {
    try {
      let result = await writeFile(filePath2, 'hello world weidehai');
      return result;
    } catch (e) {
      return 'fail';
    }
  }
  let result = await testWriteFile();
  expect(result).toBe(undefined);
});

test('appendFile', async () => {
  async function testAppendFile() {
    try {
      let result = await appendFile(filePath3, '123');
      return result;
    } catch (e) {
      console.log(e);

      return 'fail';
    }
  }
  let result = await testAppendFile();
  expect(result).toBe(undefined);
});

test('isDirectoryExists', async () => {
  function testIsDirectoryExists() {
    return isDirectoryExists(path.join(__dirname, './exmaple4.txt'));
  }
  let result = testIsDirectoryExists();
  expect(result).toBe(false);
});

test('isDirectoryExists', async () => {
  function testIsDirectoryExists() {
    return isDirectoryExists(path.join(__dirname, './test'));
  }
  let result = testIsDirectoryExists();
  expect(result).toBe(true);
});

test('isDirectoryExists', async () => {
  function testIsDirectoryExists() {
    return isDirectoryExists(path.join(__dirname, './test3'));
  }
  let result = testIsDirectoryExists();
  expect(result).toBe(false);
});
