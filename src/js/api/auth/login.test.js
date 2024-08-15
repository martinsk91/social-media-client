import { login } from "./login.js";
import { save, remove, load } from "../../storage/index.js";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe("storage", () => {
  it("Saves an array to storage", () => {
    const key = "test";
    const value = ["testName", "testPassword"];
    const serializedValue = JSON.stringify(value);
    save(key, value);
    expect(localStorage.getItem(key)).toEqual(serializedValue);
  });

  it("Loads an array from storage", () => {
    const key = "test";
    const value = ["testName", "testPassword"];
    save(key, value);
    expect(load(key)).toEqual(value);
  });

  it("Removes an array from storage", () => {
    const key = "test";
    const value = ["testName", "testPassword"];
    save(key, value);
    expect(load(key)).toEqual(value);
    remove(key);
    expect(load(key)).toEqual(null);
  });
});

const TEST_EMAIL = "test@noroff.no";
const TEST_PASSWORD = "password";


const TEST_TOKEN = {
  token: "eyFabAciOiJIUzI1NiIsBnR5cCI6IkpXXGJ5.eyJpZCI6ND",
};


function fetchSuccess(email = TEST_EMAIL, password = TEST_PASSWORD) {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_TOKEN),
  });
}



function fetchFailure(status = 404, statusText = "Not Found") {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

describe("logIn", () => {
  it("Fetches and stores a token in browser storage when provided with a valid email and password ", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const token = await login();
    expect(token).toEqual(TEST_TOKEN);
  });
});

describe("logIn Fail", () => {
    it("Throws an error when the login fails", async () => {
      global.fetch = jest.fn(() => fetchFailure());
  
      await expect(login()).rejects.toThrow("Not Found");
    });
  });
