const TOKEN_KEY = 'authToken'; // lub 'appName_authToken'
const USERAUTH_KEY = 'userAuth'; 

function initializeLocalStorage(){
    if (!localStorage.getItem(TOKEN_KEY)) localStorage.setItem(TOKEN_KEY, '');

    if (!localStorage.getItem(USERAUTH_KEY)) localStorage.setItem(USERAUTH_KEY, JSON.stringify({}));
}

initializeLocalStorage();

export {
    TOKEN_KEY,
    USERAUTH_KEY
}