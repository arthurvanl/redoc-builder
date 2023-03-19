import { describe, expect, test } from "vitest";
import { TagGroupBuilder } from "../builders/TagGroupBuilder.js";

describe('TagGroup test builder', () => {

    test('Expected to build TagGroup', () => {

        const tagGroup = new TagGroupBuilder()
        .setName('Customers')
        .setTags([
            'Customers',
            'Customer Authentication',
            'AML',
            'Customers Timeline'
        ]);

        expect(tagGroup.toJSON()).toEqual({
            name: 'Customers',
            tags: [
                'Customers',
                'Customer Authentication',
                'AML',
                'Customers Timeline'
            ]
        })
    });
});