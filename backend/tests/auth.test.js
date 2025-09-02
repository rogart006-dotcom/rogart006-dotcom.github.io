const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");

describe("Auth", () => {
  it("rejects missing credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("rejects bad credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: "no", password: "no" });
    expect(res.status).toBe(401);
  });

  it("accepts correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: process.env.ADMIN_USERNAME || "admin", password: process.env.ADMIN_PASSWORD || "changeme" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    const decoded = jwt.decode(res.body.token);
    expect(decoded).toHaveProperty("sub");
  });
});
