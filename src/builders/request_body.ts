import { SchemaObjectBuilder, SchemaStringBuilder, SchemaSecurityBuilder, SchemaReferenceBuilder } from "./schema";
import { RedocUtils } from "./utils";
import { RequestBody, Schema, SchemaType, SchemaBuilderType } from "../types";

export class RequestBodyBuilder extends RedocUtils implements RequestBody {
    readonly description!: string;
    readonly required?: boolean;
    readonly schema: Schema & { readonly media_type: string; } = {} as Schema & { readonly media_type: string; } ;

    public constructor(data?: RequestBody) {
        super()

        this.addProps(data);
    }

    public setDescription(description: string) {
        Reflect.set(this, 'description', description);
        return this;
    }

    public setRequired(required = true) {
        Reflect.set(this, 'required', required);
        return this;
    }

    public setMediaType(media_type: string) {

        if (!this.schema) {
            Reflect.set(this, 'schema', {});
        }

        Reflect.set(this.schema, 'media_type', media_type);
        return this;
    }

    public setSchema<Type extends SchemaType>(type: Type, schema: SchemaBuilderType<Type> | ((builder: SchemaBuilderType<Type>) => SchemaBuilderType<Type>)) {

        if(typeof schema !== 'function') {
            if(schema.type !== SchemaType.Object) {
                throw new Error("Only type SchemaObject is allowed to be used normally")
            }
            
            Reflect.set(this, 'schema', schema)
            Reflect.set(this.schema, 'type', type);
            return this;
        }

        if (this.isSchema(schema, type as SchemaType.Object) && type === SchemaType.Object) {
            Reflect.set(this, 'schema', schema(new SchemaObjectBuilder()))
            Reflect.set(this.schema, 'type', type);
            return this;
        }

        if (this.isSchema(schema, type as SchemaType.String) && type === SchemaType.String) {
            Reflect.set(this, 'schema', schema(new SchemaStringBuilder()))
            Reflect.set(this.schema, 'type', type);
            return this;
        }

        if (this.isSchema(schema, type as SchemaType.Security) && type === SchemaType.Security) {
            Reflect.set(this, 'schema', schema(new SchemaSecurityBuilder()))
            Reflect.set(this.schema, 'type', type);
            return this;
        }

        if (this.isSchema(schema, type as SchemaType.Reference) && (type === SchemaType.Reference || type === SchemaType.ItemReference)) {
            Reflect.set(this, 'schema', schema(new SchemaReferenceBuilder()))
            Reflect.set(this.schema, 'type', type);
            return this;
        }

        throw new Error(`Impossible choice! (type: ${type})`)
    }

    public isSchema<Type extends SchemaType>(schema: any, type: Type): schema is ((builder: SchemaBuilderType<Type>) => SchemaBuilderType<Type>) {
        switch (type) {
            case SchemaType.Object:
                return true;
            case SchemaType.String:
                return true;
            case SchemaType.Security:
                return true;
            case SchemaType.Reference:
            case SchemaType.ItemReference:
                return true;
            default:
                return false;
        }
    }

    public toJSON(withRequired = true) {

        let obj: any = {
            description: this.description,
            required: withRequired ? this.required : undefined,
            content: {}
        }

        if (!this.schema) { return this.removeUndefinedKeys(obj) }
        if (!this.schema.type) { throw new Error("Schema type must be set when it's used!") }
        if (!this.schema.media_type) { console.log(this);throw new Error("Media Type must be set for responses!")}

        
        if (this.schema.type === SchemaType.Object) {
            obj.content[this.schema.media_type] = {schema: new SchemaObjectBuilder(this.schema).toJSON()};
        } else if (this.schema.type === SchemaType.String) {
            obj.content[this.schema.media_type] = {schema: new SchemaStringBuilder(this.schema).toJSON()};
        } else if (this.schema.type === SchemaType.Reference || this.schema.type === SchemaType.ItemReference) {
            obj.content[this.schema.media_type] = {schema: new SchemaReferenceBuilder(this.schema).toJSON()};
        } else {
            throw new Error(`Impossible choice! (type: ${this.schema.type})`)
        }

        return this.removeUndefinedKeys(obj)
    }
}