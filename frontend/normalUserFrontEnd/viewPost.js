document.addEventListener('DOMContentLoaded', function() {
    getAPost()
});


function getAPost() {
    const postID = localStorage.getItem('postID');
    const token = localStorage.getItem('jwtToken');
    const userID = localStorage.getItem('userID');
    const userIsAuthor = localStorage.getItem('userIsAuthor');
    console.log(userIsAuthor)

    const viewAPostDisplay = document.querySelector('#viewAPostDisplay')
    fetch(`http://localhost:3000/blog/post/${postID}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response.post)
                const postCard = document.createElement('div')
                postCard.id = response.post._id
                postCard.innerHTML = `
                <div class="card">
                    <h5 class="card-header">${response.post.title}</h5>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                                <p>${response.post.body}</p>
                                <footer class="blockquote-footer">By ${response.post.postByUser.username}<cite title="Source Title"> at ${response.post.timestamp}</cite></footer>
                        </blockquote>
                        <div id="updateDeleteContainer"></div>
                        <a href="createComment.html" class="btn btn-success">Create comment</a>
                        <p class="card-text" id="postCommentID${response.post._id}" class="commentContainer"><strong>Comments For Post:</strong></p>

                    </div>
                </div>
                `
                viewAPostDisplay.appendChild(postCard)

                if (userIsAuthor === "true" && response.post.postByUser._id === userID) {

                    const updateDeleteContainer = postCard.querySelector('#updateDeleteContainer'); // Use postCard scope to find the container
                    const updateDeleteButtons = document.createElement('div');
                    updateDeleteButtons.innerHTML = `
                    <a href="updatePost.html" class="btn btn-warning viewPost">Update Post</a>
                    <button class="btn btn-danger viewPost" id="deletePostBtn">Delete Post</button>
                    `;
                    updateDeleteContainer.appendChild(updateDeleteButtons);
                
                    // Attach the event listener after appending the buttons
                    updateDeleteButtons.querySelector('#deletePostBtn').addEventListener('click', function() {
                        fetch(`http://localhost:3000/blog/post/${response.post._id}/delete`, {
                            method: 'POST', // Specify the method
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(response) {
                            console.log(response);
                            window.location.href = 'viewPosts.html';
                        })
                        .catch(function(error) {
                            console.error('Error:', error);
                        });
                    });
                }
                const commentDisplay = document.querySelector(`#postCommentID${response.post._id}`)
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
                            <button href="viewComment.html" class="btn btn-primary viewComment" id="setCommentID-${comment._id}">View comment</button>
                        </div>
                    </div>
                    `
                    commentDisplay.appendChild(commentCard)
                    document.getElementById(`setCommentID-${comment._id}`).addEventListener('click', function() {
                        localStorage.setItem('commentID', comment._id);
                        const commentID = localStorage.getItem('commentID');
                        console.log(commentID)
                        window.location.href = 'viewComment.html';
                    })
                })
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}