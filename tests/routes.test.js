const request = require('supertest');
const app = require('../src');
let EVENT_ID;

//===================================================
//POST SIGN UP USER 
//===================================================

describe('POST: sign up user', () => {
  it('POST: Sign Up (User has image format JPG) > response 201', async () => {
    const res = await request(app)
      .post('/api/signup')
      .field('firstname', 'Jane')
      .field('lastname', 'Doew')
      .field('email', 'jane@doew.test')
      .field('dob', '1970-10-10')
      .field('password', 'IamTester1337!!')
      .attach('avatar', `${__dirname}/tests-files/test.jpg`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'add user');
  });

  it('POST: Sign Up (User has image format PNG) > response 201', async () => {
    const res = await request(app)
      .post('/api/signup')
      .field('firstname', 'Jon')
      .field('lastname', 'Doew')
      .field('email', 'jon@doew.test')
      .field('dob', '1970-10-10')
      .field('password', 'IamTester1337!!')
      .attach('avatar', `${__dirname}/tests-files/test.png`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'add user');
  });

  it('POST: Sign Up (User has image format GIF) > respons 400', async () => {
    const res = await request(app)
      .post('/api/signup')
      .field('firstname', 'User')
      .field('lastname', 'Bad')
      .field('email', 'user@bad.test')
      .field('dob', '1970-10-10')
      .field('password', 'IamTester1337!!')
      .attach('avatar', `${__dirname}/tests-files/test.gif`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'goes wrong on the mimetype');
  });

  it('POST: Sign Up (User has invalid data) > respons 400', async () => {
    const res = await request(app)
      .post('/api/signup')
      .field('firstname', 'User122')
      .field('lastname', '%%%Bad')
      .field('email', 'user@.')
      .field('dob', '10-10-1970')
      .field('password', 'iamtester')
      .attach('avatar', `${__dirname}/tests-files/test.gif`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('POST: Sign Up (User with duplicate email) > response 500', async () => {
    const res = await request(app)
      .post('/api/signup')
      .field('firstname', 'Jo')
      .field('lastname', 'Jo')
      .field('email', 'jon@doew.test')
      .field('dob', '1970-10-10')
      .field('password', 'IamTester1337!!')
      .attach('avatar', `${__dirname}/tests-files/test.jpg`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message');
  });
});

//===================================================
//POST SIGN IN USER 
//===================================================

describe('POST: sign in user', () => {
  it('POST: Sign In (User was able to log in) > respons 201', async () => {
    const res = await request(app)
      .post('/api/signin')
      .field('email', 'jon@doew.test')
      .field('password', 'IamTester1337!!');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User is login!!!');
  });

  it('POST: Sign In (User could not login) > respons 404', async () => {
    const res = await request(app)
      .post('/api/signin')
      .field('email', 't553236e44444st@test.test')
      .field('password', 'IamTester1337!!');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'not found user');
  });
});

//===================================================
//POST CREATE EVENT
//===================================================

describe('POST: create event', () => {
  
  const agent = request.agent(app);
  let cookie;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/signin')
      .field('email', 'jon@doew.test')
      .field('password', 'IamTester1337!!')
      .expect(201);
      
      cookie = res.headers['set-cookie'][0];
  });

  it('POST: (User create event) > response 201', async () => {
      const res = await agent
        .post('/api/event/create')
        .set('Cookie', cookie)
        .field('name', 'Test event: Nature')
        .field('location', 'London, Test, uk')
        .field('startdate', '2022-10-25 10:30')
        .field('enddate', '2022-10-25 15:00');

      EVENT_ID = res.body.event._id; 
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'add event');
  });
});

//===================================================
//POST REGISTRATION AND UNREGISTRATION FOR THE EVENT
//===================================================

describe('POST: registration and unregistration for the event', () => {
  const agent = request.agent(app);
  let cookie;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/signin')
      .field('email', 'jane@doew.test')
      .field('password', 'IamTester1337!!')
      .expect(201);
      
      cookie = res.headers['set-cookie'][0];
  });

  it('POST: (User registers for the event) > response 201', async () => {
      const res = await agent
        .post(`/api/user/event/register/${EVENT_ID}`)
        .set('Cookie', cookie);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'register user on event');
  });

  it('POST: (User unregisters for the event) > response 201', async () => {
    const res = await agent
      .post(`/api/user/event/unregister/${EVENT_ID}`)
      .set('Cookie', cookie);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'unregister user on event');
  });
});

//===================================================
//GET, PUT, DELETE WORK WIRH EVENTS
//===================================================

describe('GET, PUT, DELETE: work with events', () => {
  const agent = request.agent(app);
  let cookie;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/signin')
      .field('email', 'jon@doew.test')
      .field('password', 'IamTester1337!!')
      .expect(201);
      
      cookie = res.headers['set-cookie'][0];
  });

  it('GET: (User get info about event) > response 201', async () => {
      const res = await agent
        .get(`/api/event/${EVENT_ID}`)
        .set('Cookie', cookie);
      expect(res.statusCode).toEqual(200);
  });

  it('PUT: (User update info about event) > response 201', async () => {
    const res = await agent
      .put(`/api/event/update/${EVENT_ID}`)
      .field('name', 'New Test Name')
      .field('location', 'New Location');
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'item update');
  });

  it('PUT: (User update info about event) > response 404', async () => {
    const res = await agent
      .put(`/api/event/update/${EVENT_ID}`)
      .field('name', 'New Test Name')
      .field('location', 'New Location');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'item have this value');
  });

  it('DELETE: (User remove event) > response 201', async () => {
    const res = await agent
      .delete(`/api/event/delete/${EVENT_ID}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'item delete');
  });

  it('PUT: (User update info about event) > response 404', async () => {
    const res = await agent
      .put(`/api/event/update/${EVENT_ID}`)
      .field('name', 'New Test Name')
      .field('location', 'New Location');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'haven\'t this item');
  });

  it('DELETE: (User remove event) > response 404', async () => {
    const res = await agent
      .delete(`/api/event/delete/${EVENT_ID}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'haven\'t this item');
  });
});
