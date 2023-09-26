const USER = JSON.parse(localStorage.getItem("USER"))
console.log(USER);

if (USER === null || USER.isLogged === false) {
    alert("User not found! Please create an account and login to access your notes!")

    window.location.replace("/signup-page.html")
}
const buttonLogout = document.getElementById("logout")

const perPageInput = document.getElementById("per-page")
const prevPageButton = document.getElementById("prev-button")
const nextPageButton = document.getElementById("next-button")
const selectPages = document.getElementById("select-pages")

const buttonShowForm = document.getElementById("button-create-note")
const formCreateNote = document.getElementById("form-create-note")
const buttonSaveNote = document.getElementById("save-note")
const buttonCancelForm = document.getElementById("reset-form")
const notesContainer = document.getElementById("notes-container")

const formUpdateNote = document.getElementById("form-update-note")
const buttonCancelFormUpadate = document.getElementById("update-reset-form")
const buttonSaveUpadateNote = document.getElementById("update-save-note")

let noteId
let updatedNote
let per_page
let totalOfNotes

prevPageButton.addEventListener("click", goToPrevPage)
nextPageButton.addEventListener("click", goToNextPage)

buttonLogout.addEventListener("click", (e) => {
    e.preventDefault()

    const response = confirm("Are you sure you want to logout?")

    if (response) {
        logoutUser()

        localStorage.clear()
    }
})

selectPages.addEventListener("change", () => {
    per_page = verificateInputPerPage()

    fetchNotes(selectPages.value, per_page)
})

perPageInput.addEventListener("input", (e) => {
    e.preventDefault()

    if (perPageInput.value === "") {
        perPageInput.value = 10
    }

    fetchNotes(page = 1, perPageInput.value)
})

buttonShowForm.addEventListener("click", (e) => {
    e.preventDefault()
    formCreateNote.style.display = "flex"
})

buttonCancelForm.addEventListener("click", () => {
    const formControl = formCreateNote.querySelectorAll(".form-control")
    formControl.forEach(formControl => {
        formControl.classList.remove("success")
        formControl.classList.remove("error")
    })
    formCreateNote.style.display = "none"
})

buttonSaveNote.addEventListener("click", (e) => {
    e.preventDefault()

    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const formIsValid = checkInputs(title, description)

    const newNote = {
        title: title.value,
        description: description.value,
        userId: USER.id
    }

    if (formIsValid) {
        postNewNote(newNote)

        const formControl = formCreateNote.querySelectorAll(".form-control")

        formControl.forEach(formControl => {
            formControl.classList.remove("error")
        })
    }
})

buttonCancelFormUpadate.addEventListener("click", () => {
    const formControl = formUpdateNote.querySelectorAll(".form-control")
    formControl.forEach(formControl => {
        formControl.classList.remove("success")
        formControl.classList.remove("error")
    })
    formUpdateNote.style.display = "none"
})

buttonSaveUpadateNote.addEventListener("click", (e) => {
    e.preventDefault()

    const title = document.getElementById("update-title")
    const description = document.getElementById("update-description")
    const formIsValid = checkInputs(title, description)

    updatedNote = {
        title: title.value,
        description: description.value,
    }

    if (formIsValid) {
        updateNote(updatedNote)

        const formControl = formUpdateNote.querySelectorAll(".form-control")

        formControl.forEach(formControl => {
            formControl.classList.remove("error")
        })
    }
})

async function fetchNotes(page = 1, per_page = 10) {
    try {
        const params = {
            page,
            per_page
        }

        const response = await api.get(`/notes/${USER.id}`, {
            params
        })

        const notes = response.data.data;
        totalOfNotes = response.data.info.totalOfNotes

        createOption(totalOfNotes, per_page)
        showNotes(notes)
        disableButtonsIfPageNull(page, totalOfNotes, per_page)
        updateSelectedPage(page)
    } catch (error) {
        console.log(error);
    }
}

async function postNewNote(newNote) {
    try {
        const response = await api.post("/notes/create", newNote)

        fetchNotes()

    } catch (error) {
        console.log(error);
    }
}

async function deleteNote(noteId) {
    try {
        const responseUser = confirm("Are you sure you want to delete this note?")
        console.log(noteId);

        if (responseUser) {
            const response = await api.delete(`/notes/${noteId}`)
            
            fetchNotes(page = 1, per_page)
        }

    } catch (error) {
        console.log(error);
    }
}

async function updateNote(updatedNote) {
    
    try {
        const responseUser = confirm("Are you sure you want to update this note?")

        if (responseUser) {
            const response = await api.put(`/notes/${noteId}`, updatedNote)
            
            fetchNotes(page = 1, per_page)
        }

    } catch (error) {
        console.log(error);
    }
}

async function logoutUser() {
    try {
        const response = await api.put(`/users/logout/${USER.id}`)

        window.location.replace("/login-page.html")

    } catch (error) {
        console.log(error);
    }
}

function showForm(id) {
    formUpdateNote.style.display = "flex"
    
    noteId = id
}

function verificateInputPerPage() {
    if (perPageInput.value !== "") {
        return perPageInput.value
    }
}

function updateSelectedPage(currentPage) {
    selectPages.value = currentPage
}

function showNotes(notes) {
    notesContainer.innerHTML = ""

    notes.forEach(note => {
        console.log(note);
        createNote(note)
    })
}

function createOption(totalOfNotes, per_page) {
    selectPages.innerHTML = `
            <option id="disabled-option" value="" disabled>Select Page</option>
        `

    for (let index = 1; index <= Math.ceil(totalOfNotes / per_page); index++) {
        const option = document.createElement("option")
        option.value = index
        option.innerText = `Page ${index}`
        selectPages.appendChild(option)
    }
}

function updateSelectedPage(currentPage) {
    selectPages.value = currentPage
}

function disableButtonsIfPageNull(currentPage, totalOfNotes, per_page) {
    if (currentPage === 1) {
        prevPageButton.classList.add("disabled-button")
        prevPageButton.disabled = true
    } else {
        prevPageButton.classList.remove("disabled-button")
        prevPageButton.disabled = false
    }

    if (currentPage === Math.ceil(totalOfNotes / per_page)) {
        nextPageButton.classList.add("disabled-button")
        nextPageButton.disabled = true
    } else {
        nextPageButton.classList.remove("disabled-button")
        nextPageButton.disabled = false
    }
}

function goToPrevPage() {
    let currentPage = selectPages.value

    if (currentPage > 1) {
        currentPage--
    }

    per_page = verificateInputPerPage()

    fetchNotes(currentPage, per_page)
}

function goToNextPage() {
    let currentPage = selectPages.value

    per_page = verificateInputPerPage()

    if (currentPage < Math.ceil(totalOfNotes / per_page)) {
        currentPage++
    }

    fetchNotes(currentPage, per_page)
}

function createNote(note) {
    const NOTE = document.createElement("div")
    NOTE.classList.add("note")

    NOTE.innerHTML = `
            <div id="title-description-container">
                <h4>${note.title}</h4>
                <p>${note.description}</p>
                </div>
            <div id="delete-edit-container">
                <button onclick="deleteNote('${note.id}')" id="delete?" class="delete-button"><img src="./icons/delete.png"></img></button>
                <button onclick="showForm('${note.id}')" id="edit?" class="edit-button"><img src="./icons/edit.png"></img></button>
            </div>  
        `

    notesContainer.appendChild(NOTE)
}

function checkInputs(title, description) {
    const titleValue = title.value
    const descriptionValue = description.value

    if (!titleValue) {
        setError(title, "Title is mandatory.")
    } else {
        setSuccess(title)
    }

    if (!descriptionValue) {
        setError(description, "Description is mandatory.")
    } else {
        setSuccess(description)
    }

    const formControl = formCreateNote.querySelectorAll(".form-control")

    let formIsValid = true

    formControl.forEach(formControl => {
        if (formControl.className !== "form-control success") {
            formIsValid = false
            return
        }
    })

    if (formIsValid) {
        return formIsValid
    }
}

function setError(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector("small")

    small.innerText = message

    formControl.classList.remove("success")
    formControl.classList.add("error")
}

function setSuccess(input) {
    const formControl = input.parentElement

    formControl.classList.remove("error")
    formControl.classList.add("success")
}

fetchNotes()
