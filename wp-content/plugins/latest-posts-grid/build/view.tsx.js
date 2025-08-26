/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/graphql-request/build/entrypoints/main.js":
/*!****************************************************************!*\
  !*** ./node_modules/graphql-request/build/entrypoints/main.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientError: () => (/* reexport safe */ _legacy_classes_ClientError_js__WEBPACK_IMPORTED_MODULE_0__.ClientError),
/* harmony export */   GraphQLClient: () => (/* reexport safe */ _legacy_classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_2__.GraphQLClient),
/* harmony export */   analyzeDocument: () => (/* reexport safe */ _legacy_helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_6__.analyzeDocument),
/* harmony export */   batchRequests: () => (/* reexport safe */ _legacy_functions_batchRequests_js__WEBPACK_IMPORTED_MODULE_3__.batchRequests),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   gql: () => (/* reexport safe */ _legacy_functions_gql_js__WEBPACK_IMPORTED_MODULE_4__.gql),
/* harmony export */   rawRequest: () => (/* reexport safe */ _legacy_functions_rawRequest_js__WEBPACK_IMPORTED_MODULE_5__.rawRequest),
/* harmony export */   request: () => (/* reexport safe */ _legacy_functions_request_js__WEBPACK_IMPORTED_MODULE_1__.request)
/* harmony export */ });
/* harmony import */ var _legacy_classes_ClientError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../legacy/classes/ClientError.js */ "./node_modules/graphql-request/build/legacy/classes/ClientError.js");
/* harmony import */ var _legacy_functions_request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../legacy/functions/request.js */ "./node_modules/graphql-request/build/legacy/functions/request.js");
/* harmony import */ var _legacy_classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../legacy/classes/GraphQLClient.js */ "./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js");
/* harmony import */ var _legacy_functions_batchRequests_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../legacy/functions/batchRequests.js */ "./node_modules/graphql-request/build/legacy/functions/batchRequests.js");
/* harmony import */ var _legacy_functions_gql_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../legacy/functions/gql.js */ "./node_modules/graphql-request/build/legacy/functions/gql.js");
/* harmony import */ var _legacy_functions_rawRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../legacy/functions/rawRequest.js */ "./node_modules/graphql-request/build/legacy/functions/rawRequest.js");
/* harmony import */ var _legacy_helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../legacy/helpers/analyzeDocument.js */ "./node_modules/graphql-request/build/legacy/helpers/analyzeDocument.js");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_legacy_functions_request_js__WEBPACK_IMPORTED_MODULE_1__.request);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/classes/ClientError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/classes/ClientError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientError: () => (/* binding */ ClientError)
/* harmony export */ });
class ClientError extends Error {
    response;
    request;
    constructor(response, request) {
        const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
            response,
            request,
        })}`;
        super(message);
        Object.setPrototypeOf(this, ClientError.prototype);
        this.response = response;
        this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        if (typeof Error.captureStackTrace === `function`) {
            Error.captureStackTrace(this, ClientError);
        }
    }
    static extractMessage(response) {
        return response.errors?.[0]?.message ?? `GraphQL Error (Code: ${String(response.status)})`;
    }
}
//# sourceMappingURL=ClientError.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js":
/*!****************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphQLClient: () => (/* binding */ GraphQLClient)
/* harmony export */ });
/* harmony import */ var _lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prelude.js */ "./node_modules/graphql-request/build/lib/prelude.js");
/* harmony import */ var _functions_batchRequests_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/batchRequests.js */ "./node_modules/graphql-request/build/legacy/functions/batchRequests.js");
/* harmony import */ var _functions_rawRequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions/rawRequest.js */ "./node_modules/graphql-request/build/legacy/functions/rawRequest.js");
/* harmony import */ var _functions_request_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/request.js */ "./node_modules/graphql-request/build/legacy/functions/request.js");
/* harmony import */ var _helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/analyzeDocument.js */ "./node_modules/graphql-request/build/legacy/helpers/analyzeDocument.js");
/* harmony import */ var _helpers_runRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/runRequest.js */ "./node_modules/graphql-request/build/legacy/helpers/runRequest.js");






/**
 * GraphQL Client.
 */
class GraphQLClient {
    url;
    requestConfig;
    constructor(url, requestConfig = {}) {
        this.url = url;
        this.requestConfig = requestConfig;
    }
    /**
     * Send a GraphQL query to the server.
     */
    rawRequest = async (...args) => {
        const [queryOrOptions, variables, requestHeaders] = args;
        const rawRequestOptions = (0,_functions_rawRequest_js__WEBPACK_IMPORTED_MODULE_2__.parseRawRequestArgs)(queryOrOptions, variables, requestHeaders);
        const { headers, fetch = globalThis.fetch, method = `POST`, requestMiddleware, responseMiddleware, excludeOperationName, ...fetchOptions } = this.requestConfig;
        const { url } = this;
        if (rawRequestOptions.signal !== undefined) {
            fetchOptions.signal = rawRequestOptions.signal;
        }
        const document = (0,_helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_4__.analyzeDocument)(rawRequestOptions.query, excludeOperationName);
        const response = await (0,_helpers_runRequest_js__WEBPACK_IMPORTED_MODULE_5__.runRequest)({
            url,
            request: {
                _tag: `Single`,
                document,
                variables: rawRequestOptions.variables,
            },
            headers: {
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)((0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.callOrIdentity)(headers)),
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)(rawRequestOptions.requestHeaders),
            },
            fetch,
            method,
            fetchOptions,
            middleware: requestMiddleware,
        });
        if (responseMiddleware) {
            await responseMiddleware(response, {
                operationName: document.operationName,
                variables,
                url: this.url,
            });
        }
        if (response instanceof Error) {
            throw response;
        }
        return response;
    };
    async request(documentOrOptions, ...variablesAndRequestHeaders) {
        const [variables, requestHeaders] = variablesAndRequestHeaders;
        const requestOptions = (0,_functions_request_js__WEBPACK_IMPORTED_MODULE_3__.parseRequestArgs)(documentOrOptions, variables, requestHeaders);
        const { headers, fetch = globalThis.fetch, method = `POST`, requestMiddleware, responseMiddleware, excludeOperationName, ...fetchOptions } = this.requestConfig;
        const { url } = this;
        if (requestOptions.signal !== undefined) {
            fetchOptions.signal = requestOptions.signal;
        }
        const analyzedDocument = (0,_helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_4__.analyzeDocument)(requestOptions.document, excludeOperationName);
        const response = await (0,_helpers_runRequest_js__WEBPACK_IMPORTED_MODULE_5__.runRequest)({
            url,
            request: {
                _tag: `Single`,
                document: analyzedDocument,
                variables: requestOptions.variables,
            },
            headers: {
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)((0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.callOrIdentity)(headers)),
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)(requestOptions.requestHeaders),
            },
            fetch,
            method,
            fetchOptions,
            middleware: requestMiddleware,
        });
        if (responseMiddleware) {
            await responseMiddleware(response, {
                operationName: analyzedDocument.operationName,
                variables: requestOptions.variables,
                url: this.url,
            });
        }
        if (response instanceof Error) {
            throw response;
        }
        return response.data;
    }
    async batchRequests(documentsOrOptions, requestHeaders) {
        const batchRequestOptions = (0,_functions_batchRequests_js__WEBPACK_IMPORTED_MODULE_1__.parseBatchRequestArgs)(documentsOrOptions, requestHeaders);
        const { headers, excludeOperationName, ...fetchOptions } = this.requestConfig;
        if (batchRequestOptions.signal !== undefined) {
            fetchOptions.signal = batchRequestOptions.signal;
        }
        const analyzedDocuments = batchRequestOptions.documents.map(({ document }) => (0,_helpers_analyzeDocument_js__WEBPACK_IMPORTED_MODULE_4__.analyzeDocument)(document, excludeOperationName));
        const expressions = analyzedDocuments.map(({ expression }) => expression);
        const hasMutations = analyzedDocuments.some(({ isMutation }) => isMutation);
        const variables = batchRequestOptions.documents.map(({ variables }) => variables);
        const response = await (0,_helpers_runRequest_js__WEBPACK_IMPORTED_MODULE_5__.runRequest)({
            url: this.url,
            request: {
                _tag: `Batch`,
                operationName: undefined,
                query: expressions,
                hasMutations,
                variables,
            },
            headers: {
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)((0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.callOrIdentity)(headers)),
                ...(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.HeadersInitToPlainObject)(batchRequestOptions.requestHeaders),
            },
            fetch: this.requestConfig.fetch ?? globalThis.fetch,
            method: this.requestConfig.method || `POST`,
            fetchOptions,
            middleware: this.requestConfig.requestMiddleware,
        });
        if (this.requestConfig.responseMiddleware) {
            await this.requestConfig.responseMiddleware(response, {
                operationName: undefined,
                variables,
                url: this.url,
            });
        }
        if (response instanceof Error) {
            throw response;
        }
        return response.data;
    }
    setHeaders(headers) {
        this.requestConfig.headers = headers;
        return this;
    }
    /**
     * Attach a header to the client. All subsequent requests will have this header.
     */
    setHeader(key, value) {
        const { headers } = this.requestConfig;
        if (headers) {
            // todo what if headers is in nested array form... ?
            // @ts-expect-error todo
            headers[key] = value;
        }
        else {
            this.requestConfig.headers = { [key]: value };
        }
        return this;
    }
    /**
     * Change the client endpoint. All subsequent requests will send to this endpoint.
     */
    setEndpoint(value) {
        this.url = value;
        return this;
    }
}
//# sourceMappingURL=GraphQLClient.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/functions/batchRequests.js":
/*!******************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/functions/batchRequests.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   batchRequests: () => (/* binding */ batchRequests),
/* harmony export */   parseBatchRequestArgs: () => (/* binding */ parseBatchRequestArgs),
/* harmony export */   parseBatchRequestsArgsExtended: () => (/* binding */ parseBatchRequestsArgsExtended)
/* harmony export */ });
/* harmony import */ var _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/GraphQLClient.js */ "./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js");

/**
 * Send a batch of GraphQL Document to the GraphQL server for execution.
 *
 * @example
 *
 * ```ts
 * // You can pass a raw string
 *
 * await batchRequests('https://foo.bar/graphql', [
 * {
 *  query: `
 *   {
 *     query {
 *       users
 *     }
 *   }`
 * },
 * {
 *   query: `
 *   {
 *     query {
 *       users
 *     }
 *   }`
 * }])
 *
 * // You can also pass a GraphQL DocumentNode as query. Convenient if you
 * // are using graphql-tag package.
 *
 * import gql from 'graphql-tag'
 *
 * await batchRequests('https://foo.bar/graphql', [{ query: gql`...` }])
 * ```
 */
const batchRequests = async (...args) => {
    const params = parseBatchRequestsArgsExtended(args);
    const client = new _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__.GraphQLClient(params.url);
    return client.batchRequests(params);
};
const parseBatchRequestsArgsExtended = (args) => {
    if (args.length === 1) {
        return args[0];
    }
    else {
        return {
            url: args[0],
            documents: args[1],
            requestHeaders: args[2],
            signal: undefined,
        };
    }
};
const parseBatchRequestArgs = (documentsOrOptions, requestHeaders) => {
    // eslint-disable-next-line
    return documentsOrOptions.documents
        ? documentsOrOptions
        : {
            documents: documentsOrOptions,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};
//# sourceMappingURL=batchRequests.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/functions/gql.js":
/*!********************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/functions/gql.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gql: () => (/* binding */ gql)
/* harmony export */ });
/**
 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
 *
 * @example
 * ```
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 * ```
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
const gql = (chunks, ...variables) => {
    return chunks.reduce((acc, chunk, index) => `${acc}${chunk}${index in variables ? String(variables[index]) : ``}`, ``);
};
//# sourceMappingURL=gql.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/functions/rawRequest.js":
/*!***************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/functions/rawRequest.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRawRequestArgs: () => (/* binding */ parseRawRequestArgs),
/* harmony export */   parseRawRequestExtendedArgs: () => (/* binding */ parseRawRequestExtendedArgs),
/* harmony export */   rawRequest: () => (/* binding */ rawRequest)
/* harmony export */ });
/* harmony import */ var _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/GraphQLClient.js */ "./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js");

/**
 * Send a GraphQL Query to the GraphQL server for execution.
 */
const rawRequest = async (...args) => {
    const [urlOrOptions, query, ...variablesAndRequestHeaders] = args;
    const requestOptions = parseRawRequestExtendedArgs(urlOrOptions, query, ...variablesAndRequestHeaders);
    const client = new _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__.GraphQLClient(requestOptions.url);
    return client.rawRequest({
        ...requestOptions,
    });
};
const parseRawRequestExtendedArgs = (urlOrOptions, query, ...variablesAndRequestHeaders) => {
    const [variables, requestHeaders] = variablesAndRequestHeaders;
    return typeof urlOrOptions === `string`
        ? {
            url: urlOrOptions,
            query: query,
            variables,
            requestHeaders,
            signal: undefined,
        }
        : urlOrOptions;
};
const parseRawRequestArgs = (queryOrOptions, variables, requestHeaders) => {
    return queryOrOptions.query
        ? queryOrOptions
        : {
            query: queryOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};
//# sourceMappingURL=rawRequest.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/functions/request.js":
/*!************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/functions/request.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRequestArgs: () => (/* binding */ parseRequestArgs),
/* harmony export */   parseRequestExtendedArgs: () => (/* binding */ parseRequestExtendedArgs),
/* harmony export */   request: () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/GraphQLClient.js */ "./node_modules/graphql-request/build/legacy/classes/GraphQLClient.js");

// dprint-ignore
// eslint-disable-next-line
async function request(urlOrOptions, document, ...variablesAndRequestHeaders) {
    const requestOptions = parseRequestExtendedArgs(urlOrOptions, document, ...variablesAndRequestHeaders);
    const client = new _classes_GraphQLClient_js__WEBPACK_IMPORTED_MODULE_0__.GraphQLClient(requestOptions.url);
    return client.request({
        ...requestOptions,
    });
}
const parseRequestArgs = (documentOrOptions, variables, requestHeaders) => {
    return documentOrOptions.document
        ? documentOrOptions
        : {
            document: documentOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};
const parseRequestExtendedArgs = (urlOrOptions, document, ...variablesAndRequestHeaders) => {
    const [variables, requestHeaders] = variablesAndRequestHeaders;
    return typeof urlOrOptions === `string`
        ? {
            url: urlOrOptions,
            document: document,
            variables,
            requestHeaders,
            signal: undefined,
        }
        : urlOrOptions;
};
//# sourceMappingURL=request.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/helpers/analyzeDocument.js":
/*!******************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/helpers/analyzeDocument.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyzeDocument: () => (/* binding */ analyzeDocument)
/* harmony export */ });
/* harmony import */ var _lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prelude.js */ "./node_modules/graphql-request/build/lib/prelude.js");
/* harmony import */ var _lib_graphql_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/graphql.js */ "./node_modules/graphql-request/build/legacy/lib/graphql.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/parser.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/printer.mjs");




/**
 * helpers
 */
const extractOperationName = (document) => {
    let operationName = undefined;
    const defs = document.definitions.filter(_lib_graphql_js__WEBPACK_IMPORTED_MODULE_1__.isOperationDefinitionNode);
    if (defs.length === 1) {
        operationName = defs[0].name?.value;
    }
    return operationName;
};
const extractIsMutation = (document) => {
    let isMutation = false;
    const defs = document.definitions.filter(_lib_graphql_js__WEBPACK_IMPORTED_MODULE_1__.isOperationDefinitionNode);
    if (defs.length === 1) {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison --
         * graphql@15's `OperationTypeNode` is a type, but graphql@16's `OperationTypeNode` is a native TypeScript enum
         * Therefore, we cannot use `OperationTypeNode.MUTATION` here because it wouldn't work with graphql@15
         **/
        isMutation = defs[0].operation === `mutation`;
    }
    return isMutation;
};
const analyzeDocument = (document, excludeOperationName) => {
    const expression = typeof document === `string` ? document : (0,graphql__WEBPACK_IMPORTED_MODULE_3__.print)(document);
    let isMutation = false;
    let operationName = undefined;
    if (excludeOperationName) {
        return { expression, isMutation, operationName };
    }
    const docNode = (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_0__.tryCatch)(() => (typeof document === `string` ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__.parse)(document) : document));
    if (docNode instanceof Error) {
        return { expression, isMutation, operationName };
    }
    operationName = extractOperationName(docNode);
    isMutation = extractIsMutation(docNode);
    return { expression, operationName, isMutation };
};
//# sourceMappingURL=analyzeDocument.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/helpers/defaultJsonSerializer.js":
/*!************************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/helpers/defaultJsonSerializer.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultJsonSerializer: () => (/* binding */ defaultJsonSerializer)
/* harmony export */ });
const defaultJsonSerializer = JSON;
//# sourceMappingURL=defaultJsonSerializer.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/helpers/runRequest.js":
/*!*************************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/helpers/runRequest.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runRequest: () => (/* binding */ runRequest)
/* harmony export */ });
/* harmony import */ var _lib_http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/http.js */ "./node_modules/graphql-request/build/lib/http.js");
/* harmony import */ var _lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/prelude.js */ "./node_modules/graphql-request/build/lib/prelude.js");
/* harmony import */ var _classes_ClientError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/ClientError.js */ "./node_modules/graphql-request/build/legacy/classes/ClientError.js");
/* harmony import */ var _lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/graphql.js */ "./node_modules/graphql-request/build/legacy/lib/graphql.js");
/* harmony import */ var _defaultJsonSerializer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultJsonSerializer.js */ "./node_modules/graphql-request/build/legacy/helpers/defaultJsonSerializer.js");





// @ts-expect-error todo
const runRequest = async (input) => {
    // todo make a Config type
    const config = {
        ...input,
        method: input.request._tag === `Single`
            ? input.request.document.isMutation
                ? `POST`
                : (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.uppercase)(input.method ?? `post`)
            : input.request.hasMutations
                ? `POST`
                : (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.uppercase)(input.method ?? `post`),
        fetchOptions: {
            ...input.fetchOptions,
            errorPolicy: input.fetchOptions.errorPolicy ?? `none`,
        },
    };
    const fetcher = createFetcher(config.method);
    const fetchResponse = await fetcher(config);
    if (!fetchResponse.ok) {
        return new _classes_ClientError_js__WEBPACK_IMPORTED_MODULE_2__.ClientError({ status: fetchResponse.status, headers: fetchResponse.headers }, {
            query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
            variables: input.request.variables,
        });
    }
    const result = await parseResultFromResponse(fetchResponse, input.fetchOptions.jsonSerializer ?? _defaultJsonSerializer_js__WEBPACK_IMPORTED_MODULE_4__.defaultJsonSerializer);
    if (result instanceof Error)
        throw result; // todo something better
    const clientResponseBase = {
        status: fetchResponse.status,
        headers: fetchResponse.headers,
    };
    if ((0,_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.isRequestResultHaveErrors)(result) && config.fetchOptions.errorPolicy === `none`) {
        // todo this client response on error is not consistent with the data type for success
        const clientResponse = result._tag === `Batch`
            ? { ...result.executionResults, ...clientResponseBase }
            : {
                ...result.executionResult,
                ...clientResponseBase,
            };
        // @ts-expect-error todo
        return new _classes_ClientError_js__WEBPACK_IMPORTED_MODULE_2__.ClientError(clientResponse, {
            query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
            variables: input.request.variables,
        });
    }
    switch (result._tag) {
        case `Single`:
            // @ts-expect-error todo
            return {
                ...clientResponseBase,
                ...executionResultClientResponseFields(config)(result.executionResult),
            };
        case `Batch`:
            return {
                ...clientResponseBase,
                data: result.executionResults.map(executionResultClientResponseFields(config)),
            };
        default:
            (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.casesExhausted)(result);
    }
};
const executionResultClientResponseFields = ($params) => (executionResult) => {
    return {
        extensions: executionResult.extensions,
        data: executionResult.data,
        errors: $params.fetchOptions.errorPolicy === `all` ? executionResult.errors : undefined,
    };
};
const parseResultFromResponse = async (response, jsonSerializer) => {
    const contentType = response.headers.get(_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_HEADER);
    const text = await response.text();
    if (contentType && (0,_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.isGraphQLContentType)(contentType)) {
        return (0,_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.parseGraphQLExecutionResult)(jsonSerializer.parse(text));
    }
    else {
        // todo what is this good for...? Seems very random/undefined
        return (0,_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.parseGraphQLExecutionResult)(text);
    }
};
const createFetcher = (method) => async (params) => {
    const headers = new Headers(params.headers);
    let searchParams = null;
    let body = undefined;
    if (!headers.has(_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.ACCEPT_HEADER)) {
        headers.set(_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.ACCEPT_HEADER, [_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_GQL, _lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_JSON].join(`, `));
    }
    if (method === `POST`) {
        const $jsonSerializer = params.fetchOptions.jsonSerializer ?? _defaultJsonSerializer_js__WEBPACK_IMPORTED_MODULE_4__.defaultJsonSerializer;
        body = $jsonSerializer.stringify(buildBody(params));
        if (typeof body === `string` && !headers.has(_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_HEADER)) {
            headers.set(_lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_HEADER, _lib_http_js__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPE_JSON);
        }
    }
    else {
        searchParams = buildQueryParams(params);
    }
    const init = { method, headers, body, ...params.fetchOptions };
    let url = new URL(params.url);
    let initResolved = init;
    if (params.middleware) {
        const result = await Promise.resolve(params.middleware({
            ...init,
            url: params.url,
            operationName: params.request._tag === `Single` ? params.request.document.operationName : undefined,
            variables: params.request.variables,
        }));
        const { url: urlNew, ...initNew } = result;
        url = new URL(urlNew);
        initResolved = initNew;
    }
    if (searchParams) {
        searchParams.forEach((value, name) => {
            url.searchParams.append(name, value);
        });
    }
    const $fetch = params.fetch ?? fetch;
    return await $fetch(url, initResolved);
};
const buildBody = (params) => {
    switch (params.request._tag) {
        case `Single`:
            return {
                query: params.request.document.expression,
                variables: params.request.variables,
                operationName: params.request.document.operationName,
            };
        case `Batch`:
            return (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.zip)(params.request.query, params.request.variables ?? []).map(([query, variables]) => ({
                query,
                variables,
            }));
        default:
            throw (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.casesExhausted)(params.request);
    }
};
const buildQueryParams = (params) => {
    const $jsonSerializer = params.fetchOptions.jsonSerializer ?? _defaultJsonSerializer_js__WEBPACK_IMPORTED_MODULE_4__.defaultJsonSerializer;
    const searchParams = new URLSearchParams();
    switch (params.request._tag) {
        case `Single`: {
            searchParams.append(`query`, (0,_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.cleanQuery)(params.request.document.expression));
            if (params.request.variables) {
                searchParams.append(`variables`, $jsonSerializer.stringify(params.request.variables));
            }
            if (params.request.document.operationName) {
                searchParams.append(`operationName`, params.request.document.operationName);
            }
            return searchParams;
        }
        case `Batch`: {
            const variablesSerialized = params.request.variables?.map((v) => $jsonSerializer.stringify(v)) ?? [];
            const queriesCleaned = params.request.query.map(_lib_graphql_js__WEBPACK_IMPORTED_MODULE_3__.cleanQuery);
            const payload = (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.zip)(queriesCleaned, variablesSerialized).map(([query, variables]) => ({
                query,
                variables,
            }));
            searchParams.append(`query`, $jsonSerializer.stringify(payload));
            return searchParams;
        }
        default:
            throw (0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_1__.casesExhausted)(params.request);
    }
};
//# sourceMappingURL=runRequest.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/legacy/lib/graphql.js":
/*!******************************************************************!*\
  !*** ./node_modules/graphql-request/build/legacy/lib/graphql.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanQuery: () => (/* binding */ cleanQuery),
/* harmony export */   isExecutionResultHaveErrors: () => (/* binding */ isExecutionResultHaveErrors),
/* harmony export */   isGraphQLContentType: () => (/* binding */ isGraphQLContentType),
/* harmony export */   isOperationDefinitionNode: () => (/* binding */ isOperationDefinitionNode),
/* harmony export */   isRequestResultHaveErrors: () => (/* binding */ isRequestResultHaveErrors),
/* harmony export */   parseExecutionResult: () => (/* binding */ parseExecutionResult),
/* harmony export */   parseGraphQLExecutionResult: () => (/* binding */ parseGraphQLExecutionResult)
/* harmony export */ });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var _lib_http_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/http.js */ "./node_modules/graphql-request/build/lib/http.js");
/* harmony import */ var _lib_prelude_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/prelude.js */ "./node_modules/graphql-request/build/lib/prelude.js");



/**
 * Clean a GraphQL document to send it via a GET query
 */
const cleanQuery = (str) => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim();
const isGraphQLContentType = (contentType) => {
    const contentTypeLower = contentType.toLowerCase();
    return contentTypeLower.includes(_lib_http_js__WEBPACK_IMPORTED_MODULE_1__.CONTENT_TYPE_GQL) || contentTypeLower.includes(_lib_http_js__WEBPACK_IMPORTED_MODULE_1__.CONTENT_TYPE_JSON);
};
const parseGraphQLExecutionResult = (result) => {
    try {
        if (Array.isArray(result)) {
            return {
                _tag: `Batch`,
                executionResults: result.map(parseExecutionResult),
            };
        }
        else if ((0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(result)) {
            return {
                _tag: `Single`,
                executionResult: parseExecutionResult(result),
            };
        }
        else {
            throw new Error(`Invalid execution result: result is not object or array. \nGot:\n${String(result)}`);
        }
    }
    catch (e) {
        return e;
    }
};
/**
 * Example result:
 *
 * ```
 * {
 *  "data": null,
 *  "errors": [{
 *    "message": "custom error",
 *    "locations": [{ "line": 2, "column": 3 }],
 *    "path": ["playerNew"]
 *  }]
 * }
 * ```
 */
const parseExecutionResult = (result) => {
    if (typeof result !== `object` || result === null) {
        throw new Error(`Invalid execution result: result is not object`);
    }
    let errors = undefined;
    let data = undefined;
    let extensions = undefined;
    if (`errors` in result) {
        if (!(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(result.errors) && !Array.isArray(result.errors)) {
            throw new Error(`Invalid execution result: errors is not plain object OR array`); // prettier-ignore
        }
        errors = result.errors;
    }
    // todo add test coverage for case of null. @see https://github.com/jasonkuhrt/graphql-request/issues/739
    if (`data` in result) {
        if (!(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(result.data) && result.data !== null) {
            throw new Error(`Invalid execution result: data is not plain object`); // prettier-ignore
        }
        data = result.data;
    }
    if (`extensions` in result) {
        if (!(0,_lib_prelude_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(result.extensions))
            throw new Error(`Invalid execution result: extensions is not plain object`); // prettier-ignore
        extensions = result.extensions;
    }
    return {
        data,
        errors,
        extensions,
    };
};
const isRequestResultHaveErrors = (result) => result._tag === `Batch`
    ? result.executionResults.some(isExecutionResultHaveErrors)
    : isExecutionResultHaveErrors(result.executionResult);
const isExecutionResultHaveErrors = (result) => Array.isArray(result.errors) ? result.errors.length > 0 : Boolean(result.errors);
const isOperationDefinitionNode = (definition) => {
    return (typeof definition === `object`
        && definition !== null
        && `kind` in definition
        && definition.kind === graphql__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION);
};
//# sourceMappingURL=graphql.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/lib/http.js":
/*!********************************************************!*\
  !*** ./node_modules/graphql-request/build/lib/http.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCEPT_HEADER: () => (/* binding */ ACCEPT_HEADER),
/* harmony export */   CONTENT_TYPE_GQL: () => (/* binding */ CONTENT_TYPE_GQL),
/* harmony export */   CONTENT_TYPE_HEADER: () => (/* binding */ CONTENT_TYPE_HEADER),
/* harmony export */   CONTENT_TYPE_JSON: () => (/* binding */ CONTENT_TYPE_JSON),
/* harmony export */   statusCodes: () => (/* binding */ statusCodes)
/* harmony export */ });
const ACCEPT_HEADER = `Accept`;
const CONTENT_TYPE_HEADER = `Content-Type`;
const CONTENT_TYPE_JSON = `application/json`;
const CONTENT_TYPE_GQL = `application/graphql-response+json`;
const statusCodes = {
    success: 200,
};
//# sourceMappingURL=http.js.map

/***/ }),

/***/ "./node_modules/graphql-request/build/lib/prelude.js":
/*!***********************************************************!*\
  !*** ./node_modules/graphql-request/build/lib/prelude.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeadersInitToPlainObject: () => (/* binding */ HeadersInitToPlainObject),
/* harmony export */   HeadersInstanceToPlainObject: () => (/* binding */ HeadersInstanceToPlainObject),
/* harmony export */   assertArray: () => (/* binding */ assertArray),
/* harmony export */   assertObject: () => (/* binding */ assertObject),
/* harmony export */   callOrIdentity: () => (/* binding */ callOrIdentity),
/* harmony export */   capitalizeFirstLetter: () => (/* binding */ capitalizeFirstLetter),
/* harmony export */   casesExhausted: () => (/* binding */ casesExhausted),
/* harmony export */   createDeferred: () => (/* binding */ createDeferred),
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   debugSub: () => (/* binding */ debugSub),
/* harmony export */   entries: () => (/* binding */ entries),
/* harmony export */   errorFromMaybeError: () => (/* binding */ errorFromMaybeError),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPromiseLikeValue: () => (/* binding */ isPromiseLikeValue),
/* harmony export */   lowerCaseFirstLetter: () => (/* binding */ lowerCaseFirstLetter),
/* harmony export */   mapValues: () => (/* binding */ mapValues),
/* harmony export */   partitionErrors: () => (/* binding */ partitionErrors),
/* harmony export */   tryCatch: () => (/* binding */ tryCatch),
/* harmony export */   uppercase: () => (/* binding */ uppercase),
/* harmony export */   values: () => (/* binding */ values),
/* harmony export */   zip: () => (/* binding */ zip)
/* harmony export */ });
const uppercase = (str) => str.toUpperCase();
const callOrIdentity = (value) => {
    return typeof value === `function` ? value() : value;
};
const zip = (a, b) => a.map((k, i) => [k, b[i]]);
const HeadersInitToPlainObject = (headers) => {
    let oHeaders = {};
    if (headers instanceof Headers) {
        oHeaders = HeadersInstanceToPlainObject(headers);
    }
    else if (Array.isArray(headers)) {
        headers.forEach(([name, value]) => {
            if (name && value !== undefined) {
                oHeaders[name] = value;
            }
        });
    }
    else if (headers) {
        oHeaders = headers;
    }
    return oHeaders;
};
const HeadersInstanceToPlainObject = (headers) => {
    const o = {};
    headers.forEach((v, k) => {
        o[k] = v;
    });
    return o;
};
const tryCatch = (fn) => {
    try {
        const result = fn();
        if (isPromiseLikeValue(result)) {
            return result.catch((error) => {
                return errorFromMaybeError(error);
            });
        }
        return result;
    }
    catch (error) {
        return errorFromMaybeError(error);
    }
};
/**
 * Ensure that the given value is an error and return it. If it is not an error than
 * wrap it in one, passing the given value as the error message.
 */
const errorFromMaybeError = (maybeError) => {
    if (maybeError instanceof Error)
        return maybeError;
    return new Error(String(maybeError));
};
const isPromiseLikeValue = (value) => {
    return (typeof value === `object`
        && value !== null
        && `then` in value
        && typeof value.then === `function`
        && `catch` in value
        && typeof value.catch === `function`
        && `finally` in value
        && typeof value.finally === `function`);
};
const casesExhausted = (value) => {
    throw new Error(`Unhandled case: ${String(value)}`);
};
const isPlainObject = (value) => {
    return typeof value === `object` && value !== null && !Array.isArray(value);
};
const entries = (obj) => Object.entries(obj);
const values = (obj) => Object.values(obj);
const mapValues = (object, fn) => {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => {
        return [key, fn(value, key)];
    }));
};
const lowerCaseFirstLetter = (s) => {
    return s.charAt(0).toLowerCase() + s.slice(1);
};
function assertArray(v) {
    if (!Array.isArray(v))
        throw new Error(`Expected array. Got: ${String(v)}`);
}
function assertObject(v) {
    if (v === null || typeof v !== `object`)
        throw new Error(`Expected object. Got: ${String(v)}`);
}
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const createDeferred = (options) => {
    let isResolved = false;
    let resolve;
    let reject;
    const promise = new Promise(($resolve, $reject) => {
        resolve = $resolve;
        reject = $reject;
    });
    return {
        promise,
        isResolved: () => isResolved,
        resolve: (value) => {
            isResolved = true;
            if (options?.strict && isResolved) {
                throw new Error(`Deferred is already resolved. Attempted to resolve with: ${JSON.stringify(value)}`);
            }
            resolve(value);
        },
        reject: (error) => reject(error),
    };
};
const debug = (...args) => {
    if (process.env[`DEBUG`]) {
        console.log(...args);
    }
};
const debugSub = (...args) => (...subArgs) => {
    debug(...args, ...subArgs);
};
const partitionErrors = (array) => {
    const errors = [];
    const values = [];
    for (const item of array) {
        if (item instanceof Error) {
            errors.push(item);
        }
        else {
            values.push(item);
        }
    }
    return [values, errors];
};
//# sourceMappingURL=prelude.js.map

/***/ }),

/***/ "./node_modules/graphql/error/GraphQLError.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/error/GraphQLError.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphQLError: () => (/* binding */ GraphQLError),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   printError: () => (/* binding */ printError)
/* harmony export */ });
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "./node_modules/graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _language_location_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/location.mjs */ "./node_modules/graphql/language/location.mjs");
/* harmony import */ var _language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/printLocation.mjs */ "./node_modules/graphql/language/printLocation.mjs");




function toNormalizedOptions(args) {
  const firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5],
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

class GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;

    const { nodes, source, positions, path, originalError, extensions } =
      toNormalizedOptions(rawArgs);
    super(message);
    this.name = 'GraphQLError';
    this.path = path !== null && path !== void 0 ? path : undefined;
    this.originalError =
      originalError !== null && originalError !== void 0
        ? originalError
        : undefined; // Compute list of blame nodes.

    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0
        ? void 0
        : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
    ); // Compute locations in the source for the given nodes/positions.

    this.source =
      source !== null && source !== void 0
        ? source
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : (_nodeLocations$ = nodeLocations[0]) === null ||
          _nodeLocations$ === void 0
        ? void 0
        : _nodeLocations$.source;
    this.positions =
      positions !== null && positions !== void 0
        ? positions
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => loc.start);
    this.locations =
      positions && source
        ? positions.map((pos) => (0,_language_location_mjs__WEBPACK_IMPORTED_MODULE_1__.getLocation)(source, pos))
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => (0,_language_location_mjs__WEBPACK_IMPORTED_MODULE_1__.getLocation)(loc.source, loc.start));
    const originalExtensions = (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectLike)(
      originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions,
    )
      ? originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions
      : undefined;
    this.extensions =
      (_ref =
        extensions !== null && extensions !== void 0
          ? extensions
          : originalExtensions) !== null && _ref !== void 0
        ? _ref
        : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true,
      },
      name: {
        enumerable: false,
      },
      nodes: {
        enumerable: false,
      },
      source: {
        enumerable: false,
      },
      positions: {
        enumerable: false,
      },
      originalError: {
        enumerable: false,
      },
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (
      originalError !== null &&
      originalError !== void 0 &&
      originalError.stack
    ) {
      Object.defineProperty(this, 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true,
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true,
      });
    }
    /* c8 ignore stop */
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLError';
  }

  toString() {
    let output = this.message;

    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += '\n\n' + (0,_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.printLocation)(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += '\n\n' + (0,_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.printSourceLocation)(this.source, location);
      }
    }

    return output;
  }

  toJSON() {
    const formattedError = {
      message: this.message,
    };

    if (this.locations != null) {
      formattedError.locations = this.locations;
    }

    if (this.path != null) {
      formattedError.path = this.path;
    }

    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }

    return formattedError;
  }
}

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}
/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */
function printError(error) {
  return error.toString();
}
/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 *
 * @deprecated Please use `error.toJSON` instead. Will be removed in v17
 */

function formatError(error) {
  return error.toJSON();
}


/***/ }),

/***/ "./node_modules/graphql/error/syntaxError.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/error/syntaxError.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   syntaxError: () => (/* binding */ syntaxError)
/* harmony export */ });
/* harmony import */ var _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphQLError.mjs */ "./node_modules/graphql/error/GraphQLError.mjs");

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position],
  });
}


/***/ }),

/***/ "./node_modules/graphql/jsutils/devAssert.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/jsutils/devAssert.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   devAssert: () => (/* binding */ devAssert)
/* harmony export */ });
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}


/***/ }),

/***/ "./node_modules/graphql/jsutils/inspect.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/jsutils/inspect.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inspect: () => (/* binding */ inspect)
/* harmony export */ });
const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}


/***/ }),

/***/ "./node_modules/graphql/jsutils/instanceOf.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/jsutils/instanceOf.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   instanceOf: () => (/* binding */ instanceOf)
/* harmony export */ });
/* harmony import */ var _inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");

/* c8 ignore next 3 */

const isProduction =
  globalThis.process && // eslint-disable-next-line no-undef
  "development" === 'production';
/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */

const instanceOf =
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  isProduction
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }

        if (typeof value === 'object' && value !== null) {
          var _value$constructor;

          // Prefer Symbol.toStringTag since it is immune to minification.
          const className = constructor.prototype[Symbol.toStringTag];
          const valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
            Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
              ? value[Symbol.toStringTag]
              : (_value$constructor = value.constructor) === null ||
                _value$constructor === void 0
              ? void 0
              : _value$constructor.name;

          if (className === valueClassName) {
            const stringifiedValue = (0,_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }

        return false;
      };


/***/ }),

/***/ "./node_modules/graphql/jsutils/invariant.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/jsutils/invariant.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invariant: () => (/* binding */ invariant)
/* harmony export */ });
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(
      message != null ? message : 'Unexpected invariant triggered.',
    );
  }
}


/***/ }),

/***/ "./node_modules/graphql/jsutils/isObjectLike.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/jsutils/isObjectLike.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isObjectLike: () => (/* binding */ isObjectLike)
/* harmony export */ });
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null;
}


/***/ }),

/***/ "./node_modules/graphql/language/ast.mjs":
/*!***********************************************!*\
  !*** ./node_modules/graphql/language/ast.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Location: () => (/* binding */ Location),
/* harmony export */   OperationTypeNode: () => (/* binding */ OperationTypeNode),
/* harmony export */   QueryDocumentKeys: () => (/* binding */ QueryDocumentKeys),
/* harmony export */   Token: () => (/* binding */ Token),
/* harmony export */   isNode: () => (/* binding */ isNode)
/* harmony export */ });
/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

var OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));




/***/ }),

/***/ "./node_modules/graphql/language/blockString.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/language/blockString.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dedentBlockStringLines: () => (/* binding */ dedentBlockStringLines),
/* harmony export */   isPrintableAsBlockString: () => (/* binding */ isPrintableAsBlockString),
/* harmony export */   printBlockString: () => (/* binding */ printBlockString)
/* harmony export */ });
/* harmony import */ var _characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characterClasses.mjs */ "./node_modules/graphql/language/characterClasses.mjs");

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace(str) {
  let i = 0;

  while (i < str.length && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * @internal
 */

function isPrintableAsBlockString(value) {
  if (value === '') {
    return true; // empty string is printable
  }

  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;

  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0x0000:
      case 0x0001:
      case 0x0002:
      case 0x0003:
      case 0x0004:
      case 0x0005:
      case 0x0006:
      case 0x0007:
      case 0x0008:
      case 0x000b:
      case 0x000c:
      case 0x000e:
      case 0x000f:
        return false;
      // Has non-printable characters

      case 0x000d:
        //  \r
        return false;
      // Has \r or \r\n which will be replaced as \n

      case 10:
        //  \n
        if (isEmptyLine && !seenNonEmptyLine) {
          return false; // Has leading new line
        }

        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        hasIndent || (hasIndent = isEmptyLine);
        break;

      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }

  if (isEmptyLine) {
    return false; // Has trailing empty lines
  }

  if (hasCommonIndent && seenNonEmptyLine) {
    return false; // Has internal indent
  }

  return true;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}


/***/ }),

/***/ "./node_modules/graphql/language/characterClasses.mjs":
/*!************************************************************!*\
  !*** ./node_modules/graphql/language/characterClasses.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDigit: () => (/* binding */ isDigit),
/* harmony export */   isLetter: () => (/* binding */ isLetter),
/* harmony export */   isNameContinue: () => (/* binding */ isNameContinue),
/* harmony export */   isNameStart: () => (/* binding */ isNameStart),
/* harmony export */   isWhiteSpace: () => (/* binding */ isWhiteSpace)
/* harmony export */ });
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}


/***/ }),

/***/ "./node_modules/graphql/language/directiveLocation.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/graphql/language/directiveLocation.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirectiveLocation: () => (/* binding */ DirectiveLocation)
/* harmony export */ });
/**
 * The set of allowed directive location values.
 */
var DirectiveLocation;

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (DirectiveLocation = {}));


/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */


/***/ }),

/***/ "./node_modules/graphql/language/kinds.mjs":
/*!*************************************************!*\
  !*** ./node_modules/graphql/language/kinds.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kind: () => (/* binding */ Kind)
/* harmony export */ });
/**
 * The set of allowed kind values for AST nodes.
 */
var Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));


/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */


/***/ }),

/***/ "./node_modules/graphql/language/lexer.mjs":
/*!*************************************************!*\
  !*** ./node_modules/graphql/language/lexer.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lexer: () => (/* binding */ Lexer),
/* harmony export */   isPunctuatorTokenKind: () => (/* binding */ isPunctuatorTokenKind)
/* harmony export */ });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "./node_modules/graphql/error/syntaxError.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");
/* harmony import */ var _characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./characterClasses.mjs */ "./node_modules/graphql/language/characterClasses.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokenKind.mjs */ "./node_modules/graphql/language/tokenKind.mjs");





/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

class Lexer {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.Token(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Lexer';
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */

  advance() {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */

  lookahead() {
    let token = this.token;

    if (token.kind !== _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          // Read the next token and form a link in the token linked-list.
          const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

          token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.COMMENT);
    }

    return token;
  }
}
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return (
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BANG ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.DOLLAR ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.AMP ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PAREN_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PAREN_R ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.SPREAD ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.COLON ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.EQUALS ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.AT ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACKET_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACKET_R ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACE_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PIPE ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACE_R
  );
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */

function isUnicodeScalarValue(code) {
  return (
    (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
  );
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */

function isSupplementaryCodePoint(body, location) {
  return (
    isLeadingSurrogate(body.charCodeAt(location)) &&
    isTrailingSurrogate(body.charCodeAt(location + 1))
  );
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */

function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    const char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : `"${char}"`;
  } // Unicode code point

  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */

function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */

function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (
          body.charCodeAt(position + 1) === 0x002e &&
          body.charCodeAt(position + 2) === 0x002e
        ) {
          return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isDigit)(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isNameStart)(code)) {
      return readName(lexer, position);
    }

    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
      lexer.source,
      position,
      code === 0x0027
        ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
        : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
        ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
        : `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */

function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position),
  );
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */

function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)

  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isDigit)(code)) {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)

  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e

  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart

  if (code === 0x002e || (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isNameStart)(code)) {
    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
    );
  }

  return createToken(
    lexer,
    isFloat ? _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.FLOAT : _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.INT,
    start,
    position,
    body.slice(start, position),
  );
}
/**
 * Returns the new position in the source after reading one or more digits.
 */

function readDigits(lexer, start, firstCode) {
  if (!(0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isDigit)(firstCode)) {
    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
    );
  }

  const body = lexer.source.body;
  let position = start + 1; // +1 to skip first firstCode

  while ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isDigit)(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */

function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = '';

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)

    if (code === 0x005c) {
      value += body.slice(chunkStart, position);
      const escape =
        body.charCodeAt(position + 1) === 0x0075 // u
          ? body.charCodeAt(position + 2) === 0x007b // {
            ? readEscapedUnicodeVariableWidth(lexer, position)
            : readEscapedUnicodeFixedWidth(lexer, position)
          : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.

function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    const code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size,
      };
    } // Append this hex digit to the code point.

    point = (point << 4) | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
  );
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6,
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.

  if (isLeadingSurrogate(code)) {
    // \u
    if (
      body.charCodeAt(position + 6) === 0x005c &&
      body.charCodeAt(position + 7) === 0x0075
    ) {
      const trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12,
        };
      }
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
  );
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */

function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return (
    (readHexDigit(body.charCodeAt(position)) << 12) |
    (readHexDigit(body.charCodeAt(position + 1)) << 8) |
    (readHexDigit(body.charCodeAt(position + 2)) << 4) |
    readHexDigit(body.charCodeAt(position + 3))
  );
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */

function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
    ? code - 0x0030
    : code >= 0x0041 && code <= 0x0046 // A-F
    ? code - 0x0037
    : code >= 0x0061 && code <= 0x0066 // a-f
    ? code - 0x0057
    : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */

function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: '\u0022',
        size: 2,
      };

    case 0x005c:
      // \
      return {
        value: '\u005c',
        size: 2,
      };

    case 0x002f:
      // /
      return {
        value: '\u002f',
        size: 2,
      };

    case 0x0062:
      // b
      return {
        value: '\u0008',
        size: 2,
      };

    case 0x0066:
      // f
      return {
        value: '\u000c',
        size: 2,
      };

    case 0x006e:
      // n
      return {
        value: '\u000a',
        size: 2,
      };

    case 0x0072:
      // r
      return {
        value: '\u000d',
        size: 2,
      };

    case 0x0074:
      // t
      return {
        value: '\u0009',
        size: 2,
      };
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
  );
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */

function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = '';
  const blockLines = [];

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (
      code === 0x0022 &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.BLOCK_STRING,
        start,
        position + 3, // Return a string of the lines joined with U+000A.
        (0,_blockString_mjs__WEBPACK_IMPORTED_MODULE_2__.dedentBlockStringLines)(blockLines).join('\n'),
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")

    if (
      code === 0x005c &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022 &&
      body.charCodeAt(position + 3) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator

    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */

function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position);

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_3__.isNameContinue)(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_4__.TokenKind.NAME,
    start,
    position,
    body.slice(start, position),
  );
}


/***/ }),

/***/ "./node_modules/graphql/language/location.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/language/location.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocation: () => (/* binding */ getLocation)
/* harmony export */ });
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "./node_modules/graphql/jsutils/invariant.mjs");

const LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;

  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === 'number' || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);

    if (match.index >= position) {
      break;
    }

    lastLineStart = match.index + match[0].length;
    line += 1;
  }

  return {
    line,
    column: position + 1 - lastLineStart,
  };
}


/***/ }),

/***/ "./node_modules/graphql/language/parser.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/language/parser.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Parser: () => (/* binding */ Parser),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseConstValue: () => (/* binding */ parseConstValue),
/* harmony export */   parseType: () => (/* binding */ parseType),
/* harmony export */   parseValue: () => (/* binding */ parseValue)
/* harmony export */ });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "./node_modules/graphql/error/syntaxError.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directiveLocation.mjs */ "./node_modules/graphql/language/directiveLocation.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./kinds.mjs */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var _lexer_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lexer.mjs */ "./node_modules/graphql/language/lexer.mjs");
/* harmony import */ var _source_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./source.mjs */ "./node_modules/graphql/language/source.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokenKind.mjs */ "./node_modules/graphql/language/tokenKind.mjs");







/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, 'tokenCount', {
    enumerable: false,
    value: parser.tokenCount,
  });
  return document;
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */

function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EOF);
  return value;
}
/**
 * Similar to parseValue(), but raises a parse error if it encounters a
 * variable. The return type will be a constant value.
 */

function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */

function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

class Parser {
  constructor(source, options = {}) {
    const sourceObj = (0,_source_mjs__WEBPACK_IMPORTED_MODULE_5__.isSource)(source) ? source : new _source_mjs__WEBPACK_IMPORTED_MODULE_5__.Source(source);
    this._lexer = new _lexer_mjs__WEBPACK_IMPORTED_MODULE_4__.Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }

  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */

  parseName() {
    const token = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME);
    return this.node(token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NAME,
      value: token.value,
    });
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */

  parseDocument() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DOCUMENT,
      definitions: this.many(
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SOF,
        this.parseDefinition,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EOF,
      ),
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */

  parseDefinition() {
    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } // Many definitions begin with a description and require a lookahead.

    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription
      ? this._lexer.lookahead()
      : this._lexer.token;

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }

      if (hasDescription) {
        throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
          this._lexer.source,
          this._lexer.token.start,
          'Unexpected description, descriptions are supported only on type definitions.',
        );
      }

      switch (keywordToken.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    }

    throw this.unexpected(keywordToken);
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */

  parseOperationDefinition() {
    const start = this._lexer.token;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_DEFINITION,
        operation: _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    }

    const operation = this.parseOperationType();
    let name;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME)) {
      name = this.parseName();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */

  parseOperationType() {
    const operationToken = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.OperationTypeNode.QUERY;

      case 'mutation':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.OperationTypeNode.MUTATION;

      case 'subscription':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.OperationTypeNode.SUBSCRIPTION;
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */

  parseVariableDefinitions() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_L,
      this.parseVariableDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_R,
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */

  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EQUALS)
        ? this.parseConstValueLiteral()
        : undefined,
      directives: this.parseConstDirectives(),
    });
  }
  /**
   * Variable : $ Name
   */

  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.DOLLAR);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.VARIABLE,
      name: this.parseName(),
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */

  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SELECTION_SET,
      selections: this.many(
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
        this.parseSelection,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
      ),
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */

  parseSelection() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SPREAD)
      ? this.parseFragment()
      : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */

  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L)
        ? this.parseSelectionSet()
        : undefined,
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */

  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */

  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst),
    });
  }

  parseConstArgument() {
    return this.parseArgument(true);
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */

  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
      });
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */

  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
      });
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentName : Name but not `on`
   */

  parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseValueLiteral(isConst) {
    const token = this._lexer.token;

    switch (token.kind) {
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INT,
          value: token.value,
        });

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FLOAT,
          value: token.value,
        });

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.STRING:
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME:
        this.advanceLexer();

        switch (token.value) {
          case 'true':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.BOOLEAN,
              value: true,
            });

          case 'false':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.BOOLEAN,
              value: false,
            });

          case 'null':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NULL,
            });

          default:
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM,
              value: token.value,
            });
        }

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.DOLLAR);

          if (this._lexer.token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`,
            );
          } else {
            throw this.unexpected(token);
          }
        }

        return this.parseVariable();

      default:
        throw this.unexpected();
    }
  }

  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }

  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.STRING,
      value: token.value,
      block: token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BLOCK_STRING,
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */

  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);

    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.LIST,
      values: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACKET_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACKET_R),
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */

  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);

    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT,
      fields: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R),
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */

  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
    });
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */

  parseDirectives(isConst) {
    const directives = [];

    while (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }

  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */

  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.AT);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
    });
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */

  parseTypeReference() {
    const start = this._lexer.token;
    let type;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.LIST_TYPE,
        type: innerType,
      });
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BANG)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NON_NULL_TYPE,
        type,
      });
    }

    return type;
  }
  /**
   * NamedType : Name
   */

  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NAMED_TYPE,
      name: this.parseName(),
    });
  } // Implements the parsing rules in the Type Definition section.

  peekDescription() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.STRING) || this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */

  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */

  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
    );
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */

  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */

  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */

  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */

  parseImplementsInterfaces() {
    return this.expectOptionalKeyword('implements')
      ? this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.AMP, this.parseNamedType)
      : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */

  parseFieldsDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
      this.parseFieldDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */

  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */

  parseArgumentDefs() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_L,
      this.parseInputValueDef,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PAREN_R,
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */

  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }

    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */

  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */

  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */

  parseUnionMemberTypes() {
    return this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EQUALS)
      ? this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PIPE, this.parseNamedType)
      : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */

  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */

  parseEnumValuesDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */

  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseEnumValueName() {
    if (
      this._lexer.token.value === 'true' ||
      this._lexer.token.value === 'false' ||
      this._lexer.token.value === 'null'
    ) {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
      );
    }

    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */

  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */

  parseInputFieldsDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
      this.parseInputValueDef,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */

  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */

  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.BRACE_R,
    );

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */

  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */

  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */

  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */

  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */

  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */

  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */

  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */

  parseDirectiveLocations() {
    return this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */

  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();

    if (Object.prototype.hasOwnProperty.call(_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation, name.value)) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */

  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__.Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source,
      );
    }

    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */

  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }

    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`,
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */

  unexpected(atToken) {
    const token =
      atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`,
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */

  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  }

  advanceLexer() {
    const { maxTokens } = this._options;

    const token = this._lexer.advance();

    if (token.kind !== _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_6__.TokenKind.EOF) {
      ++this._tokenCounter;

      if (maxTokens !== undefined && this._tokenCounter > maxTokens) {
        throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__.syntaxError)(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`,
        );
      }
    }
  }
}
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */

function getTokenKindDesc(kind) {
  return (0,_lexer_mjs__WEBPACK_IMPORTED_MODULE_4__.isPunctuatorTokenKind)(kind) ? `"${kind}"` : kind;
}


/***/ }),

/***/ "./node_modules/graphql/language/printLocation.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/graphql/language/printLocation.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printLocation: () => (/* binding */ printLocation),
/* harmony export */   printSourceLocation: () => (/* binding */ printSourceLocation)
/* harmony export */ });
/* harmony import */ var _location_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location.mjs */ "./node_modules/graphql/language/location.mjs");


/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(
    location.source,
    (0,_location_mjs__WEBPACK_IMPORTED_MODULE_0__.getLocation)(location.source, location.start),
  );
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = ''.padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];

    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
        ['|', '^'.padStart(subLineColumnNum)],
        ['|', subLines[subLineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ['|', '^'.padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
    .join('\n');
}


/***/ }),

/***/ "./node_modules/graphql/language/printString.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/language/printString.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printString: () => (/* binding */ printString)
/* harmony export */ });
/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
} // eslint-disable-next-line no-control-regex

const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore

const escapeSequences = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000B',
  '\\f',
  '\\r',
  '\\u000E',
  '\\u000F',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001A',
  '\\u001B',
  '\\u001C',
  '\\u001D',
  '\\u001E',
  '\\u001F',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 2F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 3F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 4F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
  '',
  '',
  '', // 5F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 6F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\u007F',
  '\\u0080',
  '\\u0081',
  '\\u0082',
  '\\u0083',
  '\\u0084',
  '\\u0085',
  '\\u0086',
  '\\u0087',
  '\\u0088',
  '\\u0089',
  '\\u008A',
  '\\u008B',
  '\\u008C',
  '\\u008D',
  '\\u008E',
  '\\u008F',
  '\\u0090',
  '\\u0091',
  '\\u0092',
  '\\u0093',
  '\\u0094',
  '\\u0095',
  '\\u0096',
  '\\u0097',
  '\\u0098',
  '\\u0099',
  '\\u009A',
  '\\u009B',
  '\\u009C',
  '\\u009D',
  '\\u009E',
  '\\u009F',
];


/***/ }),

/***/ "./node_modules/graphql/language/printer.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/printer.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   print: () => (/* binding */ print)
/* harmony export */ });
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");
/* harmony import */ var _printString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./printString.mjs */ "./node_modules/graphql/language/printString.mjs");
/* harmony import */ var _visitor_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visitor.mjs */ "./node_modules/graphql/language/visitor.mjs");



/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return (0,_visitor_mjs__WEBPACK_IMPORTED_MODULE_2__.visit)(ast, printDocASTReducer);
}
const MAX_LINE_LENGTH = 80;
const printDocASTReducer = {
  Name: {
    leave: (node) => node.value,
  },
  Variable: {
    leave: (node) => '$' + node.name,
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, '\n\n'),
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
      const prefix = join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, ' '),
        ],
        ' ',
      ); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) =>
      variable +
      ': ' +
      type +
      wrap(' = ', defaultValue) +
      wrap(' ', join(directives, ' ')),
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections),
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap('', alias, ': ') + name;
      let argsLine = prefix + wrap('(', join(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
      }

      return join([argsLine, join(directives, ' '), selectionSet], ' ');
    },
  },
  Argument: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) =>
      '...' + name + wrap(' ', join(directives, ' ')),
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) =>
      join(
        [
          '...',
          wrap('on ', typeCondition),
          join(directives, ' '),
          selectionSet,
        ],
        ' ',
      ),
  },
  FragmentDefinition: {
    leave: (
      { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
    ) =>
      // or removed in the future.
      `fragment ${name}${wrap('(', join(variableDefinitions, ', '), ')')} ` +
      `on ${typeCondition} ${wrap('', join(directives, ' '), ' ')}` +
      selectionSet,
  },
  // Value
  IntValue: {
    leave: ({ value }) => value,
  },
  FloatValue: {
    leave: ({ value }) => value,
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) =>
      isBlockString ? (0,_blockString_mjs__WEBPACK_IMPORTED_MODULE_0__.printBlockString)(value) : (0,_printString_mjs__WEBPACK_IMPORTED_MODULE_1__.printString)(value),
  },
  BooleanValue: {
    leave: ({ value }) => (value ? 'true' : 'false'),
  },
  NullValue: {
    leave: () => 'null',
  },
  EnumValue: {
    leave: ({ value }) => value,
  },
  ListValue: {
    leave: ({ values }) => '[' + join(values, ', ') + ']',
  },
  ObjectValue: {
    leave: ({ fields }) => '{' + join(fields, ', ') + '}',
  },
  ObjectField: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) =>
      '@' + name + wrap('(', join(args, ', '), ')'),
  },
  // Type
  NamedType: {
    leave: ({ name }) => name,
  },
  ListType: {
    leave: ({ type }) => '[' + type + ']',
  },
  NonNullType: {
    leave: ({ type }) => type + '!',
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) =>
      wrap('', description, '\n') +
      join(['schema', join(directives, ' '), block(operationTypes)], ' '),
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ': ' + type,
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') +
      join(['scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) =>
      wrap('', description, '\n') +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      ': ' +
      type +
      wrap(' ', join(directives, ' ')),
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) =>
      wrap('', description, '\n') +
      join(
        [name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')],
        ' ',
      ),
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) =>
      wrap('', description, '\n') +
      join(
        ['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))],
        ' ',
      ),
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) =>
      wrap('', description, '\n') +
      join(['enum', name, join(directives, ' '), block(values)], ' '),
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') + join([name, join(directives, ' ')], ' '),
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) =>
      wrap('', description, '\n') +
      join(['input', name, join(directives, ' '), block(fields)], ' '),
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) =>
      wrap('', description, '\n') +
      'directive @' +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      (repeatable ? ' repeatable' : '') +
      ' on ' +
      join(locations, ' | '),
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) =>
      join(
        ['extend schema', join(directives, ' '), block(operationTypes)],
        ' ',
      ),
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) =>
      join(['extend scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) =>
      join(
        [
          'extend union',
          name,
          join(directives, ' '),
          wrap('= ', join(types, ' | ')),
        ],
        ' ',
      ),
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) =>
      join(['extend enum', name, join(directives, ' '), block(values)], ' '),
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) =>
      join(['extend input', name, join(directives, ' '), block(fields)], ' '),
  },
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join(maybeArray, separator = '') {
  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.filter((x) => x).join(separator)) !== null &&
    _maybeArray$filter$jo !== void 0
    ? _maybeArray$filter$jo
    : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */

function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */

function wrap(start, maybeString, end = '') {
  return maybeString != null && maybeString !== ''
    ? start + maybeString + end
    : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems(maybeArray) {
  var _maybeArray$some;

  // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */
  return (_maybeArray$some =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.some((str) => str.includes('\n'))) !== null &&
    _maybeArray$some !== void 0
    ? _maybeArray$some
    : false;
}


/***/ }),

/***/ "./node_modules/graphql/language/source.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/language/source.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Source: () => (/* binding */ Source),
/* harmony export */   isSource: () => (/* binding */ isSource)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "./node_modules/graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "./node_modules/graphql/jsutils/instanceOf.mjs");




/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
class Source {
  constructor(
    body,
    name = 'GraphQL request',
    locationOffset = {
      line: 1,
      column: 1,
    },
  ) {
    typeof body === 'string' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, `Body must be a string. Received: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(
        false,
        'line in locationOffset is 1-indexed and must be positive.',
      );
    this.locationOffset.column > 0 ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(
        false,
        'column in locationOffset is 1-indexed and must be positive.',
      );
  }

  get [Symbol.toStringTag]() {
    return 'Source';
  }
}
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */

function isSource(source) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_2__.instanceOf)(source, Source);
}


/***/ }),

/***/ "./node_modules/graphql/language/tokenKind.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/language/tokenKind.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenKind: () => (/* binding */ TokenKind)
/* harmony export */ });
/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind;

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));


/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */


/***/ }),

/***/ "./node_modules/graphql/language/visitor.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/visitor.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BREAK: () => (/* binding */ BREAK),
/* harmony export */   getEnterLeaveForKind: () => (/* binding */ getEnterLeaveForKind),
/* harmony export */   getVisitFn: () => (/* binding */ getVisitFn),
/* harmony export */   visit: () => (/* binding */ visit),
/* harmony export */   visitInParallel: () => (/* binding */ visitInParallel)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "./node_modules/graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./kinds.mjs */ "./node_modules/graphql/language/kinds.mjs");




/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

const BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

function visit(root, visitor, visitorKeys = _ast_mjs__WEBPACK_IMPORTED_MODULE_2__.QueryDocumentKeys) {
  const enterLeaveMap = new Map();

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */

  let stack = undefined;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = undefined;
  let parent = undefined;
  const path = [];
  const ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;

          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;

            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = { ...node };

          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    let result;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      (0,_ast_mjs__WEBPACK_IMPORTED_MODULE_2__.isNode)(node) || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, `Invalid AST Node: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(node)}.`);
      const visitFn = isLeaving
        ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get === void 0
          ? void 0
          : _enterLeaveMap$get.leave
        : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get2 === void 0
        ? void 0
        : _enterLeaveMap$get2.enter;
      result =
        visitFn === null || visitFn === void 0
          ? void 0
          : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if ((0,_ast_mjs__WEBPACK_IMPORTED_MODULE_2__.isNode)(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack,
      };
      inArray = Array.isArray(node);
      keys = inArray
        ? node
        : (_node$kind = visitorKeys[node.kind]) !== null &&
          _node$kind !== void 0
        ? _node$kind
        : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = Object.create(null);

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(undefined);
    const leaveList = new Array(visitors.length).fill(undefined);

    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }

    if (!hasVisitor) {
      continue;
    }

    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;

            const result =
              (_enterList$i = enterList[i]) === null || _enterList$i === void 0
                ? void 0
                : _enterList$i.apply(visitors[i], args);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      },

      leave(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;

            const result =
              (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0
                ? void 0
                : _leaveList$i.apply(visitors[i], args);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      },
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }

  return mergedVisitor;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */

function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];

  if (typeof kindVisitor === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined,
    };
  } // { enter() {}, leave() {} }

  return {
    enter: visitor.enter,
    leave: visitor.leave,
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 *
 * @deprecated Please use `getEnterLeaveForKind` instead. Will be removed in v17
 */

/* c8 ignore next 8 */

function getVisitFn(visitor, kind, isLeaving) {
  const { enter, leave } = getEnterLeaveForKind(visitor, kind);
  return isLeaving ? leave : enter;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/view.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-request */ "./node_modules/graphql-request/build/entrypoints/main.js");

const QUERY = (0,graphql_request__WEBPACK_IMPORTED_MODULE_0__.gql)`
  query GetLatestPosts($count: Int!) {
    posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        content
        uri
        title
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
            altText
          }
        }
      }
    }
  }
`;
function createCard(post) {
  const card = document.createElement('article');
  card.className = 'flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1';
  const media = document.createElement('div');
  media.className = 'relative w-full pt-[85%] bg-gray-100 overflow-hidden';
  const src = post.featuredImage?.node?.sourceUrl;
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = post.featuredImage?.node?.altText || post.title || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'absolute inset-0 w-full h-full object-cover';
    media.appendChild(img);
  }
  card.appendChild(media);
  const body = document.createElement('div');
  body.className = 'p-5 md:p-6 mt-3';
  const link = document.createElement('a');
  link.href = post.uri;
  link.className = 'block hover:underline';
  const title = document.createElement('h3');
  title.className = 'font-semibold text-xl md:text-2xl leading-snug line-clamp-2';
  title.textContent = post.title;
  link.appendChild(title);
  body.appendChild(link);
  card.appendChild(body);
  return card;
}
function renderGrid(root, posts) {
  root.innerHTML = '';

  // Full‑bleed wrapper: 100vw + negative margins to escape theme constraints
  const outer = document.createElement('div');
  outer.className = 'px-6 w-full';
  outer.style.maxWidth = '100vw !important';
  // outer.style.marginLeft = 'calc(50% - 50vw)';
  // outer.style.marginRight = 'calc(50% - 50vw)';

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8';
  posts.forEach(p => grid.appendChild(createCard(p)));
  outer.appendChild(grid);
  root.appendChild(outer);
}
function init(container) {
  const count = parseInt(container.getAttribute('data-post-count') || '4', 10);
  const root = container.querySelector('.lpg-root');
  if (!root) return;
  const endpoint = window?.LATEST_POSTS_GRID_VARS?.graphqlEndpoint || `${window.location.protocol}//${window.location.host}/graphql`;
  (0,graphql_request__WEBPACK_IMPORTED_MODULE_0__.request)(endpoint, QUERY, {
    count
  }).then(data => {
    var _data$posts$nodes;
    return renderGrid(root, (_data$posts$nodes = data?.posts?.nodes) !== null && _data$posts$nodes !== void 0 ? _data$posts$nodes : []);
  }).catch(() => {
    root.innerHTML = '<p>Failed to load posts.</p>';
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.wp-block-custom-latest-posts-grid').forEach(container => init(container));
});
})();

/******/ })()
;
//# sourceMappingURL=view.tsx.js.map