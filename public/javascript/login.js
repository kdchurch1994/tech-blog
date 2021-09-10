async function loginformHandler(event) { //A function that allows us to login into the website based on the user input for username and password. 
    //The login is completed using the /api/users/login Post route that was established in the user-routes.js file. 
    //The event listener is used to allow the user to sign in once they hit enter or hit the submit button
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginformHandler);

