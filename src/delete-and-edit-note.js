







// function checkInputs() {
//     const titleValue = title.value
//     const descriptionValue = description.value

//     if (!titleValue) {
//         setError(title, "Title is mandatory.")
//     } else {
//         setSuccess(title)
//     }

//     if (!descriptionValue) {
//         setError(description, "Description is mandatory.")
//     } else {
//         setSuccess(description)
//     }

//     const formControl = formUpdateNote.querySelectorAll(".form-control")

//     let formIsValid = true

//     formControl.forEach(formControl => {
//         if (formControl.className !== "form-control success") {
//             formIsValid = false
//             return
//         }
//     })

//     if (formIsValid) {
//         return formIsValid
//     }
// }

// function setError(input, message) {
//     const formControl = input.parentElement
//     const small = formControl.querySelector("small")

//     small.innerText = message

//     formControl.classList.remove("success")
//     formControl.classList.add("error")
// }

// function setSuccess(input) {
//     const formControl = input.parentElement

//     formControl.classList.remove("error")
//     formControl.classList.add("success")
// }
