/* eslint-disable camelcase */
class Register {
    constructor (first_name, last_name, email, age, password) {
        // eslint-disable-next-line no-unused-expressions
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.age = age
        this.password = password
    }
}

const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', e => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    const newRegister = new Register(dataForm.get('firstName'), dataForm.get('lastName'), dataForm.get('regEmail'), dataForm.get('age'), dataForm.get('regPassword'))
    console.log(String(newRegister))

    fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(newRegister),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(result => {
        if (result.status === 200) {
            registerForm.reset()
            window.location.replace('/web/session/')
        } else {
            window.location.replace('/web/error/')
        }
        result.json()
    }).then(json => {
        console.log(String(json))
    })
})
