// src/types/preload.d.ts
export {};

declare global {
  interface Window {
    api: {
      readJSON: (filePath: string) => Promise<any>;
      writeJSON: (filePath: string, data: any) => Promise<boolean>;
    };
  }
}
