import { test, describe, expect } from "vitest";
import { InfoBuilder, InfoContactBuilder, InfoLicenseBuilder, InfoXLogoBuilder } from "../builders/Info.js";

describe('Info test builder', () => {

    test('Expected to build info object', () => {

        const info = new InfoBuilder()
            .setTitle('Winstore Images')
            .setVersion('1.0.0')
            .setDescription('Winstore Images API is an API (Application Programming Interface) for managing aca images.')
            .setSummary('This is a sample summary')
            .setTermsOfService('https://redoc.ly/subscription-agreement/')
            .setXLogo(new InfoXLogoBuilder()
                .setUrl('https://mintycloud.nl/uploads/mintyhosting-wit.png')
                .setBackgroundColor('#FFFFFF')
                .setAltText('Winstore Image API')
            )
            .setContact(new InfoContactBuilder()
                .setName('API Team')
                .setEmail('team@redocly.com')
                .setUrl('https://redocly.com/contact-us/')
            )
            .setLicense(new InfoLicenseBuilder()
                .setName('MIT')
                .setUrl('https://opensource.org/licenses/MIT')
                .setIdentifier('RFC-3986')
                .setEmail('team@redocly.com')
            )

        expect(info).toEqual({
            title: 'Winstore Images',
            version: '1.0.0',
            description: 'Winstore Images API is an API (Application Programming Interface) for managing aca images.',
            summary: 'This is a sample summary',
            termsOfService: 'https://redoc.ly/subscription-agreement/',
            contact: {
                name: 'API Team',
                url: 'https://redocly.com/contact-us/',
                email: 'team@redocly.com'
            },
            license: {
                name: 'MIT',
                identifier: 'RFC-3986',
                url: 'https://opensource.org/licenses/MIT',
                email: 'team@redocly.com'
            },
            xLogo: {
                url: 'https://mintycloud.nl/uploads/mintyhosting-wit.png',
                backgroundColor: '#FFFFFF',
                altText: 'Winstore Image API',
            }
        })
    })
})