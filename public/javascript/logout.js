async function logout(event) {// function that allows the user to logout once they decide to hit the logout button
    event.preventDefault(); //The api/users/logout Post route is being used to achieve this
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);