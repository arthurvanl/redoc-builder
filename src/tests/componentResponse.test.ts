import { describe, expect, test } from "vitest";
import { ComponentResponseBuilder } from "../builders/ComponentResponse.js";
import { ContentBuilder } from "../builders/Content.js";
import { SchemaBuilder, SchemaPropertyBuilder } from "../builders/Schema.js";

describe('ComponentResponse test builder', () => {

    test('Expected to build ComponentResponse with GET method', () => {

        const component = new ComponentResponseBuilder()
        .setName('200')
        .setDescription('Success')
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
        );

        expect(component.toJSON()).toEqual({
            name: '200',
            description: 'Success',
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
})