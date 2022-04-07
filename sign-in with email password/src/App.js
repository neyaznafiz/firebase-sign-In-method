import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [registered, setRegistered] = useState(false)

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleNameBlur = (e) => {
    setName(e.target.value);
  }

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }


  const handleRegisteredChange = (e) => {
    setRegistered(e.target.checked);
  }



  const handleFormSubmit = e => {

    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain al least one special character')
    }

    setValidated(true);
    setError('')


    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user
          console.log(user);
          setEmail('')
          setPassword('')
          verifyEmail()
          setUserName()
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }

    e.preventDefault()
  }


  const handlePasswordReset = () => {

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }


  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
   console.log('updating', name);
    })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!')
      })
    .catch((error) => {
      setError(error.message)
    });
  }

  return (
    <div>

      <div className="registration w-50 mx-auto mt-3">

        <h2 className="text-primary">Please {registered ? 'Login' : 'Register'}</h2>

        <Form noValidate validated={validated} onSubmit={handleFormSubmit} >

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Type your name" required />

            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}

          {/* email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            <Form.Control.Feedback type="invalid">
              Please provide a valid E-mail.
            </Form.Control.Feedback>
          </Form.Group>

          {/* paassword */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />

            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Alredy Registered ?" />
          </Form.Group>

          {/* <p className="text-danger">{'Success'}</p> */}
          <p className="text-danger">{error}</p>

          <Button onClick={handlePasswordReset} variant="link">Forget Password</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>

      </div>

    </div>
  );
}

export default App;
