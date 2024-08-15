document.addEventListener('DOMContentLoaded', function() {
    updateAPostComment()
});



function updateAPostComment() {
    const token = localStorage.getItem('jwtToken');
    const commentID = localStorage.getItem('commentID');
    const postID = localStorage.getItem('postID');

    console.log(token)
    const updateACommentDisplay = document.querySelector('#updateAPostDisplay')
    fetch(`http://localhost:3000/blog/post/${postID}/comment/${commentID}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        response.post.commentsForPost.forEach(comment => {

            console.log(comment)
            const commentCard = document.createElement('div')
            commentCard.id = comment._id
            commentCard.innerHTML = `
            <form>
                <div class="form-group">
                    <label for="bodyComment"><strong>Body: </strong></label>
                    <input type="text" class="form-control" id="bodyComment-${comment._id}">
                </div>
                <button type="submit" class="btn btn-warning" id="updateCommentSubmit">Update Comment</button>
            </form>

            `
            updateACommentDisplay.appendChild(commentCard)
            let bodyValue = document.getElementById(`bodyComment-${comment._id}`)
            bodyValue.value = comment.body
            document.querySelector('#updateCommentSubmit').addEventListener('click', function(event) {
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
                let commentData = {
                    body: bodyValue.value,
                    timestamp: getCurrentISOTimestamp(),
                    commentByUser: comment.commentByUser._id,
                    _id: comment._id
                }
        
                fetch(`http://localhost:3000/blog/post/${postID}/comment/${commentID}/update`, {
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
                        document.getElementById('updateCommentFeedback').innerHTML = `${response.errors[0].location} ${response.errors[0].msg}`
                    }
                    if (!response.errors) {
                        document.getElementById('updateCommentFeedback').innerHTML = `${response.msg}`
                        function returnToPost () {
                        window.location.href = 'viewComment.html'
                        }
                        setTimeout(returnToPost, 3000);
        
                    }
                })
                .catch(function(error) {
                    document.getElementById('updateCommentFeedback').innerHTML = `${error}`
        
                });
            })
        })
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}