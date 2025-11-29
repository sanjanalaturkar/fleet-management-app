document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    if (loginForm){
        const correctEmail = 'admin@example.com';
        const correctPassword = 'password';
        loginForm.addEventListener('submit',(e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            errorMessage.style.display = 'none';
            if (emailInput === correctEmail && passwordInput === correctPassword){
                alert('Login Successfull');
                window.location.href = 'admin.html';
            } else {
                errorMessage.style.display = 'block';
            }
        });
    }
});
