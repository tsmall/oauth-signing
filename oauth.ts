import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

import * as http from "./http.ts";

export function sign(req: http.Request,
                     consumerKey: string,
                     tokenSecret: string): string {
    const key = consumerKey + '&' + tokenSecret;
    const message = normalize(req);
    const hash = hmac('sha1', key, message, 'utf8', 'base64') as string;
    return fixBase64(hash);
}

export function normalize(req: http.Request): string {
    const url = req.host + req.path;
    const parameters = merge(req.query, req.headers);
    const components = [
        req.method,
        url,
        normalizeParameters(parameters),
    ];
    return components.map(encodeURIComponent).join('&');
}

// NOTE: This does not handle multiple query string parameters with the
//       same name correctly. That isn't needed for the example and doesn't
//       significantly change the logic so it was omitted.
function normalizeParameters(parameters: http.StringMap): string {
    const keys = Object.keys(parameters).sort();
    const parts = [];
    for (let key of keys) {
        if (key == 'oauth_signature') continue;
        parts.push(key + '=' + parameters[key]);
    }
    return parts.join('&');
}

function merge(...maps: http.StringMap[]): http.StringMap {
    let merged = {};
    for (let map of maps) {
        Object.assign(merged, map);
    }
    return merged;
}

function fixBase64(hash: string): string {
    return hash.replace(/-/g, '+').replace(/_/g, '/');
}
