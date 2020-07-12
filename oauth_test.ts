import { assertEquals } from "https://deno.land/std@0.60.0/testing/asserts.ts";

import * as oauth from "./oauth.ts";


// Test data -------------------------------------------------------------------

// This is the example used in the OAuth spec, which makes it easy to find
// examples online to help with this.

const method = 'GET';
const host = 'http://photos.example.net';
const path = '/photos';
const queryParameters = {
    'file': 'vacation.jpg',
    'size': 'original',
};
const oauthHeaders = {
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_version': '1.0',
    'oauth_consumer_key': 'dpf43f3p2l4k3l03',
    'oauth_timestamp': '1191242096',
    'oauth_nonce': 'kllo9940pd9333jh',
    'oauth_signature': 'tR3+Ty81lMeYAr/Fid0kMTYa/WM=',
    'oauth_token': 'nnch734d00sl2jdk',
};
const consumerKey = 'kd94hf93k423kf44';
const tokenSecret = 'pfkkdhi9sl3r4s00';


// Normalization tests ---------------------------------------------------------

Deno.test("normalize simplest request", () => {
    const request = {
        method,
        host,
        path,
        query: {},
        headers: {},
    };
    assertEquals(
        oauth.normalize(request),
        'GET&http%3A%2F%2Fphotos.example.net%2Fphotos&',
    );
});

Deno.test("normalize request with only oauth parameters", () => {
    const request = {
        method,
        host,
        path,
        query: {},
        headers: oauthHeaders,
    };
    assertEquals(
        oauth.normalize(request),
        'GET&http%3A%2F%2Fphotos.example.net%2Fphotos&' +
        'oauth_consumer_key%3Ddpf43f3p2l4k3l03%26' +
        'oauth_nonce%3Dkllo9940pd9333jh%26' +
        'oauth_signature_method%3DHMAC-SHA1%26' +
        'oauth_timestamp%3D1191242096%26' +
        'oauth_token%3Dnnch734d00sl2jdk%26' +
        'oauth_version%3D1.0'
    );
});

Deno.test("normalize request with request parameters", () => {
    const request = {
        method,
        host,
        path,
        query: queryParameters,
        headers: oauthHeaders,
    };
    assertEquals(
        oauth.normalize(request),
        'GET&http%3A%2F%2Fphotos.example.net%2Fphotos&' +
        'file%3Dvacation.jpg%26' +
        'oauth_consumer_key%3Ddpf43f3p2l4k3l03%26' +
        'oauth_nonce%3Dkllo9940pd9333jh%26' +
        'oauth_signature_method%3DHMAC-SHA1%26' +
        'oauth_timestamp%3D1191242096%26' +
        'oauth_token%3Dnnch734d00sl2jdk%26' +
        'oauth_version%3D1.0%26' +
        'size%3Doriginal'
    );
});

Deno.test("normalize post request", () => {
    const request = {
        method: 'POST',
        host: 'http://example.com',
        path: '/wp-json/wp/v2/posts',
        query: {},
        headers: {
            'oauth_signature_method': 'HMAC-SHA1',
            'oauth_nonce': 'nonce',
            'oauth_consumer_key': 'key',
            'oauth_timestamp': '123456789',
            'oauth_token': 'token',
        }
    };
    assertEquals(
        oauth.normalize(request),
        'POST&http%3A%2F%2Fexample.com%2Fwp-json%2Fwp%2Fv2%2Fposts&' +
        'oauth_consumer_key%3Dkey%26' +
        'oauth_nonce%3Dnonce%26' +
        'oauth_signature_method%3DHMAC-SHA1%26' +
        'oauth_timestamp%3D123456789%26' +
        'oauth_token%3Dtoken'
    );
});


// Signature tests -------------------------------------------------------------

Deno.test("oauth signing", () => {
    const request = {
        method,
        host,
        path,
        query: queryParameters,
        headers: oauthHeaders,
    };
    assertEquals(
        oauth.sign(request, consumerKey, tokenSecret),
        'tR3+Ty81lMeYAr/Fid0kMTYa/WM='
    );
});
