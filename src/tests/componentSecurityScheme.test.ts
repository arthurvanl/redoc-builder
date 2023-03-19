import { describe, expect, test } from "vitest";
import { ComponentSecuritySchemeBuilder } from "../builders/ComponentSecurityScheme.js";

describe('ComponentSecurityScheme test builder', () => {

    test('Expected to build ComponentSecurityScheme', () => {

        const securityScheme = new ComponentSecuritySchemeBuilder()
        .setSecurityName('Basic')
        .setType('apiKey')
        .setDescription('Use the API key that has been set in the .env file')
        .setName('Authorization')
        .setIn('header')
        .setXLinkTo('tag/Authentication')

        expect(securityScheme.toJSON()).toEqual({
            securityName: 'Basic',
            type: 'apiKey',
            description: 'Use the API key that has been set in the .env file',
            name: 'Authorization',
            in: 'header',
            'x-linkTo': 'tag/Authentication'
        })
    });
});