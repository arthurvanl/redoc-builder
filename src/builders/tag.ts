import { RedocUtils } from "./utils";
import { Tag } from "../types";

export class TagBuilder extends RedocUtils implements Tag {
    readonly name!: string;
    readonly display!: string;
    readonly description!: string;

    public constructor(data?: Tag) {
        super();

        this.addProps(data);
    }

    public setName(name: string) {
        Reflect.set(this, 'name', name);
        return this;
    }

    public setDisplay(display: string) {
        Reflect.set(this, 'display', display);
        return this;
    }

    public setDescription(description: string) {
        Reflect.set(this, 'description', description);
        return this;
    }

    public toJSON() {
        return this.removeUndefinedKeys({
            name: this.name,
            'x-displayName': this.display,
            description: this.description
        })
    }
}