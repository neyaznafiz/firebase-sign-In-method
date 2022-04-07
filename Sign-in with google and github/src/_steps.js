/*
* 1. Creat a project on console.firebase.google.com.
* 2. npm install firebase.
* 3. regester web app in firebase.
* 4. copy firebase init with config from firebase project settings into a file firebase.init.js .
* 5. export default app from firebase.init.js
* 6. import getAuth from firebase/auth and create auth variable  - const auth = getAuth(app) - in app.js
* 7. import app from firebase.init.js into your app.js
* 8. turn on google authentication from project in firebase (firebase > authentacion > enable google sign in).
* 9. create google provider.
* 10. use signInWithPopup and pass auth and provider
* 11. handle .then (if successful) and catch error (if error)
*/