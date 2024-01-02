import { ParameterBuilder } from "./parameter";
import { RequestBodyBuilder } from "./request_body";
import { ResponseBuilder } from "./response";
import { RedocUtils } from "./utils";
import { Parameter, Path, PathOperation, PathOperationType, RequestBody, Response } from "../types";

export class PathBuilder extends RedocUtils implements Path {
    readonly path!: `/${string}`;
    readonly operations: PathOperation[] = []

    public constructor(data?: Path) {
        super()
        
        this.addProps(data);
    }

    public setPath(path: `/${string}`) {
        Reflect.set(this, 'path', path);
        return this;
    }

    public setOperations(...operations: ((operation: PathOperationBuilder) => PathOperationBuilder)[]) {

        for(const operation of operations) {
            const result = operation(new PathOperationBuilder);
            this.operations.push(result.getProps(result));
        }

        return this;
    }

    public toJSON() {

        const obj: any = {
            [this.path]: {},
        }

        for(const operation of this.operations) {
            // operation.
            const data = new PathOperationBuilder(operation).toJSON();
            
            const key = Object.keys(data)[0];
            obj[this.path][key] = this.removeUndefinedKeys(data[key]);
        }

        return obj;
    }
}

class PathOperationBuilder extends RedocUtils implements PathOperation {
    readonly tags: string[] = []
    readonly type!: PathOperationType;
    readonly summary!: string;
    readonly description!: string;
    readonly operationId!: string;
    readonly request_body!: RequestBody;
    readonly parameters: Parameter[] = []
    readonly responses: Response[] = [];
    readonly deprecated?: boolean;

    public constructor(data?: PathOperation) {
        super();

        this.addProps(data);
    }

    public addTag(tag: string) {

        this.tags.findIndex((x) => x == tag) == -1 ? this.tags.push(tag) : null;
        return this;
    }

    public setType(type: PathOperationType) {
        Reflect.set(this, 'type', type);
        return this;
    }

    public setSummary(summary: string) {
        Reflect.set(this, 'summary', summary);
        return this;
    }

    public setDescription(...line: string[]) {
        Reflect.set(this, 'description', line.join("\n"));
        return this;
    }

    /**
     * Sets the operationId for this operation
     * 
     * Unique string used to identify the operation. The id MUST be unique among all operations described in the API. 
     * 
     * The operationId value is case-sensitive. 
     * 
     * Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, 
     * it is RECOMMENDED to follow common programming naming conventions.
     * @param operationId - The operationId for this operation
     */
    public setOperationId(operationId: string) {
        Reflect.set(this, 'operationId', operationId);
        return this;
    }

    public setRequestBody(request_body: RequestBodyBuilder | ((request_body: RequestBodyBuilder) => RequestBodyBuilder)) {

        const result = typeof request_body === 'function' ? request_body(new RequestBodyBuilder()) : request_body;
        Reflect.set(this.request_body, 'schema', result.schema);
        Reflect.set(this.request_body, 'description', result.description);
        Reflect.set(this.request_body, 'required', result.required);
    
        return this;
    }

    public setResponses(...responses: ((response: ResponseBuilder) => ResponseBuilder)[]) {

        for(const response of responses) {
            const result = response(new ResponseBuilder);
            this.responses.push(result.getProps(result));
        }

        return this;
    }

    public setParameters(...parameters: ((parameter: ParameterBuilder) => ParameterBuilder)[]) {

        for(const parameter of parameters) {
            const result = parameter(new ParameterBuilder);
            this.parameters.push(result.getProps(result));
        }

        return this;
    }

    public setDeprecated(deprecated: boolean = true) {
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    public toJSON() {

        const obj: any = this.removeUndefinedKeys({
            tags: this.tags,
            summary: this.summary,
            description: this.description,
            operationId: this.operationId,
            requestBody: new RequestBodyBuilder(this.request_body).toJSON(),
            parameters: this.parameters.map((parameter) => new ParameterBuilder(parameter).toJSON()),
            responses: this.responses.reduce((responses, response) => {
                const data = new ResponseBuilder(response).toJSON();
                Reflect.set(data, 'code', undefined);
                return {
                    ...responses,
                    [response.code]: this.removeUndefinedKeys(data)
                }
            }, {})
        });

        if(Object.keys(obj.requestBody).length === 0) {
            delete obj.requestBody;
        }

        return {
            [this.type]: obj
        }
    }
}