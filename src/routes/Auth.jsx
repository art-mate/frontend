import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fBase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch(error) {
      setError(error.message);
    }
  }

  const onChange = (event) => {
    const { target: { name, value }} = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const onSocialClick = async (event) => {
    const { target: { name }} = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    // } else if (name === 'facebook') {
    //   provider = new firebaseInstance.auth.FacebookAuthProvider();
    // }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='email' required value={email} onChange={onChange} />
        <input name='password' type='password' placeholder='password' required value={password} onChange={onChange} />
        <input type='submit' value={newAccount ? '회원가입' : '로그인'} />
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>Google</button>
        {/* <button name="facebook" onClick={onSocialClick}>Facebook</button> */}
      </div>
    </div>  
  );
}

export default Auth;