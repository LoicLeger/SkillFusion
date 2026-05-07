import assert from "node:assert";
import { describe, it } from "node:test";
import { authedRequester } from "../../test/index";
import logger from "../lib/logger";

describe("globalErrorHandler", () => {
  it("should return a 500 when an unhandled error occurs", async () => {
    // ARRANGE
    it.mock.method(logger, "error", () => {});

    // ACT
    // Appel à la route de test qui lance intentionnellement une erreur non-gérée
    const httpResponse = await authedRequester.get("/test/unhandled-error");

    // ASSERT
    assert.strictEqual(httpResponse.status, 500);
    assert.strictEqual(httpResponse.data.status, 500);
    assert.strictEqual(httpResponse.data.error, "Internal server error");
  });
});