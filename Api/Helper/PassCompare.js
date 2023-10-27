import bcryptjs from "bcryptjs";

export const PassCompare = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
};
