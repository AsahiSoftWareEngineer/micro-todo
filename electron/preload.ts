// electron/preload.ts
import { contextBridge } from "electron";
import { ipcRenderer } from "electron";
export type ElectronAPI = {
  ping: () => string;
};

const api = {
  ping: () => "pong from preload",
  readJSON: (filePath: string) => ipcRenderer.invoke("json:read", filePath),
  writeJSON: (filePath: string, data: unknown) => ipcRenderer.invoke("json:write", { filePath, data }),
  existsJSON: (filePath: string) => ipcRenderer.invoke("json:exists", filePath),
};

contextBridge.exposeInMainWorld("api", api);
// contextBridge.exposeInMainWorld("api", {
//   readJSON: (filePath: string) => ipcRenderer.invoke("json:read", filePath),
//   writeJSON: (filePath: string, data: unknown) =>
//     ipcRenderer.invoke("json:write", { filePath, data }),
// });
// window.electronAPI の型補完用宣言
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
