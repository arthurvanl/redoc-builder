import { ExternalDocs, Tag } from "../types/types.js";

export class TagBuilder implements Tag {
    readonly name!: string;
    readonly description!: string;
    readonly 'x-displayName'?: string | undefined;
    readonly externalDocs?: ExternalDocs | undefined;

    public constructor(data?: Tag) {
        
        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public setXDisplayName(XDisplayName: string) {

        Reflect.set(this, 'x-displayName', XDisplayName);

        return this;
    }

    public toJSON(): any {

        return {
            name: this.name,
            description: this.description,
            'x-displayName': this["x-displayName"]
        }
    }
}