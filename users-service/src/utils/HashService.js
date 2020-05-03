import bcrypt from 'bcryptjs';

const HashService = {
  hash: async (data) => {
    return await bcrypt.hash(10, data);
  },
  compare: async (data, hashedData) => {
    return await bcrypt.compare(data, hashedData);
  }
}

export default HashService;