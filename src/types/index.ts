import { SchemaObjectBuilder, SchemaReferenceBuilder, SchemaSecurityBuilder, SchemaStringBuilder } from "../builders/schema";

export type Info = Readonly<{
    title: string;
    //* The api version for this redoc documentation.
    version: string;
    description?: string;
    contact: InfoContact;
    license?: InfoLicense;
    logo: InfoLogo;
}>

export type InfoContact = Readonly<{
    name: string;
    url: string;
    email: string;
}>

export type InfoLicense = Readonly<{
    name: string;
    //// identifier: string;
    url: string;
    //// email: string;
}>

export type InfoLogo = Readonly<{
    url: string;
    bg_color: `#${string}`;
    alt_text: string;
}>

export type Server = Readonly<{
    url: string;
    description: string;
    // variables: ServerVariable[]
}>

//! export type ServerVariable = Readonly<{
//!     name: string;
//!     default: string;
//!     description: string;
//!     enums: string[];
//! }>

export type Path = Readonly<{
    path: `/${string}`;
    operations: PathOperation[]
}>

export type PathOperation = Readonly<{
    tags: string[];
    type: PathOperationType;
    summary: string;
    description: string;
    operationId: string;
    request_body: RequestBody;
    // external_docs: any;
    parameters: Parameter[];
    responses: Response[];
    deprecated?: boolean;
}>

export enum PathOperationType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    OPTIONS = "options",
    HEAD = "head",
    PATCH = "patch",
    TRACE = "trace"
}

export enum ReferenceType {
    Security = 'securitySchemes',
    Schema = 'schemas',
    Request = 'requests',
    Response = 'responses'
}
export type Reference = `#/components/${ReferenceType}/${string}`

export type Schema = Readonly<SchemaObject | SchemaReference | SchemaString | SchemaSecurity>;

export type SchemaBuilderType<Type extends SchemaType> = 
    Type extends SchemaType.Object ? SchemaObjectBuilder 
    : Type extends SchemaType.String ? SchemaStringBuilder
    : Type extends SchemaType.Security ? SchemaSecurityBuilder
    : Type extends SchemaType.Reference | SchemaType.ItemReference ? SchemaReferenceBuilder
    : never;

export enum SchemaType {
    /** Wether the schema is for a new schema (no reference) */
    Object = "object",
    /** Wether the schema is for a string scheme */
    String = "string",
    /** Wether the schema is for a security scheme */
    Security = "security",
    /** Wether the schema is for an object */
    Reference = "reference",
    /** Wether the schema is for an array */
    ItemReference = "item-reference"
}

export type SchemaObject = {
    key_name: string;
    type: SchemaType.Object,
    required?: string[];
    properties: SchemaProperty[]; 
}

export type SchemaReference = Readonly<{
    key_name: string;
    type: SchemaType.Reference | SchemaType.ItemReference
    ref: Reference;
}>

export type SchemaString = Readonly<{
    key_name: string;
    type: SchemaType.String
}> & Omit<SchemaProperty, "type" | "name" | "title" | "description" | "writeOnly" | "readOnly">

export type SchemaSecurity = Readonly<{
    type: SchemaType.Security,
    style: SchemaSecurityStyle //! type,
    in: ParameterIn
    name: string;
    key_name: string;
    description: string;
    scheme: string;
    bearer_format: string; //! bearerFormat
    tag: string; //! x-linkTo
}>

export enum SchemaSecurityStyle {
    ApiKey = 'apiKey',
    Http = 'http',
    MutualTls = 'mutualTLS',
    Oauth2 = 'oauth2',
    OpenIdConnect = 'openIdConnect'
}

export enum SchemaSecurityIn {
    Header = 'header',
    Query = 'query',
    Cookie = 'cookie'
}

export type SchemaProperty = Readonly<{
    //* reserved key for the object key name for this property
    name: string;
    type: SchemaPropertyType;
    array_type?: Exclude<SchemaPropertyType, SchemaPropertyType.Array> //!items.schema.type
    format?: SchemaPropertyFormatType;
    title?: string;
    description?: string;
    maximum?: number;
    minimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    readOnly?: boolean;
    writeOnly?: boolean;
    enum?: (string | number)[];
    example?: any;
    deprecated?: boolean;
    // * reserved key and only used when type is "array"
    ref?: Reference //! items.$ref
}>

export enum SchemaPropertyType {
    String = "string",
    Integer = "integer",
    Number = "number",
    Boolean = "boolean",
    Object = "object",
    Array = "array"
}

export enum SchemaPropertyFormatType {
    Empty = "",
    Byte = "byte",
    Binary = "binary",
    Date = "date",
    DateTime = "date-time",
    Password = "password",
    Int32 = "int32",
    Int64 = "int64",
    Float = "float",
    Double = "double",
    Email = "email",
    Uuid = "uuid",
    Ipv4 = "ipv4",
    Ipv6 = "ipv6",
    Uri = "uri"
}

export type RequestBody = Readonly<{
    description: string;
    //* No effect on response schemas
    required?: boolean;
    schema: Schema & {
        //* will be used when schema is added in "request_body" or "responses"
        readonly media_type: string;
    }
}>

export type Response = RequestBody & {code: string};

export type Parameter = Readonly<{
    in: ParameterIn;
    empty?: boolean; //! allowEmptyValue for toJSON
    style?: ParameterStyle;
    explode?: boolean;
    reserved?: boolean; //! allowReserved for toJSON
    schema: Schema;
} & Omit<SchemaProperty, "type" | "title" | "format" | "maxLength" | "minLength" | "pattern" | "readOnly" | "writeOnly">>

export enum ParameterIn {
    Query = "query",
    Header = "header",
    Path = "path",
    cookie = "cookie"
}

export enum ParameterStyle {
    Form = "form",
    Simple = "simple",
    Label = "label",
    Matrix = "matrix",
    SpaceDelimited = "spaceDelimited",
    PipeDelimited = "pipeDelimited",
    DeepObject = "deepObject"
}

export type Tag = {
    name: string;
    display: string; //! x-displayName
    description: string;
}

export type TagGroup = {
    name: string;
    tags: string[];
}

export type RemoveFunctions<T> = Pick<T, {
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]>

export enum DefinitionKind {
    Length = "length",
    Min = "min",
    Max = "max",
    Email = "email",
    Uuid = "uuid",
    Url = "url",
    Regex = "regex",
    Trim = "trim",
    Includes = "includes",
    ToLowerCase = "toLowerCase",
    ToUpperCase = "toUpperCase",
    StartsWith = "startsWith",
    EndsWith = "endsWith",
    Datetime = "datetime",
    Ip = "ip",
    Int = 'int',
}

export type Check = {
    kind: DefinitionKind.Regex
    regex: RegExp;
    message?: string;
} | {
    kind: DefinitionKind.Ip,
    version: 'v4' | 'v6',
    message?: string;
} | {
    kind: Exclude<DefinitionKind, DefinitionKind.Regex | DefinitionKind.Ip>;
    value: any;
    message?: string;
}