export interface Info {
    readonly title: string;
    readonly version: string
    readonly description?: string;
    readonly summary?: string;
    readonly termsOfService?: string
    readonly contact?: InfoContact;
    readonly license?: InfoLicense;
    readonly xLogo?: InfoXLogo;
}

export interface InfoContact {
    readonly name?: string;
    readonly url?: string;
    readonly email?: string;
}

export interface InfoLicense {
    readonly name: string;
    readonly identifier?: string;
    readonly url?: string;
    readonly email?: string;
}

export interface InfoXLogo {
    readonly name?: string;
    readonly backgroundColor?: string;
    readonly altText?: string;
    readonly href?: string;
}

export interface Server {
    readonly url: string;
    readonly description?: string;
    readonly variables: ServerVariable[];
}

export interface ServerVariable {
    readonly name: string;
    readonly default: string;
    readonly description?: string;
    readonly enum: string[];
}

export type SchemaType = 'string' | 'integer' | 'number' | 'object' | 'array' | 'null';
export type SchemaFormatType = "" | "byte" | "binary" | "date" | "date-time" | "password" | "int32" | "int64" | "float" | "double";

export type Schema = {
    readonly name: string;
    readonly type?: SchemaType;
    readonly ref?: string;
    readonly items: {ref: string};
    readonly properties: SchemaProperty[];
    readonly required?: string[];
    readonly example?: any;
};

export type SchemaProperty = {
    readonly propertyType: SchemaType;
    readonly name: string;
    readonly description?: string;
    readonly title?: string;
    readonly format?: SchemaFormatType
    readonly maximum?: number;
    readonly minimum?: number;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly pattern?: string;
    readonly readOnly?: boolean;
    readonly writeOnly?: boolean;
    readonly enum: (string | number)[];
    readonly example?: any;
    readonly deprecated?: boolean;
}