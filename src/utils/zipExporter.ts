import JSZip from 'jszip';
import { PROJECT_FILES } from '../data/projectFiles';

export async function exportProjectAsZip(): Promise<void> {
  const zip = new JSZip();
  const root = zip.folder('java-gradle-devops');

  if (!root) {
    throw new Error('Failed to create zip directory');
  }

  // Populate all project files
  for (const file of PROJECT_FILES) {
    root.file(file.path, file.content);
  }

  // Generate ZIP blob
  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  // Trigger browser download
  const url = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'java-gradle-devops.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadSingleFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
