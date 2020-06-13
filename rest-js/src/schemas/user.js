const yup = require("yup");

const createUser = yup.object().shape({
  username: yup.string().required().min(3),
  password: yup.string().required().min(6),
});

const loginUser = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

module.exports = {
  createUser,
  loginUser,
};
