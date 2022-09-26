const express = require('express');
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controller/book');
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
