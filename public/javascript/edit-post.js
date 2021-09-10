async function editFormHandler(event) { //function that edits a post by listening the to post-title and content inputs from the associated handlebars html page
    event.preventDefault(); //This is done based off of id, and once the post is updated the dashboard is displayed. The post is edited using a PUT route that was established in the post-routes.js file
//The post is updated through the use of an event listener that waits until the submit button is selected or the enter key is pressed.
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#content').value;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
