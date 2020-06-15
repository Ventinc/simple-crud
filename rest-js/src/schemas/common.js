const yup = require("yup");

const paginationSchema = yup.object().shape({
  page: yup.number().positive().min(0).default(0),
  perPage: yup.number().positive().min(15).default(15),
});

module.exports = {
  paginationSchema,
};
