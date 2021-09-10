async function commentFormHandler(event) { //function that use a query selector to take the input for a comment_text and post it to the database using the /api/comments post route
    event.preventDefault(); //the comment is created one the button being used to submit the comment is clicked

    const comment_text = document.querySelector('#comment-body').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').getElementsByClassName.display = "block";
        }
    }
} 

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);