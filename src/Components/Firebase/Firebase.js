import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAVDm1YsYz8_LYNwV7vWe4Ls7t1y36LYLs",
    authDomain: "unicorn-abf41.firebaseapp.com",
    projectId: "unicorn-abf41",
    storageBucket: "unicorn-abf41.appspot.com",
    messagingSenderId: "1039981422801",
    appId: "1:1039981422801:web:dcddf3c9b83d4e7466fdf0",
    measurementId: "G-WYQXKJ4KP7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//     try {
//         const res = await signInWithPopup(auth, googleProvider);
//         const user = res.user;
//         const payload = {uid: user.uid, name: user.displayName, authProvider: "google", email: user.email, userType: "regular"};
//         await setDoc(doc(db, "users", user.email), payload)
//         // const q = query(collection(db, "users"), where("uid", "==", user.uid));
//         // const docs = await getDocs(q);
//         // if (docs.docs.length === 0) {
//         //     await addDoc(collection(db, "users"), {
//         //         uid: user.uid,
//         //         name: user.displayName,
//         //         authProvider: "google",
//         //         email: user.email,
//         //     });
//         // }
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const payload = {email: email, userType: "regular"};
        await setDoc(doc(db, "users", user.email), payload)
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    // signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    // sendNumberOfTurns
};
