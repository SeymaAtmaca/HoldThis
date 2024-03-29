const titleElement = document.getElementById('title');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteSubmitButton = document.getElementById('noteSubmit');
const addNoteForm = document.querySelector('.add-note-form');
const showAddNoteFormButton = document.getElementById('showAddNoteFormButton');
const noteListElement = document.getElementById('noteList');

showAddNoteFormButton.addEventListener('click', () => {
    addNoteForm.style.display = 'block';
});

noteSubmitButton.addEventListener('click', async () => {
    const title = noteTitleInput.value;
    const content = noteContentInput.value;
    addNoteForm.style.display = 'none';
    const res = await api.createNote({
        title,
        content
    });
    noteTitleInput.value = '';
    noteContentInput.value = '';
    getNotesList();
});

async function getNotesList() {
    noteListElement.innerHTML = ''; // Önceki notları temizle
    const notes = await api.readNotes();
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.classList.add('note');

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', async () => {
            await deleteNote(index);
        });

        div.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
        `;
        div.appendChild(deleteButton);
        noteListElement.appendChild(div);
    });
}

async function deleteNote(index) {
    const notes = await api.readNotes();
    notes.splice(index, 1); 
    await api.updateNotes(notes); 
    getNotesList(); 
}

async function init() {
    const notes = await api.readNotes();
    titleElement.innerText = api.title;
    getNotesList();
}

init();
