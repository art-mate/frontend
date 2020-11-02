import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const onChange = (event) => {
    const { target: { name, value }} = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  return (
    <div>
      <form>
        <input name='email' type='text' placeholder='email' required value={email} onChange={onChange} />
        <input name='password' type='password' placeholder="password" required value={password} onChange={onChange} />
      </form>
    </div>  
  );
}

export default Auth;