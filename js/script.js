const title_element = document.getElementById('title');
title_element.innerText = api.title;

const note_title_el = document.getElementById('noteTitle');
const note_content_el = document.getElementById('noteContent');
const note_submit_el = document.getElementById('noteSubmit');

async function init() {
    const notes = await api.readNotes();
    const noteList = document.getElementById('noteList');

    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = `Title: ${note.title}, Content: ${note.content}`;
        noteList.appendChild(li);
    });

    note_submit_el.addEventListener('click', async () => {
        const title = note_title_el.value;
        const content = note_content_el.value;

        const res = await api.createNote({
            title,
            content
        });
        note_title_el.value = "";
        note_content_el.value = "";
    });
}

init();
