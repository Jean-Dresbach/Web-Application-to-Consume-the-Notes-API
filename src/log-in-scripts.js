const formLogIn = document.getElementById("form-login")
const email = document.getElementById("email")
const password = document.getElementById("password")

formLogIn.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = {
        email: email.value,
        password: password.value
    }

    const formIsValid = checkInputs()

    if (formIsValid) {
        login(user)
    }
}) 

async function login(user) {
    try {
        const response = await api.post("/users/login", user)
        const userId = response.data.user.id
        
        localStorage.setItem("userId", userId)
        window.location.replace("/notes-page.html") 

    } catch (error) {
        checkPasswordAndEmail(error)
    }
}


function checkPasswordAndEmail(error) {
    const messageAPI = error.response.data.message
    console.log(messageAPI);
    if (messageAPI === "Invalid email or password.") {
        setError(email, "Invalid email or password.")
        setError(password, "Invalid email or password.")
    }
}

function checkInputs() {
    const emailValue = email.value
    const passwordValue = password.value

    if (!emailValue) {
        setError(email, "Email is mandatory.")
    } else {
        setSuccess(email)
    }

    if (!passwordValue) {
        setError(password, "Password is mandatory.") 
    } else {
        setSuccess(password)
    }

    const formControl = formLogIn.querySelectorAll(".form-control")

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