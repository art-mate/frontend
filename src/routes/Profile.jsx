import React from 'react';
import { useHistory } from 'react-router-dom';

import { authService } from '../fBase';

const Profile = () => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut().then(
      history.push('/')
    );
  }

  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  )
};

export default Profile;