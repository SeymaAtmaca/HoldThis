const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    title : "The Note App",
    createNote : (data) => ipcRenderer.invoke('create-file', data),
    readNotes: () => ipcRenderer.invoke('read-notes')
})