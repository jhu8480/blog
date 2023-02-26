const signupBtn = document.querySelector('#signup-button');

signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username-input').value;
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const confirmPassword = document.getElementById('password-confirm').value;

  if (password !== confirmPassword || password.length < 8 || confirmPassword.length < 8) {
    alert('1. You may entered different passwords in password and confirm input. 2.Password must be at least 8 characters long. Please try again!')
    return;
  }
  
  const data = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  
  const response = await data.json();
  if(response.status === 'success') {
    const formWrapper = document.querySelector('.signup-form-wrapper');
    formWrapper.innerHTML = '<p>Thank you! You have been successfully signed up. You will be redirected to homepage in three seconds.If the reload does not work, please click here <a href="/" style="color: var(--color-brand--1)">Home</a></p>';
    setTimeout(() => {
      document.location.replace('/');
    }, 3000);
  } else {
    alert('Something went wrong! Please try again')
  }
});