async function signupformHandler(event) {
    event.preventDefault();

    const emailAddress = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trime();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && emailAddress & password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                emailAddress,
                username,  
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('Login Successful!');

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupformHandler);