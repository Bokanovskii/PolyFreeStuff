const mongoose = require("mongoose");
const UserSchema = require("./models/user");
const backend = require("./backend_with_db");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("User", UserSchema);

  backend.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

// beforeEach(async () => {
//   let dummyUser = {
//     name: "Chuck Norris",
//     job: "Highlander",
//   };
//   let result = new userModel(dummyUser);
//   await result.save();
// });

afterEach(async () => {
  await userModel.deleteMany();
});

// test("Fetching all users", async () => {
//   const users = await userServices.getUsers();
//   expect(users).toBeDefined();
//   expect(users.length).toBeGreaterThan(0);
// });
