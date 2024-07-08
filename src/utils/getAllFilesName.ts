import * as fs from 'fs';

export function getAllFiles(directoryPath: string): string[] {
  try {
    const files: string[] = fs.readdirSync(directoryPath);
    return files.map((file) => 'icons/' + file);
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error);
    return [];
  }
}
