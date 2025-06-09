document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/login/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = 'dashboard.html';
    } else {
      const error = await response.json();
      alert(error.error || 'Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Error during login:', err);
    alert('Server error. Please try again later.');
  }
});