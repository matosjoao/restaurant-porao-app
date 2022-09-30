import {useContext} from 'react';
import {AuthContext} from '../../store/auth-context';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthContext');
  }

  return context;
};

export default useAuth;
