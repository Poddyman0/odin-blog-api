document.addEventListener('DOMContentLoaded', function() {
    getPosts()
});

function getPosts() {
    console.log("admin user")
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('jwtToken');
    const userIsAuthor = localStorage.getItem('userIsAuthor');
    if (userIsAuthor === "true") {
        const createPostContainer = document.getElementById('createPostContainer')
        createPostContainer.innerHTML = '<a href="createPost.html" class="btn btn-success">Create Post</a>'
    }
    const publishedDisplay = document.querySelector('#publishedDisplayDiv')
    const unpublishedDisplay = document.querySelector('#unpublishedDisplayDiv')

    document.getElementById('logoutBTN').addEventListener('click', function() {
        localStorage.removeItem('jwtToken');
        window.location.href = '../loginUser.html';

    })
    fetch(`http://localhost:3000/blog/posts`)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            response.posts.forEach(post => {

                if (post.isPublished === true) {
                
                console.log(post.isPublished)
                const postCard = document.createElement('div')
                postCard.id = post._id
                postCard.innerHTML = `
                <div class="card">
                    <h5 class="card-header">${post.title}</h5>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                                <p>${post.body}</p>
                                <footer class="blockquote-footer">By ${post.postByUser.username}<cite title="Source Title"> at ${post.timestamp}</cite></footer>
                        </blockquote>
                        <button class="btn btn-primary viewPost" id="setPostID-${post._id}">View Post</button>
                        <p class="card-text" id="postCommentID${post._id}" class="commentContainer"><strong>Comments For Post:</strong></p>
                        

                    </div>
                </div>
                `
                publishedDisplay.appendChild(postCard)

                document.getElementById(`setPostID-${post._id}`).addEventListener('click', function(){
                    localStorage.setItem('postID', post._id);
                    const postID = localStorage.getItem('postID');
                    console.log(postID)
                    window.location.href = 'viewPost.html';

                })
                const commentDisplay = document.querySelector(`#postCommentID${post._id}`)
                post.commentsForPost.forEach(comment => {
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
                        </div>
                    </div>
                    `
                    commentDisplay.appendChild(commentCard)
                })
            } else if (post.isPublished === false && userID === post.postByUser._id) {
                
                console.log(post.isPublished)
                const postCard = document.createElement('div')
                postCard.id = post._id
                postCard.innerHTML = `
                <div class="card">
                    <h5 class="card-header">${post.title}</h5>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                                <p>${post.body}</p>
                                <footer class="blockquote-footer">By ${post.postByUser.username}<cite title="Source Title"> at ${post.timestamp}</cite></footer>
                        </blockquote>
                        <button class="btn btn-primary viewPost" id="setPostID-${post._id}">View Post</button>
                        <p class="card-text" id="postCommentID${post._id}" class="commentContainer"><strong>Comments For Post:</strong></p>
                        

                    </div>
                </div>
                `
                unpublishedDisplay.appendChild(postCard)

                document.getElementById(`setPostID-${post._id}`).addEventListener('click', function(){
                    localStorage.setItem('postID', post._id);
                    const postID = localStorage.getItem('postID');
                    console.log(postID)
                    window.location.href = 'viewPost.html';

                })
                const commentDisplay = document.querySelector(`#postCommentID${post._id}`)
                post.commentsForPost.forEach(comment => {
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
                        </div>
                    </div>
                    `
                    commentDisplay.appendChild(commentCard)
                })
            }
            })
        })
        .catch(function(error) {
            console.error('Error:', error);
        });

}

