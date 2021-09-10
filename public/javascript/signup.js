async function signupformHandler(event) { //A function that listens to the input from the signup.handlebars html page 
    event.preventDefault(); //the api/users post route is being used to add the user to the database. If the signup is sucessful, the dashboard should be displayed

    const email_address = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email_address && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({                
                username,
                email_address,  
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('Signup Successful!');

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupformHandler);