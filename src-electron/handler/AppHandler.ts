import {Send} from "@stread/sample-electron-preload/main"
import {getMainWindow} from "app/src-electron/app/windowManager";

export class AppHandler {
  @Send({route: "AppHandler.minimize"})
  minimize() {
    const mainWindow = getMainWindow();
    if (!mainWindow) return null;
    return mainWindow.minimize();
  }

  @Send({route: "AppHandler.toggleMaximize"})
  toggleMaximize() {
    const mainWindow = getMainWindow();
    if (!mainWindow) return null;
    if (mainWindow.isMaximized()) return mainWindow.unmaximize()
    else return mainWindow.maximize()
  }

  @Send({route: "AppHandler.close"})
  close() {
    const mainWindow = getMainWindow();
    if (!mainWindow) return null;
    return mainWindow.close()
  }
}
