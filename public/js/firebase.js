import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js"
import { 
  getAuth, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js"
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
const googleSignInBtn = document.getElementById('googleSignInBtn')
const signUpEmailBtn = document.getElementById('signUpEmailBtn')
const signInEmailBtn = document.getElementById('signInEmailBtn')
const signOutBtns = document.querySelectorAll('.signOut')
const signInBtns = document.querySelectorAll('.signIn')

// const getFirebase = async () => {
//   try {
//     let response = await fetch('/firebase')
//     let firebaseInfo = await response.json()
//     return firebaseInfo 
//   }catch(e){
//     console.log(`oh No: ${e}`)
//   }
// }

// const fireConfig = async (firebaseInfo) =>{
//   const firebaseDetails = await getFirebase

//   const firebaseConfig = {
//     apiKey: firebaseDetails.key,
//     authDomain: firebaseDetails.domain,
//     projectId: firebaseDetails.id,
//     storageBucket: firebaseDetails.bucket,
//     messagingSenderId: firebaseDetails.messagingSender,
//     appId: firebaseDetails.appID
//   }
//   return firebaseConfig
// }

const firebaseConfig = {
  apiKey: "AIzaSyBY5vm2fe_WapvyyJCM5Pv1ra1R2KipzPs",
  authDomain: "canoe-267cc.firebaseapp.com",
  projectId: "canoe-267cc",
  storageBucket: "canoe-267cc.appspot.com",
  messagingSenderId: "687045280125",
  appId: "1:687045280125:web:ce912804ad3ffeaff50c14"
};

const app = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

const auth = getAuth(app)

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)


const logGoogleUser = async () => {
  const {user} = await signInWithGooglePopup()
  signInUser(user)
  const userDocRef = await createUserDocumentFromAuth(user)
}

const db = getFirestore()

const createUserDocumentFromAuth = async (userAuth, additionalInfromation = {}) => {
  if(!userAuth){
    return
  } 
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfromation
      })
    }
    catch (error) {
      console.log(`error create the user: ${error.message}`)
    }
  }

  //if user data exists
  return userDocRef

  //return user Doc Ref

}


signUpEmailBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  let displayName = document.getElementById('displayName')
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  let confirmPassword = document.getElementById('confirmPassword')
  if(!email.value || !password.value){
    alert('email or password is blank')
    return
  }
  if(password.value != confirmPassword.value){
    alert('password and confirmed password do not match')
    return
  }
  try {
   const {user} = await createAuthUserWithEmailAndPassword(email.value, password.value)
   signInUser(user)
    await createUserDocumentFromAuth(user, {displayName: `${displayName.value}`})
    displayName.value=''
    email.value=''
    password.value=''
    confirmPassword.value=''
  }
  catch(error){
    if(error.code == 'auth/email-already-in-use'){
      alert('Cannot create user, email already in use')
    }else{
      console.log('user creation encountered and error', error)
    }
    
  }
  
})

signInEmailBtn.addEventListener('click', async (e) =>{
  e.preventDefault()
  let email = document.getElementById('signInEmail')
  let password = document.getElementById('signInPassword')
  if(!email.value || !password.value){
    alert('email or password is blank')
    return
  }
  try {
    const {user} = await signInAuthUserWithEmailAndPassword(email.value, password.value)
    signInUser(user)
    email.value = ''
    password.value = ''
  }
  catch (error){
    switch(error.code){
      case 'auth/wrong-password':
        alert('incorrect password')
        break
      case 'auth/user-not-found':
        alert('no user associated with this email')
        break
      default:
        console.log(error)
    }
  }

})

const signInUser = () =>{
  signOutBtns.forEach(outBtn => {
    outBtn.style.display = 'block'
    outBtn.addEventListener('click', signOutUser)
  })
  signInBtns.forEach(inBtn => {
    inBtn.style.display = 'none'
  })
}

const signOutUser = async() =>{
  await signOut(auth)
  signOutBtns.forEach(outBtn => {
    outBtn.style.display = 'none'
  })
  signInBtns.forEach(inBtn => {
    inBtn.style.display = 'block'
  })

} 

const onAuthStateChangedListner = (callback) => 
  onAuthStateChanged(auth, callback)

googleSignInBtn.addEventListener('click', logGoogleUser)


const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}


const signInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
