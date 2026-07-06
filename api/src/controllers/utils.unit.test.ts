import { describe,it } from "node:test";
import assert from "node:assert";

import { parseIdFromParams } from "./utils";

describe("test function parseIdFromParams",()=>{
    it("should return a number when id is a string",async ()=>{
        const id="10";

        const result = await parseIdFromParams(id);

        assert.strictEqual(result,Number(id));
    });

    it("should return a number when id is a number",async ()=>{
        const id=10;

        const result = await parseIdFromParams(id);

        assert.strictEqual(result,id);
    });
    it(" should throw an error when id is less than 1",async ()=>{
        const id=0;

        assert.rejects(async()=>await parseIdFromParams(id));
    });
});