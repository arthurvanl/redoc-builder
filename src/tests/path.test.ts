import { describe, expect, test } from "vitest";
import { ComponentResponseBuilder } from "../builders/ComponentResponse.js";
import { ContentBuilder } from "../builders/Content.js";
import { PathBuilder, PathOperationBuilder } from "../builders/Path.js";
import { SchemaBuilder } from "../builders/Schema.js";

describe('Path test Builder', () => {

    test('Expected to build PathItem with an PathOperation', () => {

        const path = new PathBuilder()
        .setPath('/pets')
        .setDescription('Pet endpoints with several operations public.')
        .setSummary('Pet endpoints')
        .addOperation(new PathOperationBuilder()
            .setType('get')
            .setDescription('Returns pets based on ID')
            .setSummary('Find pets by ID')
            .setOperationId('getPetsById')
            .setDeprecated()
            .addTag('pet')
            .addResponse(new ComponentResponseBuilder()
                .setName('200')
                .setDescription('pet response')
                .addContent(new ContentBuilder()
                    .setName('*/*')    
                    .setSchema(new SchemaBuilder()
                        .setType('array')
                        .setItems('#/components/schemas/Pet')
                    )
                )
            )
            .addResponse(new ComponentResponseBuilder()
                .setName('default')
                .setDescription('error payload')
                .addContent(new ContentBuilder()
                    .setName('text/html')
                    .setSchema(new SchemaBuilder()
                        .setRef('#/components/schemas/ErrorModel')
                    )
                )
            )
        );

        expect(path.toJSON()).toEqual({
            path: '/pets',
            description: 'Pet endpoints with several operations public.',
            summary: 'Pet endpoints',
            get: {
                description: 'Returns pets based on ID',
                summary: 'Find pets by ID',
                operationId: 'getPetsById',
                deprecated: true,
                tags: ['pet'],
                responses: {
                    '200': {
                        description: 'pet response',
                        content: {
                            '*/*': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Pet'
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'error payload',
                        content: {
                            'text/html': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorModel'
                                }
                            }
                        }
                    }
                }
            }
        })
    });
});