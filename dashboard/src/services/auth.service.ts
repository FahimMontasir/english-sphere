import { localStorageKey } from '@/constants/global';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { decodedToken } from '@/utils/jwt';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(localStorageKey.auth, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(localStorageKey.auth);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return '';
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(localStorageKey.auth);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
