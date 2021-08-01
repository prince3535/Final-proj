const firstName = document.querySelector(".first-name")
const lastName = document.querySelector(".last-name")
const email = document.querySelector(".email")
const mobileNum = document.querySelector(".mobile")
const interest = document.querySelector(".select-st")
const branch = document.querySelector(".branch")
const eventForm = document.querySelector(".signup")
const thankyou = document.querySelector(".thank-you")
thankyou.style.display = "none"

const card = document.querySelector(".card-form")

var firebaseConfig = {
    apiKey: "AIzaSyCyGB8LMzEVHSCUlvCY3bzp8uFpLnWQUAQ",
    authDomain: "anukunj-b5764.firebaseapp.com",
    projectId: "anukunj-b5764",
    storageBucket: "anukunj-b5764.appspot.com",
    messagingSenderId: "290958606747",
    appId: "1:290958606747:web:520f186fe019450577a13e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


eventForm.addEventListener("submit", (e) => {
    e.preventDefault()
    firebase.firestore().collection("events").add({
        "first_name": firstName.value,
        "last_name": lastName.value,
        "mobile": mobileNum.value,
        "interest": interest.value,
        "email": email.value
    })
        .then(res => {
            card.style.display = "none"
            thankyou.style.display = "block"
        })
        .catch(err => {
            console.log(err)
        })
    // console.log(usrObj)
})