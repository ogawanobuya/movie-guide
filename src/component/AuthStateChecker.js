import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';


const AuthStateChecker = (props) => {
  const navigate = useNavigate();
  // (注)AuthContext.Providerにおいて「value=>currentUser」として登録したため、一字でも異なると作動しない
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser && !props.isOutside) {
      navigate("/sign-in");
    } else if (currentUser && props.isOutside) {
      navigate("/");
    }
  }, []);

  return <div>{props.children}</div>;
};

export default AuthStateChecker;
