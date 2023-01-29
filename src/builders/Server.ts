import type { ServerVariable } from "../types/types.js";

export class ServerVariableBuilder implements ServerVariable {
    
    public readonly default!: string;
    public readonly description?: string;
    public readonly enum?: string[];

    public constructor(data?: ServerVariable) {

        Object.assign(this, data);
    }

    public setDefault(_default: string) {

        Reflect.set(this, 'default', _default);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public addEnum(_enum: string) {

        this.enum?.findIndex((x) => x == _enum) == -1 ? this.enum.push(_enum) : null;
        return this;
    }
}