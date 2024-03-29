import { InfoBuilder } from "./info";
import { PathBuilder } from "./path";
import { SchemaObjectBuilder, SchemaStringBuilder, SchemaSecurityBuilder, SchemaReferenceBuilder } from "./schema";
import { ServerBuilder } from "./server";
import { TagBuilder } from "./tag";
import { Info, Tag, TagGroup, Server, Path, Schema, SchemaType, SchemaBuilderType, SchemaSecurity, SchemaObject } from "../types";

export class RedocBuilder {
    readonly openapi!: string;
    readonly info!: Info;
    readonly servers: Server[] = [];
    readonly paths: Path[] = [];
    readonly schemas: Schema[] = [];
    readonly tags: Tag[] = []
    readonly tag_groups: TagGroup[] = []

    public setVersion(version: '3.0' | '3.0.1' | '3.1.0') {
        Reflect.set(this, 'openapi', version);
        return this;
    }

    public setInfo(info: InfoBuilder | ((info: InfoBuilder) => InfoBuilder)) {

        const result = typeof info === 'function' ? info(new InfoBuilder()) : info;

        Reflect.set(this, 'info', result.getProps(result));
        return this;
    }

    public setServers(...servers: ServerBuilder[] | ((server: ServerBuilder) => ServerBuilder)[]) {

        for(const server of servers) {
            
            const result = typeof server === 'function' ? server(new ServerBuilder()) : server;
            
            this.servers.push(result);
        }

        return this;
    }

    public addPath(path: ((path: PathBuilder) => PathBuilder)) {
        this.paths.push(path(new PathBuilder()));
        return this;
    }

    public setPaths(...paths: ((path: PathBuilder) => PathBuilder)[]) {

        for(const path of paths) {
            const result = path(new PathBuilder);
            this.paths.push(result.getProps(result));
        }

        return this;
    }

    public addSchema<Type extends SchemaType>(type: Type, schema: ((builder: SchemaBuilderType<Type>) => SchemaBuilderType<Type>)) {

        if(this.isSchema(schema, type as SchemaType.Object) && type === SchemaType.Object) {
            this.schemas.push(schema(new SchemaObjectBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.String) && type === SchemaType.String) {
            this.schemas.push(schema(new SchemaStringBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.Security) && type === SchemaType.Security) {
            this.schemas.push(schema(new SchemaSecurityBuilder()))
            return this;
        }

        if(this.isSchema(schema, type as SchemaType.Reference) && (type === SchemaType.Reference || type === SchemaType.ItemReference)) {
            this.schemas.push(schema(new SchemaReferenceBuilder()))
            return this;
        }

        throw new Error(`Impossible choice! (type: ${type})`)
    }

    public setSchemas(schemas: Schema[]) {
        this.schemas.push(...schemas);
        return this;
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

    public setTags(...tags: ((tag: TagBuilder) => TagBuilder)[]) {
        
        for(const tag of tags) {
            const result = tag(new TagBuilder);
            this.tags.push(result.getProps(result));
        }

        return this;
    }

    public setTagGroups(...tag_groups: TagGroup[]) {

        this.tag_groups.push(...tag_groups);
        return this;
    }

    // if(schema.type !== SchemaType.Security) throw new Error('not possible');
    public toJSON() {
        return {
            openapi: this.openapi,
            info: new InfoBuilder(this.info).toJSON(),
            servers: this.servers,
            security: this.schemas.filter((schema) => schema.type === SchemaType.Security).reduce((schemas: { [key: string]: [] }[], schema) => {
                
                const obj = new SchemaSecurityBuilder(schema as SchemaSecurity)
                Reflect.set(obj, 'key_name', undefined)
                schemas.push({
                    [schema['key_name']]: []
                })
                return schemas

            }, []),
            paths: this.paths.reduce((paths, path) => {
                const data = new PathBuilder(path).toJSON();
                // Reflect.set(data, 'path', undefined);
                // console.log(data)
                return {
                    ...paths,
                    ...data
                }
            }, {}),
            components: {
                securitySchemes: this.schemas.filter((schema) => schema.type === SchemaType.Security).reduce((schemas, schema) => {

                    const data = new SchemaSecurityBuilder(schema as SchemaSecurity).toJSON();
                    return {
                        ...schemas,
                        [schema.key_name]: data
                    }
                }, {}),
                schemas: this.schemas.filter((schema) => schema.type === SchemaType.Object).reduce((schemas, schema) => {
                    
                    const data = new SchemaObjectBuilder(schema as SchemaObject).toJSON();
                    return {
                        ...schemas,
                        [schema.key_name]: data
                    }
                }, {})
            },
            tags: this.tags.map((tag) => new TagBuilder(tag).toJSON()),
            "x-tagGroups": this.tag_groups
        }
    }
}