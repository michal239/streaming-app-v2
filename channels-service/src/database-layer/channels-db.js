import mongoose from 'mongoose';
import Channel from './models/Channel';

async function find(query) {
  return await Channel.find(query);
}

async function findOne(query) {
  return await Channel.findOne(query);
}

async function findById(id) {
  return await Channel.find(id)
}

async function insert(channel) {
  return await Channel.create(channel);
}

export default Object.freeze({
  find,
  findOne,
  findById,
  insert
})