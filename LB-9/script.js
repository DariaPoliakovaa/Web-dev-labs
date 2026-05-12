function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));
    
    if (tabName === 'signup') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

const citiesData = {
    ukraine: ["Kyiv", "Lviv", "Odesa", "Kharkiv"],
    usa: ["New York", "Los Angeles", "Chicago", "Miami"]
};

function populateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Choose city...</option>';
    
    if (country) {
        citySelect.disabled = false;
        citiesData[country].forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase();
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }
}

function setError(id, message) {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(id + 'Error');
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorSpan.innerText = message;
    return false;
}

function setSuccess(id) {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(id + 'Error');
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorSpan.innerText = "Looks good!";
    errorSpan.style.color = "#28a745";
    return true;
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const fName = document.getElementById('firstName').value.trim();
    if (fName.length < 3 || fName.length > 15) isValid = setError('firstName', "Must be 3-15 characters.");
    else setSuccess('firstName');

    const lName = document.getElementById('lastName').value.trim();
    if (lName.length < 3 || lName.length > 15) isValid = setError('lastName', "Must be 3-15 characters.");
    else setSuccess('lastName');

    const email = document.getElementById('signupEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) isValid = setError('signupEmail', "Enter a valid email.");
    else setSuccess('signupEmail');

    const pwd = document.getElementById('signupPassword').value;
    if (pwd.length < 6) isValid = setError('signupPassword', "Password must be at least 6 characters.");
    else setSuccess('signupPassword');

    const cPwd = document.getElementById('confirmPassword').value;
    if (cPwd !== pwd || cPwd === '') isValid = setError('confirmPassword', "Passwords do not match.");
    else setSuccess('confirmPassword');

    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phone)) isValid = setError('phone', "Format: +380XXXXXXXXX");
    else setSuccess('phone');

    const dobValue = document.getElementById('dob').value;
    if (!dobValue) {
        isValid = setError('dob', "Date of birth is required.");
    } else {
        const today = new Date();
        const dob = new Date(dobValue);
        if (dob > today) {
            isValid = setError('dob', "Date cannot be in the future.");
        } else {
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 12) isValid = setError('dob', "You must be at least 12 years old.");
            else setSuccess('dob');
        }
    }

    if (!document.getElementById('sex').value) isValid = setError('sex', "Please select your sex.");
    else setSuccess('sex');

    if (!document.getElementById('country').value) isValid = setError('country', "Please select a country.");
    else setSuccess('country');

    if (!document.getElementById('city').value) isValid = setError('city', "Please select a city.");
    else setSuccess('city');

    if (isValid) {
        document.getElementById('signupSuccess').innerText = "Registration successful!";
        setTimeout(() => {
            this.reset();
            document.querySelectorAll('input, select').forEach(el => {
                el.classList.remove('valid');
                el.classList.remove('invalid');
            });
            document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");
            document.getElementById('signupSuccess').innerText = "";
            document.getElementById('city').disabled = true;
        }, 3000);
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const user = document.getElementById('loginUsername').value.trim();
    if (user === '') isValid = setError('loginUsername', "Username is required.");
    else setSuccess('loginUsername');

    const pwd = document.getElementById('loginPassword').value;
    if (pwd.length < 6) isValid = setError('loginPassword', "Password must be at least 6 characters.");
    else setSuccess('loginPassword');

    if (isValid) {
        document.getElementById('loginSuccess').innerText = "Login successful!";
        setTimeout(() => {
            this.reset();
            document.querySelectorAll('input').forEach(el => {
                el.classList.remove('valid');
                el.classList.remove('invalid');
            });
            document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");
            document.getElementById('loginSuccess').innerText = "";
        }, 3000);
    }
});
