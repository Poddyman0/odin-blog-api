document.addEventListener('DOMContentLoaded', function() {
    getAPostComment()
});


function getAPostComment() {
    const postID = localStorage.getItem('postID');
    const commentID = localStorage.getItem('commentID');
    const userIsAuthor = localStorage.getItem('userIsAuthor');
    const viewAPostDisplay = document.querySelector('#viewAPostCommentDisplay')
    const userID = localStorage.getItem('userID');

    const token = localStorage.getItem('jwtToken');

    fetch(`http://localhost:3000/blog/post/${postID}/comment/${commentID}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
                console.log(response.post)
                response.post.commentsForPost.forEach(comment => {
                    console.log(comment)
                    const commentCard = document.createElement('div')
                    commentCard.id = comment._id
                    commentCard.className = "commentCard"
                    commentCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${comment.body}</p>
                                <footer class="blockquote-footer">By ${comment.commentByUser.username}<cite title="Source Title"> at ${comment.timestamp}</cite></footer>
                            </blockquote>
                            <div id="updateAndDeleteCommentContainer"></div>
                            
                        </div>
                    </div>
                    `
                    viewAPostDisplay.appendChild(commentCard)
                    if (userIsAuthor === "true" && response.post.postByUser._id === userID) {
                        const updateAndDeleteCommentContainer = document.getElementById('updateAndDeleteCommentContainer')
                        updateAndDeleteCommentContainer.innerHTML = `
                        <a href="updateComment.html" class="btn btn-warning viewPost">Update Comment</a>
                            <button class="btn btn-danger viewComment" id="deleteCommentBTN">Delete Comment</button>
                        `

                    
                    document.getElementById('deleteCommentBTN').addEventListener('click', function() {
                        fetch(`http://localhost:3000/blog/post/${postID}/comment/${commentID}/delete`, {
                            method: 'POST', // Specify the method
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                                // Set the content type
                            } 
                        })
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(response) {
                            console.log(response)
                            window.location.href = 'viewPost.html'

                        })
                    })
                    }
                })
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}