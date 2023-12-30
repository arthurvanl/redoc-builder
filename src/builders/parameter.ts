import { SchemaObjectBuilder, SchemaStringBuilder, SchemaSecurityBuilder, SchemaReferenceBuilder } from "@/builders/schema";
import { RedocUtils } from "@/builders/utils";
import { Parameter, ParameterIn, ParameterStyle, Reference, Schema, SchemaType, SchemaBuilderType } from "@/types";

export class ParameterBuilder extends RedocUtils implements Parameter {
    readonly in!: ParameterIn;
    readonly empty?: boolean // key: allowEmptyValue;
    readonly style?: ParameterStyle;
    readonly explode?: boolean;
    readonly reserved?: boolean // key: allowReserved;
    readonly required?: boolean;
    readonly schema!: Schema;
    readonly name!: string;
    readonly description?: string;
    readonly deprecated?: boolean;
    readonly ref?: Reference;
    
    public constructor(data?: Parameter) {
        super();

        this.addProps(data);
    }

    public setLocation(location: ParameterIn) {
        Reflect.set(this, 'in', location);
        return this;
    }

    public setEmpty(empty = true) {
        Reflect.set(this, 'allowEmptyValue', empty);
        return this;
    }

    public setStyle(style: ParameterStyle) {
        Reflect.set(this, 'style', style);
        return this;
    }

    public setReserved(reserved = true) {
        Reflect.set(this, 'allowReserved', reserved);
        return this;
    }
    
    public setRequired(required = true) {
        Reflect.set(this, 'required', required);
        return this;
    }
    
    public setDeprecated(deprecated = true) {
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    public setSchema<Type extends SchemaType>(type: Type, schema: ((builder: SchemaBuilderType<Type>) => SchemaBuilderType<Type>)) {

        if(this.isSchema(schema, type as SchemaType.Object) && type === SchemaType.Object) {
            Reflect.set(this, 'schema', schema(new SchemaObjectBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.String) && type === SchemaType.String) {
            Reflect.set(this, 'schema', schema(new SchemaStringBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.Security) && type === SchemaType.Security) {
            Reflect.set(this, 'schema', schema(new SchemaSecurityBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.Reference) && (type === SchemaType.Reference || type === SchemaType.ItemReference)) {
            Reflect.set(this, 'schema', schema(new SchemaReferenceBuilder()))
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

    public setName(name: string) {
        Reflect.set(this, 'name', name);
        return this;
    }

    public setReference(ref: Reference) {
        Reflect.set(this, 'ref', ref);
        return this;
    }

    public setDescription(description: string) {
        Reflect.set(this, 'description', description);
        return this;
    }

    public toJSON() {

        const obj: any = this.removeUndefinedKeys({
            description: this.description,
            deprecated: this.deprecated,
            in: this.in,
            allowEmptyValue: this.empty,
            style: this.style,
            explode: this.explode,
            allowReserved: this.reserved,
        });

        if(this.schema.type === SchemaType.Object) {
            obj.schema = new SchemaObjectBuilder(this.schema).toJSON();
        } else if(this.schema.type === SchemaType.String) {
            obj.schema = new SchemaStringBuilder(this.schema).toJSON();
        } else if(this.schema.type === SchemaType.Reference || this.schema.type === SchemaType.ItemReference) {
            obj.schema = new SchemaReferenceBuilder(this.schema).toJSON();
        } else {
            throw new Error("Impossible choice!")
        }

        return obj;
    }
}