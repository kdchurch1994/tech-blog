async function newFormHandler(event) { //function that creates a post by listening the to post-title and content inputs from the associated handlebars html page
    event.preventDefault(); //This function takes this input and converts it to json and creates the post using the api post route. Once a route is created, the dashboard should appear
    //This function uses an event listener that creates the post when the submit button is clicked.
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
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

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);