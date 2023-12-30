import { PropertyBuilder } from "@/builders/property";
import { RedocUtils } from "@/builders/utils";
import { SchemaObject, SchemaType, SchemaProperty, SchemaString, SchemaPropertyFormatType, SchemaReference, Reference, SchemaSecurity, SchemaSecurityStyle, ParameterIn } from "@/types";

export class SchemaObjectBuilder extends RedocUtils implements SchemaObject {
    readonly key_name!: string;
    readonly type = SchemaType.Object;
    readonly required!: string[];
    readonly properties: SchemaProperty[] = [];

    public constructor(data?: SchemaObject) {
        super();

        this.addProps(data);
    }

    public setKeyName(key_name: string) {
        Reflect.set(this, 'key_name', key_name);
        return this;
    }

    public setRequired(required: string[]) {

        this.required === undefined ? Reflect.set(this, 'required', required) : this.required.push(...required);
        return this;
    }

    public addProperty(property: PropertyBuilder | ((property: PropertyBuilder) => PropertyBuilder)) {

        const result = typeof property === 'function' ? property(new PropertyBuilder()) : property;

        this.properties.findIndex((x) => x.name === property.name) === -1 ? this.properties.push(result) : null;
        return this;
    }

    public setProperties(...properties: PropertyBuilder[] | ((property: PropertyBuilder) => PropertyBuilder)[]) {

        const newProperties = Array.isArray(properties[0]) ? properties[0] : properties.map((property) => typeof property === "function" ? property(new PropertyBuilder) : property);

        Reflect.set(this, 'properties', newProperties);
        return this;
    }

    public toJSON() {
        
        return this.removeUndefinedKeys({
            type: this.type,
            required: this.required,
            properties: this.properties.reduce((properties, property) => {
                // console.log(property.array_type)
                let {array_type, name: _, ...obj}: any = property
                
                if(array_type) {
                    obj.items = {type: array_type}
                }
                return {
                    ...properties,
                    [_]: {
                        ...obj
                    }
                }
            }, {})
        })
    }
}

export class SchemaStringBuilder extends RedocUtils implements SchemaString {
    readonly key_name!: string;
    readonly type = SchemaType.String;
    readonly format?: SchemaPropertyFormatType;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly pattern?: string;
    readonly enum?: (string | number)[] = [];
    readonly example?: any;
    readonly deprecated?: boolean;

    public constructor(data?: SchemaString) {
        super();

        this.addProps(data);
    }

    public setKeyName(key_name: string) {
        Reflect.set(this, 'key_name', key_name);
        return this;
    }

    public setFormat(format: SchemaPropertyFormatType) {

        Reflect.set(this, 'format', format);
        return this;
    }

    public setMaximum(maximum: number) {

        Reflect.set(this, 'maximum', maximum);
        return this;
    }

    public setMinimum(minimum: number) {

        Reflect.set(this, 'minimum', minimum);
        return this;
    }

    public setLength(length: number) {
        
        Reflect.set(this, 'maxLength', length);
        Reflect.set(this, 'minLength', length);
        return this;
    }

    public setMaxLength(maxLength: number) {

        Reflect.set(this, 'maxLength', maxLength);
        return this;
    }

    public setMinLength(minLength: number) {

        Reflect.set(this, 'minLength', minLength);
        return this;
    }

    public setPattern(pattern: string) {

        Reflect.set(this, 'pattern', pattern);
        return this;
    }

    public addEnum(_enum: string | number) {

        this.enum?.findIndex((x) => x == _enum) == -1 ? this.enum.push(_enum) : null;
        return this;
    }

    public setEnum(enums: (string | number)[]) {

        Reflect.set(this, 'enum', enums);
        return this;
    }

    /**
     * Sets the property example. This can be of any type
     * 
     * @param example - the example of this property
     */
    public setExample(example: any) {

        Reflect.set(this, 'example', example);
        return this;
    }

    /**
     * Sets the property deprecation
     * 
     * @param deprecated - value for setting the deprecation
     * @returns 
     */
    public setDeprecated(deprecated: boolean = true) {
        
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    public toJSON() {

        return this.removeUndefinedKeys({
            type: this.type,
            format: this.format,
            maximum: this.maximum,
            minimum: this.minimum,
            maxLength: this.maxLength,
            minLength: this.minLength,
            pattern: this.pattern,
            enum: this.enum,
            example: this.example,
            deprecated: this.deprecated
        });
    }
}

export class SchemaReferenceBuilder extends RedocUtils implements SchemaReference {
    readonly key_name!: string;
    readonly type!: SchemaType.Reference | SchemaType.ItemReference;
    readonly ref!: Reference;

    public constructor(data?: SchemaReference) {
        super();

        this.addProps(data);
    }

    public setKeyName(key_name: string) {
        Reflect.set(this, 'key_name', key_name);
        return this;
    }

    public setType(type: SchemaType.Reference | SchemaType.ItemReference) {
        Reflect.set(this, 'type', type);
        return this;
    }

    public setRef(ref: Reference) {
        Reflect.set(this, 'ref', ref);
        return this;
    }

    public toJSON() {
        const obj: any = {}

        if(this.type === SchemaType.ItemReference) {
            obj.items = {
                "$ref": this.ref
            }
        } else {
            obj['$ref'] = this.ref
        }

        return this.removeUndefinedKeys(obj);
    }
}

export class SchemaSecurityBuilder extends RedocUtils implements SchemaSecurity {
    readonly type = SchemaType.Security;
    readonly style!: SchemaSecurityStyle;
    readonly name!: string;
    readonly key_name!: string;
    readonly in!: ParameterIn;
    readonly description!: string;
    readonly scheme!: string;
    readonly bearer_format!: string;
    readonly tag!: string;
    
    public constructor(data?: SchemaSecurity) {
        super();

        this.addProps(data);
    }
    
    public setStyle(style: SchemaSecurityStyle) {
        Reflect.set(this, 'style', style);
        return this;
    }

    public setKeyName(key_name: string) {
        Reflect.set(this, 'key_name', key_name);
        return this;
    }

    public setName(name: string) {
        Reflect.set(this, 'name', name);
        return this;
    }

    public setLocation(location: ParameterIn) {
        Reflect.set(this, 'in', location);
        return this;
    }

    public setDescription(description: string) {
        Reflect.set(this, 'description', description);
        return this;
    }

    public setScheme(scheme: string) {
        Reflect.set(this, 'scheme', scheme);
        return this;
    }

    public setBearerFormat(bearer_format: string) {
        Reflect.set(this, 'bearer_format', bearer_format);
        return this;
    }

    public setTag(tag: string) {
        Reflect.set(this, 'tag', tag);
        return this;
    }

    public toJSON() {

        return this.removeUndefinedKeys({
            type: this.style,
            description: this.description,
            name: this.name,
            in: this.in,
            scheme: this.scheme,
            bearerFormat: this.bearer_format,
            'x-linkTo': !this.tag ? undefined : `tag/${this.tag}`
        })
    }
}