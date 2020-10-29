import Styles from './App.module.css';

import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import ChatRoom from './components/ChatRoom/ChatRoom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState, useRef } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyAvaN7MJdI1Ks4JFiXYBaNLTOtgDEkAY_w",
  authDomain: "chat-app-2af63.firebaseapp.com",
  databaseURL: "https://chat-app-2af63.firebaseio.com",
  projectId: "chat-app-2af63",
  storageBucket: "chat-app-2af63.appspot.com",
  messagingSenderId: "899179453272",
  appId: "1:899179453272:web:206556397972d803f1232d",
  measurementId: "G-74M45SJ7LR"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const dummy = useRef();

  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    console.log(formValue);

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    });

    setFormValue('');
    console.log(messages);

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  const classes = [Styles.section];
  if (!user) {
    classes.push(Styles.center);
  }

  return (
    <div className={Styles.App}>
      <header className={Styles.header}>
        <i className={'fas fa-comments ' + Styles.logo}></i>
        <SignOut auth={auth} />
      </header>

      <section className={classes.join(' ')}>
        {user ? <ChatRoom dummy={dummy} messages={messages} auth={auth} formValue={formValue} onChangeFormValue={setFormValue} onSubmit={sendMessage} /> : <SignIn signIn={signInWithGoogle.bind(this)} />}
      </section>
    </div>
  );
}

export default App;
