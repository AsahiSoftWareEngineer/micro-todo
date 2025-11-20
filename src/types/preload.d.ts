// src/types/preload.d.ts
export {};

declare global {
  interface Window {
    api: {
      initJSON(arg0: string): unknown;
      existsJSON(arg0: string): unknown;
      readJSON: (filePath: string) => Promise<any>;
      writeJSON: (filePath: string, data: any) => Promise<boolean>;
    };
  }
}
