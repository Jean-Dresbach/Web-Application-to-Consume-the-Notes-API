const formUpdateNote = document.getElementById("form-update-note")
const buttonCancelFormUpadate = document.getElementById("update-reset-form")
const buttonSaveUpadateNote = document.getElementById("update-save-note")

let title
let description
let updatedNote
let noteId

function showForm(button) {
    formUpdateNote.style.display = "flex"
    noteId = button.id.split("?")[1]
}

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

    title = document.getElementById("update-title")
    description = document.getElementById("update-description")
    const formIsValid = checkInputs()

    updatedNote = {
        title: title.value,
        description: description.value,
    }

    if (formIsValid) {
        updateNote()

        const formControl = formUpdateNote.querySelectorAll(".form-control")

        formControl.forEach(formControl => {
            formControl.classList.remove("error")
        })
    }
})

async function deleteNote(button) {
    const noteId = button.id.split("?")[1]
    try {

        const responseUser = confirm("Are you sure you want to delete this note?")

        if (responseUser) {
            const response = await api.delete(`/notes/${noteId}`)
            window.location.reload()
        }

    } catch (error) {
        console.log(error);
    }
}

async function updateNote() {
    try {
        const responseUser = confirm("Are you sure you want to update this note?")

        if (responseUser) {
            const response = await api.put(`/notes/${noteId}`)
            window.location.reload()
        }

    } catch (error) {
        console.log(error);
    }
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

    const formControl = formUpdateNote.querySelectorAll(".form-control")

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
