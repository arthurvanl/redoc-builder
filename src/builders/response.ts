import { RequestBodyBuilder } from "@/builders/request_body";

export class ResponseBuilder extends RequestBodyBuilder {
    readonly code!: string

    public setCode(code: string | number) {
        Reflect.set(this, 'code', code);
        return this;
    }

    public toJSON() {

        const obj = super.toJSON(false);

        return {
            code: this.code,
            ...obj
        }
    }
}