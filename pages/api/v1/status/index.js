const status = (req, res) => {
  res.status(200).json({ message: 'Deu tudo certo!' });
};

export default status;
