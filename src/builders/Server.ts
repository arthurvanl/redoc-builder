import type { Server, ServerVariable } from "../types/types.js";

export class ServerBuilder implements Server {

    public readonly url!: string;
    public readonly description?: string;
    public readonly variables: ServerVariable[] = [];

    public constructor(data?: Server) {

        Object.assign(this, data);
    }

    public setUrl(url: string) {

        Reflect.set(this, 'url', url);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public addVariable(variable: ServerVariable | ((variable: ServerVariableBuilder) => ServerVariableBuilder)) {

        const result = typeof variable === 'function' ? variable(new ServerVariableBuilder()) : variable;

        this.variables.findIndex((x) => x.name == result.name) == -1 ? this.variables.push(result) : null;

        return this;
    }

    public toJSON() {

        return {
            url: this.url,
            description: this.description,
            variables: this.variables.reduce((variables, variable) => (
                {
                    ...variables, 
                    [variable['name']]: {
                        default: variable.default, 
                        description: variable.description, 
                        enum: variable.enum
                    }
                }
            ), {})
        }
    }
}

export class ServerVariableBuilder implements ServerVariable {

    public readonly name!: string;
    public readonly default!: string;
    public readonly description?: string;
    public readonly enum: string[] = [];

    public constructor(data?: ServerVariable) {

        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
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