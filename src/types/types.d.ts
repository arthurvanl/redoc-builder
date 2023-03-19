import { RequestBodyBuilder } from "../builders/RequestBody.js";
import { SchemaBuilder } from "../builders/Schema.js";

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
    readonly type: SchemaType;
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

export interface Content {
    readonly name: string;
    readonly schema: SchemaBuilder;
    readonly example?: any;
    readonly examples?: any;
    // encoding?: not going to use this property yet...
}

export interface RequestBody {
    readonly description?: string;
    readonly content: Content[];
    readonly required?: boolean;
}

export type ParameterIn = "query" | "header" | "path" | "cookie";
export type ParameterStyle = 'form' | 'simple' | 'label' | 'matrix' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';

export type Parameter = {
    readonly in: ParameterIn;
    readonly allowEmptyValue?: boolean;
    readonly style?: ParameterStyle;
    readonly explode?: boolean;
    readonly allowReserved?: boolean;
    readonly schema?: SchemaBuilder;
    readonly content: Content[];
    readonly examples?: any;
    readonly required?: boolean;
} & Omit<SchemaProperty, "type" | "title" | "format" | "maxLength" | "minLength" | "pattern" | "readOnly" | "writeOnly">

export interface ComponentResponse {
    readonly name: string;
    readonly description: string;
    /**
     * @todo NOT FULLY IMPLEMENTED YET
     * @link https://redocly.com/docs/openapi-visual-reference/header/
     */
    readonly headers?: any; 
    readonly content: Content[];
    /**
     * @todo NOT IMPLEMENTED YET
     * @link https://redocly.com/docs/openapi-visual-reference/links/
     */
    readonly links?: any;
}

export type PathMethod = "get" | "post" | "put" | "delete" | "options" | "head" | "patch" | "trace";

export interface PathItem {
    readonly path: string;
    /**
     * @argument - This will not be used since we're using the pathbuilder inside endpoints
     */
    readonly '$ref'?: string; 
    readonly summary: string;
    readonly description: string;
    readonly get?: PathOperation;
    readonly post?: PathOperation;
    readonly put?: PathOperation;
    readonly delete?: PathOperation;
    readonly options?: PathOperation;
    readonly head?: PathOperation;
    readonly patch?: PathOperation;
    readonly trace?: PathOperation;
    /**
     * @todo NOT IMPLEMENTED
     * @description
     * We're using servers globally and not per path item
     * @link https://redocly.com/docs/openapi-visual-reference/servers/
     */
    readonly servers?: any;
    readonly parameters: Parameter[];
}

export interface PathOperation {
    readonly tags: string[];
    readonly type: PathMethod;
    readonly summary: string;
    readonly description: string;
    readonly operationId: string;
    readonly externalDocs?: ExternalDocs;
    readonly parameters: Parameter[];
    readonly requestBody?: RequestBodyBuilder;
    readonly responses: ComponentResponse[];
    /**
     * @todo NOT IMPLEMENTED YET
     * @link https://redocly.com/docs/openapi-visual-reference/callbacks/
     */
    readonly callback?: any;
    readonly deprecated?: boolean;
    /**
     * @todo NOT IMPLEMENTED
     * @description
     * We're using security schemes only once in every docs. 
     * This won't implemented since we don't really need it.
     * @link https://redocly.com/docs/openapi-visual-reference/security/
     */
    readonly security?: any;
    /**
     * @todo NOT IMPLEMENTED
     * @description
     * We're using servers globally and not per path item
     * @link https://redocly.com/docs/openapi-visual-reference/servers/
     */
    readonly servers?: any;
}

export interface ExternalDocs {
    readonly url: string;
    readonly description?: string;
}