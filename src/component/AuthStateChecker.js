import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';


const AuthStateChecker = ({ children }) => {
  const navigate = useNavigate();
  // (注)AuthContext.Providerにおいて「value=>currentUser」として登録したため、一字でも異なると作動しない
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      console.log('Userいます');
      console.log(currentUser);
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthStateChecker;
