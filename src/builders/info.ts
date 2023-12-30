import { RedocUtils } from "@/builders/utils";
import { Info, InfoContact, InfoLicense, InfoLogo } from "@/types";

export class InfoBuilder extends RedocUtils implements Info {
    readonly title!: string;
    readonly version!: string;
    readonly description?: string;
    readonly contact!: InfoContact
    readonly license?: InfoLicense
    readonly logo!: InfoLogo

    constructor(data?: Info) {
        super();

        this.addProps(data);
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

    public setContact(contact: ContactBuilder | ((contact: ContactBuilder) => ContactBuilder)) {
        
        const result = typeof contact === 'function' ? contact(new ContactBuilder()) : contact;
        
        Reflect.set(this, 'contact', result.getProps(result));
        return this;
    }

    public setLicense(license: LicenseBuilder | ((license: LicenseBuilder) => LicenseBuilder)) {

        const result = typeof license === 'function' ? license(new LicenseBuilder()) : license;

        Reflect.set(this, 'license', result.getProps(result));
        return this;
    }

    public setLogo(logo: LogoBuilder | ((logo: LogoBuilder) => LogoBuilder)) {

        const result = typeof logo === 'function' ? logo(new LogoBuilder()) : logo;

        Reflect.set(this, 'logo', result.getProps(result));
        return this;
    }

    public toJSON() {

        return this.removeUndefinedKeys({
            title: this.title,
            version: this.version,
            description: this.description,
            contact: this.removeUndefinedKeys({
                name: this.contact.name,
                url: this.contact.url,
                email: this.contact.email
            }),
            license: this.removeUndefinedKeys({
                name: this.license?.name,
                url: this.license?.url
            }),
            "x-logo": this.removeUndefinedKeys({
                url: this.logo.url,
                backgroundColor: this.logo.bg_color,
                altText: this.logo.alt_text   
            })
        });
    }
}

class ContactBuilder extends RedocUtils implements InfoContact {
    readonly name!: string;
    readonly url!: string;
    readonly email!: string;

    public constructor(data?: InfoContact) {
        super();

        this.addProps(data)
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

class LicenseBuilder extends RedocUtils implements InfoLicense {
    readonly name!: string;
    readonly url!: string;  

    public constructor(data?: InfoLicense) {
        super()
        this.addProps(data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setUrl(url: string) {

        Reflect.set(this, 'url', url);
        return this;
    }
}

class LogoBuilder extends RedocUtils implements InfoLogo {
    readonly url!: string;
    readonly bg_color!: `#${string}`;
    readonly alt_text!: string;

    public constructor(data?: InfoLicense) {
        super()
        this.addProps(data);
    }

    public setUrl(url: string) {

        Reflect.set(this, 'url', url);
        return this;
    }

    public setBackgroundColor(color: `#${string}`) {

        Reflect.set(this, 'bg_color', color);
        return this;
    }

    public setAltText(text: string) {

        Reflect.set(this, 'alt_text', text);
        return this;
    }
}