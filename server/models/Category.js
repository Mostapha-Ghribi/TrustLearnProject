const mongoose = require('mongoose');

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String
  })
);

export default Category;