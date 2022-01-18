/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/


//focus on Name field once page is loaded
const userName = document.getElementById('name');
userName.focus();

//Programming the "Job Role" section
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

//Other Job Role field option default is hidden
otherJobRole.style.display = 'none';

//Conditional to have "other job role" field appear only when "other" job role drop menu option is selected 
jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block'; 
    } else {
        otherJobRole.style.display = 'none'; 
    }
});


//Programming the T-Shirt Info section
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;

//Color Menu default is disabled
color.disabled = true;

//Conditional to enable Color Menu when Design options are selected
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

//Programming the total cost of the "Register for Activities" section
const activities = document.getElementById('activities');
const total = document.getElementById('activities-cost'); 
let totalCost = 0;

//Conditional to total the cost of activities checked
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

//Programming the Payment Info section
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

//PayPal and Bitcoin default is hidden
paypal.style.display = 'none';
bitcoin.style.display = 'none';

const paymentOption = payment.children;
paymentSelected = paymentOption[1].setAttribute('selected', 'selected');

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

//Programming the "Form Validation" section

// The "Name" <input type="text"> element already defined - userName
// The "Register for Activities" <fieldset> element (should already defined - activities
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector("form"); 

//Use the "form" variable to listen for the submit event.
form.addEventListener('submit', e => {
    function nameValidator () {
        const nameValue = userName.value;
        const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
        return nameIsValid;
    }
    
    function emailValidator () {
        const emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        return emailIsValid;
    }
    
    //Only validate credit card information is credit card payment option selected
    if (paymentSelected === "credit-card") {
        function cardNumberValidator () {
            const cardNumberValue = cardNumber.value;
            const cardNumberIsValid = /^[0-9]{3}$/.test(cardNumberValue);
            return cardNumberIsValid;
        }
        
        function zipValidator () {
            const zipValue = zip.value;
            const zipIsValid = /^[0-9]{5}$/.test(zipValue);
            return zipIsValid;
        }
        
        function cvvValidator () {
            const cvvValue = cvv.value;
            const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);
            return cvvIsValid;
        }
    }
});







