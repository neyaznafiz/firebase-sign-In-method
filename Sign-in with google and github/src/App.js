import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({})


  // googleProvider
  const googleProvider = new GoogleAuthProvider()

  const githubProvider = new GithubAuthProvider()


  // google sign in 
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  // github sign in
  const handleGithubSigniIn = () => {
    signInWithPopup(auth, githubProvider)
    .then( result => {
      const user = result.user
      setUser(user)
    })
    .catch(error => {
      console.error(error)
    })
  }

  // sign out
  const handleSignOut = () => {

    signOut(auth)
      .then(() => {
        setUser({})
      }).catch((error) => {
        setUser({})
      });

  }

  return (
    <div className="App">

      <div className='login-info'>
        {
          // conditional rendaring for button
          !user.uid ?
            <>
              <button onClick={handleGoogleSignIn}>Google sign-In</button>
              <button onClick={handleGithubSigniIn}>Github Sign In</button>
            </>
            :
            <button onClick={handleSignOut}>Sign out</button>
        }

        <h2>Name : {user.displayName}</h2>
        <p>E-mail : {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>

    </div>
  );
}

export default App;
