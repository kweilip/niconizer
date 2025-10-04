import path from 'node:path'

import { Menu, Tray, app } from 'electron'

import { closeWindow, openWindow } from './window'

/**
 * to avoid GC
 * https://www.electronjs.org/docs/faq#my-apps-tray-disappeared-after-a-few-minutes
 */
let tray: Tray

export function initTray(): void {
  // __dirname in packaged app: resources/app.asar/dist/app
  // Go up to resources/app.asar/dist, then to icon
  const iconPath = path.resolve(__dirname, '..', 'icon', 'icon_16x16.png')
  tray = new Tray(iconPath)
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Start', click: start },
      { label: 'Stop', click: stop },
      { label: 'Quit', click: quit },
    ]),
  )
}

export function start() {
  openWindow()
}

export function stop() {
  closeWindow()
}

export function quit() {
  app.quit()
}
