document.addEventListener('DOMContentLoaded', function() {
    updateAPost()
});


function updateAPost() {
    const token = localStorage.getItem('jwtToken');
    const postID = localStorage.getItem('postID');
    const commentID = localStorage.getItem('commentID');

    const updateAPostDisplay = document.querySelector('#updateAPostDisplay')
    fetch(`http://localhost:3000/blog/post/${postID}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response.post.isPublished)
        const postCard = document.createElement('div')
                postCard.id = response.post._id
                postCard.innerHTML = `
                <form>
                <div class="form-group">
                    <label for="title"><strong>Title: </strong></label>
                    <input type="text" class="form-control" id="title-${response.post._id}">
                </div>
                <div class="form-group">
                    <label for="body"><strong>Body: </strong></label>
                    <input type="text" class="form-control" id="body-${response.post._id}">
                </div>
                <p><strong>Is published</strong></p>
                <div id="isPublishedCheck">

                </div>

                <button type="submit" class="btn btn-warning" id="updatePostSubmit">Update Post</button>
                </form>
                `
                updateAPostDisplay.appendChild(postCard)
                const titleValue = document.getElementById(`title-${response.post._id}`)
                const bodyValue = document.getElementById(`body-${response.post._id}`)
                titleValue.value = response.post.title
                bodyValue.value = response.post.body

                const isPublishedCheck = document.querySelector('#isPublishedCheck')
                if (response.post.isPublished) {
                    isPublishedCheck.innerHTML = `
                    <input type="checkbox" class="form-check-input" id="isPublished" checked>
                    <label for="isPublished" form-check-label>Is Published </label>
                    `
                } else if (!response.post.isPublished) {
                    isPublishedCheck.innerHTML = `
                    <input type="checkbox" class="form-check-input" id="isPublished">
                    <label for="isPublished" form-check-label>Is Published: </label>
                    `
                }
                const isPublishedValue = document.getElementById('isPublished')

                document.querySelector('#updatePostSubmit').addEventListener('click', function(event) {
                    event.preventDefault()
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
                    console.log(bodyValue.value)
                    let postData = {
                        title: titleValue.value,
                        timestamp: getCurrentISOTimestamp(),
                        body: bodyValue.value,
                        postByUser: response.post.postByUser,
                        isPublished: isPublishedValue.checked,
                        commentsForPost: response.post.commentsForPost,
                        _id: response.post._id
                    }
            
                    fetch(`http://localhost:3000/blog/post/${postID}/update`, {
                        method: 'POST', // Specify the method
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                            // Set the content type
                        },
                        body: JSON.stringify(postData) 
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(response) {
                        console.log(response)
                        if (response.errors) {
                            document.getElementById('updateAPostFeedback').innerHTML = `${response.errors[0].msg}`
                        }
                        if (!response.errors) {
                            document.getElementById('updateAPostFeedback').innerHTML = `${response.msg}`
                            function returnToPost () {
                            window.location.href = 'viewPost.html'
                            }
                            setTimeout(returnToPost, 3000);
            
                        }
                    })
                    .catch(function(error) {
                        document.getElementById('updateAPostFeedback').innerHTML = `${error}`
            
                    });
                })


    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}