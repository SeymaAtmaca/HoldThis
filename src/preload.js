const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    title: "",
    createNote: (data) => ipcRenderer.invoke('create-file', data),
    readNotes: () => ipcRenderer.invoke('read-notes'),
    updateNotes: (notes) => ipcRenderer.invoke('update-notes', notes)
});