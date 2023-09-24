const userId = localStorage.getItem("userId")

const buttonShowForm = document.getElementById("button-create-note")
const formCreateNote = document.getElementById("form-create-note")
const buttonSaveNote = document.getElementById("save-note")
const buttonCancelForm = document.getElementById("reset-form")


buttonShowForm.addEventListener("click", (e) => {
    e.preventDefault()

    formCreateNote.style.display = "flex"
})

buttonCancelForm.addEventListener("click", (e) => {
    e.preventDefault()

    formCreateNote.style.display = "none"
})

buttonSaveNote.addEventListener("click", (e) => {
    e.preventDefault()

    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const formIsValid = checkInputs()
    const newNote = {
        title: title.value,
        description: description.value,
        userId
    }

    if (formIsValid) {
        postNewNote(newNote)
    }
})

async function fetchNotes() {
    try {
        const response = await api.get(`/notes/${userId}`)
        const notes = response.data.data;
        console.log(response);
        console.log(notes);
        showNotes(notes)
    } catch (error) {
        console.log(error);
    }
}

async function postNewNote(newNote) {
    try {
        const response = await api.post("/notes/create", newNote)
        console.log(response);

    } catch (error) {
        checkPasswordAndEmail(error)
    }
}

function showNotes() {
    
}

function checkInputs() {
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