import React, { useState } from 'react';
import '../../assets/styles/Cookie.css'

const CookieConsent = ({ onAcceptCookies }) => {
  const [consent, setConsent] = useState(() => {
    const userConsent = localStorage.getItem('cookieConsent');
    return userConsent === 'accepted' ? 'accepted' : userConsent === 'rejected' ? 'rejected' : null;
  });
  // if (consent) {
  //   setConsent(null);
  // }

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsent('accepted');

    if (typeof onAcceptCookies === 'function') {
      onAcceptCookies();
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setConsent('rejected');
  };

  if (!consent) {
    return (
      <div id="cookie-banner">
        This website uses cookies to enhance user experience.{' '}
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    );
  }

  return null;
};

export default CookieConsent;