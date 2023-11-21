import bcrypt from 'bcrypt';
import configs from '../configs';

const hash = async (password: string) => {
  return await bcrypt.hash(password, Number(configs.bcrypt_salt_rounds));
};

const compare = async (givenPassword: string, savedPassword: string) => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const Password = {
  hash,
  compare,
};
