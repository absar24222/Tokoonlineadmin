const User = require('../models/User'); // Jalur sudah diperbaiki dari ../../../ menjadi ../
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ message: 'Email sudah digunakan!' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User berhasil didaftarkan!', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email tidak terdaftar!' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Password salah!' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login berhasil!', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};