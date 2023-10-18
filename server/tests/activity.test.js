const mongoose = require("mongoose");
const session = require('supertest-session');

const {app, server, database} = require("../index");
const request = require("supertest")(app);
require("dotenv").config();

var testSession = null;
var loginResponse = null;

testSession = session(app);
// /* Connecting to the database before each test. */
// beforeEach(async () => {
//   await mongoose.connect(process.env.DATABASE_URL);
// });

// /* Closing database connection after each test. */
// afterEach(async () => {
//   await mongoose.connection.close();
// });

afterAll(async () => {
  await testSession.destroy();
  database.close();
  server.close();

});
 
describe('Login and Protected Endpoints', () => {
  it('should fail since it is making unauthenticated requests', async () => {
    const getRecipeResponse = await testSession
      .get('/api/account/getRecipes')
      .query({ q: 'chicken rice' })
      .expect(401);
  });

  it('should successfully login and store session data', async () => {
    loginResponse = await testSession
    .post('/api/auth/login')
    .send({ usernameOrEmail: 'Test1', password: 'Cap@2020' })
    .expect(200) 
  });

  it('should successfully get recipes from edamam Api since it is sending session cookie', async () => {
    const getRecipeResponse = await testSession
      .get('/api/account/getRecipes')
      .query({ q: 'chicken rice' })
      .expect(200);
  });

  it('should successfully logout and remove session data', async () => {
    const logoutResponse = await testSession
      .post('/api/auth/logout')
      .expect(200);
  });


});
  // it('should get recipes with an authenticated session', async () => {
  //   const response = await agent
  //     .get('/getRecipes')
  //     .query({ q: 'chicken rice' })
  //     .set('Cookie', sessionData); // Set the session data in the request header
  //   expect(response.status).toBe(200);
  //   // Add more assertions based on your application's behavior
  // });

  // it('should save a recipe with an authenticated session', async () => {
  //   const response = await agent
  //     .post('/saveRecipe')
  //     .query({ q: '320de40b36c39031c3e32e8f9e27b43e' })
  //     .set('Cookie', sessionData); // Set the session data in the request header
  //   expect(response.status).toBe(200);
  //   // Add more assertions based on your application's behavior
  // });
  
  // it('should successfully logout and remove session data', async () => {
  //   const response = await agent
  //     .get('/auth/logout')
  //     .set('Cookie', sessionData); // Set the session data in the request header
  //   expect(response.status).toBe(200);
  //   // Add more assertions based on your application's behavior
  // });
