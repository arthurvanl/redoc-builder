import { describe, expect, test } from "vitest";
import { ContentBuilder } from "../builders/Content.js";
import { SchemaBuilder } from "../builders/Schema.js";

describe('Content test builder', () => {
    test('Expected to build media content object with schema', () => {
        
        const mediaContent = new ContentBuilder()
        .setName('application/json')
        .setSchema(new SchemaBuilder()
            .setName('message')
            .setType('string')
            .setRef('#/components/responses/user/post')
        )
        .setExample({
            message: 'What a nice message!'
        })
        
        expect(mediaContent.toJSON()).toEqual({
            name: 'application/json',
            example: { 
                message: 'What a nice message!'
            },
            schema: {
                name: 'message',
                type: 'string',
                ref: '#/components/responses/user/post',
            }
        })
    });
})