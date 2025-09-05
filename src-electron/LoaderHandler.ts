import {getSingletonInstance} from "@stread/sample-electron-preload/main";
import {AppHandler} from "app/src-electron/handler/AppHandler";

export const LoaderHandler = [
  getSingletonInstance(AppHandler),
]
