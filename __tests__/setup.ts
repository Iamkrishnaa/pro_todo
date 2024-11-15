import env from "@/utils/validateEnv";

describe("Setup", () => {
  it("should check if app is running in test environment", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("should check if all environment variables are defined", () => {
    expect(env).toBeDefined();
    expect(env.APP_NAME).toBeDefined();
    expect(env.APP_PORT).toBeDefined();
  });
});
