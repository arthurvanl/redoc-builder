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