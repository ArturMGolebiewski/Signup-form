const username = document.querySelector("#username")
const password = document.querySelector("#password")
const passwordCheck = document.querySelector("#passwordCheck")
const email = document.querySelector("#email")
const popup = document.querySelector(".popup")
const clearBtn = document.querySelector(".clear")
const sendBtn = document.querySelector(".send")
const closeBtn = document.querySelector(".close")
const form = [username, password, passwordCheck, email]

const showError = (input, msg) => {
    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-text')

    formBox.classList.add("error")
    errorMsg.textContent = msg
}

const clearError = input => {
    const formBox = input.parentElement
    formBox.classList.remove("error")

}

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `Your ${input.previousElementSibling.innerText.toLowerCase().slice(0, -1)} needs to contain at least ${min} symbols`)
    }
}

const checkMatch = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, "Passwords do not match")
    }
}

const checkMail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, "Incorrect email address")
    }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box')
    let errorCount = 0
    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++
        }
    })
    if(errorCount === 0) {
        popup.classList.add('show-popup')
    }
}

const checkForm = input => {
    input.forEach(el => {
        if(el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        }
    })
}

sendBtn.addEventListener('click', e => {
    e.preventDefault()

    checkForm(form)
    checkLength(username, 4)
    checkLength(password, 8)
    checkMatch(password, passwordCheck)
    checkMail(email)
    checkErrors()
})

clearBtn.addEventListener('click', e => {
    e.preventDefault()
    form.forEach(el => {
        el.value = ""
        clearError(el)
    })
})
