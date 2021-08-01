//Firebase configuration
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

const beforeLogin = document.querySelector(".before-login")
const afterLogin = document.querySelector(".after-login")

const tbodyParent = document.querySelector(".tbody-parent")
const userInfo = document.querySelector(".usr-info")

const signupErr = document.querySelector(".signup-err")

//Credential for signing in
const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("user have logged in")

            firebase.firestore().collection('users').doc(user.uid).get()
                .then(res => {
                    //User Name
                    let tempel = document.createElement("H3")
                    tempel.innerText = `Hi ${res.data().name}, Welcome`
                    userInfo.appendChild(tempel)
                })

            //UID of user
            console.log(user.uid)

            //Disable form screen and open user screen
            beforeLogin.style.display = "none"
            afterLogin.style.display = "block"

            //Function for retriving all events data
            firebase.firestore().collection('events').get()
                .then(res => {
                    res.docs.forEach(el => {
                        let temp = document.createElement("TR")
                        temp.innerHTML = `<td>${el.data().first_name}</td>
                        <td>${el.data().last_name}</td>
                        <td>${el.data().email}</td>
                        <td>${el.data().interest}</td>
                        <td>${el.data().mobile}</td>`
                        tbodyParent.appendChild(temp)
                    })
                })
        })
        .catch((error) => {
            const signinErr = document.querySelector(".signin-err")
            signinErr.innerText = error.message
        });
}
//This function will create a user and make entry of user in user collections
const signUpUser = (email, password, name) => {
    console.log(email, name, password)
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        firebase.firestore().collection('users').doc(cred.user.uid).set({
            name: name
        }).then(res => {
            const accCreate = document.querySelector(".acc-create")
            signupErr.innerText = ''
            accCreate.innerText = "Your account has succesfully registered , now login"
        })
    })
        .catch(err => {
            signupErr.innerText = err.message
        })
}

//If user is going to sign in
const userLoginForm = document.querySelector('.user-login')
const userEmail = document.querySelector('.user-email')
const userPassword = document.querySelector('.user-password')

const signup = document.querySelector(".signup")
signup.style.display = "none"


//If user is going to sign up
const userSignupForm = document.querySelector(".user-signup")
const newUserName = document.querySelector(".new-usr-name")
const newUserEmail = document.querySelector(".new-usr-email")
const newUserPass = document.querySelector(".new-usr-password")


//Buttons events
const signin = document.querySelector(".signin")
const signUpBtn = document.querySelector(".cred-info")

signUpBtn.addEventListener("click", () => {
    if (signup.style.display == "none") {
        signup.style.display = "block"
        signin.style.display = "none"
        signUpBtn.innerHTML = "Login"
    } else {
        signin.style.display = "block"
        signup.style.display = "none"
        signUpBtn.innerHTML = "Create an Account"
    }
})

userSignupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    signUpUser(newUserEmail.value, newUserPass.value, newUserName.value)
})

userLoginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginUser(userEmail.value, userPassword.value)
})


