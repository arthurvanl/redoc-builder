import { describe, expect, test } from "vitest";
import { ContentBuilder } from "../builders/Content.js";
import { ParameterBuilder } from "../builders/Parameter.js";
import { SchemaBuilder, SchemaPropertyBuilder } from "../builders/Schema.js";

describe('Parameter test builder', () => {

    test('Expected to build a parameter with 2 properties', () => {

        const parameter = new ParameterBuilder()
        .setIn('path')
        .setName('username')
        .setAllowEmptyValue(false)
        .setDeprecated(false)
        .setRequired()
        .setDescription('The username for the information')
        .setStyle('simple')
        .setExplode(false)
        .setMaximum(1)
        .setSchema(new SchemaBuilder()
            .setType('string')
        )
        .addEnum('arthur')
        .addEnum('xirby')
        .addContent(new ContentBuilder()
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
        )

        expect(parameter.toJSON()).toEqual({
            in: 'path',
            name: 'username',
            allowEmptyValue: false,
            allowReserved: undefined,
            example: undefined,
            examples: undefined,
            deprecated: false,
            required: true,
            description: 'The username for the information',
            style: 'simple',
            explode: false,
            maximum: 1,
            schema: {
                name: undefined,
                type: 'string'
            },
            enum: ['arthur', 'xirby'],
            content: {
                'application/json': {
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
                }
            }
        })
    });
});