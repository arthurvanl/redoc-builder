[![.github/workflows/publish.yml](https://github.com/arthurvanl/redoc-builder/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/arthurvanl/redoc-builder/actions/workflows/publish.yml)

# [Redoc Builder](https://npmjs.com/package/redoc-builder)

A powerful tool for building OpenAPI documentation. This will allow you to build a single page documentation for your API. All endpoints or paths can be added to the documentation by using the builders provided by this package. This tool does **NOT** support **CommonJS**

# Table of contents

- [Installation](#installation)
- [Example](#example)
- [Using Zod Schemas](#using-zod-schemas)
    - [Zod Schema Parsing](#zod-schema-parsing)
    - [Example](#examples)

## Installation
*actually only tested in `bun`*
```bash
npm install --save redoc-builder
bun i redoc-builder
pnpm add redoc-builder
yarn add redoc-builder
```

## Example

```ts
// index.ts

import { ParameterIn, PathOperationType, RedocBuilder, SchemaPropertyFormatType, SchemaSecurityBuilder, SchemaSecurityStyle, SchemaType } from "redoc-builder";

const specification = new RedocBuilder()
.setVersion('3.1.0')
.setInfo((info) => 
    info.setTitle("Skyraid MC Discord bot Rest API")
    .setDescription("This is an example of how the builders could work inside your code work.")
    .setContact((contact) =>
        contact.setName('Support Team')
        .setUrl('https://mintymedia.nl/contact')
        .setEmail('info@arthurvanl.nl')
    )
    .setLogo((logo) => 
        logo.setUrl('https://dev.mintycloud.nl/images/logo.png')
        .setBackgroundColor('#FFFFFF')
        .setAltText('Winstore Image API')
    )
    .setLicense((license) => 
        license.setName('MIT')
        .setUrl('https://opensource.org/licenses/MIT')
    )
)
// .setSchemas(await parseSchemas())
.setSchemas([new SchemaSecurityBuilder()
    .setKeyName('Basic')
    .setName('Authorization')
    .setStyle(SchemaSecurityStyle.ApiKey)
    .setDescription('Use the API key that has been set in the .env file')
    .setLocation(ParameterIn.Header)
    // .setTag('tag/Authentication')
])
.addPath((path) => 
    path.setPath('/mc/link/{playerUUID}')
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
            response.setCode(200)
            .setDescription('API Success Response')
            // .setSchema(SchemaType.Object, new SchemaObjectBuilder(util.parseSchema(linked_userSchema, 'Testing')))
            .setSchema(SchemaType.ItemReference, (builder) => builder.setRef('#/components/schemas/LinkedUser'))
            .setMediaType('application/json')
        )
    )
)
.setTags((tag) => tag.setName('Minecraft').setDisplay('Minecraft Endpoints').setDescription('Testing!'))
.setTagGroups({name: 'API', tags: ['Minecraft']})
```

## Using zod schemas

The following code requires a few things:
 - Must have a folder called `schemas` with files that export the schema.
 - Only schema objects will be parsed.

Example schema:

```ts
import { z } from "zod"
export const private_channelSchema = z.object({
    owner_id: z.string(),
    channel_id: z.string(),
    channel_updated_at: z.coerce.date().default(new Date())
});

export type PrivateChannel = z.infer<typeof private_channelSchema>;
```

### Zod Schema Parsing

Only a specific amount of zod types are being used:
 - ZodString
 - ZodNumber
 - ZodDate
 - ZodArray
 - ZodEffects
 - ZodEnum

A set of zod `kinds` are used (or ignored):
- Length
- Min
- Max
- Email
- Uuid
- Url
- Regex
- Trim
- Includes
- ToLowerCase
- ToUpperCase
- StartsWith
- EndsWith
- Datetime
- Ip
- Int

This schema would be added in the openapi specification as:
```json
{ 
    "PrivateChannel": {
        "type": "object",
        "required": [
            "owner_id",
            "channel_id"
        ],
        "properties": {
            "owner_id": {
                "type": "string"
            },
            "channel_id": {
                "type": "string"
            },
            "channel_updated_at": {
                "type": "string",
                "format": "date-time"
            }
        }
    }
}
```

### Examples

Example made in [Bun](https://bun.sh/)
```ts

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync } from "node:fs";
import { RedocBuilder, RedocUtils } from 'redoc-builder';


/**
 * @param str - The schema name
 */
const capitalizeFirstLetter = (str: string) => str.replace(/^[a-zA-Z]|_[a-zA-Z]?/g, (match) => match.replace("_", "").toUpperCase())

const parseSchemas = async () => {

    const util = new RedocUtils();

    const schemas: SchemaObject[] = [];

    const root = dirname(fileURLToPath(import.meta.url));

    /** Resolving schema paths from "schemas" folder */
    const files = readdirSync(`${root}/../schemas`).filter(
        (f) => f.endsWith('.ts') || f.endsWith('.js')
    );

    for(const file of files) {

        const schema = await import(`../schemas/${file}`);
        const keys = Object.keys(schema);

        const name = capitalizeFirstLetter(keys[0]).replace('Schema', '');
        schemas.push(util.parseSchema(schema[keys[0]] as ZodObject<any>, name))
    }

    return schemas;
}

// Now use this function for the specification

const specification = new RedocBuilder()
.setSchemas(await parseSchemas()) // done

```

Have fun :)