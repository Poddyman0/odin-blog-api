document.addEventListener('DOMContentLoaded', function() {
    createComment()
});


function createComment() {
    const token = localStorage.getItem('jwtToken');
    const userID = localStorage.getItem('userID');
    const postID = localStorage.getItem('postID');

    console.log(userID)
    document.querySelector('#createCommentSubmit').addEventListener('click', function(event) {
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
        event.preventDefault()
        const bodyCommentValue = document.getElementById('bodyComment')

        let commentData = {
            body: bodyCommentValue.value,
            timestamp: getCurrentISOTimestamp(),
            commentByUser: userID,
        }
        console.log(commentData)

        fetch(`http://localhost:3000/blog/post/${postID}/comment`, {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commentData) 
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            if (response.errors) {
                document.getElementById('createCommentFeedback').innerHTML = `${response.errors[0].location} ${response.errors[0].msg}`
            }
            if (!response.errors) {
                document.getElementById('createCommentFeedback').innerHTML = `${response.msg}`
                function returnToPost () {
                window.location.href = 'viewPost.html'
                }
                setTimeout(returnToPost, 3000);

            }
        })
        .catch(function(error) {
            document.getElementById('createCommentFeedback').innerHTML = `${error}`

        });
    })
}


