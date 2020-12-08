import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { authService, firebaseInstance } from '../fBase';
import { useHistory } from 'react-router-dom';
import googleLogo from '../static/images/googleLogo.svg';
import { ThemeContext } from '../App';

const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
`;

const LoginContainer = styled.div`
  width: 100%;
`;

const LoginFormWrap = styled.div`
  width: 38%;
  min-width: 530px;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  height: 570px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.navBar};
`;

const LoginForm = styled.form`
  max-width: 550px;
  min-width: 380px;
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
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  & label {
    font-size: 0.8rem;
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
    background: #cf2020;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

const GoogleLoginWrap = styled.div`
  max-width: 500px;
  width: 50%;
  min-width: 380px;
  height: 80px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 47px;
    margin-top: 10px;
    border-radius: 8px;
    border: 2px solid #1f72eb;
    font-size: 0.8rem;
    cursor: pointer;
    background: white;
    color: #363537;
  }

  & img {
    width: 25px;
    margin-right: 10px;
  }
`;

const ErrorMsgWrap = styled.div`
  width: 100%;
  height: 40px;
  font-size: 0.8rem;
`;

const CheckNewUserWrap = styled.div`
  max-width: 500px;
  width: 50%;
  min-width: 380px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;

const SignInContentWrap = styled.div`
  width: 100%;
  height: 40px;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create account
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        await authService.signInWithEmailAndPassword(email, password);
      }
      history.push('/');
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
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
  };

  const onLoginClick = () => {
    setNewAccount(false);
  };

  const onRegisterClick = () => {
    setNewAccount(true);
  };

  return (
    <>
      <AuthContainer>
        <InputContainer>
          <LoginFormWrap theme={theme}>
            <LoginForm onSubmit={onSubmit}>
              {newAccount ? (
                <SignInContentWrap>회원가입</SignInContentWrap>
              ) : (
                <SignInContentWrap>로그인</SignInContentWrap>
              )}
              {error && (
                <ErrorMsgWrap>
                  <span role="img" aria-labelledby="error">
                    🙅{' '}
                  </span>
                  {error}
                </ErrorMsgWrap>
              )}
              <LoginContainer>
                <InputWrap>
                  <label htmlFor="email">이메일</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={onChange}
                  />
                </InputWrap>
                <InputWrap>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChange}
                  />
                </InputWrap>
              </LoginContainer>
              {newAccount ? (
                <LoginButtonWrap>
                  <input type="submit" value="회원가입" />
                </LoginButtonWrap>
              ) : (
                <LoginButtonWrap>
                  <input type="submit" value="로그인" />
                </LoginButtonWrap>
              )}
            </LoginForm>
            <GoogleLoginWrap>
              <button name="google" onClick={onSocialClick}>
                <img src={googleLogo} alt="google" />
                구글 계정으로 로그인
              </button>
              {/* <button name="facebook" onClick={onSocialClick}>Facebook</button> */}
            </GoogleLoginWrap>
            <CheckNewUserWrap>
              {newAccount ? (
                <>
                  이미 가입하셨나요?{' '}
                  <span
                    onClick={onLoginClick}
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    로그인
                  </span>
                </>
              ) : (
                <>
                  계정이 없으신가요?{' '}
                  <span
                    onClick={onRegisterClick}
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {' '}
                    회원가입
                  </span>
                </>
              )}
            </CheckNewUserWrap>
          </LoginFormWrap>
        </InputContainer>
      </AuthContainer>
    </>
  );
};

export default Auth;
