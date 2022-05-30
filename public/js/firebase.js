import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js"
import { getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js"
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
const googleSignInBtn = document.getElementById('googleSignInBtn')

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

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

const auth = getAuth(app)

const signInWithGooglePopup = () => signInWithPopup(auth, provider)


const logGoogleUser = async () => {
  const {user} = await signInWithGooglePopup()
  const userDocRef = await createUserDocumentFromAuth(user)
}

const db = getFirestore()

const createUserDocumentFromAuth = async (userAuth) => {
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
        createdAt
      })
    }
    catch (error) {
      console.log(`error create the user: ${error.message}`)
    }
  }

  //if user data exists
  return userDocRef

  //return user Doc Ref

  //if user data does not exists
}

googleSignInBtn.addEventListener('click', logGoogleUser)


// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.errorCode
//     const errorMessage = error.message
//   })