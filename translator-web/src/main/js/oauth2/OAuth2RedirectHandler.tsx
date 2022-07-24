import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../constants';

export const OAuth2RedirectHandler = ({location, history, authenticated}) => {
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  useEffect(()=>{
    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      // window.history.pushState({}, null, "/#profile");
      document.location = "/#profile";
    } else if (!authenticated) {
      // window.history.pushState({}, null, "/#login");
      document.location = "/#login";
    }
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  });
  return null;
}
