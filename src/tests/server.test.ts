import { describe, expect, test } from "vitest";
import { ServerBuilder, ServerVariableBuilder } from "../builders/Server.js";

describe('Server test builder', () => {

    test('Expected to build Server with server variables', () => {

        const server = new ServerBuilder()
        .setUrl('http://{project}.v150.mintyserver.nl')
        .setDescription('A powerful API!')
        .addVariable(new ServerVariableBuilder()
            .setName('project')
            .setDefault('winstore-image')
            .setDescription('The project name')
            .addEnum('woocommerce')
            .addEnum('winstore-image')
        )

        expect(server.toJSON()).toEqual({
            url: 'http://{project}.v150.mintyserver.nl',
            description: 'A powerful API!',
            variables: {
                project: {
                    default: 'winstore-image',
                    description: 'The project name',
                    enum: ['woocommerce', 'winstore-image']
                }
            }
        })
    })
})