import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs, 
    addDoc, deleteDoc, doc,
    query, serverTimestamp, 
    getDoc, updateDoc
 } from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDmsXViWRhOFiyMlXvt3-oSqSBlAFnnzB8",
    authDomain: "fir-9-a0863.firebaseapp.com",
    projectId: "fir-9-a0863",
    storageBucket: "fir-9-a0863.appspot.com",
    messagingSenderId: "1050724866703",
    appId: "1:1050724866703:web:97d1546822ac22b1946efa"
  }

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()
const auth = getAuth()
 
  // collection ref 
  const colRef = collection(db, 'Zadanie')

  // query
  const q = query(colRef)

  // get collection data
  getDocs(colRef)
  .then((snapshot) => {
    let zadanie = []
    snapshot.docs.forEach((doc) => {
        zadanie.push({...doc.data(), id: doc.id })
    })
    console.log(zadanie)
  })
  .catch(err => {
    console.log(err.message)
  })
  // adding docs
const addZadanieForm = document.querySelector('.add')
addZadanieForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addZadanieForm.title.value,
    author: addZadanieForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addZadanieForm.reset()
  })
})

// deleting docs
const deleteZadanieForm = document.querySelector('.delete')
deleteZadanieForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Zadanie', deleteZadanieForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteZadanieForm.reset()
    })
})

// pobieranie pojedynczego dokumentu
const docRef = doc(db, 'Zadanie', 'BFPiQtEB41PE9vYovJdc')

onSnapshot(docRef, () => {
    console.log(doc.data(), doc.id)
})
// aktualizowanie zadania
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'Zadanie', updateForm.id.value)

    updateDoc(docRef, {
        title: 'update zadania'
    })
    .then(() => {
        updateForm.reset()
    })
})

// autoryzacja
const signupForm = document.querySelector('.rejestracja')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        signupForm.reset()
    })
    .catch((err) =>
    console.log(err.message))
})

// zalogowanie i wylogowanie
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('the user signed out')
    })
    .catch((err) => {
        console.log(err.message)
    })

})

// autoryzacja podczas logowania
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginform.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user logged in:', cred.user)
    })
    .catch((err) =>
    console.log(err.message))

})

// sprawdzanie stanu zalogowanie/wylogowanie

onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})