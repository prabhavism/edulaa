document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill out all fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/register/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        name: name,
        password: password
      })
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = 'dashboard.html';
    } else {
      const error = await response.json();
      alert(error.error || 'Registration failed.');
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('Server error. Please try again later.');
  }
});