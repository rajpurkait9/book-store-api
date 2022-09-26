const Book = require('../model/book-schema');
const getAllBooks = async (req, res) => {
  try {
    const book = await Book.find({ createdBy: req.user.userId });
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: bookId },
    } = req;
    const book = await Book.findOne({ _id: bookId, createdBy: userId });
    if (!book || book === null)
      return res.status(404).send('there is no book with this id');

    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const {
      body: { name, author, url, pages, price },
      user: { userId },
      params: { id: bookId },
    } = req;
    if (name === '' || author === '')
      return res
        .status(400)
        .send('company and position fields cannot be empty');
    const book = await Book.findByIdAndUpdate(
      { _id: bookId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!book || book === null)
      return res.status(404).send('there is no book with this id');
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: bookId },
    } = req;
    const book = await Book.findByIdAndRemove({
      _id: bookId,
      createdBy: userId,
    });
    if (!book || book === null)
      return res.status(404).send('there is no book with this id');
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
