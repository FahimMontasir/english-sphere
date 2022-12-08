/* eslint-disable consistent-return */
const admin = (req, res, next) => {
  const { type } = req.user;
  if (type !== 'admin')
    return res.status(403).json({ message: 'access denied -admin' });

  next();
};
module.exports = admin;
