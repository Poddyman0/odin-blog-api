document.addEventListener('DOMContentLoaded', function() {
    createUser()
});

function createUser() {
    
    document.querySelector('#createUserSubmit').addEventListener('click', function(event) {
        event.preventDefault()
        const username = document.querySelector('#username').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        const isAuthor = document.querySelector('#isAuthor').checked
        const isNormalUser = document.querySelector('#isNormalUser').checked
        let userData = {
            username: username,
            email: email,
            password: password,
            isAuthor: isAuthor,
            isNormalUser: isNormalUser
        }

        fetch(`http://localhost:3000/blog/user/create`, {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(userData) 
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            if (response.errors) {
                document.getElementById('createUserFeedback').innerHTML = `${response.errors[0].location} ${response.errors[0].msg}`
            }
            if (!response.errors) {
                document.getElementById('createUserFeedback').innerHTML = `${response.msg}`
                function returnToPost () {
                window.location.href = 'loginUser.html'
                }
                setTimeout(returnToPost, 3000);

            }
        })
        .catch(function(error) {
            document.getElementById('createUserFeedback').innerHTML = `${error}`

        });
    })
}