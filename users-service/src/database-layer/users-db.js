import mongoose from 'mongoose';
import User from './models/User'

async function find(query) {
  return await User.find(query);
}

async function findOne(query) {
  return await User.findOne(query);
}

async function findById(id) {
  return await User.find(id);
}

async function insert(user) {
  await User.create(user);
}

export default Object.freeze({
  find,
  findOne,
  findById,
  insert
})