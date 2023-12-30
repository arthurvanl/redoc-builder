import { ParameterBuilder, ParameterIn, SchemaPropertyFormatType, SchemaType } from "@/index";
import { describe, expect, test } from "bun:test";

describe('Testing parameter builder', () => {

    const parameter = new ParameterBuilder()
        .setName('playerUUID')
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

    test('Expecting correct JSON format', () => {

        expect(parameter.toJSON()).toEqual({
            description: "The minecraft player uuid\n#### Validation Errors\n- uuid must be exact 32 characters long\n\n- uuid must be a valid uuid\n- uuid without dashes `-`",
            in: ParameterIn.Path,
            schema: {
                type: SchemaType.String,
                format: SchemaPropertyFormatType.Uuid,
                maxLength: 32,
                minLength: 32,
                enum: ["ad468e72946f4238b86bc774a6e49d16"],
                example: "ad468e72946f4238b86bc774a6e49d16"
            }
        })
    })
});