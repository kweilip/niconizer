import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { BrowserWindow, screen } from 'electron'

let win: BrowserWindow | undefined

export function openWindow(): void {
  if (win) {
    return
  }

  const { size } = screen.getPrimaryDisplay()

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
  })

  win.setIgnoreMouseEvents(true)
  win.setVisibleOnAllWorkspaces(true)
  // win.webContents.openDevTools({ mode: 'detach' })
  // __dirname in packaged app: resources/app.asar/dist/app
  // Go up to resources/app.asar/dist, then to content
  const contentPath = path.resolve(__dirname, '..', 'content', 'index.html')
  // console.log('__dirname:', __dirname)
  // console.log('contentPath:', contentPath)
  win.loadURL(pathToFileURL(contentPath).href).catch(error => {
    throw error
  })

  win.on('closed', () => {
    win = undefined
  })
}

export function closeWindow(): void {
  win?.close()
}
