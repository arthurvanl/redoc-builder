import { describe, test, expect } from "vitest";
import { SchemaBuilder, SchemaPropertyBuilder } from "../builders/Schema.js";

describe('Schema test builder', () => {
    test('Expected to build a schema with 2 properties', () => {

        const schema = new SchemaBuilder()
            .setName('Test')
            .setType('object')
            .setRef('#/components/test')
            .addProperty(
                new SchemaPropertyBuilder()
                    .setDeprecated(true)
                    .setName('test')
                    .addEnum(1)
                    .addEnum(2)
                    .setType('integer')
                    .setMinLength(2)
                    .setFormat('binary')
            )
            .addProperty(new SchemaPropertyBuilder()
                .setDeprecated(false)
                .setName('name')
                .setType('string')
                .setMaxLength(40)
                .setMinLength(5)
                .setExample('Arthur van Leeuwen')
            )

        expect(schema.toJSON()).toEqual(
            {
                name: 'Test',
                type: 'object',
                ref: '#/components/test',
                properties: {
                    test: {
                        format: 'binary',
                        minLength: 2,
                        enum: [1, 2],
                        deprecated: true,
                        type: 'integer'
                    },
                    name: {
                        maxLength: 40,
                        minLength: 5,
                        example: 'Arthur van Leeuwen',
                        type: 'string',
                        deprecated: false
                    }
                }
            }
        )
    })
})