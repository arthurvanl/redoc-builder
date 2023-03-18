import type { Info, InfoContact, InfoLicense, InfoXLogo } from "../types/types.js";

export class InfoBuilder implements Info {
    public readonly title!: string;
    public readonly version!: string
    public readonly description?: string;
    public readonly summary?: string;
    public readonly termsOfService?: string
    public readonly contact?: InfoContactBuilder;
    public readonly license?: InfoLicenseBuilder;
    public readonly xLogo?: InfoXLogoBuilder;

    public constructor(data?: Info) {

        Object.assign(this, data);
    }

    public setTitle(title: string) {

        Reflect.set(this, 'title', title);
        return this;
    }

    public setVersion(version: string) {

        Reflect.set(this, 'version', version);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public setSummary(summary: string) {

        Reflect.set(this, 'summary', summary);
        return this;
    }

    public setTermsOfService(termsOfService: string) {

        Reflect.set(this, 'termsOfService', termsOfService);
        return this;
    }

    public setContact(contact: InfoContactBuilder | ((contact: InfoContactBuilder) => InfoContactBuilder)) {

        const result = typeof contact === 'function' ? contact(new InfoContactBuilder()) : contact;

        Reflect.set(this, 'contact', result);
        return this;
    }

    public setLicense(license: InfoContactBuilder | ((license: InfoLicenseBuilder) => InfoLicenseBuilder)) {

        const result = typeof license === 'function' ? license(new InfoLicenseBuilder()) : license;

        Reflect.set(this, 'license', result);
        return this;
    }

    public setXLogo(xLogo: InfoXLogoBuilder | ((xLogo: InfoXLogoBuilder) => InfoXLogoBuilder)) {

        const result = typeof xLogo === 'function' ? xLogo(new InfoXLogoBuilder()) : xLogo;

        Reflect.set(this, 'xLogo', result);
        return this;
    }
}

export class InfoContactBuilder implements InfoContact {
    public readonly name?: string;
    public readonly url?: string;
    public readonly email?: string;

    public constructor(data?: InfoContact) {
        
        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setUrl(url: string) {
        
        Reflect.set(this, 'url', url);
        return this;
    }

    public setEmail(email: string) {

        Reflect.set(this, 'email', email);
        return this;
    }
}

export class InfoLicenseBuilder implements InfoLicense {
    public readonly name!: string;
    public readonly identifier?: string;
    public readonly url?: string;
    public readonly email?: string;

    public constructor(data?: InfoLicense) {

        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setIdentifier(identifier: string) {

        Reflect.set(this, 'identifier', identifier);
        return this;
    }

    public setUrl(url: string) {
        
        Reflect.set(this, 'url', url);
        return this;
    }

    public setEmail(email: string) {

        Reflect.set(this, 'email', email);
        return this;
    }

}

export class InfoXLogoBuilder implements InfoXLogo {
    public readonly url?: string;
    public readonly backgroundColor?: string;
    public readonly altText?: string;
    public readonly href?: string;

    public constructor(data?: InfoXLogo) {

        Object.assign(this, data);
    }

    public setUrl(url: string) {

        Reflect.set(this, 'url', url);
        return this;
    }

    public setBackgroundColor(backgroundColor: string) {

        Reflect.set(this, 'backgroundColor', backgroundColor);
        return this;
    }

    public setAltText(altText: string) {

        Reflect.set(this, 'altText', altText);
        return this;
    }

    public setHref(href: string) {

        Reflect.set(this, 'href', href);
        return this;
    }
}