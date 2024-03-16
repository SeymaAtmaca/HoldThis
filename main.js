const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        }
    });

    window.loadFile('src/index.html');

    ipcMain.handle('create-file', async (event, data) => {
        if (!data || !data.title || !data.content) {
            return { success: false, message: 'Başlık ve içerik gerekli.' };
        }

        try {
            const filePath = path.join(__dirname, 'notes', 'notes.json');
            let notes = [];

            if (fs.existsSync(filePath)) {
                const currentNotes = await fs.promises.readFile(filePath, 'utf8');
                notes = JSON.parse(currentNotes);
            } else {
                fs.mkdirSync(path.join(__dirname, 'notes', 'notes.json'));
            }

            const newNote = { title: data.title, content: data.content };
            notes.push(newNote);

            await fs.promises.writeFile(filePath, JSON.stringify(notes));

            return { success: true };
        } catch (error) {
            console.error('Dosya işlemleri hatası:', error);
            return { success: false, message: 'Dosya işlemleri hatası.' };
        }
    });

    ipcMain.handle('update-notes', async (event, notes) => {
        try {
            const filePath = path.join(__dirname, 'notes', 'notes.json');
            await fs.promises.writeFile(filePath, JSON.stringify(notes));
            return { success: true };
        } catch (error) {
            console.error('Dosya yazma hatası:', error);
            return { success: false, message: 'Dosya yazma hatası.' };
        }
    });

    ipcMain.handle('read-notes', async (event) => {
        try {
            const filePath = path.join(__dirname, 'notes', 'notes.json');
            const jsonData = await fs.promises.readFile(filePath, 'utf8');
            var notes;
            try {
                notes = JSON.parse(jsonData);

            } catch (error) {
                console.error("JSON parse hatası:", error);
            }


            return notes;
        } catch (error) {
            console.error('Dosya okuma hatası:', error);
            return [];
        }
    });

}

app.whenReady().then(createWindow);
