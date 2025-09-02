/**
 * Basic integration tests. Requires test environment setup.
 * These tests are minimal; adjust environment variables when running locally.
 */
const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../index");

describe("Messages API", () => {
  let token;
  beforeAll(async () => {
    // login
    const res = await request(app).post("/api/auth/login").send({ username: process.env.ADMIN_USERNAME || "admin", password: process.env.ADMIN_PASSWORD || "changeme" });
    expect(res.status).toBe(200);
    token = res.body.token;
  });

  let createdId;

  it("should create a message", async () => {
    const res = await request(app).post("/api/messages").send({
      name: "Tester",
      email: "tester@example.com",
      subject: "Hello",
      body: "This is a test message body that is long enough."
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    createdId = res.body.id;
  });

  it("should list messages (protected)", async () => {
    const res = await request(app).get("/api/messages").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("messages");
  });

  it("should update message status", async () => {
    const res = await request(app).put(`/api/messages/${createdId}`).send({ status: "read" }).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message.status).toBe("read");
  });

  it("should delete the message", async () => {
    const res = await request(app).delete(`/api/messages/${createdId}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
