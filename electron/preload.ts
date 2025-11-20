// electron/preload.ts
import { contextBridge } from "electron";
import { ipcRenderer } from "electron";
export type ElectronAPI = {
  ping: () => string;
  readJSON: (filePath: string) => Promise<unknown>;
  writeJSON: (filePath: string, data: unknown) => Promise<void>;
  existsJSON: (filePath: string) => Promise<boolean>;
  initJSON: (filePath: string) => Promise<void>;  
};

const api = {
  ping: () => "pong from preload",
  readJSON: (filePath: string) => ipcRenderer.invoke("json:read", filePath),
  writeJSON: (filePath: string, data: unknown) => ipcRenderer.invoke("json:write", { filePath, data }),
  existsJSON: (filePath: string) => ipcRenderer.invoke("json:exists", filePath),
  initJSON: (filePath: string) => ipcRenderer.invoke("json:init", filePath),
};

contextBridge.exposeInMainWorld("api", api);
// window.electronAPI の型補完用宣言
declare global {
  interface Window {
    api: ElectronAPI;
  }
}
