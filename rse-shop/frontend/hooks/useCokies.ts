import { useState } from 'react';

type SetCookieOptions = {
  path?: string;
  domain?: string;
  expires?: number | Date;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

type Cookies = {
  [key: string]: string;
};

function useCookies(): [
  Cookies,
  (name: string, value: string, options?: SetCookieOptions) => void,
  (name: string) => void,
  (name: string, value: string, options?: SetCookieOptions) => void,
  (cookies: Cookies) => void,
  () => Cookies
] {
  const [cookies, setCookies] = useState<Cookies>(() => {
    if (typeof window !== 'undefined') {
      const cookieObj: Cookies = {};
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookieObj[name] = decodeURIComponent(value);
      });
      return cookieObj;
    }
    return {};
  });

  const setCookie = (
    name: string,
    value: string,
    options: SetCookieOptions = {}
  ) => {
    if (typeof window !== 'undefined') {
      const { path, domain, expires, secure, sameSite } = options;
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}`;

      if (path) cookieStr += `; path=${path}`;
      if (domain) cookieStr += `; domain=${domain}`;
      if (expires) {
        if (typeof expires === 'number') {
          const date = new Date();
          date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
          cookieStr += `; expires=${date.toUTCString()}`;
        } else {
          cookieStr += `; expires=${expires.toUTCString()}`;
        }
      }
      if (secure) cookieStr += `; secure`;
      if (sameSite) cookieStr += `; sameSite=${sameSite}`;

      document.cookie = cookieStr;
      setCookies({ ...cookies, [name]: value });
    }
  };

  const getCookies = (): Cookies => {
    if (typeof window !== 'undefined') {
      const cookieObj: Cookies = {};
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookieObj[name] = decodeURIComponent(value);
      });
      return cookieObj;
    }
    return {};
  };

  const deleteCookie = (name: string) => {
    if (typeof window !== 'undefined') {
      const options = { expires: new Date(0) };
      setCookie(name, '', options);
    }
  };

  const updateCookie = (
    name: string,
    value: string,
    options?: SetCookieOptions
  ) => {
    if (cookies[name]) {
      setCookie(name, value, options);
    }
  };

  const setCookiesHandler = (cookieObj: Cookies) => {
    if (typeof window !== 'undefined') {
      Object.keys(cookieObj).forEach(key => {
        setCookie(key, cookieObj[key]);
      });
    }
  };

  return [
    cookies,
    setCookie,
    deleteCookie,
    updateCookie,
    setCookiesHandler,
    getCookies
  ];
}

export default useCookies;

// usage example

// import React, { useState } from 'react';
// import useCookies from './useCookies';

// function App() {
//   const [cookies, setCookie, deleteCookie, updateCookie] = useCookies();
//   const [username, setUsername] = useState('');

//   const handleSetCookie = () => {
//     setCookie('username', username, { expires: 7 });
//   };

//   const handleDeleteCookie = () => {
//     deleteCookie('username');
//   };

//   const handleUpdateCookie = () => {
//     updateCookie('username', 'new-username');
//   };

//   return (
//     <div>
//       <h1>Use Cookies Example</h1>
//       <p>Current username: {cookies.username || 'none'}</p>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <button onClick={handleSetCookie}>Set Cookie</button>
//       <button onClick={handleDeleteCookie}>Delete Cookie</button>
//       <button onClick={handleUpdateCookie}>Update Cookie</button>
//     </div>
//   );
// }

// export default App;
