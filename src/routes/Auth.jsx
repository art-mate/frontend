import React, { useState } from 'react';
import styled from 'styled-components';
import { authService, firebaseInstance } from '../fBase';
import { useHistory } from 'react-router-dom';
import googleLogo from '../static/images/googleLogo.svg';

const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.1);
`;

const SideContainer = styled.div`
  width: 40%;
  height: 100vh;
  background: rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 100%;
`;

const LoginForm = styled.form`
  max-width: 500px;
  min-width: 420px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 80px;
  & input {
    padding: 15px;
    width: 100%;
    margin-top: 3px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.2);
  }
  & label {
    font-size: .8rem;
  }
`;

const LoginButtonWrap = styled.div`
  width: 100%;
  height: 80px;
  & input {
    padding: 15px;
    width: 100%;
    margin-top: 15px;
    border-radius: 8px;
    border: none;
    color: white;
    background: #e6328d;
    font-size: .8rem;
    cursor: pointer;
  }
`;

const GoogleLoginWrap = styled.div`
  max-width: 500px;
  width: 50%;
  min-width: 420px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 47px;
    margin-top: 12px;
    border-radius: 8px;
    border: 2px solid #1f72eb;
    font-size: .8rem;
    cursor: pointer;
    background: white;
  }

  & img {
    width: 25px;
    margin-right: 10px;
  }
`;

const SideContent = styled.div`
  width: 100%;
  font-size: 6rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMsgWrap = styled.div`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
`;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const history = useHistory();

  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      history.push('/');
    } catch(error) {
      setError(error.message);
      alert(error.message);
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
    await authService.signInWithPopup(provider);
    // console.log(data);
    history.push('/');
  }

  return (
    <>
      <AuthContainer>
        <SideContainer>
          <SideContent><span role='img' aria-labelledby='art'>🎨</span></SideContent>
        </SideContainer>
        <InputContainer>
          <LoginForm onSubmit={onSubmit}>
            {error && 
              <ErrorMsgWrap>
                <span role='img' aria-labelledby='error'>🙅 </span>
                {error}
              </ErrorMsgWrap>
            }
            <LoginContainer>
              <InputWrap>
                <label htmlFor='email'>이메일</label>
                <input name='email' type='email' required value={email} onChange={onChange} />
              </InputWrap>
              <InputWrap>
                <label htmlFor='password'>비밀번호</label>
                <input name='password' type='password' required value={password} onChange={onChange} />
              </InputWrap>
            </LoginContainer>
            <LoginButtonWrap>
              <input type='submit' value='로그인'/>
            </LoginButtonWrap>
            <div/>
          </LoginForm>
          <GoogleLoginWrap>
            <button name="google" onClick={onSocialClick}>
              <img src={googleLogo} alt='google' />
              구글 계정으로 로그인
            </button>
            {/* <button name="facebook" onClick={onSocialClick}>Facebook</button> */}
          </GoogleLoginWrap>
        </InputContainer>
      </AuthContainer>
    </>
  );
}

export default Auth;