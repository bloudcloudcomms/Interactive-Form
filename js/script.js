/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/



// Focus on Name field once page is loaded
const userName = document.getElementById('name');
userName.focus();

// Job Role section
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

// Other Job Role field option default is hidden
otherJobRole.style.display = 'none';

// Field name of "other job role" appears only when "other" job role drop menu option is selected 
jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block'; 
    } else {
        otherJobRole.style.display = 'none'; 
    }
});


// T-Shirt Info section
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;

// Color Menu default is disabled
color.disabled = true;

// Enable Color Menu when Design options are selected
design.addEventListener('change', e => {
    color.disabled = false;
    for ( let i = 0; i < colorOption.length; i++ ) {
        const target = e.target.value;
        const designSelected = colorOption[i].getAttribute('data-theme');
            if ( designSelected === target ) {
            colorOption[i].hidden = false;
            colorOption[i].setAttribute('selected', 'selected');
        } else {
            colorOption[i].hidden = true;
            colorOption[i].removeAttribute('selected');
        }
    }
});

// Total cost of Register for Activities section
const activities = document.getElementById('activities');
const total = document.getElementById('activities-cost'); 
let totalCost = 0;

// Total the cost of activities checked
activities.addEventListener('change', e =>{
    const clicked = e.target;
    const dataCost = +clicked.getAttribute('data-cost');
    if (clicked.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    total.innerHTML = `Total: $${totalCost}`;
});


// Focus activities for accessibility
const checkBox = document.querySelectorAll('[type="checkbox"]');

for (let i=0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });

    checkBox[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}

// Prevent selection of activities that occur at the same time
const activitiesBox = document.getElementById('activities-box');

activitiesBox.addEventListener('change', e => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    for ( let i = 0; i < checkBox.length; i++ ) {
        const checkboxType = checkBox[i].getAttribute('data-day-and-time');
        if ( checkboxType === clickedType && clicked !== checkBox[i] ) {
            if (clicked.checked) {
                checkBox[i].disabled = true;
                checkBox[i].parentElement.classList.add('disabled');
            } else {
                checkBox[i].disabled = false;
                checkBox[i].parentElement.classList.remove('disabled');
            }
        }
    }
});



// Payment Info section
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

// PayPal and Bitcoin default is hidden
paypal.style.display = 'none';
bitcoin.style.display = 'none';

const paymentOption = payment.children;
const paymentSelected = paymentOption[1].setAttribute('selected', 'selected');

payment.addEventListener('change', e => {
   for (let i = 0; i < paymentOption.length; i++) {
       const target = e.target.value;
       switch (target) {
        case 'paypal':
            creditCard.style.display = 'none';
            paypal.style.display = 'block';
            bitcoin.style.display = 'none';
            break;
        case 'bitcoin':
            creditCard.style.display = 'none';
            paypal.style.display = 'none';
            bitcoin.style.display = 'block';
            break;
        default:
            creditCard.style.display = 'block';
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
       }
   }
});



// Form validation section
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector("form"); 

// Form submission validation
function validationPass(element) {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}

function validationFail(element) {
    const parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}


// Helper functions for form input
    function nameValidator () {
        const nameValue = userName.value;
        const nameIsValid = /^\s*?[a-zA-Z]+\s*?[a-zA-Z]*?\s*?/.test(nameValue);
        nameIsValid ? validationPass(userName) : validationFail(userName);
        return nameIsValid;
    }
    
    function emailValidator () {
        const emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        const emailIsEmpty = /^\s*$/.test(email.value);
        if (emailIsValid) {
            validationPass(email);
        } else if (emailIsEmpty) {
            email.nextElementSibling.textContent = 'Email address field cannot be blank';
            validationFail(email);
        } else {
            validationFail(email);
        }
        return emailIsValid;
    }
    
    function cardNumberValidator () {
        const cardNumberValue = cardNumber.value;
        const cardNumberIsValid = /^\d{13,16}$/.test(cardNumberValue);
        cardNumberIsValid ? validationPass(cardNumber) : validationFail(cardNumber);
        return cardNumberIsValid;
    }
    
    function zipValidator () {
        const zipValue = zip.value;
        const zipIsValid = /^\d{5}$/.test(zipValue);
        zipIsValid ? validationPass(zip) : validationFail(zip);
        return zipIsValid;
    }
    
    function cvvValidator () {
        const cvvValue = cvv.value;
        const cvvIsValid = /^\d{3}$/.test(cvvValue);
        cvvIsValid ? validationPass(cvv) : validationFail(cvv);
        return cvvIsValid;
    }

    function activitiesValidator() {
        const activitiesIsValid = totalCost > 0;
        activitiesIsValid ? validationPass(activitiesBox) : validationFail(activitiesBox);
        return activitiesIsValid;
    }


// Real-time validation
form.addEventListener('keyup', e => {
    if (userName === document.activeElement) {
        nameValidator();
    } else if (email === document.activeElement) {
        emailValidator();
    } else if (cardNumber === document.activeElement ) {
        cardNumberValidator();
    } else if (zip === document.activeElement) {
        zipValidator();
    } else if (cvv === document.activeElement) {
        cvvValidator();
    }
});


// Submission check for form requirement completion
form.addEventListener('submit', e => {
    if (!nameValidator()) { 
        e.preventDefault(); 
    }
    if (!emailValidator()) { 
        e.preventDefault(); 
    }
    if (!activitiesValidator()) { 
        e.preventDefault(); 
    }
    if (payment.value === 'credit-card') {
        if (!cardNumberValidator()) {
            e.preventDefault();
        }
        if (!zipValidator()) {
            e.preventDefault();
        }
        if (!cvvValidator()) {
            e.preventDefault();
        }
    }
});







