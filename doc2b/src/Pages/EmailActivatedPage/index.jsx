import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

import { UserActivation } from '../../Platform/UserActivation';

import Logo from '../../assets/Images/Logo.png';

export default function EmailActivatedPage() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const backendRequest = async () => {
      const user = {
        uid: uid,
        token: token,
      };

      try {
        await UserActivation(user);
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        if (error.response.data.detail === 'Stale token for given user.') {
          setErrorMessage('էլ․ փոստը արդեն հաստատված է');
        }
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    };
    backendRequest();
  }, [uid, token, navigate]);
  return (
    <div>
      <div className='success-logo-section'>
        <img src={Logo} alt='MainLogo' />
      </div>
      {!errorMessage ? (
        <h3 className='succesfuly-activated'>Դուք հաջողությամբ գրանցվեցիք</h3>
      ) : (
        <h3 className='succesfuly-activated'>{errorMessage}</h3>
      )}
    </div>
  );
}
