import { PropertyBuilder, SchemaPropertyType } from "@/index";
import { describe, test, expect } from "bun:test";

describe('Testing property builder', () => {

    const discord_id = new PropertyBuilder()
    .setName('discord_id')
    .setType(SchemaPropertyType.String)
    .setLength(18)
    .setPattern('/^[0-9]*$/')
    .setTitle('Discord ID')
    .setDescription('A string matching a discord id.')

    test('Expected to receive discord_id property in correct JSON format', () => {

        expect(discord_id.toJSON() as any).toEqual({
            type: SchemaPropertyType.String,
            minLength: 18,
            maxLength: 18,
            pattern: '/^[0-9]*$/',
            title: 'Discord ID',
            description: 'A string matching a discord id.'
        });
    });

    const hobbies = new PropertyBuilder()
    .setName('hobbies')
    .setType(SchemaPropertyType.String)
    .setEnum(['Surfing', 'Cycling', 'Gaming'])
    .setExample('Surfing')
    .setTitle('Your Hobbies')
    .setDescription('Select multiple hobbies from the specified enum values')

    test('Expected to receive hobbies property in correct JSON format', () => {

        expect(hobbies.toJSON() as any).toEqual({
            type: SchemaPropertyType.String,
            title: 'Your Hobbies',
            description: 'Select multiple hobbies from the specified enum values',
            enum: ['Surfing', 'Cycling', 'Gaming'],
            example: 'Surfing'
        })

    });
});