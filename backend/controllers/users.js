import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';
import BadRequest from '../errors/BadRequest.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.cookie('someCookieKey', token, { httpOnly: true, sameSite: true, maxAge: 3600000 * 24 * 7});
      res.status(200).send({ email: user.email});
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('someCookieKey');
  return res.send({});
};

const getInfoByCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь с указанным id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан невалидный id пользователя'));
      }
      return next;
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next;
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next;
    });
};

export {
  getUsers, createUser, getUserById, updateUserAvatar,
  updateUserProfile, login, getInfoByCurrentUser, logout,
};
