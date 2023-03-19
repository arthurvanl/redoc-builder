import { describe, expect, test } from "vitest";
import { TagBuilder } from "../builders/TagBuilder.js";

describe('Tag test builder', () => {

    test('Expected to build a tag', () => {

        const tag = new TagBuilder()
        .setName('FtpUsers')
        .setDescription('There are endpoints for creating, deleting or getting ftp users.')
        .setXDisplayName('FTP Users')

        expect(tag.toJSON()).toEqual({
            name: 'FtpUsers',
            description: 'There are endpoints for creating, deleting or getting ftp users.',
            'x-displayName': 'FTP Users'
        });
    });
});