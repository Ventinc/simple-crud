const yup = require("yup");

const paginationSchema = yup.object().shape({
  page: yup.number().positive().min(1).default(1),
  perPage: yup.number().positive().min(15).default(15),
});

module.exports = {
  paginationSchema,
};
