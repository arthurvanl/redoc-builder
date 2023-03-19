import { describe, expect, test } from "vitest";
import { ContentBuilder } from "../builders/Content.js";
import { SchemaBuilder, SchemaPropertyBuilder } from "../builders/Schema.js";

describe('Content test builder', () => {
    test('Expected to build media content object with schema', () => {
        
        const mediaContent = new ContentBuilder()
        .setName('application/json')
        .setSchema(new SchemaBuilder()
            .setName('user')
            .setType('object')
            .setRef('#/components/responses/user/post')
            .addProperty(new SchemaPropertyBuilder()
                .setDeprecated(false)
                .setName('name')
                .setType('string')
                .setMaxLength(40)
                .setMinLength(5)
                .setExample('Arthur van Leeuwen')
            )
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
                name: 'user',
                type: 'object',
                $ref: '#/components/responses/user/post',
                properties: {
                    name: {
                        type: 'string',
                        maxLength: 40,
                        minLength: 5,
                        example: 'Arthur van Leeuwen',
                        deprecated: false
                    }
                }
            }
        })
    });
})