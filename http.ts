export interface Request {
    readonly method: string;
    readonly host: string;
    readonly path: string;
    readonly query: StringMap;
    readonly headers: StringMap;
}

export interface StringMap {
    [key: string]: string;
}
