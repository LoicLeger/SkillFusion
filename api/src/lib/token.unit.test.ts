import assert from "node:assert";
import { describe, it } from "node:test";
import { generateAuthTokens } from "./token";


describe("Test function generateAuthToken",()=>{
    it("should return error when user is empty object",()=>{
        const user={}

        const result = generateAuthTokens(user)

        assert.strictEqual(result,false)
    })

    it("should return two token when user is valide",()=>{
        const user={id:1,roleId:1}

        const result = generateAuthTokens(user)

        assert.ok(result.accessToken)
        assert.ok(result.refreshToken)
    })

    it("should return the good expiration time",()=>{
        const user={id:1,roleId:1}

        const result = generateAuthTokens(user)

        assert.equal(result.accessToken.expiresIn,900*1000)
        assert.equal(result.refreshToken.expiresIn,604800*1000)
    })
})
