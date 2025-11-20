// electron/main.ts
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { ipcMain } from "electron";
import fs from "fs";
const isDev = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  console.log("preload path:", path.join(__dirname, "preload.js"));

  mainWindow = new BrowserWindow({
    width: 360,
    height: 260,
    alwaysOnTop: true, // 🔥 常に最前面
    frame: false, // 🔥 タイトルバー無し → ミニウィンドウ感
    transparent: true, // 🔥 透過っぽい背景 (mac だと特に綺麗)
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // dev では ts-node 経由なので後で解説

      devTools: true,
    },
  });
  mainWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
ipcMain.handle("json:init", async (_e, filePath) => {
  if (fs.existsSync(filePath)) return;
  fs.writeFileSync(filePath, JSON.stringify({ projects: [], tasks: [] }, null, 2));
  return true;
});

ipcMain.handle("json:read", async (_e, filePath) => {
  const text = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(text);
});

ipcMain.handle("json:write", async (_e, { filePath, data }) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return true;
});

ipcMain.handle("json:exists", async (_e, filePath) => {
  return fs.existsSync(filePath);
});

