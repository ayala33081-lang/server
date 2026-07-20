const resultArea = document.getElementById('resultArea');

document.getElementById('getBooksBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        resultArea.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        resultArea.innerText = 'שגיאה: ' + error.message;
    }
});

document.getElementById('signUpBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: 999,
                username: "tester",
                email: "test@test.com",
                password: "123"
            })
        });
        const data = await response.json();
        resultArea.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        resultArea.innerText = 'שגיאה ב-POST: ' + error.message;
    }
});