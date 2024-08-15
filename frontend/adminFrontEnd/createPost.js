document.addEventListener('DOMContentLoaded', function() {
    updateAPost()
});


function updateAPost() {
    const token = localStorage.getItem('jwtToken');
    console.log(token)
    const userID = localStorage.getItem('userID');

    function getCurrentISOTimestamp() {
        const now = new Date();
    
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
        // Construct the timestamp string
        const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
    
        return timestamp;
    }
    const titleValue = document.getElementById(`title`)
    const timestampValue = getCurrentISOTimestamp()
    const bodyValue = document.getElementById(`body`)
    const isPublishedValue = document.getElementById('isPublished')
    
    document.querySelector('#createPostSubmit').addEventListener('click', function(event) {
        event.preventDefault()
        let postData = {
            title: titleValue.value,
            timestamp: timestampValue,
            body: bodyValue.value,
            postByUser: userID,
            isPublished: isPublishedValue.checked,
            commentsForPost: [],
        }

        fetch(`http://localhost:3000/blog/post`, {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData) 
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            if (response.errors) {
                document.getElementById('createPostFeedback').innerHTML = `${response.errors[0].location} ${response.errors[0].msg}`
            }
            if (!response.errors) {
                document.getElementById('createPostFeedback').innerHTML = `${response.msg}`
                function returnToPost () {
                window.location.href = 'viewPosts.html'
                }
                setTimeout(returnToPost, 3000);

            }
        })
        .catch(function(error) {
            document.getElementById('createPostFeedback').innerHTML = `${error}`

        });
    })
}