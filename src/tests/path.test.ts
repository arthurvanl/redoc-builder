import { ParameterIn, PathBuilder, PathOperationType, SchemaPropertyFormatType, SchemaPropertyType, SchemaType } from "@/index";
import { describe, expect, test } from "bun:test";

describe('Testing path builder', () => {

    const path = new PathBuilder()
    .setPath('/mc/link/{playerUUID}')
    .setOperations((operation) => 
        operation.addTag('Minecraft')
        .setType(PathOperationType.GET)
        .setSummary("Get a linked user by it's minecraft uuid")
        .setDescription('Get data from a minecraft uuid.')
        .setOperationId('get-link-player')
        .setParameters((parameter) => 
            parameter.setName('playerUUID')
            .setLocation(ParameterIn.Path)
            .setRequired()
            .setDescription("The minecraft player uuid\n#### Validation Errors\n- uuid must be exact 32 characters long\n\n- uuid must be a valid uuid\n- uuid without dashes `-`")
            .setSchema(SchemaType.String, (builder) => 
                builder.setExample('ad468e72946f4238b86bc774a6e49d16')
                .setMaxLength(32)
                .setMinLength(32)
                .setFormat(SchemaPropertyFormatType.Uuid)
                .setEnum(['ad468e72946f4238b86bc774a6e49d16'])
            )
        )
        .setResponses((response) => 
        /** could also be a string */
        response.setCode(200)
            .setDescription('API Success Response')
            // .setSchema(SchemaType.Object, new SchemaObjectBuilder(util.parseSchema(linked_userSchema, 'Testing')))
            .setSchema(SchemaType.ItemReference, (builder) => builder.setRef('#/components/schemas/LinkedUser'))
            .setMediaType('application/json')
        )
    )

    test('Expecting correct JSON format', () => {

        expect(path.toJSON()).toEqual({
            "/mc/link/{playerUUID}": {
                get: {
                    tags: ["Minecraft"],
                    summary: "Get a linked user by it's minecraft uuid",
                    description: "Get data from a minecraft uuid.",
                    operationId: "get-link-player",
                    requestBody: { content: {} },
                    parameters: [
                        {
                            description: "The minecraft player uuid\n#### Validation Errors\n- uuid must be exact 32 characters long\n\n- uuid must be a valid uuid\n- uuid without dashes `-`",
                            in: ParameterIn.Path,
                            schema: {
                                type: SchemaPropertyType.String,
                                format: SchemaPropertyFormatType.Uuid,
                                minLength: 32,
                                maxLength: 32,
                                enum: ['ad468e72946f4238b86bc774a6e49d16'],
                                example: 'ad468e72946f4238b86bc774a6e49d16'
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: "API Success Response",
                            content: {
                                "application/json": {
                                    schema: {
                                        items: { $ref: "#/components/schemas/LinkedUser" }
                                    }
                                }
                            }
                        }
                    }
                }
            }   
        })
    })
})