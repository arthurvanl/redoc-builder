import { InfoBuilder } from "@/index";
import { describe, expect, test } from "bun:test";

describe('Testing info builder', () => {

    const info = new InfoBuilder()
    .setTitle("Skyraid MC Discord bot Rest API")
    .setVersion('1.0.x')
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

    test('Expecting correct JSON format', () => {

        expect(info.toJSON()).toEqual({
            title: "Skyraid MC Discord bot Rest API",
            version: '1.0.x',
            description: "This is an example of how the builders could work inside your code work.",
            contact: {
                name: "Support Team",
                url: "https://mintymedia.nl/contact",
                email: "info@arthurvanl.nl"
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            },
            "x-logo": {
                url: "https://dev.mintycloud.nl/images/logo.png",
                backgroundColor: "#FFFFFF",
                altText: "Winstore Image API"
            }
        })
    });
});