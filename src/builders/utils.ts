import { Check, DefinitionKind, RemoveFunctions, SchemaObject, SchemaProperty, SchemaPropertyFormatType, SchemaPropertyType, SchemaType } from "../types";
import { Writeable, z, ZodString, ZodNumber, ZodDate, ZodArray, ZodEffects, ZodEnum, ZodBoolean } from "zod";

export class RedocUtils {

    public addProps(data: any) {

        if(data) {
            Object.keys(data).forEach((key) => {
                if(Object.prototype.hasOwnProperty.call(this, key)) {
                    (this as any)[key] = (data as any)[key]
                }
            });
        }
    }

    public getProps<T>(data: T): RemoveFunctions<T> {
        let obj: any = {}

        Object.keys((data as any)).forEach((key) => {
            obj[key] = (data as any)[key]
        });

        return obj as RemoveFunctions<T>;
    }

    /**
     * Adds a markdown code-block.
     * @example
     * const block = addCode("ts", 
     *  `import { RedocBuilder } from "./builders/Redoc.js";`,
     *  "const redoc = new RedocBuilder();",
     *  "// In this object you need to add all path operations & components/schemas."
     * );
     * @description In this code we create a markdown code block using the following code
     * @example
     * import { RedocBuilder } from "./builders/Redoc.js";
     * const redoc = new RedocBuilder();
     * // In this object you need to add all path operations & components/schemas.
     * @param language The md code block language
     * @param code strings of code lines
     * @returns markdown code block
     */
    public addCode(language: string, ...code: string[]) {

        const padding = "```";
        const line = `${language}\n${code.join('\n')}\n`;

        return `\n${this.addPadding(padding, line)}\n`;
    }

    /**
     * Creates markdown link
     * @param key_value The value where will be clicked on
     * @param link The link where the click event should go to
     * @returns markdown link wrap
     */
    public addLink(key_value: string, link: string) {

        return `[${key_value}](${link})`;
    }

    /**
     * Adds padding before & after the line
     * 
     * @param padding - the padding for this line
     * @param line
     * @returns 
     */
    private addPadding(padding: string, line: string) {

        return [padding, line, padding].join("");
    }

    /**
     * Removes undefined keys
     * @param data 
     * @returns 
     */
    public removeUndefinedKeys<T>(data: T) {

        for(const key in data) {
            // removing unused properties & empty arrays
            if(typeof data[key] === 'undefined' || (Array.isArray(data[key]) && (data[key] as any[]).length === 0)) {
                delete data[key];
            }
        }
        return data;
    }
    private getDefinitions(def: any, key: string, type: SchemaPropertyType, isDate = false, isEffect = false): Writeable<Omit<SchemaProperty, | "title" | "example" | "deprecated" | "readOnly" | "writeOnly">> {
        
        let property: Writeable<Omit<SchemaProperty, | "title" | "example" | "deprecated" | "readOnly" | "writeOnly">> = {
            name: key, type, 
            description: def.description
        };
    
        //! we are always using date-time in our projects (but should be changed )
        if(isDate) {
            property.format = SchemaPropertyFormatType.DateTime;
        }
        
        if(isEffect) {
            property.type = this.parsePropertyType(def.schema._def.typeName).type;
            def.checks = def.schema._def.checks;
        }
    
        if(type === SchemaPropertyType.Array) {
            if(def.typeName === ZodEnum.name) {
                property.array_type = typeof def.values[0] as Exclude<SchemaPropertyType, SchemaPropertyType.Array>;
                property.enum = def.values;
            } else {
                const type = this.parsePropertyType(def.type._def.typeName).type
                // TODO: in the future it should be allowed to be array or objects
                if(type === SchemaPropertyType.Array || type === SchemaPropertyType.Object) {
                    throw new Error("Can't be typeof array in these sequence")
                }
        
                property.array_type = type;
            }
        }
    
        const checks: Check[] = def.checks ?? [];
        for(const check of checks) {
    
            switch(check.kind) {
                case DefinitionKind.Length:
                    
                    if(type === SchemaPropertyType.Array) {
                        property.minimum = check.value;
                        property.maximum = check.value;
                    } else {
                        property.minLength = check.value;
                        property.maxLength = check.value;
                    }
                    break;
                case DefinitionKind.Max: 
                
                    if(type === SchemaPropertyType.String) {
                        property.maxLength = check.value;
                    } else {
                        property.maximum = check.value;
                    }
                    break;
                case DefinitionKind.Min: 
                
                    if(type === SchemaPropertyType.String) {
                        property.minLength = check.value;
                    } else {
                        property.minimum = check.value;
                    }
                    break;
                case DefinitionKind.Email: 
                    property.format = SchemaPropertyFormatType.Email
                    
                    break;
                case DefinitionKind.Url:
                    property.format = SchemaPropertyFormatType.Uri
                    break;
                case DefinitionKind.Uuid: 
                    property.format = SchemaPropertyFormatType.Uuid;
                    break;
                case DefinitionKind.Regex:
                    property.pattern = `${check.regex}`;
                    break;
                case DefinitionKind.Trim: 
                case DefinitionKind.ToUpperCase:
                case DefinitionKind.ToLowerCase:
                    //! no idea what I should do with these
                    break;
                case DefinitionKind.Includes:
                    property.pattern = check.value
                    break;
                case DefinitionKind.EndsWith:
                    property.pattern = `${check.value}$`
                    break;
                case DefinitionKind.StartsWith:
                    property.pattern = `^${check.value}`
                    break;
                case DefinitionKind.Datetime:
                    property.format = SchemaPropertyFormatType.DateTime
                    break;
                case DefinitionKind.Int:
                    property.type = SchemaPropertyType.Integer;
                    break;
                case DefinitionKind.Ip:
                    if(!check.version) {
                        throw new Error("Version wasn't provided! for IP property.");
                    }
    
                    if(check.version === 'v4') {
                        property.format = SchemaPropertyFormatType.Ipv4
                    } else {
                        property.format = SchemaPropertyFormatType.Ipv6
                    }
                    break;
            }
        }
    
        return property;
    }

    public parseSchema(schema: z.ZodObject<any>, name: string): SchemaObject {

        let properties: SchemaProperty[] = [];
        let required: string[] = [];
        
        for(const key in schema.shape) {
    
            if(!schema.shape[key]._def.innerType) {
                required.push(key);
            }
            let type = this.parsePropertyType(schema.shape[key]._def.innerType ? schema.shape[key]._def.innerType._def.typeName : schema.shape[key]._def.typeName);
            let def = schema.shape[key]._def.innerType ? schema.shape[key]._def.innerType._def : schema.shape[key]._def
    
            if(type.type === SchemaPropertyType.Array) {
                let checks: Check[] = []
                if(def.exactLength) {
                    checks.push({kind: DefinitionKind.Length, value: def.exactLength.value, message: def.exactLength.message})
                }
                if(def.minLength) {
                    checks.push({kind: DefinitionKind.Min, value: def.minLength.value, message: def.minLength.message})
                }
                if(def.maxLength) {
                    checks.push({kind: DefinitionKind.Max, value: def.maxLength.value, message: def.maxLength.message})
                }
    
                def.checks = checks;
            }
            const definition = this.getDefinitions(def, key, type.type, type.isDate, type.isEffect);
            properties.push(definition);
    
        }
    
        return { key_name: name, properties, required, type: SchemaType.Object }
    }

    private parsePropertyType(type: string): {type: SchemaPropertyType, isDate?: true, isEffect?: true} {
       
        switch(type) {

            case ZodString.name:
                return {type: SchemaPropertyType.String};
            case ZodNumber.name:
                return {type: SchemaPropertyType.Number};
            case ZodDate.name:
                return {type: SchemaPropertyType.String, isDate: true };
            case ZodArray.name:
                return {type: SchemaPropertyType.Array}
            case ZodEffects.name:
                //* default setting to String since we it's an effect we need to get the type differently.
                return {type: SchemaPropertyType.String, isEffect: true }
            case ZodEnum.name:
                return {type: SchemaPropertyType.Array}
            case ZodBoolean.name:
                return {type: SchemaPropertyType.Boolean}
            default:
                throw new Error("Shouldn't be here")
        }
    }
}