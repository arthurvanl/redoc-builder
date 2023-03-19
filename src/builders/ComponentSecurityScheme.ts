import { ParameterIn, SecurityScheme, SecuritySchemeType } from "../types/types.js";

export class ComponentSecuritySchemeBuilder implements SecurityScheme {
    readonly securityName!: string;
    readonly type!: SecuritySchemeType;
    readonly description?: string;
    readonly name!: string;
    readonly in!: Omit<ParameterIn, "path">;
    readonly scheme!: string;
    readonly bearerFormat?: string;
    readonly flows?: any;
    readonly openIdConnectUrl?: string;
    readonly xLinkTo?: string;

    public constructor(data?: SecurityScheme) {

        Object.assign(this, data);
    }
    
    /**
     * Sets the securityName of this component security scheme
     * 
     * This property is used for defining the component security scheme object key
     * 
     * @param securityName - The securityName for this scheme
     */
    public setSecurityName(securityName: string) {

        Reflect.set(this, 'securityName', securityName);
        return this;
    }

    public setType(type: SecuritySchemeType) {
        
        Reflect.set(this, 'type', type);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setIn(_in: Omit<ParameterIn, "path">) {

        Reflect.set(this, 'in', _in);
        return this;
    }

    public setScheme(scheme: string) {

        Reflect.set(this, 'scheme', scheme);
        return this;
    }

    public setBearerFormat(bearerFormat: string) {

        Reflect.set(this, 'bearerFormat', bearerFormat);
        return this;
    }

    public setOpenIdConnectUrl(openIdConnectUrl: string) {

        Reflect.set(this, 'openIdConnectUrl', openIdConnectUrl);
        return this;
    }

    public setXLinkTo(xLinkTo: string) {

        Reflect.set(this, 'xLinkTo', xLinkTo);
        return this;
    }

    public toJSON(): any {

        return {
            securityName: this.securityName,
            type: this.type,
            description: this.description,
            name: this.name,
            in: this.in,
            scheme: this.scheme,
            bearerFormat: this.bearerFormat,
            openIdConnectUrl: this.openIdConnectUrl,
            'x-linkTo': this.xLinkTo
        }
    }
}