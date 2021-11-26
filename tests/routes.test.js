const request = require('supertest');
const fs = require('mz/fs');
const app = require('../src');
jest.useFakeTimers()

describe('Post signup user', () => {
  
  const filePath = `${__dirname}/tests-files/test.jpg`

  it('Post Sign Up User', async (done) => {
    const file = await fs.exists(filePath)
      .then(async (exists) => {
        if (!exists) throw new Error('file does not exist') 
    });

    const res = await request(app)
      .post('/api/signup')
      .send({
        avatar: file,
        firstname: 'Jane',
        lastname: 'Doew',
        email: 'test@test.test',
        dob: '1970-10-10',
        password: 'IamTester1337!!'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("message", "user add")
  })
})
