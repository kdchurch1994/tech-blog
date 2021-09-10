async function signupformHandler(event) {
    event.preventDefault();

    const email_address = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email_address & password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email_address,
                username,  
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