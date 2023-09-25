const formSignUp = document.getElementById("form-signup")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")


formSignUp.addEventListener("submit", (e) => {
    e.preventDefault()

    const newUser = {
        name: username.value,
        email: email.value,
        password: password.value
    }

    const formIsValid = checkInputs()

    if (formIsValid) {
        signup(newUser)  
    }  
}) 

async function signup(newUser) {
    try {
        const response = await api.post("/users/signup", newUser)
        
        console.log(response);
        window.location.replace("/login-page.html")
    } catch (error) {
        checkEmail(error); 
    }
}

function checkInputs() {
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const confirmPasswordValue = confirmPassword.value

    if (!usernameValue) {
        setError(username, "Username is mandatory.")
    } else {
        setSuccess(username)
    }

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

    if (!confirmPasswordValue) {
        setError(confirmPassword, "Confirm password is mandatory.")
    } else if (passwordValue !== confirmPasswordValue) {
        setError(confirmPassword, "The passwords must be equal.")
    } else {
        setSuccess(confirmPassword)
    }

    const formControl = formSignUp.querySelectorAll(".form-control")

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

function checkEmail(error) {
    const messageAPI = error.response.data.message
    console.log(messageAPI);
    if (messageAPI === "User alrealdy registered!") {
        setError(email, "User alrealdy registered!")
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