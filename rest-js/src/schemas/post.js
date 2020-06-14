const yup = require("yup");

const createPost = yup.object().shape({
  title: yup.string().required().min(3),
  content: yup.string().required().min(3),
});

const updatePost = createPost;

module.exports = {
  createPost,
  updatePost,
};
