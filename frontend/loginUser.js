document.addEventListener('DOMContentLoaded', function() {
    loginUser()
});

function loginUser() {
    
    document.querySelector('#loginUserSubmit').addEventListener('click', function(event) {
        event.preventDefault()
        localStorage.removeItem('jwtToken');

        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        let userData = {
            email: email,
            password: password,
        }

        fetch(`http://localhost:3000/blog/user/login/post`, {
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
            console.log(response)
            if (response.message === "JWT Auth Creation Passed") {
                document.getElementById('loginUserFeedback').innerHTML = `${response.message}`
                localStorage.setItem('jwtToken', response.token);
                localStorage.setItem('userID', response.userIDSignInCreated);
                localStorage.setItem('userIsAuthor', response.userIsAuthor);

                function returnToPost () {
                    if (response.userIsAuthor === false) {
                        console.log("normal user")
                        window.location.href = 'normalUserFrontEnd/viewPosts.html';
                    } else if (response.userIsAuthor === true) {
                        console.log("admin user")
                        window.location.href = 'adminFrontEnd/viewPosts.html';

                    }
                }
                setTimeout(returnToPost, 2000);
            }
            if (response.error) {
                let emailError
                if (response.error = "Cannot read properties of undefined (reading 'email')") {
                    emailError = "Incorrect Email"
                }

                document.getElementById('loginUserFeedback').innerHTML = `${emailError}`

            }
            if (response.message === "Incorrect password") {
                document.getElementById('loginUserFeedback').innerHTML = `${response.message}`

            }

        })
        .catch(function(error) {
            document.getElementById('loginUserFeedback').innerHTML = `${error}`

        });
    })
}