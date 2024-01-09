let notes = [];

const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const toggleBtn = document.getElementById('toggle-btn');
const underlineBtn = document.getElementById('underline-btn');
const boldBtn = document.getElementById('bold-btn');

const deleteBtn = document.getElementById('delete-btn');
const titleArea = document.getElementById('text-area-title');
const bodyArea = document.getElementById('text-area-body');
const formWrapper = document.getElementById('temp');
const container = document.getElementById("parent-grid");

const getAllNotes = () => {
    notes = JSON.parse(localStorage.getItem('saved-notes') || '[]');
    return notes;
    // return notes.sort((a, b) => {
    //     return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    // })
}

const refreshNotes = () => {
    notes = getAllNotes();
    container.innerHTML = '';

    notes?.map((note, index) => {
        const card = document.createElement('div');
        card.innerHTML = `
      <div id='${note.id}' class="bg-white dark:bg-background dark:text-offwhite border dark:border-gray-500 dark:hover:border-gray-300 rounded-md shadow-md p-2">
      <h2 class="font-semibold sm:text-sm md:text-sm lg:text-xl" id="note-title">${note.title}</h2>
      <p class="sm:text-sm lg:text-base" id="note-body">${note.body}</p>
      <div class="mt-2 flex justify-end gap-x-4 px-2">
          <button onClick='copyToClipboard(this.id)' id='${index}' class="hover:bg-gray-200 dark:bg-gray-200 rounded-md p-1" id="copy-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
          </button>
          <button onCLick='edit(this.id)' id='${index}' class="hover:bg-gray-200 dark:bg-gray-200 rounded-md p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
          </button>
          <button onClick='deleteNote(this.id)' id='${index}' id='delete-btn' class="hover:bg-gray-200 dark:bg-gray-200 rounded-md p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </button>                      
        </div>
      
     </div>`;
        container.appendChild(card);
    })
}

refreshNotes();

const addNote = () => {
    const title = titleArea.value;
    const body = bodyArea.value;
    let id;
    let newNote = {
        id,
        title,
        body
    }

    //assigning id if it already exists
    formWrapper.id === 'temp' ? newNote.id = Math.floor(Math.random() * 1000) : newNote.id = parseInt(formWrapper.id);
    return newNote;
}

const saveNote = (e) => {
    e.preventDefault();
    //const getNotes = getAllNotes();
    const noteToSave = addNote();
    const isExists = notes?.find(note => note.id === noteToSave.id)

    if (isExists) {
        isExists.title = noteToSave.title;
        isExists.body = noteToSave.body;
        //isExists.updated = new Date.toISOString();
    } else {
        //noteToSave.updated = new Date.toISOString();
        notes.unshift(noteToSave);
    }

    localStorage.setItem('saved-notes', JSON.stringify(notes));
    resetForm();
    formWrapper.id = 'temp';
    refreshNotes();
}

const deleteNote = (id) => {
    const getNotes = getAllNotes();
    //const newNotes = getNotes.filter(note => note.id != id);
    getNotes.splice(id, 1)
    localStorage.setItem('saved-notes', JSON.stringify(getNotes));
    refreshNotes();
}

const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>
`
const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e1e1e2" class="w-6 h-6">
  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
</svg>

`

let theme = localStorage.getItem('T-SITE-THEME') || 'light';
theme === 'light' ? setLightTheme() : setDarkTheme();

function setLightTheme() {
    document.body.classList.remove('dark');
    toggleBtn.innerHTML = MOON_SVG;
    localStorage.setItem('T-SITE-THEME', 'light');
    theme = 'light';
}

function setDarkTheme() {
    document.body.classList.add('dark');
    toggleBtn.innerHTML = SUN_SVG;
    localStorage.setItem('T-SITE-THEME', 'dark');
    theme = 'dark';
}

const toggle = () => {
    if (theme === 'light') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

function resetForm() {
    titleArea.value = '';
    bodyArea.value = '';
}

function edit(index) {
    titleArea.value = notes[index].title;
    bodyArea.value = notes[index].body;
    formWrapper.id = notes[index].id;

    //scrolling to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function copyToClipboard(index) {
    const textToCopy = notes[index].body;
    navigator.clipboard.writeText(textToCopy);
    alert("copied text");
}

function textToBold(e) {
    e.preventDefault();
    bodyArea.style.fontWeight === 'normal' ? bodyArea.style.fontWeight = 'bold' : bodyArea.style.fontWeight = 'normal';
}

function textToUnderline(e) {
    e.preventDefault();
    bodyArea.style.textDecoration === 'underline' ? bodyArea.style.textDecoration = 'none' : bodyArea.style.textDecoration = 'underline';
}

//eventListeners
saveBtn.addEventListener('click', saveNote);
resetBtn.addEventListener('click', resetForm);
toggleBtn.addEventListener('click', toggle)
boldBtn.addEventListener('click', textToBold);
underlineBtn.addEventListener('click', textToUnderline);