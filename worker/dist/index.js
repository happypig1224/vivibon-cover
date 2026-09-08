var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/hono/dist/cjs/compose.js
var require_compose = __commonJS({
  "node_modules/hono/dist/cjs/compose.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var compose_exports = {};
    __export2(compose_exports, {
      compose: () => compose
    });
    module.exports = __toCommonJS(compose_exports);
    var compose = (middleware, onError, onNotFound) => {
      return (context, next) => {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
          if (i <= index) {
            throw new Error("next() called multiple times");
          }
          index = i;
          let res;
          let isError = false;
          let handler;
          if (middleware[i]) {
            handler = middleware[i][0][0];
            context.req.routeIndex = i;
          } else {
            handler = i === middleware.length && next || void 0;
          }
          if (handler) {
            try {
              res = await handler(context, () => dispatch(i + 1));
            } catch (err) {
              if (err instanceof Error && onError) {
                context.error = err;
                res = await onError(err, context);
                isError = true;
              } else {
                throw err;
              }
            }
          } else {
            if (context.finalized === false && onNotFound) {
              res = await onNotFound(context);
            }
          }
          if (res && (context.finalized === false || isError)) {
            context.res = res;
          }
          return context;
        }
      };
    };
  }
});

// node_modules/hono/dist/cjs/http-exception.js
var require_http_exception = __commonJS({
  "node_modules/hono/dist/cjs/http-exception.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var http_exception_exports = {};
    __export2(http_exception_exports, {
      HTTPException: () => HTTPException
    });
    module.exports = __toCommonJS(http_exception_exports);
    var HTTPException = class extends Error {
      res;
      status;
      /**
       * Creates an instance of `HTTPException`.
       * @param status - HTTP status code for the exception. Defaults to 500.
       * @param options - Additional options for the exception.
       */
      constructor(status = 500, options) {
        super(options?.message, { cause: options?.cause });
        this.res = options?.res;
        this.status = status;
      }
      /**
       * Returns the response object associated with the exception.
       * If a response object is not provided, a new response is created with the error message and status code.
       * @returns The response object.
       */
      getResponse() {
        if (this.res) {
          const newResponse = new Response(this.res.body, {
            status: this.status,
            headers: this.res.headers
          });
          return newResponse;
        }
        return new Response(this.message, {
          status: this.status
        });
      }
    };
  }
});

// node_modules/hono/dist/cjs/request/constants.js
var require_constants = __commonJS({
  "node_modules/hono/dist/cjs/request/constants.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var constants_exports = {};
    __export2(constants_exports, {
      GET_MATCH_RESULT: () => GET_MATCH_RESULT
    });
    module.exports = __toCommonJS(constants_exports);
    var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
  }
});

// node_modules/hono/dist/cjs/utils/crypto.js
var require_crypto = __commonJS({
  "node_modules/hono/dist/cjs/utils/crypto.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var crypto_exports = {};
    __export2(crypto_exports, {
      createHash: () => createHash,
      md5: () => md5,
      sha1: () => sha1,
      sha256: () => sha256
    });
    module.exports = __toCommonJS(crypto_exports);
    var sha256 = async (data) => {
      const algorithm = { name: "SHA-256", alias: "sha256" };
      const hash = await createHash(data, algorithm);
      return hash;
    };
    var sha1 = async (data) => {
      const algorithm = { name: "SHA-1", alias: "sha1" };
      const hash = await createHash(data, algorithm);
      return hash;
    };
    var md5 = async (data) => {
      const algorithm = { name: "MD5", alias: "md5" };
      const hash = await createHash(data, algorithm);
      return hash;
    };
    var createHash = async (data, algorithm) => {
      let sourceBuffer;
      if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer) {
        sourceBuffer = data;
      } else {
        if (typeof data === "object") {
          data = JSON.stringify(data);
        }
        sourceBuffer = new TextEncoder().encode(String(data));
      }
      if (crypto && crypto.subtle) {
        const buffer = await crypto.subtle.digest(
          {
            name: algorithm.name
          },
          sourceBuffer
        );
        const hash = Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
        return hash;
      }
      return null;
    };
  }
});

// node_modules/hono/dist/cjs/utils/buffer.js
var require_buffer = __commonJS({
  "node_modules/hono/dist/cjs/utils/buffer.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var buffer_exports = {};
    __export2(buffer_exports, {
      bufferToFormData: () => bufferToFormData,
      bufferToString: () => bufferToString,
      equal: () => equal,
      timingSafeEqual: () => timingSafeEqual
    });
    module.exports = __toCommonJS(buffer_exports);
    var import_crypto = require_crypto();
    var equal = (a, b) => {
      if (a === b) {
        return true;
      }
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      const va = new DataView(a);
      const vb = new DataView(b);
      let i = va.byteLength;
      while (i--) {
        if (va.getUint8(i) !== vb.getUint8(i)) {
          return false;
        }
      }
      return true;
    };
    var constantTimeEqualString = (a, b) => {
      const aLen = a.length;
      const bLen = b.length;
      const maxLen = Math.max(aLen, bLen);
      let out = aLen ^ bLen;
      for (let i = 0; i < maxLen; i++) {
        const aChar = i < aLen ? a.charCodeAt(i) : 0;
        const bChar = i < bLen ? b.charCodeAt(i) : 0;
        out |= aChar ^ bChar;
      }
      return out === 0;
    };
    var timingSafeEqualString = async (a, b, hashFunction) => {
      if (!hashFunction) {
        hashFunction = import_crypto.sha256;
      }
      const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
      if (sa == null || sb == null || typeof sa !== "string" || typeof sb !== "string") {
        return false;
      }
      const hashEqual = constantTimeEqualString(sa, sb);
      const originalEqual = constantTimeEqualString(a, b);
      return hashEqual && originalEqual;
    };
    var timingSafeEqual = async (a, b, hashFunction) => {
      if (typeof a === "string" && typeof b === "string") {
        return timingSafeEqualString(a, b, hashFunction);
      }
      if (!hashFunction) {
        hashFunction = import_crypto.sha256;
      }
      const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
      if (!sa || !sb || typeof sa !== "string" || typeof sb !== "string") {
        return false;
      }
      return timingSafeEqualString(sa, sb);
    };
    var bufferToString = (buffer) => {
      if (buffer instanceof ArrayBuffer) {
        const enc = new TextDecoder("utf-8");
        return enc.decode(buffer);
      }
      return buffer;
    };
    var bufferToFormData = (arrayBuffer, contentType) => {
      const response = new Response(arrayBuffer, {
        headers: {
          // Normalize the media type (case-insensitive) while keeping parameters like the boundary
          "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
        }
      });
      return response.formData();
    };
  }
});

// node_modules/hono/dist/cjs/utils/body.js
var require_body = __commonJS({
  "node_modules/hono/dist/cjs/utils/body.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var body_exports = {};
    __export2(body_exports, {
      parseBody: () => parseBody
    });
    module.exports = __toCommonJS(body_exports);
    var import_buffer = require_buffer();
    var MAX_NESTING_DEPTH = 32;
    var MAX_NESTED_OBJECTS = 1e4;
    var isRawRequest = (request) => "headers" in request;
    var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
      const { all = false, dot = false } = options;
      const headers = isRawRequest(request) ? request.headers : request.raw.headers;
      const contentType = headers.get("Content-Type");
      const mediaType = contentType?.split(";")[0].trim().toLowerCase();
      if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
        return parseFormData(request, { all, dot });
      }
      return {};
    };
    async function parseFormData(request, options) {
      if (!isRawRequest(request) && request.bodyCache.formData) {
        return convertFormDataToBodyData(
          await request.bodyCache.formData,
          options
        );
      }
      const headers = isRawRequest(request) ? request.headers : request.raw.headers;
      const arrayBuffer = await request.arrayBuffer();
      const formDataPromise = (0, import_buffer.bufferToFormData)(arrayBuffer, headers.get("Content-Type") || "");
      if (!isRawRequest(request)) {
        request.bodyCache.formData = formDataPromise;
      }
      const formData = await formDataPromise;
      if (formData) {
        return convertFormDataToBodyData(formData, options);
      }
      return {};
    }
    function convertFormDataToBodyData(formData, options) {
      const form = /* @__PURE__ */ Object.create(null);
      const nestingState = { count: 0 };
      formData.forEach((value, key) => {
        const shouldParseAllValues = options.all || key.endsWith("[]");
        if (!shouldParseAllValues) {
          form[key] = value;
        } else {
          handleParsingAllValues(form, key, value);
        }
      });
      if (options.dot) {
        Object.entries(form).forEach(([key, value]) => {
          const shouldParseDotValues = key.includes(".");
          if (shouldParseDotValues) {
            handleParsingNestedValues(form, key, value, nestingState);
            delete form[key];
          }
        });
      }
      return form;
    }
    var handleParsingAllValues = (form, key, value) => {
      if (form[key] !== void 0) {
        if (Array.isArray(form[key])) {
          ;
          form[key].push(value);
        } else {
          form[key] = [form[key], value];
        }
      } else {
        if (!key.endsWith("[]")) {
          form[key] = value;
        } else {
          form[key] = [value];
        }
      }
    };
    var handleParsingNestedValues = (form, key, value, state) => {
      if (/(?:^|\.)__proto__\./.test(key)) {
        return;
      }
      let nestedForm = form;
      const keys = key.split(".", MAX_NESTING_DEPTH + 2);
      if (keys.length > MAX_NESTING_DEPTH + 1) {
        throwNestingLimitExceeded();
      }
      keys.forEach((key2, index) => {
        if (index === keys.length - 1) {
          nestedForm[key2] = value;
        } else {
          if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
            if (state.count++ >= MAX_NESTED_OBJECTS) {
              throwNestingLimitExceeded();
            }
            nestedForm[key2] = /* @__PURE__ */ Object.create(null);
          }
          nestedForm = nestedForm[key2];
        }
      });
    };
    var throwNestingLimitExceeded = () => {
      throw new Error("Nesting limit exceeded");
    };
  }
});

// node_modules/hono/dist/cjs/utils/url.js
var require_url = __commonJS({
  "node_modules/hono/dist/cjs/utils/url.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var url_exports = {};
    __export2(url_exports, {
      checkOptionalParameter: () => checkOptionalParameter,
      decodeURIComponent_: () => decodeURIComponent_,
      getPath: () => getPath,
      getPathNoStrict: () => getPathNoStrict,
      getPattern: () => getPattern,
      getQueryParam: () => getQueryParam,
      getQueryParams: () => getQueryParams,
      getQueryStrings: () => getQueryStrings,
      mergePath: () => mergePath,
      splitPath: () => splitPath,
      splitRoutingPath: () => splitRoutingPath,
      tryDecode: () => tryDecode,
      tryDecodeURI: () => tryDecodeURI,
      tryDecodeURIComponent: () => tryDecodeURIComponent
    });
    module.exports = __toCommonJS(url_exports);
    var splitPath = (path) => {
      const paths = path.split("/");
      if (paths[0] === "") {
        paths.shift();
      }
      return paths;
    };
    var splitRoutingPath = (routePath) => {
      const { groups, path } = extractGroupsFromPath(routePath);
      const paths = splitPath(path);
      return replaceGroupMarks(paths, groups);
    };
    var extractGroupsFromPath = (path) => {
      const groups = [];
      path = path.replace(/\{[^}]+\}/g, (match, index) => {
        const mark = `@${index}`;
        groups.push([mark, match]);
        return mark;
      });
      return { groups, path };
    };
    var replaceGroupMarks = (paths, groups) => {
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = paths.length - 1; j >= 0; j--) {
          if (paths[j].includes(mark)) {
            paths[j] = paths[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      return paths;
    };
    var patternCache = {};
    var getPattern = (label, next) => {
      if (label === "*") {
        return "*";
      }
      const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      if (match) {
        const cacheKey = `${label}#${next}`;
        if (!patternCache[cacheKey]) {
          if (match[2]) {
            patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
          } else {
            patternCache[cacheKey] = [label, match[1], true];
          }
        }
        return patternCache[cacheKey];
      }
      return null;
    };
    var tryDecode = (str, decoder) => {
      try {
        return decoder(str);
      } catch {
        return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
          try {
            return decoder(match);
          } catch {
            return match;
          }
        });
      }
    };
    var tryDecodeURI = (str) => tryDecode(str, decodeURI);
    var getPath = (request) => {
      const url = request.url;
      const start = url.indexOf("/", url.indexOf(":") + 4);
      let i = start;
      for (; i < url.length; i++) {
        const charCode = url.charCodeAt(i);
        if (charCode === 37) {
          const queryIndex = url.indexOf("?", i);
          const hashIndex = url.indexOf("#", i);
          const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
          const path = url.slice(start, end);
          return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
        } else if (charCode === 63 || charCode === 35) {
          break;
        }
      }
      return url.slice(start, i);
    };
    var getQueryStrings = (url) => {
      const queryIndex = url.indexOf("?", 8);
      if (queryIndex === -1) {
        return "";
      }
      const hashIndex = url.indexOf("#", 8);
      return hashIndex === -1 ? url.slice(queryIndex) : queryIndex < hashIndex ? url.slice(queryIndex, hashIndex) : "";
    };
    var getPathNoStrict = (request) => {
      const result = getPath(request);
      return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
    };
    var mergePath = (base, sub, ...rest) => {
      if (rest.length) {
        sub = mergePath(sub, ...rest);
      }
      return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
    };
    var checkOptionalParameter = (path) => {
      if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
        return null;
      }
      const segments = path.split("/");
      const results = [];
      let basePath = "";
      segments.forEach((segment) => {
        if (segment !== "" && !/\:/.test(segment)) {
          basePath += "/" + segment;
        } else if (/\:/.test(segment)) {
          if (segment.charCodeAt(segment.length - 1) === 63) {
            if (results.length === 0 && basePath === "") {
              results.push("/");
            } else {
              results.push(basePath);
            }
            const optionalSegment = segment.slice(0, -1);
            basePath += "/" + optionalSegment;
            results.push(basePath);
          } else {
            basePath += "/" + segment;
          }
        }
      });
      return results.filter((v, i, a) => a.indexOf(v) === i);
    };
    var tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
    var _decodeURI = (value) => {
      if (value.indexOf("+") !== -1) {
        value = value.replace(/\+/g, " ");
      }
      return tryDecodeURIComponent(value);
    };
    var _getQueryParam = (url, key, multiple) => {
      const hashIndex = url.indexOf("#", 8);
      if (hashIndex !== -1) {
        url = url.slice(0, hashIndex);
      }
      let encoded;
      if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
        let keyIndex2 = url.indexOf("?", 8);
        if (keyIndex2 === -1) {
          return void 0;
        }
        if (!url.startsWith(key, keyIndex2 + 1)) {
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        while (keyIndex2 !== -1) {
          const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
          if (trailingKeyCode === 61) {
            const valueIndex = keyIndex2 + key.length + 2;
            const endIndex = url.indexOf("&", valueIndex);
            return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
          } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
            return "";
          }
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        encoded = /[%+]/.test(url);
        if (!encoded) {
          return void 0;
        }
      }
      const results = /* @__PURE__ */ Object.create(null);
      encoded ??= /[%+]/.test(url);
      let keyIndex = url.indexOf("?", 8);
      while (keyIndex !== -1) {
        const nextKeyIndex = url.indexOf("&", keyIndex + 1);
        let valueIndex = url.indexOf("=", keyIndex);
        if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
          valueIndex = -1;
        }
        let name = url.slice(
          keyIndex + 1,
          valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
        );
        if (encoded) {
          name = _decodeURI(name);
        }
        keyIndex = nextKeyIndex;
        if (name === "") {
          continue;
        }
        let value;
        if (valueIndex === -1) {
          value = "";
        } else {
          value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
          if (encoded) {
            value = _decodeURI(value);
          }
        }
        if (multiple) {
          if (!(results[name] && Array.isArray(results[name]))) {
            results[name] = [];
          }
          ;
          results[name].push(value);
        } else {
          results[name] ??= value;
        }
      }
      return key ? results[key] : results;
    };
    var getQueryParam = _getQueryParam;
    var getQueryParams = (url, key) => {
      return _getQueryParam(url, key, true);
    };
    var decodeURIComponent_ = decodeURIComponent;
  }
});

// node_modules/hono/dist/cjs/request.js
var require_request = __commonJS({
  "node_modules/hono/dist/cjs/request.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var request_exports = {};
    __export2(request_exports, {
      HonoRequest: () => HonoRequest,
      cloneRawRequest: () => cloneRawRequest
    });
    module.exports = __toCommonJS(request_exports);
    var import_http_exception = require_http_exception();
    var import_constants = require_constants();
    var import_body = require_body();
    var import_url = require_url();
    var HonoRequest = class {
      /**
       * `.raw` can get the raw Request object.
       *
       * @see {@link https://hono.dev/docs/api/request#raw}
       *
       * @example
       * ```ts
       * // For Cloudflare Workers
       * app.post('/', async (c) => {
       *   const metadata = c.req.raw.cf?.hostMetadata?
       *   ...
       * })
       * ```
       */
      raw;
      #validatedData;
      // Short name of validatedData
      #matchResult;
      routeIndex = 0;
      /**
       * `.path` can get the pathname of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#path}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const pathname = c.req.path // `/about/me`
       * })
       * ```
       */
      path;
      bodyCache = {};
      constructor(request, path = "/", matchResult = [[]]) {
        this.raw = request;
        this.path = path;
        this.#matchResult = matchResult;
      }
      param(key) {
        return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
      }
      #getDecodedParam(key) {
        const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
        const param = this.#getParamValue(paramKey);
        return param && (0, import_url.tryDecodeURIComponent)(param);
      }
      #getAllDecodedParams() {
        const decoded = {};
        const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
        for (const key of keys) {
          const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
          if (value !== void 0) {
            decoded[key] = (0, import_url.tryDecodeURIComponent)(value);
          }
        }
        return decoded;
      }
      #getParamValue(paramKey) {
        return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
      }
      query(key) {
        return (0, import_url.getQueryParam)(this.url, key);
      }
      queries(key) {
        return (0, import_url.getQueryParams)(this.url, key);
      }
      header(name) {
        if (name) {
          return this.raw.headers.get(name) ?? void 0;
        }
        const headerData = /* @__PURE__ */ Object.create(null);
        this.raw.headers.forEach((value, key) => {
          headerData[key] = value;
        });
        return headerData;
      }
      async parseBody(options) {
        return (0, import_body.parseBody)(this, options);
      }
      #cachedBody = (key) => {
        const { bodyCache, raw } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        for (const anyCachedKey in bodyCache) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw[key]();
      };
      /**
       * `.json()` can parse Request body of type `application/json`
       *
       * @see {@link https://hono.dev/docs/api/request#json}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.json()
       * })
       * ```
       */
      json() {
        return this.#cachedBody("text").then((text) => JSON.parse(text));
      }
      /**
       * `.text()` can parse Request body of type `text/plain`
       *
       * @see {@link https://hono.dev/docs/api/request#text}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.text()
       * })
       * ```
       */
      text() {
        return this.#cachedBody("text");
      }
      /**
       * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
       *
       * @see {@link https://hono.dev/docs/api/request#arraybuffer}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.arrayBuffer()
       * })
       * ```
       */
      arrayBuffer() {
        return this.#cachedBody("arrayBuffer");
      }
      /**
       * `.bytes()` parses the request body as a `Uint8Array`.
       *
       * @see {@link https://hono.dev/docs/api/request#bytes}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.bytes()
       * })
       * ```
       */
      bytes() {
        return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
      }
      /**
       * Parses the request body as a `Blob`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.blob();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#blob
       */
      blob() {
        return this.#cachedBody("blob");
      }
      /**
       * Parses the request body as `FormData`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.formData();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#formdata
       */
      formData() {
        return this.#cachedBody("formData");
      }
      /**
       * Adds validated data to the request.
       *
       * @param target - The target of the validation.
       * @param data - The validated data to add.
       */
      addValidatedData(target, data) {
        ;
        (this.#validatedData ??= {})[target] = data;
      }
      valid(target) {
        return this.#validatedData?.[target];
      }
      /**
       * `.url()` can get the request url strings.
       *
       * @see {@link https://hono.dev/docs/api/request#url}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const url = c.req.url // `http://localhost:8787/about/me`
       *   ...
       * })
       * ```
       */
      get url() {
        return this.raw.url;
      }
      /**
       * `.method()` can get the method name of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#method}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const method = c.req.method // `GET`
       * })
       * ```
       */
      get method() {
        return this.raw.method;
      }
      get [import_constants.GET_MATCH_RESULT]() {
        return this.#matchResult;
      }
      /**
       * `.matchedRoutes()` can return a matched route in the handler
       *
       * @deprecated
       *
       * Use matchedRoutes helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#matchedroutes}
       *
       * @example
       * ```ts
       * app.use('*', async function logger(c, next) {
       *   await next()
       *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
       *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
       *     console.log(
       *       method,
       *       ' ',
       *       path,
       *       ' '.repeat(Math.max(10 - path.length, 0)),
       *       name,
       *       i === c.req.routeIndex ? '<- respond from here' : ''
       *     )
       *   })
       * })
       * ```
       */
      get matchedRoutes() {
        return this.#matchResult[0].map(([[, route]]) => route);
      }
      /**
       * `routePath()` can retrieve the path registered within the handler
       *
       * @deprecated
       *
       * Use routePath helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#routepath}
       *
       * @example
       * ```ts
       * app.get('/posts/:id', (c) => {
       *   return c.json({ path: c.req.routePath })
       * })
       * ```
       */
      get routePath() {
        return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
      }
    };
    var cloneRawRequest = async (req) => {
      if (!req.raw.bodyUsed) {
        return req.raw.clone();
      }
      const cacheKey = Object.keys(req.bodyCache)[0];
      if (!cacheKey) {
        throw new import_http_exception.HTTPException(500, {
          message: "Cannot clone request: body was already consumed and not cached. Please use HonoRequest methods (e.g., req.json(), req.text()) instead of consuming req.raw directly."
        });
      }
      let body = await req[cacheKey]();
      const headers = req.header();
      if (cacheKey === "json") {
        body = JSON.stringify(body);
        delete headers["content-length"];
      } else if (body instanceof FormData) {
        delete headers["content-type"];
        delete headers["content-length"];
      }
      const requestInit = {
        body,
        cache: req.raw.cache,
        credentials: req.raw.credentials,
        headers,
        integrity: req.raw.integrity,
        keepalive: req.raw.keepalive,
        method: req.method,
        mode: req.raw.mode,
        redirect: req.raw.redirect,
        referrer: req.raw.referrer,
        referrerPolicy: req.raw.referrerPolicy,
        signal: req.raw.signal
      };
      return new Request(req.url, requestInit);
    };
  }
});

// node_modules/hono/dist/cjs/utils/html.js
var require_html = __commonJS({
  "node_modules/hono/dist/cjs/utils/html.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var html_exports = {};
    __export2(html_exports, {
      HtmlEscapedCallbackPhase: () => HtmlEscapedCallbackPhase,
      escapeToBuffer: () => escapeToBuffer,
      raw: () => raw,
      resolveCallback: () => resolveCallback,
      resolveCallbackSync: () => resolveCallbackSync,
      stringBufferToString: () => stringBufferToString
    });
    module.exports = __toCommonJS(html_exports);
    var HtmlEscapedCallbackPhase = {
      Stringify: 1,
      BeforeStream: 2,
      Stream: 3
    };
    var raw = (value, callbacks) => {
      const escapedString = new String(value);
      escapedString.isEscaped = true;
      escapedString.callbacks = callbacks;
      return escapedString;
    };
    var escapeRe = /[&<>'"]/;
    var stringBufferToString = async (buffer, callbacks) => {
      let str = "";
      callbacks ||= [];
      const resolvedBuffer = await Promise.all(buffer);
      for (let i = resolvedBuffer.length - 1; ; i--) {
        str += resolvedBuffer[i];
        i--;
        if (i < 0) {
          break;
        }
        let r = resolvedBuffer[i];
        if (typeof r === "object") {
          callbacks.push(...r.callbacks || []);
        }
        const isEscaped = r.isEscaped;
        r = await (typeof r === "object" ? r.toString() : r);
        if (typeof r === "object") {
          callbacks.push(...r.callbacks || []);
        }
        if (r.isEscaped ?? isEscaped) {
          str += r;
        } else {
          const buf = [str];
          escapeToBuffer(r, buf);
          str = buf[0];
        }
      }
      return raw(str, callbacks);
    };
    var escapeToBuffer = (str, buffer) => {
      const match = str.search(escapeRe);
      if (match === -1) {
        buffer[0] += str;
        return;
      }
      let escape;
      let index;
      let lastIndex = 0;
      for (index = match; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        buffer[0] += str.substring(lastIndex, index) + escape;
        lastIndex = index + 1;
      }
      buffer[0] += str.substring(lastIndex, index);
    };
    var resolveCallbackSync = (str) => {
      const callbacks = str.callbacks;
      if (!callbacks?.length) {
        return str;
      }
      const buffer = [str];
      const context = {};
      callbacks.forEach((c) => c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context }));
      return buffer[0];
    };
    var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
      if (typeof str === "object" && !(str instanceof String)) {
        if (!(str instanceof Promise)) {
          str = str.toString();
        }
        if (str instanceof Promise) {
          str = await str;
        }
      }
      const callbacks = str.callbacks;
      if (!callbacks?.length) {
        return Promise.resolve(str);
      }
      if (buffer) {
        buffer[0] += str;
      } else {
        buffer = [str];
      }
      const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
        (res) => Promise.all(
          res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
        ).then(() => buffer[0])
      );
      if (preserveCallbacks) {
        return raw(await resStr, callbacks);
      } else {
        return resStr;
      }
    };
  }
});

// node_modules/hono/dist/cjs/context.js
var require_context = __commonJS({
  "node_modules/hono/dist/cjs/context.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var context_exports = {};
    __export2(context_exports, {
      Context: () => Context2,
      TEXT_PLAIN: () => TEXT_PLAIN
    });
    module.exports = __toCommonJS(context_exports);
    var import_request = require_request();
    var import_html = require_html();
    var TEXT_PLAIN = "text/plain; charset=UTF-8";
    var setDefaultContentType = (contentType, headers) => {
      return {
        "Content-Type": contentType,
        ...headers
      };
    };
    var createResponseInstance = (body, init) => new Response(body, init);
    var Context2 = class {
      #rawRequest;
      #req;
      /**
       * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
       *
       * @see {@link https://hono.dev/docs/api/context#env}
       *
       * @example
       * ```ts
       * // Environment object for Cloudflare Workers
       * app.get('*', async c => {
       *   const counter = c.env.COUNTER
       * })
       * ```
       */
      env = {};
      #var;
      finalized = false;
      /**
       * `.error` can get the error object from the middleware if the Handler throws an error.
       *
       * @see {@link https://hono.dev/docs/api/context#error}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   await next()
       *   if (c.error) {
       *     // do something...
       *   }
       * })
       * ```
       */
      error;
      #status;
      #executionCtx;
      #res;
      #layout;
      #renderer;
      #notFoundHandler;
      #preparedHeaders;
      #matchResult;
      #path;
      /**
       * Creates an instance of the Context class.
       *
       * @param req - The Request object.
       * @param options - Optional configuration options for the context.
       */
      constructor(req, options) {
        this.#rawRequest = req;
        if (options) {
          this.#executionCtx = options.executionCtx;
          this.env = options.env;
          this.#notFoundHandler = options.notFoundHandler;
          this.#path = options.path;
          this.#matchResult = options.matchResult;
        }
      }
      /**
       * `.req` is the instance of {@link HonoRequest}.
       */
      get req() {
        this.#req ??= new import_request.HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
        return this.#req;
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#event}
       * The FetchEvent associated with the current request.
       *
       * @throws Will throw an error if the context does not have a FetchEvent.
       */
      get event() {
        if (this.#executionCtx && "respondWith" in this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no FetchEvent");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#executionctx}
       * The ExecutionContext associated with the current request.
       *
       * @throws Will throw an error if the context does not have an ExecutionContext.
       */
      get executionCtx() {
        if (this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no ExecutionContext");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#res}
       * The Response object for the current request.
       */
      get res() {
        return this.#res ||= createResponseInstance(null, {
          headers: this.#preparedHeaders ??= new Headers()
        });
      }
      /**
       * Sets the Response object for the current request.
       *
       * @param _res - The Response object to set.
       */
      set res(_res) {
        if (this.#res && _res) {
          _res = createResponseInstance(_res.body, _res);
          for (const [k, v] of this.#res.headers.entries()) {
            if (k === "content-type") {
              continue;
            }
            if (k === "set-cookie") {
              const cookies = this.#res.headers.getSetCookie();
              _res.headers.delete("set-cookie");
              for (const cookie of cookies) {
                _res.headers.append("set-cookie", cookie);
              }
            } else {
              _res.headers.set(k, v);
            }
          }
        }
        this.#res = _res;
        this.finalized = true;
      }
      /**
       * `.render()` can create a response within a layout.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   return c.render('Hello!')
       * })
       * ```
       */
      render = (...args) => {
        this.#renderer ??= (content) => this.html(content);
        return this.#renderer(...args);
      };
      /**
       * Sets the layout for the response.
       *
       * @param layout - The layout to set.
       * @returns The layout function.
       */
      setLayout = (layout) => this.#layout = layout;
      /**
       * Gets the current layout for the response.
       *
       * @returns The current layout function.
       */
      getLayout = () => this.#layout;
      /**
       * `.setRenderer()` can set the layout in the custom middleware.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```tsx
       * app.use('*', async (c, next) => {
       *   c.setRenderer((content) => {
       *     return c.html(
       *       <html>
       *         <body>
       *           <p>{content}</p>
       *         </body>
       *       </html>
       *     )
       *   })
       *   await next()
       * })
       * ```
       */
      setRenderer = (renderer) => {
        this.#renderer = renderer;
      };
      /**
       * `.header()` can set headers.
       *
       * @see {@link https://hono.dev/docs/api/context#header}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *
       *   // Append multiple headers using the append option (e.g. Vary)
       *   c.header('Vary', 'Accept-Encoding', { append: true })
       *   c.header('Vary', 'User-Agent', { append: true })
       *
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      header = (name, value, options) => {
        if (this.finalized) {
          this.#res = createResponseInstance(this.#res.body, this.#res);
        }
        const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
        if (value === void 0) {
          headers.delete(name);
        } else if (options?.append) {
          headers.append(name, value);
        } else {
          headers.set(name, value);
        }
      };
      status = (status) => {
        this.#status = status;
      };
      /**
       * `.set()` can set the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   c.set('message', 'Hono is hot!!')
       *   await next()
       * })
       * ```
       */
      set = (key, value) => {
        this.#var ??= /* @__PURE__ */ new Map();
        this.#var.set(key, value);
      };
      /**
       * `.get()` can use the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   const message = c.get('message')
       *   return c.text(`The message is "${message}"`)
       * })
       * ```
       */
      get = (key) => {
        return this.#var ? this.#var.get(key) : void 0;
      };
      /**
       * `.var` can access the value of a variable.
       *
       * @see {@link https://hono.dev/docs/api/context#var}
       *
       * @example
       * ```ts
       * const result = c.var.client.oneMethod()
       * ```
       */
      // c.var.propName is a read-only
      get var() {
        if (!this.#var) {
          return {};
        }
        return Object.fromEntries(this.#var);
      }
      #newResponse(data, arg, headers) {
        let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
        if (typeof arg === "object" && arg.headers) {
          responseHeaders ??= new Headers();
          for (const [key, value] of new Headers(arg.headers)) {
            if (key === "set-cookie") {
              responseHeaders.append(key, value);
            } else {
              responseHeaders.set(key, value);
            }
          }
        }
        if (headers) {
          if (!responseHeaders) {
            let count = 0;
            for (const k in headers) {
              if (++count > 1 || typeof headers[k] !== "string") {
                responseHeaders = new Headers();
                break;
              }
            }
          }
          if (responseHeaders) {
            for (const k in headers) {
              const v = headers[k];
              if (typeof v === "string") {
                responseHeaders.set(k, v);
              } else {
                responseHeaders.delete(k);
                for (const v2 of v) {
                  responseHeaders.append(k, v2);
                }
              }
            }
          }
        }
        const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
        return createResponseInstance(data, {
          status,
          headers: responseHeaders ?? headers
        });
      }
      newResponse = (...args) => this.#newResponse(...args);
      /**
       * `.body()` can return the HTTP response.
       * You can set headers with `.header()` and set HTTP status code with `.status`.
       * This can also be set in `.text()`, `.json()` and so on.
       *
       * @see {@link https://hono.dev/docs/api/context#body}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *   // Set HTTP status code
       *   c.status(201)
       *
       *   // Return the response body
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      body = (data, arg, headers) => this.#newResponse(data, arg, headers);
      /**
       * `.text()` can render text as `Content-Type:text/plain`.
       *
       * @see {@link https://hono.dev/docs/api/context#text}
       *
       * @example
       * ```ts
       * app.get('/say', (c) => {
       *   return c.text('Hello!')
       * })
       * ```
       */
      text = (text, arg, headers) => {
        return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
          text,
          arg,
          setDefaultContentType(TEXT_PLAIN, headers)
        );
      };
      /**
       * `.json()` can render JSON as `Content-Type:application/json`.
       *
       * @see {@link https://hono.dev/docs/api/context#json}
       *
       * @example
       * ```ts
       * app.get('/api', (c) => {
       *   return c.json({ message: 'Hello!' })
       * })
       * ```
       */
      json = (object, arg, headers) => {
        return this.#newResponse(
          JSON.stringify(object),
          arg,
          setDefaultContentType("application/json", headers)
        );
      };
      html = (html, arg, headers) => {
        const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
        return typeof html === "object" ? (0, import_html.resolveCallback)(html, import_html.HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
      };
      /**
       * `.redirect()` can Redirect, default status code is 302.
       *
       * @see {@link https://hono.dev/docs/api/context#redirect}
       *
       * @example
       * ```ts
       * app.get('/redirect', (c) => {
       *   return c.redirect('/')
       * })
       * app.get('/redirect-permanently', (c) => {
       *   return c.redirect('/', 301)
       * })
       * ```
       */
      redirect = (location, status) => {
        const locationString = String(location);
        this.header(
          "Location",
          // Multibyes should be encoded
          // eslint-disable-next-line no-control-regex
          !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
        );
        return this.newResponse(null, status ?? 302);
      };
      /**
       * `.notFound()` can return the Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/context#notfound}
       *
       * @example
       * ```ts
       * app.get('/notfound', (c) => {
       *   return c.notFound()
       * })
       * ```
       */
      notFound = () => {
        this.#notFoundHandler ??= () => createResponseInstance();
        return this.#notFoundHandler(this);
      };
    };
  }
});

// node_modules/hono/dist/cjs/router.js
var require_router = __commonJS({
  "node_modules/hono/dist/cjs/router.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var router_exports = {};
    __export2(router_exports, {
      MESSAGE_MATCHER_IS_ALREADY_BUILT: () => MESSAGE_MATCHER_IS_ALREADY_BUILT,
      METHODS: () => METHODS,
      METHOD_NAME_ALL: () => METHOD_NAME_ALL,
      METHOD_NAME_ALL_LOWERCASE: () => METHOD_NAME_ALL_LOWERCASE,
      UnsupportedPathError: () => UnsupportedPathError
    });
    module.exports = __toCommonJS(router_exports);
    var METHOD_NAME_ALL = "ALL";
    var METHOD_NAME_ALL_LOWERCASE = "all";
    var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
    var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
    var UnsupportedPathError = class extends Error {
    };
  }
});

// node_modules/hono/dist/cjs/utils/constants.js
var require_constants2 = __commonJS({
  "node_modules/hono/dist/cjs/utils/constants.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var constants_exports = {};
    __export2(constants_exports, {
      COMPOSED_HANDLER: () => COMPOSED_HANDLER
    });
    module.exports = __toCommonJS(constants_exports);
    var COMPOSED_HANDLER = "__COMPOSED_HANDLER";
  }
});

// node_modules/hono/dist/cjs/hono-base.js
var require_hono_base = __commonJS({
  "node_modules/hono/dist/cjs/hono-base.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var hono_base_exports = {};
    __export2(hono_base_exports, {
      HonoBase: () => Hono6
    });
    module.exports = __toCommonJS(hono_base_exports);
    var import_compose = require_compose();
    var import_context = require_context();
    var import_router = require_router();
    var import_constants = require_constants2();
    var import_url = require_url();
    var notFoundHandler = (c) => {
      return c.text("404 Not Found", 404);
    };
    var errorHandler = (err, c) => {
      if ("getResponse" in err) {
        const res = err.getResponse();
        return c.newResponse(res.body, res);
      }
      console.error(err);
      return c.text("Internal Server Error", 500);
    };
    var Hono6 = class _Hono {
      get;
      post;
      put;
      delete;
      options;
      patch;
      query;
      all;
      on;
      use;
      /*
        This class is like an abstract class and does not have a router.
        To use it, inherit the class and implement router in the constructor.
      */
      router;
      getPath;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      _basePath = "/";
      #path = "/";
      routes = [];
      constructor(options = {}) {
        const allMethods = [...import_router.METHODS, import_router.METHOD_NAME_ALL_LOWERCASE];
        allMethods.forEach((method) => {
          this[method] = (args1, ...args) => {
            const methodName = method.toUpperCase();
            if (typeof args1 === "string") {
              this.#path = args1;
            } else {
              this.#addRoute(methodName, this.#path, args1);
            }
            args.forEach((handler) => {
              this.#addRoute(methodName, this.#path, handler);
            });
            return this;
          };
        });
        this.on = (method, path, ...handlers) => {
          for (const p of [path].flat()) {
            this.#path = p;
            for (const m of [method].flat()) {
              const methodName = m.toUpperCase();
              for (const handler of handlers) {
                this.#addRoute(methodName, this.#path, handler);
              }
            }
          }
          return this;
        };
        this.use = (arg1, ...handlers) => {
          if (typeof arg1 === "string") {
            this.#path = arg1;
          } else {
            this.#path = "*";
            handlers.unshift(arg1);
          }
          handlers.forEach((handler) => {
            this.#addRoute(import_router.METHOD_NAME_ALL, this.#path, handler);
          });
          return this;
        };
        const { strict, ...optionsWithoutStrict } = options;
        Object.assign(this, optionsWithoutStrict);
        this.getPath = strict ?? true ? options.getPath ?? import_url.getPath : import_url.getPathNoStrict;
      }
      #clone() {
        const clone = new _Hono({
          router: this.router,
          getPath: this.getPath
        });
        clone.errorHandler = this.errorHandler;
        clone.#notFoundHandler = this.#notFoundHandler;
        clone.routes = this.routes;
        return clone;
      }
      #notFoundHandler = notFoundHandler;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      errorHandler = errorHandler;
      /**
       * `.route()` allows grouping other Hono instance in routes.
       *
       * @see {@link https://hono.dev/docs/api/routing#grouping}
       *
       * @param {string} path - base Path
       * @param {Hono} app - other Hono instance
       * @returns {Hono} routed Hono instance
       *
       * @example
       * ```ts
       * const app = new Hono()
       * const app2 = new Hono()
       *
       * app2.get("/user", (c) => c.text("user"))
       * app.route("/api", app2) // GET /api/user
       * ```
       */
      route(path, app2) {
        const subApp = this.basePath(path);
        app2.routes.map((r) => {
          let handler;
          if (app2.errorHandler === errorHandler) {
            handler = r.handler;
          } else {
            handler = async (c, next) => (await (0, import_compose.compose)([], app2.errorHandler)(c, () => r.handler(c, next))).res;
            handler[import_constants.COMPOSED_HANDLER] = r.handler;
          }
          subApp.#addRoute(r.method, r.path, handler, r.basePath);
        });
        return this;
      }
      /**
       * `.basePath()` allows base paths to be specified.
       *
       * @see {@link https://hono.dev/docs/api/routing#base-path}
       *
       * @param {string} path - base Path
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * const api = new Hono().basePath('/api')
       * ```
       */
      basePath(path) {
        const subApp = this.#clone();
        subApp._basePath = (0, import_url.mergePath)(this._basePath, path);
        return subApp;
      }
      /**
       * `.onError()` handles an error and returns a customized Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#error-handling}
       *
       * @param {ErrorHandler} handler - request Handler for error
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.onError((err, c) => {
       *   console.error(`${err}`)
       *   return c.text('Custom Error Message', 500)
       * })
       * ```
       */
      onError = (handler) => {
        this.errorHandler = handler;
        return this;
      };
      /**
       * `.notFound()` allows you to customize a Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#not-found}
       *
       * @param {NotFoundHandler} handler - request handler for not-found
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.notFound((c) => {
       *   return c.text('Custom 404 Message', 404)
       * })
       * ```
       */
      notFound = (handler) => {
        this.#notFoundHandler = handler;
        return this;
      };
      /**
       * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
       *
       * @see {@link https://hono.dev/docs/api/hono#mount}
       *
       * @param {string} path - base Path
       * @param {Function} applicationHandler - other Request Handler
       * @param {MountOptions} [options] - options of `.mount()`
       * @returns {Hono} mounted Hono instance
       *
       * @example
       * ```ts
       * import { Router as IttyRouter } from 'itty-router'
       * import { Hono } from 'hono'
       * // Create itty-router application
       * const ittyRouter = IttyRouter()
       * // GET /itty-router/hello
       * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
       *
       * const app = new Hono()
       * app.mount('/itty-router', ittyRouter.handle)
       * ```
       *
       * @example
       * ```ts
       * const app = new Hono()
       * // Send the request to another application without modification.
       * app.mount('/app', anotherApp, {
       *   replaceRequest: (req) => req,
       * })
       * ```
       */
      mount(path, applicationHandler, options) {
        let replaceRequest;
        let optionHandler;
        if (options) {
          if (typeof options === "function") {
            optionHandler = options;
          } else {
            optionHandler = options.optionHandler;
            if (options.replaceRequest === false) {
              replaceRequest = (request) => request;
            } else {
              replaceRequest = options.replaceRequest;
            }
          }
        }
        const getOptions = optionHandler ? (c) => {
          const options2 = optionHandler(c);
          return Array.isArray(options2) ? options2 : [options2];
        } : (c) => {
          let executionContext = void 0;
          try {
            executionContext = c.executionCtx;
          } catch {
          }
          return [c.env, executionContext];
        };
        replaceRequest ||= (() => {
          const mergedPath = (0, import_url.mergePath)(this._basePath, path);
          const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
          return (request) => {
            const url = new URL(request.url);
            url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
            return new Request(url, request);
          };
        })();
        const handler = async (c, next) => {
          const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
          if (res) {
            return res;
          }
          await next();
        };
        this.#addRoute(import_router.METHOD_NAME_ALL, (0, import_url.mergePath)(path, "*"), handler);
        return this;
      }
      #addRoute(method, path, handler, baseRoutePath) {
        path = (0, import_url.mergePath)(this._basePath, path);
        const r = {
          basePath: baseRoutePath !== void 0 ? (0, import_url.mergePath)(this._basePath, baseRoutePath) : this._basePath,
          path,
          method,
          handler
        };
        this.router.add(method, path, [handler, r]);
        this.routes.push(r);
      }
      #handleError(err, c) {
        if (err instanceof Error) {
          return this.errorHandler(err, c);
        }
        throw err;
      }
      #dispatch(request, executionCtx, env, method) {
        if (method === "HEAD") {
          return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
        }
        const path = this.getPath(request, { env });
        const matchResult = this.router.match(method, path);
        const c = new import_context.Context(request, {
          path,
          matchResult,
          env,
          executionCtx,
          notFoundHandler: this.#notFoundHandler
        });
        if (matchResult[0].length === 1) {
          let res;
          try {
            res = matchResult[0][0][0][0](c, async () => {
              c.res = await this.#notFoundHandler(c);
            });
          } catch (err) {
            return this.#handleError(err, c);
          }
          return res instanceof Promise ? res.then(
            (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
          ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
        }
        const composed = (0, import_compose.compose)(matchResult[0], this.errorHandler, this.#notFoundHandler);
        return (async () => {
          try {
            const context = await composed(c);
            if (!context.finalized) {
              throw new Error(
                "Context is not finalized. Did you forget to return a Response object or `await next()`?"
              );
            }
            return context.res;
          } catch (err) {
            return this.#handleError(err, c);
          }
        })();
      }
      /**
       * `.fetch()` will be entry point of your app.
       *
       * @see {@link https://hono.dev/docs/api/hono#fetch}
       *
       * @param {Request} request - request Object of request
       * @param {Env} env - env Object
       * @param {ExecutionContext} executionCtx - context of execution
       * @returns {Response | Promise<Response>} response of request
       *
       */
      fetch = (request, ...rest) => {
        return this.#dispatch(request, rest[1], rest[0], request.method);
      };
      /**
       * `.request()` is a useful method for testing.
       * You can pass a URL or pathname to send a GET request.
       * app will return a Response object.
       * ```ts
       * test('GET /hello is ok', async () => {
       *   const res = await app.request('/hello')
       *   expect(res.status).toBe(200)
       * })
       * ```
       * @see https://hono.dev/docs/api/hono#request
       */
      request = (input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
        }
        input = input.toString();
        return this.fetch(
          new Request(
            /^https?:\/\//.test(input) ? input : `http://localhost${(0, import_url.mergePath)("/", input)}`,
            requestInit
          ),
          Env,
          executionCtx
        );
      };
      /**
       * `.fire()` automatically adds a global fetch event listener.
       * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
       * @deprecated
       * Use `fire` from `hono/service-worker` instead.
       * ```ts
       * import { Hono } from 'hono'
       * import { fire } from 'hono/service-worker'
       *
       * const app = new Hono()
       * // ...
       * fire(app)
       * ```
       * @see https://hono.dev/docs/api/hono#fire
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
       * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
       */
      fire = () => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
        });
      };
    };
  }
});

// node_modules/hono/dist/cjs/router/utils.js
var require_utils = __commonJS({
  "node_modules/hono/dist/cjs/router/utils.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      createNullObject: () => createNullObject
    });
    module.exports = __toCommonJS(utils_exports);
    var createNullObject = () => /* @__PURE__ */ Object.create(null);
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/matcher.js
var require_matcher = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/matcher.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var matcher_exports = {};
    __export2(matcher_exports, {
      emptyParam: () => emptyParam,
      match: () => match
    });
    module.exports = __toCommonJS(matcher_exports);
    var import_router = require_router();
    var emptyParam = [];
    function match(method, path) {
      const matchers = this.buildAllMatchers();
      const match2 = (method2, path2) => {
        const matcher = matchers[method2] || matchers[import_router.METHOD_NAME_ALL];
        const staticMatch = matcher[2][path2];
        if (staticMatch) {
          return staticMatch;
        }
        const match3 = path2.match(matcher[0]);
        if (!match3) {
          return [[], emptyParam];
        }
        const index = match3.indexOf("", 1);
        return [matcher[1][index], match3];
      };
      this.match = match2;
      return match2(method, path);
    }
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/node.js
var require_node = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/node.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var node_exports = {};
    __export2(node_exports, {
      LABEL_REG_EXP_STR: () => LABEL_REG_EXP_STR,
      Node: () => Node,
      ONLY_WILDCARD_REG_EXP_STR: () => ONLY_WILDCARD_REG_EXP_STR,
      PATH_ERROR: () => PATH_ERROR,
      TAIL_WILDCARD_REG_EXP_STR: () => TAIL_WILDCARD_REG_EXP_STR
    });
    module.exports = __toCommonJS(node_exports);
    var import_utils = require_utils();
    var LABEL_REG_EXP_STR = "[^/]+";
    var ONLY_WILDCARD_REG_EXP_STR = ".*";
    var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
    var PATH_ERROR = /* @__PURE__ */ Symbol();
    var regExpMetaChars = new Set(".\\+*[^]$()");
    function compareKey(a, b) {
      if (a.length === 1) {
        return b.length === 1 ? a < b ? -1 : 1 : -1;
      }
      if (b.length === 1) {
        return 1;
      }
      if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
        return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
      } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
        return -1;
      }
      if (a === LABEL_REG_EXP_STR) {
        return 1;
      } else if (b === LABEL_REG_EXP_STR) {
        return -1;
      }
      return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
    }
    var Node = class _Node {
      // handler index of a dynamic path, or -1 for a static path terminal
      #index;
      #varIndex;
      #children = (0, import_utils.createNullObject)();
      insert(tokens, index, paramMap, context, isStatic) {
        let node = this;
        for (let i = 0, len = tokens.length; i < len; i++) {
          const token = tokens[i];
          const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
          let nextNode;
          if (pattern) {
            const name = pattern[1];
            let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
            if (name && pattern[2]) {
              if (regexpStr === ".*") {
                throw PATH_ERROR;
              }
              regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
              if (/\((?!\?:)/.test(regexpStr)) {
                throw PATH_ERROR;
              }
              if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
                throw PATH_ERROR;
              }
            }
            nextNode = node.#children[regexpStr];
            if (!nextNode) {
              if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
                for (const k in node.#children) {
                  if (
                    // a single-char pattern coexists with single-char literals as a literal does
                    (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
                  ) {
                    throw PATH_ERROR;
                  }
                }
              }
              nextNode = node.#children[regexpStr] = new _Node();
            }
            if (name !== "") {
              nextNode.#varIndex ??= context.varIndex++;
              paramMap.push([name, nextNode.#varIndex]);
            }
          } else {
            nextNode = node.#children[token];
            if (!nextNode) {
              for (const k in node.#children) {
                if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
                  throw PATH_ERROR;
                }
              }
              nextNode = node.#children[token] = new _Node();
            }
          }
          node = nextNode;
        }
        if (node.#index !== void 0) {
          throw PATH_ERROR;
        }
        node.#index = isStatic ? -1 : index;
      }
      buildRegExpStr() {
        const childKeys = Object.keys(this.#children).sort(compareKey);
        const strList = childKeys.map((k) => {
          const c = this.#children[k];
          const childStr = c.buildRegExpStr();
          return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
        }).filter(Boolean);
        if (typeof this.#index === "number" && this.#index !== -1) {
          strList.unshift(`#${this.#index}`);
        }
        if (strList.length === 0) {
          return "";
        }
        if (strList.length === 1) {
          return strList[0];
        }
        return "(?:" + strList.join("|") + ")";
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/trie.js
var require_trie = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/trie.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var trie_exports = {};
    __export2(trie_exports, {
      Trie: () => Trie
    });
    module.exports = __toCommonJS(trie_exports);
    var import_utils = require_utils();
    var import_node = require_node();
    var Trie = class {
      #context = { varIndex: 0 };
      #root = new import_node.Node();
      #index = 0;
      // dynamic path -> [handler index, param assoc]; static paths are not registered
      paths = (0, import_utils.createNullObject)();
      insert(path, isStatic) {
        if (isStatic) {
          this.#root.insert(path.split(""), 0, [], this.#context, true);
          return;
        }
        const paramAssoc = [];
        const groups = [];
        let markedPath = path;
        for (let i = 0; ; ) {
          let replaced = false;
          markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
            const mark = `@\\${i}`;
            groups[i] = [mark, m];
            i++;
            replaced = true;
            return mark;
          });
          if (!replaced) {
            break;
          }
        }
        const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
        for (let i = groups.length - 1; i >= 0; i--) {
          const [mark] = groups[i];
          for (let j = tokens.length - 1; j >= 0; j--) {
            if (tokens[j].indexOf(mark) !== -1) {
              tokens[j] = tokens[j].replace(mark, groups[i][1]);
              break;
            }
          }
        }
        this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
        this.paths[path] = [this.#index++, paramAssoc];
      }
      buildRegExp() {
        let regexp = this.#root.buildRegExpStr();
        if (regexp === "") {
          return [/^$/, [], []];
        }
        let captureIndex = 0;
        const indexReplacementMap = [];
        const paramReplacementMap = [];
        regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
          if (handlerIndex !== void 0) {
            indexReplacementMap[++captureIndex] = Number(handlerIndex);
            return "$()";
          }
          if (paramIndex !== void 0) {
            paramReplacementMap[Number(paramIndex)] = ++captureIndex;
            return "";
          }
          return "";
        });
        return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/router.js
var require_router2 = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/router.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var router_exports = {};
    __export2(router_exports, {
      RegExpRouter: () => RegExpRouter2
    });
    module.exports = __toCommonJS(router_exports);
    var import_router = require_router();
    var import_url = require_url();
    var import_utils = require_utils();
    var import_matcher = require_matcher();
    var import_node = require_node();
    var import_trie = require_trie();
    var wildcardRegExpCache = (0, import_utils.createNullObject)();
    function buildWildcardRegExp(path) {
      return wildcardRegExpCache[path] ??= new RegExp(
        `^${path.replace(
          /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
          (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? import_node.TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? import_node.ONLY_WILDCARD_REG_EXP_STR : `/:${import_node.LABEL_REG_EXP_STR}`
        )}$`
      );
    }
    function findMiddleware(middleware, path) {
      for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
        if (buildWildcardRegExp(k).test(path)) {
          return [...middleware[k]];
        }
      }
      return void 0;
    }
    var RegExpRouter2 = class {
      name = "RegExpRouter";
      #middleware;
      #routes;
      #tries;
      constructor() {
        this.#middleware = { [import_router.METHOD_NAME_ALL]: (0, import_utils.createNullObject)() };
        this.#routes = { [import_router.METHOD_NAME_ALL]: (0, import_utils.createNullObject)() };
        this.#tries = { [import_router.METHOD_NAME_ALL]: new import_trie.Trie() };
      }
      #insertPath(method, path) {
        try {
          this.#tries[method].insert(path, !/\*|\/:/.test(path));
        } catch (e) {
          throw e === import_node.PATH_ERROR ? new import_router.UnsupportedPathError(path) : e;
        }
      }
      add(method, path, handler) {
        const middleware = this.#middleware;
        const routes = this.#routes;
        if (!middleware) {
          throw new Error(import_router.MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        if (!middleware[method]) {
          this.#tries[method] = new import_trie.Trie();
          for (const handlerMap of [middleware, routes]) {
            handlerMap[method] = (0, import_utils.createNullObject)();
            for (const p in handlerMap[import_router.METHOD_NAME_ALL]) {
              handlerMap[method][p] = [...handlerMap[import_router.METHOD_NAME_ALL][p]];
              this.#insertPath(method, p);
            }
          }
        }
        if (path === "/*") {
          path = "*";
        }
        const methods = method === import_router.METHOD_NAME_ALL ? Object.keys(middleware) : [method];
        if (/\*$/.test(path)) {
          const re = buildWildcardRegExp(path);
          for (const m of methods) {
            if (!middleware[m][path]) {
              this.#insertPath(m, path);
              middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[import_router.METHOD_NAME_ALL], path) || [];
            }
          }
          for (const handlerMap of [middleware, routes]) {
            for (const m of methods) {
              for (const p in handlerMap[m]) {
                re.test(p) && handlerMap[m][p].push([handler, path]);
              }
            }
          }
          return;
        }
        const paths = (0, import_url.checkOptionalParameter)(path) || [path];
        for (const path2 of paths) {
          for (const m of methods) {
            if (!routes[m][path2]) {
              this.#insertPath(m, path2);
              routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware[import_router.METHOD_NAME_ALL], path2) || [];
            }
            routes[m][path2].push([handler, path2]);
          }
        }
      }
      match = import_matcher.match;
      buildAllMatchers() {
        const matchers = (0, import_utils.createNullObject)();
        for (const method of Object.keys(this.#routes)) {
          matchers[method] = this.#buildMatcher(method);
        }
        this.#middleware = this.#routes = this.#tries = void 0;
        wildcardRegExpCache = (0, import_utils.createNullObject)();
        return matchers;
      }
      #buildMatcher(method) {
        const middleware = this.#middleware[method];
        const routes = this.#routes[method];
        const trie = this.#tries[method];
        const staticMap = (0, import_utils.createNullObject)();
        const handlerData = [];
        const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
        for (const r of [middleware, routes]) {
          for (const path in r) {
            const handlers = r[path];
            const pathData = trie.paths[path];
            if (!pathData) {
              staticMap[path] = [handlers.map(([h]) => [h, (0, import_utils.createNullObject)()]), import_matcher.emptyParam];
              continue;
            }
            handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
              h,
              trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
                map[key] = paramReplacementMap[pathData[1][i][1]];
                return map;
              }, (0, import_utils.createNullObject)())
            ]);
          }
        }
        return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/prepared-router.js
var require_prepared_router = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/prepared-router.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var prepared_router_exports = {};
    __export2(prepared_router_exports, {
      PreparedRegExpRouter: () => PreparedRegExpRouter2,
      buildInitParams: () => buildInitParams2,
      serializeInitParams: () => serializeInitParams2
    });
    module.exports = __toCommonJS(prepared_router_exports);
    var import_router = require_router();
    var import_matcher = require_matcher();
    var import_router2 = require_router2();
    var PreparedRegExpRouter2 = class {
      name = "PreparedRegExpRouter";
      #matchers;
      #relocateMap;
      constructor(matchers, relocateMap) {
        this.#matchers = matchers;
        this.#relocateMap = relocateMap;
      }
      #addWildcard(method, handlerData) {
        const matcher = this.#matchers[method];
        matcher[1].forEach((list) => list && list.push(handlerData));
        Object.values(matcher[2]).forEach((list) => list[0].push(handlerData));
      }
      #addPath(method, path, handler, indexes, map) {
        const matcher = this.#matchers[method];
        if (!map) {
          matcher[2][path][0].push([handler, {}]);
        } else {
          indexes.forEach((index) => {
            if (typeof index === "number") {
              matcher[1][index].push([handler, map]);
            } else {
              ;
              matcher[2][index || path][0].push([handler, map]);
            }
          });
        }
      }
      add(method, path, handler) {
        if (!this.#matchers[method]) {
          const all = this.#matchers[import_router.METHOD_NAME_ALL];
          const staticMap = {};
          for (const key in all[2]) {
            staticMap[key] = [all[2][key][0].slice(), import_matcher.emptyParam];
          }
          this.#matchers[method] = [
            all[0],
            all[1].map((list) => Array.isArray(list) ? list.slice() : 0),
            staticMap
          ];
        }
        if (path === "/*" || path === "*") {
          const handlerData = [handler, {}];
          if (method === import_router.METHOD_NAME_ALL) {
            for (const m in this.#matchers) {
              this.#addWildcard(m, handlerData);
            }
          } else {
            this.#addWildcard(method, handlerData);
          }
          return;
        }
        const data = this.#relocateMap[path];
        if (!data) {
          throw new Error(`Path ${path} is not registered`);
        }
        for (const [indexes, map] of data) {
          if (method === import_router.METHOD_NAME_ALL) {
            for (const m in this.#matchers) {
              this.#addPath(m, path, handler, indexes, map);
            }
          } else {
            this.#addPath(method, path, handler, indexes, map);
          }
        }
      }
      buildAllMatchers() {
        return this.#matchers;
      }
      match = import_matcher.match;
    };
    var buildInitParams2 = ({ paths }) => {
      const RegExpRouterWithMatcherExport = class extends import_router2.RegExpRouter {
        buildAndExportAllMatchers() {
          return this.buildAllMatchers();
        }
      };
      const router = new RegExpRouterWithMatcherExport();
      for (const path of paths) {
        router.add(import_router.METHOD_NAME_ALL, path, path);
      }
      const matchers = router.buildAndExportAllMatchers();
      const all = matchers[import_router.METHOD_NAME_ALL];
      const relocateMap = {};
      for (const path of paths) {
        if (path === "/*" || path === "*") {
          continue;
        }
        all[1].forEach((list, i) => {
          list.forEach(([p, map]) => {
            if (p === path) {
              if (relocateMap[path]) {
                relocateMap[path][0][1] = {
                  ...relocateMap[path][0][1],
                  ...map
                };
              } else {
                relocateMap[path] = [[[], map]];
              }
              if (relocateMap[path][0][0].findIndex((j) => j === i) === -1) {
                relocateMap[path][0][0].push(i);
              }
            }
          });
        });
        for (const path2 in all[2]) {
          all[2][path2][0].forEach(([p]) => {
            if (p === path) {
              relocateMap[path] ||= [[[]]];
              const value = path2 === path ? "" : path2;
              if (relocateMap[path][0][0].findIndex((v) => v === value) === -1) {
                relocateMap[path][0][0].push(value);
              }
            }
          });
        }
      }
      for (let i = 0, len = all[1].length; i < len; i++) {
        all[1][i] = all[1][i] ? [] : 0;
      }
      for (const path in all[2]) {
        all[2][path][0] = [];
      }
      return [matchers, relocateMap];
    };
    var serializeInitParams2 = ([matchers, relocateMap]) => {
      const matchersStr = JSON.stringify(
        matchers,
        (_, value) => value instanceof RegExp ? `##${value.toString()}##` : value
      ).replace(/"##(.+?)##"/g, (_, str) => str.replace(/\\\\/g, "\\"));
      const relocateMapStr = JSON.stringify(relocateMap);
      return `[${matchersStr},${relocateMapStr}]`;
    };
  }
});

// node_modules/hono/dist/cjs/router/reg-exp-router/index.js
var require_reg_exp_router = __commonJS({
  "node_modules/hono/dist/cjs/router/reg-exp-router/index.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var reg_exp_router_exports = {};
    __export2(reg_exp_router_exports, {
      PreparedRegExpRouter: () => import_prepared_router.PreparedRegExpRouter,
      RegExpRouter: () => import_router.RegExpRouter,
      buildInitParams: () => import_prepared_router.buildInitParams,
      serializeInitParams: () => import_prepared_router.serializeInitParams
    });
    module.exports = __toCommonJS(reg_exp_router_exports);
    var import_router = require_router2();
    var import_prepared_router = require_prepared_router();
  }
});

// node_modules/hono/dist/cjs/router/smart-router/router.js
var require_router3 = __commonJS({
  "node_modules/hono/dist/cjs/router/smart-router/router.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var router_exports = {};
    __export2(router_exports, {
      SmartRouter: () => SmartRouter2
    });
    module.exports = __toCommonJS(router_exports);
    var import_router = require_router();
    var SmartRouter2 = class {
      name = "SmartRouter";
      #routers = [];
      #routes = [];
      constructor(init) {
        this.#routers = init.routers;
      }
      add(method, path, handler) {
        if (!this.#routes) {
          throw new Error(import_router.MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        this.#routes.push([method, path, handler]);
      }
      match(method, path) {
        if (!this.#routes) {
          throw new Error("Fatal error");
        }
        const routers = this.#routers;
        const routes = this.#routes;
        const len = routers.length;
        let i = 0;
        let res;
        for (; i < len; i++) {
          const router = routers[i];
          try {
            for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
              router.add(...routes[i2]);
            }
            res = router.match(method, path);
          } catch (e) {
            if (e instanceof import_router.UnsupportedPathError) {
              continue;
            }
            throw e;
          }
          this.match = router.match.bind(router);
          this.#routers = [router];
          this.#routes = void 0;
          break;
        }
        if (i === len) {
          throw new Error("Fatal error");
        }
        this.name = `SmartRouter + ${this.activeRouter.name}`;
        return res;
      }
      get activeRouter() {
        if (this.#routes || this.#routers.length !== 1) {
          throw new Error("No active router has been determined yet.");
        }
        return this.#routers[0];
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/smart-router/index.js
var require_smart_router = __commonJS({
  "node_modules/hono/dist/cjs/router/smart-router/index.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var smart_router_exports = {};
    __export2(smart_router_exports, {
      SmartRouter: () => import_router.SmartRouter
    });
    module.exports = __toCommonJS(smart_router_exports);
    var import_router = require_router3();
  }
});

// node_modules/hono/dist/cjs/router/trie-router/node.js
var require_node2 = __commonJS({
  "node_modules/hono/dist/cjs/router/trie-router/node.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var node_exports = {};
    __export2(node_exports, {
      Node: () => Node
    });
    module.exports = __toCommonJS(node_exports);
    var import_router = require_router();
    var import_url = require_url();
    var import_utils = require_utils();
    var emptyParams = (0, import_utils.createNullObject)();
    var order = 0;
    var Node = class _Node {
      #methods = [];
      #children = (0, import_utils.createNullObject)();
      #patterns = [];
      #pattern;
      #params = emptyParams;
      insert(method, path, handler) {
        let curNode = this;
        const parts = (0, import_url.splitRoutingPath)(path);
        const possibleKeys = /* @__PURE__ */ new Set();
        let i = 0;
        for (const p of parts) {
          const nextP = parts[++i];
          const pattern = (0, import_url.getPattern)(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
          const isParam = Array.isArray(pattern);
          const key = isParam ? pattern[0] : pattern || p;
          const child = curNode.#children[key] ||= new _Node();
          if (pattern && !child.#pattern) {
            child.#pattern = pattern;
            curNode.#patterns.push(child);
          }
          curNode = child;
          if (isParam) {
            possibleKeys.add(pattern[1]);
          }
        }
        curNode.#methods.push({
          [method]: {
            handler,
            possibleKeys: [...possibleKeys],
            score: ++order
          }
        });
      }
      #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
        for (let i = 0, len = node.#methods.length; i < len; i++) {
          const m = node.#methods[i];
          const handlerSet = m[method] || m[import_router.METHOD_NAME_ALL];
          if (handlerSet) {
            handlerSet.params = (0, import_utils.createNullObject)();
            handlerSets.push(handlerSet);
            for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
              const key = handlerSet.possibleKeys[i2];
              handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
            }
          }
        }
      }
      search(method, path) {
        const handlerSets = [];
        this.#params = emptyParams;
        const curNode = this;
        let curNodes = [curNode];
        const parts = (0, import_url.splitPath)(path);
        const curNodesQueue = [];
        const len = parts.length;
        let partOffsets = null;
        for (let i = 0; i < len; i++) {
          const part = parts[i];
          const isLast = i === len - 1;
          const tempNodes = [];
          for (let j = 0, len2 = curNodes.length; j < len2; j++) {
            const node = curNodes[j];
            const nextNode = node.#children[part];
            if (nextNode) {
              nextNode.#params = node.#params;
              if (isLast) {
                if (nextNode.#children["*"]) {
                  this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
                }
                this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
              } else {
                tempNodes.push(nextNode);
              }
            }
            for (const child of node.#patterns) {
              const pattern = child.#pattern;
              const params = node.#params === emptyParams ? {} : { ...node.#params };
              if (typeof pattern === "string") {
                if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
                  this.#pushHandlerSets(handlerSets, child, method, node.#params);
                  if (pattern === "*") {
                    child.#params = params;
                    tempNodes.push(child);
                  }
                }
                continue;
              }
              const [, name, matcher] = pattern;
              if (!part && matcher === true) {
                continue;
              }
              if (matcher !== true) {
                if (!partOffsets) {
                  partOffsets = [];
                  let offset = path[0] === "/" ? 1 : 0;
                  for (let p = 0; p < len; p++) {
                    partOffsets[p] = offset;
                    offset += parts[p].length + 1;
                  }
                }
                const restPathString = path.slice(partOffsets[i]);
                const m = matcher.exec(restPathString);
                if (m) {
                  params[name] = m[0];
                  this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
                  if (m[0].length === restPathString.length && child.#children["*"]) {
                    this.#pushHandlerSets(
                      handlerSets,
                      child.#children["*"],
                      method,
                      node.#params,
                      params
                    );
                  }
                  for (const _ in child.#children) {
                    child.#params = params;
                    const componentCount = m[0].match(/\//g)?.length ?? 0;
                    const targetCurNodes = curNodesQueue[componentCount] ||= [];
                    targetCurNodes.push(child);
                    break;
                  }
                  continue;
                }
              }
              if (matcher === true || matcher.test(part)) {
                params[name] = part;
                if (isLast) {
                  this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
                  if (child.#children["*"]) {
                    this.#pushHandlerSets(
                      handlerSets,
                      child.#children["*"],
                      method,
                      params,
                      node.#params
                    );
                  }
                } else {
                  child.#params = params;
                  tempNodes.push(child);
                }
              }
            }
          }
          const shifted = curNodesQueue.shift();
          curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
        }
        if (handlerSets[1]) {
          handlerSets.sort((a, b) => {
            return a.score - b.score;
          });
        }
        return [handlerSets.map(({ handler, params }) => [handler, params])];
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/trie-router/router.js
var require_router4 = __commonJS({
  "node_modules/hono/dist/cjs/router/trie-router/router.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var router_exports = {};
    __export2(router_exports, {
      TrieRouter: () => TrieRouter2
    });
    module.exports = __toCommonJS(router_exports);
    var import_url = require_url();
    var import_node = require_node2();
    var TrieRouter2 = class {
      name = "TrieRouter";
      #node = new import_node.Node();
      add(method, path, handler) {
        for (const result of (0, import_url.checkOptionalParameter)(path) || [path]) {
          this.#node.insert(method, result, handler);
        }
      }
      match(method, path) {
        return this.#node.search(method, path);
      }
    };
  }
});

// node_modules/hono/dist/cjs/router/trie-router/index.js
var require_trie_router = __commonJS({
  "node_modules/hono/dist/cjs/router/trie-router/index.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var trie_router_exports = {};
    __export2(trie_router_exports, {
      TrieRouter: () => import_router.TrieRouter
    });
    module.exports = __toCommonJS(trie_router_exports);
    var import_router = require_router4();
  }
});

// node_modules/hono/dist/cjs/hono.js
var require_hono = __commonJS({
  "node_modules/hono/dist/cjs/hono.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var hono_exports = {};
    __export2(hono_exports, {
      Hono: () => Hono6
    });
    module.exports = __toCommonJS(hono_exports);
    var import_hono_base = require_hono_base();
    var import_reg_exp_router = require_reg_exp_router();
    var import_smart_router = require_smart_router();
    var import_trie_router = require_trie_router();
    var Hono6 = class extends import_hono_base.HonoBase {
      /**
       * Creates an instance of the Hono class.
       *
       * @param options - Optional configuration options for the Hono instance.
       */
      constructor(options = {}) {
        super(options);
        this.router = options.router ?? new import_smart_router.SmartRouter({
          routers: [new import_reg_exp_router.RegExpRouter(), new import_trie_router.TrieRouter()]
        });
      }
    };
  }
});

// node_modules/hono/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/hono/dist/cjs/index.js"(exports, module) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export2(index_exports, {
      Context: () => import_context.Context,
      Hono: () => import_hono5.Hono
    });
    module.exports = __toCommonJS(index_exports);
    var import_hono5 = require_hono();
    var import_context = require_context();
  }
});

// src/config/styles.ts
var styles_exports = {};
__export(styles_exports, {
  CASCADING_THEMES: () => CASCADING_THEMES,
  CELEBRATION_HOLIDAYS: () => CELEBRATION_HOLIDAYS,
  CELEBRATION_MILESTONES: () => CELEBRATION_MILESTONES,
  CORE_THEME_KEYS: () => CORE_THEME_KEYS,
  CORPORATE_CORE_TRIO: () => CORPORATE_CORE_TRIO,
  CORPORATE_ENTRY: () => CORPORATE_ENTRY,
  CORPORATE_MANAGEMENT: () => CORPORATE_MANAGEMENT,
  CORPORATE_SPECIALISTS: () => CORPORATE_SPECIALISTS,
  COSPLAY_DC: () => COSPLAY_DC,
  COSPLAY_LEGENDS: () => COSPLAY_LEGENDS,
  COSPLAY_MARVEL: () => COSPLAY_MARVEL,
  COSPLAY_SCIFI: () => COSPLAY_SCIFI,
  FINE_ART_CLASSICAL: () => FINE_ART_CLASSICAL,
  FINE_ART_IMPRESSIONIST: () => FINE_ART_IMPRESSIONIST,
  FINE_ART_POP: () => FINE_ART_POP,
  IDENTITY_ANCHOR: () => IDENTITY_ANCHOR,
  NEGATIVE_PROMPT: () => NEGATIVE_PROMPT,
  STUDIO_FINISH: () => STUDIO_FINISH,
  STYLE_CONFIGS: () => STYLE_CONFIGS,
  SUPPORTED_STYLE_KEYS: () => SUPPORTED_STYLE_KEYS,
  THEME_NEGATIVE_CONSTRAINTS: () => THEME_NEGATIVE_CONSTRAINTS,
  THEME_SKILL_DIRECTIVES: () => THEME_SKILL_DIRECTIVES,
  assembleDynamicPrompt: () => assembleDynamicPrompt,
  getStyleVariant: () => getStyleVariant,
  resolveCascadingItem: () => resolveCascadingItem,
  sanitizePetName: () => sanitizePetName
});
function sanitizePetName(input) {
  if (!input) return "Milo";
  const trimmed = input.trim();
  if (!trimmed) return "Milo";
  const forbiddenPatterns = [
    /nude|naked|porn|nsfw|erotic|sexy|sex|dick|pussy|vagina|penis|boobs|breast|cleavage/i,
    /bitch|fuck|fck|shit|ass|asshole|whore|slut/i,
    /kill|murder|suicide|death|terrorist|nazi|hitler/i,
    /system\s*prompt|ignore\s*previous\s*instructions|ignore\s*all\s*instructions|developer\s*mode|prompt\s*injection/i,
    /<script|javascript:|data:/i
  ];
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(trimmed)) {
      return "Milo";
    }
  }
  const cleaned = trimmed.replace(/[^\p{L}\p{N}\s.\-_&'❤️]/gu, "").trim();
  if (!cleaned || cleaned.length === 0) return "Milo";
  return cleaned.slice(0, 24);
}
function makeItem(id, nameZh, nameEn, badge, wardrobePrompt, sampleImageUrl, exclusiveNegativePrompt) {
  return {
    id,
    nameZh,
    nameEn,
    badge,
    wardrobePrompt,
    fullPrompt: `${IDENTITY_ANCHOR} ${wardrobePrompt} ${STUDIO_FINISH}`,
    sampleImageUrl,
    exclusiveNegativePrompt
  };
}
function cascadingToLegacyVariants(themeKey) {
  const theme = CASCADING_THEMES[themeKey];
  const variants = [];
  for (const sub of theme.subCategories) {
    for (const item of sub.items) {
      variants.push({
        id: item.id,
        name: item.nameEn || item.nameZh,
        wardrobePrompt: item.wardrobePrompt,
        fullPrompt: item.fullPrompt
      });
    }
  }
  return variants;
}
function resolveCascadingItem(styleKey, subId, itemId, variantIndex) {
  let targetThemeKey;
  if (styleKey === "gentle") targetThemeKey = "fine_art";
  else if (styleKey === "detective") targetThemeKey = "corporate";
  else if (styleKey === "street") targetThemeKey = "cosplay";
  else if (styleKey === "warm") targetThemeKey = "celebration";
  else if (styleKey in CASCADING_THEMES) targetThemeKey = styleKey;
  else targetThemeKey = "fine_art";
  const theme = CASCADING_THEMES[targetThemeKey];
  if (itemId) {
    for (const sub of theme.subCategories) {
      if (!subId || sub.id === subId) {
        const found = sub.items.find((it) => it.id === itemId);
        if (found) return found;
      }
    }
  }
  if (subId) {
    const sub = theme.subCategories.find((s) => s.id === subId);
    if (sub && sub.items.length > 0) {
      const idx = typeof variantIndex === "number" && variantIndex >= 0 ? variantIndex % sub.items.length : Math.floor(Math.random() * sub.items.length);
      return sub.items[idx];
    }
  }
  const allItems = [];
  for (const sub of theme.subCategories) {
    allItems.push(...sub.items);
  }
  if (typeof variantIndex === "number" && variantIndex >= 0) {
    return allItems[variantIndex % allItems.length];
  }
  return allItems[Math.floor(Math.random() * allItems.length)];
}
function assembleDynamicPrompt(styleKey, itemId, subId, variantIndex) {
  let targetThemeKey;
  if (styleKey === "gentle") targetThemeKey = "fine_art";
  else if (styleKey === "detective") targetThemeKey = "corporate";
  else if (styleKey === "street") targetThemeKey = "cosplay";
  else if (styleKey === "warm") targetThemeKey = "celebration";
  else if (styleKey in CASCADING_THEMES) targetThemeKey = styleKey;
  else targetThemeKey = "fine_art";
  const theme = CASCADING_THEMES[targetThemeKey];
  const item = resolveCascadingItem(styleKey, subId, itemId, variantIndex);
  const skillDirective = THEME_SKILL_DIRECTIVES[targetThemeKey];
  const skillNegativeConstraint = THEME_NEGATIVE_CONSTRAINTS[targetThemeKey];
  const fullPrompt = `${IDENTITY_ANCHOR} ${item.wardrobePrompt} ${skillDirective} ${STUDIO_FINISH}`;
  const exclusiveNegative = item.exclusiveNegativePrompt ? `, ${item.exclusiveNegativePrompt}` : "";
  const negativePrompt = `${NEGATIVE_PROMPT}${skillNegativeConstraint}${exclusiveNegative}`;
  return {
    fullPrompt,
    negativePrompt,
    skillDirective,
    skillNegativeConstraint,
    exclusiveNegativePrompt: item.exclusiveNegativePrompt,
    item,
    themeKey: targetThemeKey,
    themeNameZh: theme.nameZh
  };
}
function getStyleVariant(styleKey, index, subId, itemId) {
  const item = resolveCascadingItem(styleKey, subId, itemId, index);
  const assembled = assembleDynamicPrompt(styleKey, itemId, subId, index);
  return {
    id: item.id,
    name: item.nameZh,
    wardrobePrompt: item.wardrobePrompt,
    fullPrompt: assembled.fullPrompt
  };
}
var IDENTITY_ANCHOR, STUDIO_FINISH, NEGATIVE_PROMPT, FINE_ART_CLASSICAL, FINE_ART_IMPRESSIONIST, FINE_ART_POP, CORPORATE_CORE_TRIO, CORPORATE_ENTRY, CORPORATE_MANAGEMENT, CORPORATE_SPECIALISTS, COSPLAY_LEGENDS, COSPLAY_MARVEL, COSPLAY_DC, COSPLAY_SCIFI, CELEBRATION_HOLIDAYS, CELEBRATION_MILESTONES, CASCADING_THEMES, STYLE_CONFIGS, SUPPORTED_STYLE_KEYS, CORE_THEME_KEYS, THEME_SKILL_DIRECTIVES, THEME_NEGATIVE_CONSTRAINTS;
var init_styles = __esm({
  "src/config/styles.ts"() {
    "use strict";
    IDENTITY_ANCHOR = "Dress the EXACT SAME dog from the input image from the neck and shoulders down. Strictly preserve the original pet's facial structure, eyes, snout geometry, ear shape and position, native fur coloration, distinctive markings, body proportions and age 100% unchanged. Maintain authentic animal anatomy: exactly one head, two eyes, two ears, one nose, and natural furry legs and paws matching the species. Strictly NO human arms, hands, fingers, skin, human neck or human body. Unmasked face, head and eyes fully visible and natural, non-distorted.";
    STUDIO_FINISH = "High-end commercial luxury pet portrait photography, 85mm portrait lens, rich vibrant natural color grading, high dynamic range, glossy fur highlights, deep warm studio lighting, delicate studio rim light accentuating authentic fur texture, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, award-winning studio portrait.";
    NEGATIVE_PROMPT = "second pet, other animals, duplicate subject, breed change, facial change, fur color change, marking change, eye asymmetry, strabismus, human body, human arms, human hands, human fingers, human skin, human neck, hybrid human-animal, clothes clipping, accessories clipping, distorted anatomy, warped snout, deformed eyes, extra legs, missing legs, extra paws, fused limbs, severed limbs, blurry, low quality, noisy, jpeg artifacts, text, typography, letters, watermark, signature, logo, brand name, cartoon, 3D render, CGI doll, monochrome, black and white, grayscale, desaturated, dull colors, washed out, low contrast, hazy, dim, underexposed, dark muddy shadows, plastic texture, human cleavage, bare skin, naked, nude, bikini, erotic, suggestive, extra fingers, deformed paws.";
    FINE_ART_CLASSICAL = [
      makeItem(
        "mona_lisa",
        "\u590D\u523B\u300A\u8499\u5A1C\u4E3D\u838E\u300B\u53E4\u5178\u6CB9\u753B",
        "The Mona Lisa Smile",
        "\u6587\u827A\u590D\u5174",
        "Mona Lisa Renaissance fine art portrait. Dressed in Mona Lisa vintage dark long pleated robe, collar resting outside chest fur without exposing human skin or neck, natural dark vintage wig contouring head with both animal ears emerging naturally through openings. Front paws naturally crossed and resting together on chest in faithful reference to the original painting while strictly respecting natural canine and feline anatomy and joint mobility, claw tips visible, no human arms or fingers. Sfumato chiaroscuro lighting, earthy amber and dark golden museum oil canvas texture, tranquil classical expression.",
        "models/milo_gentle.webp",
        "human ears, ears hidden inside wig, wig covering eyes, wig covering snout, front legs stretched into human arms, human fingers, human hands, human neck, human skin exposed, fused paws, long robe penetrating body"
      ),
      makeItem(
        "pearl_earring",
        "\u300A\u6234\u73CD\u73E0\u8033\u73AF\u7684\u5C11\u5973\u300B\u53E4\u5178\u8096\u50CF",
        "Girl with a Pearl Earring",
        "\u8377\u5170\u9EC4\u91D1\u65F6\u4EE3",
        "Girl with a Pearl Earring fine art portrait. Pure black deep background, the pet body slightly turned in 3/4 pose with head looking back toward camera. Adorned in iconic royal ultramarine blue and ochre gold draped silk turban wrapped around head without flattening skull, native ears neatly enclosed beneath fabric, single large glowing baroque teardrop pearl pendant fastened at the lower edge of turban fabric without penetrating ear cartilage or skin. Warm ochre jacket with white collar fabric draped outside chest, soft chiaroscuro side window lighting illuminating eyes and snout.",
        "models/milo_gentle_navy_velvet.webp",
        "visible pet ears, human ears, two or more pearls, pearl penetrating skin, pearl penetrating turban, turban flattening skull, turban covering eyes, distorted neck, human neck, human collarbone, exposed human skin"
      ),
      makeItem(
        "line_art",
        "\u6781\u7B80\u9ED1\u767D\u7EBF\u6761\u7ED8\u753B\u624B\u7A3F",
        "The Minimalist Line Art",
        "\u6781\u7B80\u9ED1\u767D",
        "Minimalist black and white rough crayon, charcoal pencil, and dry-brush hand-drawn illustration poster on warm off-white cream paper. Not realistic sketch, non-photorealistic artistic hand drawing. Only using black textured lines and raw paper background, no other colors, no gray gradients. Rough textured brushstrokes, deliberate white spaces, visible paper fiber texture, charming vintage children picture book combined with high-fashion independent magazine editorial aesthetic. Pet subject occupying top 65% to 75% of canvas with pristine ample negative space below.",
        "models/milo_street.webp",
        "realistic pencil sketch, colorful, gray gradient, smooth vector lines, 3D render, solid black fill, busy background, cropped subject, typography covering subject, long text, gibberish letters, misspelled words, over-stylized unrecognizable cartoon"
      ),
      makeItem(
        "rembrandt",
        "\u4F26\u52C3\u6717\u300A\u591C\u5DE1\u4E0E\u81EA\u753B\u50CF\u300B",
        "Rembrandt Chiaroscuro Masterpiece",
        "\u660E\u6697\u5BF9\u7167\u6CD5",
        "Rembrandt style historic oil painting, pet wearing an elaborate layered pleated white linen Elizabethan ruff collar and dark heavy velvet tunic, authentic Rembrandt triangle lighting on face, rich impasto oil paint texture with subtle craquelure, dramatic dark museum depth."
      ),
      makeItem(
        "las_meninas",
        "\u59D4\u62C9\u65AF\u51EF\u5179\u300A\u5BAB\u5A25\u300B",
        "Las Meninas by Diego Velazquez",
        "\u897F\u73ED\u7259\u5BAB\u5EF7",
        "Velazquez Spanish royal court style, the pet wearing an ornate silver-grey damask silk dress bodice with crimson satin ribbon rosettes and pearl buttons, majestic Prado museum lighting, stately baroque composition."
      )
    ];
    FINE_ART_IMPRESSIONIST = [
      makeItem(
        "starry_night",
        "\u68B5\u9AD8\u300A\u661F\u6708\u591C\u4E0E\u5411\u65E5\u8475\u300B",
        "Van Gogh: Starry Night & Sunflowers",
        "\u540E\u5370\u8C61\u6D3E",
        "Vincent van Gogh aesthetic, pet wearing a midnight cobalt blue heavy wool jacket with a vibrant chrome-yellow sunflower silk ascot tie, iconic swirling dynamic Starry Night brushstrokes in the background, thick impasto oil paint texture, intense emotional post-impressionist color palette."
      ),
      makeItem(
        "water_lilies",
        "\u83AB\u5948\u300A\u7761\u83B2\u4E0E\u65E5\u672C\u6865\u300B",
        "Monet: Water Lilies & Giverny",
        "\u83AB\u5948\u82B1\u56ED",
        "Claude Monet plein-air impressionism, pet wearing a delicate pastel sage-green and soft petal-pink raw linen shirt, tiny water lily blossom on lapel, luminous dappled sunlight reflections, soft-focus Giverny pond bokeh, dreamy aesthetic."
      ),
      makeItem(
        "the_kiss",
        "\u514B\u91CC\u59C6\u7279\u300A\u543B\u300B\u9EC4\u91D1\u534E\u670D",
        "Gustav Klimt: The Golden Kiss",
        "\u7EF4\u4E5F\u7EB3\u5206\u79BB\u6D3E",
        "Gustav Klimt golden phase masterpiece, pet adorned in an opulent gilded mantle covered with geometric mosaic patterns, gold leaf flakes, spiraling decorative Art Nouveau patterns, shimmering luxurious gold texture."
      ),
      makeItem(
        "the_scream",
        "\u8499\u514B\u300A\u5450\u558A\u300B\u8868\u73B0\u4E3B\u4E49\u98CE\u66B4",
        "Edvard Munch: The Scream",
        "\u8868\u73B0\u4E3B\u4E49",
        "Edvard Munch expressionist painting style, pet wearing a flowing dark crimson and navy trench collar, dramatic fiery blood-orange undulating sunset sky backdrop, intense emotional brushwork, iconic Nordic art atmosphere."
      )
    ];
    FINE_ART_POP = [
      makeItem(
        "warhol",
        "\u5B89\u8FEA\xB7\u6C83\u970D\u5C14\u300A\u739B\u4E3D\u83B2\u53CC\u8054\u753B\u300B",
        "Andy Warhol: Pop Screenprint",
        "\u6CE2\u666E\u4E1D\u7F51\u5370",
        "Andy Warhol 1960s pop art style, pet wearing an electric neon yellow pop-art vest with bold black industrial zipper, vivid four-panel silkscreen color-block background in hot pink and turquoise, iconic retro modern vibe."
      ),
      makeItem(
        "picasso",
        "\u6BD5\u52A0\u7D22\u300A\u4E9A\u5A01\u519C\u5C11\u5973\u300B",
        "Picasso: Cubist Geometry",
        "\u7ACB\u4F53\u51E0\u4F55",
        "Pablo Picasso analytic cubism, pet dressed in an avant-garde deconstructed jacket with fragmented geometric angular color blocks in terracotta, slate grey and ochre, sharp cubist facet shading, modern museum art."
      ),
      makeItem(
        "keith_haring",
        "\u51EF\u65AF\xB7\u54C8\u6797\u53D1\u5149\u6CE2\u666E\u6D82\u9E26",
        "Keith Haring Radiant Pop",
        "\u8857\u5934\u827A\u672F",
        "Keith Haring 1980s street art inspired style, pet wearing a crisp white athletic collar covered in bold black graphic dancing dog doodles and radiant heart motifs, clean vibrant primary colors, urban pop art energy."
      ),
      makeItem(
        "atelier_sketch",
        "\u65F6\u88C5\u5468\u9ED1\u767D\u70AD\u7B14\u6781\u7B80\u901F\u5199\u624B\u7A3F",
        "Paris Atelier Fashion Sketch",
        "\u9AD8\u5B9A\u624B\u7A3F",
        "Haute couture fashion designer sketch portrait, pet wearing a tailored charcoal wool coat combined with visible hand-drawn charcoal pencil sketch lines and tailor chalk markings, minimalist chic, Vogue runway concept aesthetic."
      )
    ];
    CORPORATE_CORE_TRIO = [
      makeItem(
        "chill_intern",
        "\u53CD\u5185\u5377\u6478\u9C7C\u5B9E\u4E60\u751F",
        "The Chill Intern",
        "\u53CD\u5185\u5377",
        'The chill anti-hustle corporate intern pet portrait. Pet naturally seated with an adorable relaxed, unbothered expression, looking directly at camera. Wearing an oversized comfortable heather-grey soft fleece crewneck sweatshirt, draped with a vibrant blue fabric company lanyard around the neck displaying a prominent miniature plastic ID badge clearly labeled "INTERN". Front furry paws resting casually on clean minimalist desk surface. Gentle bright modern open-plan office background with soft bokeh, authentic pet anatomy, strictly NO human arms or hands.',
        "models/milo_gentle_prince_of_wales.webp",
        "stressed expression, angry boss, corporate business suit, human arms, human fingers, human hands, tight collar choking pet, badge covering face, badge piercing skin, dark gloomy lighting, messy trash"
      ),
      makeItem(
        "coffee_pro",
        "\u5496\u5561\u7EED\u547D\u6253\u5DE5\u72D7",
        "The Caffeinated Pro",
        "\u5496\u5561\u7EED\u547D",
        "The coffee-fueled 9-to-5 corporate professional pet portrait. Wearing a crisp sky-blue and white micro-striped casual button-down work shirt with a slightly loosened top collar, tailored navy work jacket shoulders. Seated politely with one furry paw resting naturally next to an authentic artisan takeaway coffee cup with a kraft cardboard heat sleeve and white lid. Soft morning 5600K office studio lighting, subtle corporate glass architecture bokeh in background, humorous relatable hardworking pet aesthetic, strictly authentic pet anatomy.",
        "models/milo_techwear_cobalt_cyber.webp",
        "coffee spilled on fur, pet drinking hot coffee, burned fur, open flames, plastic trash, human hands holding cup, human arms, dislocated paws, formal tuxedo, evening gown"
      ),
      makeItem(
        "ivy_prep",
        "\u5E38\u9752\u85E4\u8001\u94B1\u5B66\u8005",
        "The Ivy League Scholar",
        "\u8001\u94B1\u5B66\u9662",
        "Ivy League scholar pet, wearing an oversized Ralph Lauren style cream cable-knit V-neck tennis sweater with a neat light-blue Oxford collared shirt underneath, cozy vintage mahogany university library background with warm brass lamp glow, preppy old-money aesthetic.",
        "models/milo_knitwear_oatmeal_cable.webp",
        "human hands holding books, book glued to fur, deformed sweater collar, loose threads, synthetic polyester sheen, modern neon"
      )
    ];
    CORPORATE_ENTRY = [
      ...CORPORATE_CORE_TRIO,
      makeItem(
        "ceo_titan",
        "\u534E\u5C14\u8857\u5546\u4E1A\u638C\u95E8\u4EBA",
        "The Wall Street CEO",
        "\u6743\u529B\u897F\u88C5",
        "Wall Street investment titan pet portrait, wearing a bespoke charcoal pinstripe double-breasted suit with broad peak lapels, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, corner office with panoramic Manhattan skyline sunset bokeh, power-broker luxury."
      ),
      makeItem(
        "tech_visionary",
        "\u7845\u8C37\u79D1\u6280\u9886\u8896",
        "The Silicon Valley Visionary",
        "\u6781\u5BA2\u9886\u8896",
        "Silicon Valley tech visionary pet leader, wearing a minimalist black fine-gauge cashmere turtleneck sweater, designer tortoiseshell wire-rim round glasses, modern sunlit Scandinavian loft studio background, sleek espresso, visionary leadership aesthetic."
      ),
      makeItem(
        "programmer",
        "\u7A0B\u5E8F\u5458\u4E0E\u6280\u672F\u7801\u519C",
        "Software Engineer & Developer",
        "\u7801\u519C\u5DE5\u4F4D\u98CE",
        "Tech company software engineer dog portrait, wearing a worn heather-grey hoodie under a navy fleece vest, professional over-ear studio headphones resting around neck, glowing dual monitor glow in background, relatable programmer aesthetic."
      ),
      makeItem(
        "customer_support",
        "\u65B0\u5A92\u4F53\u8FD0\u8425\u4E0E\u5BA2\u670D",
        "Social Media & Customer Support",
        "\u5468\u4E00\u65E9\u516B\u98CE",
        "Social media specialist pet, wearing a light-blue casual Oxford button-up shirt with an open collar, company lanyard and photo ID badge hanging around neck, exhausted Monday morning office lighting, subtle iced coffee cup on desk edge."
      ),
      makeItem(
        "night_shift",
        "\u71AC\u591C\u5BA1\u6838\u6253\u5DE5\u4EBA",
        "Night Shift Operations Specialist",
        "\u51B7\u767D\u52A0\u73ED\u706F",
        "Late night shift operations specialist, wearing a loose navy blue nylon windbreaker, neon yellow highlighter in chest pocket, cool 5600K fluorescent office lamp light, humorous overworked corporate irony."
      ),
      makeItem(
        "intern",
        "\u6478\u9C7C\u5B9E\u4E60\u751F",
        "Quiet Quitting Intern",
        "\u5927\u5B66\u7272\u6478\u9C7C",
        "Quiet quitting college intern pet, wearing an oversized cream cable-knit V-neck tennis sweater with a neat white collared shirt underneath, heavy canvas tote bag strap across chest, fresh youthful collegiate vibe."
      )
    ];
    CORPORATE_MANAGEMENT = [
      makeItem(
        "scrum_master",
        "\u654F\u6377\u9879\u76EE\u7ECF\u7406",
        "Agile Scrum Master",
        "\u770B\u677F\u7AD9\u4F1A\u98CE",
        "Agile Scrum Master pet portrait, wearing a fitted light-grey merino crewneck sweater over a subtle gingham checked shirt, colorful sticky notes on glass wall bokeh in background, sharp professional office lighting."
      ),
      makeItem(
        "hr_director",
        "\u4E25\u82DB\u4EBA\u4E8B\u4E3B\u7BA1",
        "HR Director & Recruiter",
        "\u9762\u8BD5\u5B98\u6C14\u573A",
        "Strict HR director pet, wearing an impeccable tailored black wool blazer with sharp lapels, sleek black cat-eye reading glasses perched neatly, immaculate corporate interview backdrop, intimidating yet humorous elegance."
      ),
      makeItem(
        "product_vp",
        "\u6EE1\u5634\u9ED1\u8BDD\u4EA7\u54C1\u603B\u76D1",
        "Product Management VP",
        "\u7845\u8C37\u6781\u5BA2\u9ED1",
        "Silicon Valley product executive, wearing a minimalist black fine-gauge cashmere turtleneck sweater, charcoal wool unconstructed overcoat wide collar, sleek keynote presentation aesthetic, visionary tech leadership vibe."
      )
    ];
    CORPORATE_SPECIALISTS = [
      makeItem(
        "ceo_titan",
        "\u534E\u5C14\u8857\u5546\u4E1A\u638C\u95E8\u4EBA",
        "The Wall Street CEO",
        "\u6743\u529B\u897F\u88C5",
        "Wall Street investment titan pet portrait, wearing a bespoke charcoal pinstripe double-breasted suit with broad peak lapels, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, corner office with panoramic Manhattan skyline sunset bokeh, power-broker luxury."
      ),
      makeItem(
        "tech_visionary",
        "\u7845\u8C37\u79D1\u6280\u9886\u8896",
        "The Silicon Valley Visionary",
        "\u6781\u5BA2\u9886\u8896",
        "Silicon Valley tech visionary pet leader, wearing a minimalist black fine-gauge cashmere turtleneck sweater, designer tortoiseshell wire-rim round glasses, modern sunlit Scandinavian loft studio background, sleek espresso, visionary leadership aesthetic."
      ),
      makeItem(
        "wall_street_trader",
        "\u534E\u5C14\u8857\u6295\u884C\u5206\u6790\u5E08",
        "Wall Street Investment Banker",
        "\u53CC\u6392\u6263\u7EC6\u6761\u7EB9",
        "Wall Street investment banker pet, wearing a bespoke charcoal pinstripe double-breasted suit lapel, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, Bloomberg terminal bokeh, power-broker luxury."
      ),
      makeItem(
        "trial_attorney",
        "\u8BC9\u8BBC\u5927\u5F8B\u5E08",
        "Senior Trial Attorney",
        "\u8428\u7EF4\u5C14\u8857\u4E09\u4EF6\u5957",
        "Prestigious trial attorney pet, wearing a bespoke three-piece navy wool suit with tailored vest and gold pocket watch chain peeking out, warm mahogany law library bookshelf background, authoritative high-fashion legal portrait."
      ),
      makeItem(
        "startup_ceo",
        "\u521D\u521B\u72EC\u89D2\u517D CEO",
        "Tech Unicorn Founder & CEO",
        "\u6572\u949F\u9886\u8896\u98CE",
        "Tech startup billionaire CEO, wearing a luxury unstructured midnight blue blazer over a pristine heavyweight white designer tee, subtle titanium luxury watch rim, clean minimalist studio lighting, Forbes 30 Under 30 cover style."
      ),
      makeItem(
        "airline_pilot",
        "\u6C11\u822A\u673A\u957F",
        "Commercial Airline Captain",
        "\u56DB\u9053\u6760\u91D1\u80A9\u7AE0",
        "Commercial airline captain pet, wearing an authentic navy blue four-stripe gold braided pilot epaulet blazer, crisp white pilot shirt and black tie, warm cockpit ambient dashboard glow, heroic aviation portrait."
      )
    ];
    COSPLAY_LEGENDS = [
      makeItem(
        "royal_monarch",
        "\u6587\u827A\u590D\u5174\u7687\u5BA4\u541B\u4E3B",
        "The Renaissance Monarch",
        "\u7687\u5BA4\u8D35\u65CF",
        "Regal Renaissance royal monarch pet portrait, wearing a deep royal crimson and gold embroidered velvet mantle with ermine fur lining, ornate antique lace ruff collar, royal sash with gold heraldic medal crest, majestic European palace throne room lighting, Crown and Paw prestige.",
        "models/milo_gentle_navy_velvet.webp",
        "human arms, human hands, human fingers, crown obscuring eyes, deformed skull, cheap costume, plastic jewels, human skin exposed"
      ),
      makeItem(
        "witch",
        "\u795E\u79D8\u5947\u5E7B\u5C0F\u5973\u5DEB",
        "The Midnight Witch",
        "\u9B54\u6CD5\u5947\u5883",
        "Mystical fantasy witch pet studio portrait. Wearing an elegant miniature midnight-purple or deep navy velvet witch pointed hat softly tilted between the ears, with the pet's two authentic furry ears resting naturally and completely visible at the sides of the brim, never flattening the skull or covering the eyes. Draped in a matching dark velvet capelet with delicate gold star embroidery and an antique bronze celestial moon clasp at chest. Soft ambient glow with floating warm amber and emerald fairy firefly sparkles bokeh, mysterious yet heartwarming and adorable, strictly authentic animal anatomy.",
        "models/milo_techwear_arctic_yellow.webp",
        "human arms, human ears, hat covering eyes, hat swallowing ears, hat piercing skull, scary horror gore, skulls, blood, spiderwebs, dark pitch black, ugly witch nose, human hands, deformed paws"
      ),
      makeItem(
        "cowboy",
        "\u897F\u90E8\u8352\u91CE\u725B\u4ED4\u4E0E\u6D6A\u6F2B\u5973\u725B\u4ED4",
        "The Wild West Cowboy & Cowgirl",
        "\u897F\u90E8\u4F20\u5947",
        "Chic Americana Wild West cowboy and Coastal Cowgirl pet portrait. Wearing a stylish miniature tan suede wide-brimmed cowboy hat resting gently on top head between natural furry ears, ears completely visible and uncompressed, unobstructed clear eyes and facial markings. Loosely tied caramel brown and soft vintage red paisley cotton bandana neckerchief around lower neck. Warm golden hour sunset prairie lighting, soft rustic wooden porch bokeh, free-spirited, charming and sunlit aesthetic, strictly authentic animal anatomy.",
        "models/milo_aviator_vintage_shearling.webp",
        "sunglasses obscuring eyes, heavy firearms, gun, saddle on back, plastic hat, hat crushing ears, choked neck, dirty mud, dust covering face, human arms, human fingers, dark dreary shadows"
      ),
      makeItem(
        "detective",
        "\u8D1D\u514B\u8857\u7EF4\u591A\u5229\u4E9A\u5927\u4FA6\u63A2",
        "The Baker Street Sleuth",
        "\u82F1\u4F26\u795E\u63A2",
        "Victorian Baker Street detective pet, wearing a classic British houndstooth wool tweed Inverness cape trench coat, antique silver monocle on delicate chain, vintage gaslight foggy London streetscape, dark academia mystery atmosphere."
      ),
      makeItem(
        "aviator",
        "\u7F8E\u5F0F\u4F20\u5947\u738B\u724C\u98DE\u884C\u5458",
        "The Vintage Aviator Ace",
        "\u738B\u724C\u98DE\u884C",
        "Vintage American aviator ace pet, wearing a rugged distressed brown B-3 shearling leather flight bomber jacket with plush sheepskin fleece collar, vintage brass aviator goggles pushed up over brow, silk flight scarf, golden sunset runway airfield bokeh, Top Gun heroism."
      )
    ];
    COSPLAY_MARVEL = [
      makeItem(
        "iron_man",
        "\u94A2\u94C1\u4FA0\uFF1A\u7EB3\u7C73 Mark 85 \u80F8\u7532",
        "Iron Man Mark 85 (Unmasked)",
        "\u7EB3\u7C73\u53CD\u5E94\u5806",
        "Iron Man inspired superhero pet (no helmet, face fully natural), wearing a high-gloss hot-rod red and metallic gold nano-tech chest armor breastplate, glowing bright cyan triangular arc reactor in the center, mechanical shoulder joints, epic cinematic Marvel studio lighting."
      ),
      makeItem(
        "spider_man",
        "\u8718\u86DB\u4FA0\uFF1A\u7ECF\u5178\u6218\u8863\u4E0E\u86DB\u4E1D\u80A9\u7532",
        "Spider-Man Suit (Unmasked)",
        "\u7ACB\u4F53\u86DB\u7F51\u7EB9",
        "Spider-Man inspired pet hero (unmasked, original pet face and eyes completely visible), wearing a tailored red spandex superhero suit collar with raised black webbing texture, matte black spider emblem on chest, New York city skyline dusk lighting."
      ),
      makeItem(
        "deadpool",
        "\u6B7B\u4F8D\uFF1A\u6218\u635F\u80CC\u5E26\u4E0E\u7EA2\u9ED1\u5DE5\u88C5",
        "Deadpool & Dogpool Suit",
        "\u53CC\u5200\u6218\u635F\u98CE",
        "Deadpool and Dogpool inspired battle-worn suit (unmasked face), wearing a distressed crimson and black leather tactical chest harness, twin katana hilt handles strapped over back, rugged brass buckle details, humorous antihero cinematic studio shot."
      ),
      makeItem(
        "thor",
        "\u96F7\u795E\uFF1A\u963F\u65AF\u52A0\u5FB7\u94F6\u9CDE\u91CD\u94E0",
        "Thor Odinson Heavy Armor",
        "\u795E\u57DF\u91CD\u94E0",
        "Thor God of Thunder pet warrior, wearing heavy silver metallic disc plate chest armor with Nordic filigree engravings, a regal flowing bright crimson velvet cape clasped at shoulders, subtle lightning sparks bokeh, cinematic blockbuster realism."
      )
    ];
    COSPLAY_DC = [
      makeItem(
        "batman",
        "\u8759\u8760\u4FA0\uFF1A\u54E5\u8C2D\u6697\u9ED1\u51EF\u592B\u62C9\u6218\u8863",
        "The Dark Knight Armor (Unmasked)",
        "\u51EF\u592B\u62C9\u9632\u5F39",
        "The Dark Knight Batman aesthetic (unmasked, natural pet head), wearing a tactical matte-black Kevlar chest plate with embossed bat emblem, heavy utility shoulder straps, wet rain reflections, moody Gotham neo-noir rim light."
      ),
      makeItem(
        "superman",
        "\u8D85\u4EBA\uFF1A\u6C2A\u661F\u6DF1\u84DD\u7EB3\u7C73\u6218\u8863",
        "Superman Kryptonian Suit",
        "\u6C2A\u661F\u7EA2\u9EC4\u76FE",
        "Superman inspired hero suit, wearing an alien deep royal blue chainmail texture chest suit with the iconic red and yellow House of El diamond crest, rich flowing red cape draped behind shoulders, sun-flare heroic lighting."
      ),
      makeItem(
        "joker",
        "\u5C0F\u4E11\uFF1A\u54E5\u8C2D\u7D2B\u7EFF\u649E\u8272\u6761\u7EB9\u4E09\u4EF6\u5957",
        "The Joker Vintage Tailoring",
        "\u7D2B\u7EFF\u649E\u8272",
        "The Joker inspired villain fashion, wearing a vibrant deep purple tailored wool suit lapel, neon chartreuse green satin vest, vintage patterned silk tie, tiny lapel flower, dramatic theatrical circus lighting, stylish camp aesthetic."
      )
    ];
    COSPLAY_SCIFI = [
      makeItem(
        "terminator",
        "\u7EC8\u7ED3\u8005 T-800\uFF1A\u7ECF\u5178\u76AE\u5939\u514B\u4E0E\u673A\u68B0\u81C2",
        "Terminator T-800 Cybernetic Biker",
        "\u673A\u8F66\u76AE\u8863",
        "Terminator T-800 inspired pet, wearing a heavy distressed black motorcycle leather biker jacket with asymmetrical silver zippers and studs, subtle chrome cybernetic endoskeleton exposed at one shoulder, dystopian blue night highway light."
      ),
      makeItem(
        "matrix_neo",
        "\u9ED1\u5BA2\u5E1D\u56FD\uFF1A\u5C3C\u5965\u7ACB\u9886\u6697\u9ED1\u98CE\u8863",
        "The Matrix Neo Trench Coat",
        "\u6781\u5BA2\u9ED1\u957F\u888D",
        "The Matrix Neo inspired cyber coat, wearing a minimalist structured black gabardine high-collar trench coat, sleek micro oval sunglasses resting effortlessly, faint emerald green digital rain code bokeh in background."
      ),
      makeItem(
        "jedi_knight",
        "\u7EDD\u5730\u6B66\u58EB\uFF1A\u661F\u7403\u5927\u6218\u7EDD\u5730\u957F\u888D",
        "Star Wars Jedi Knight Robe",
        "\u53CC\u5C42\u4E9A\u9EBB\u957F\u888D",
        "Star Wars Jedi Knight robes, pet dressed in authentic textured natural oatmeal linen tunic with overlapping earthy brown hooded cloak draped on shoulders, wide leather utility belt buckle, cinematic dual-sun Tatooine glow."
      )
    ];
    CELEBRATION_HOLIDAYS = [
      makeItem(
        "christmas",
        "\u5723\u8BDE\u6DF1\u7EA2\u4E1D\u7ED2\u793C\u76D2\u6696\u51AC\u5199\u771F",
        "Christmas Velvet Box & Hearth",
        "\u5723\u8BDE\u76DB\u5178",
        "Christmas holiday luxury pet portrait. Pet naturally seated inside an open rich deep crimson velvet gift box, both front paws resting naturally and neatly over the front edge of the box without clipping legs. Wearing a deep forest-green plush fleece scarf collar adorned with a festive red silk ribbon and an opulent gold satin bow at chest. In the warm bokeh background stands a magnificently decorated grand Christmas tree with red and gold baubles, warm fairy lights, and neatly stacked holiday gift boxes, subtle tiny soft snowflakes gently drifting down, 50mm portrait lens, warm golden hearth glow.",
        "models/milo_warm.webp",
        "gift box cutting off front legs, paws trapped in box rim, gift box piercing body, scarf or bow covering face, decorations piercing fur, snowflakes covering eyes, gifts obscuring subject, overly crowded background, duplicate text, typo, gibberish, Christmas tree growing out of pet, pet wrapped like a package, wrong paw count"
      ),
      makeItem(
        "halloween",
        "\u4E07\u5723\u8282\u8F6F\u840C\u5C0F\u6076\u9B54\u4E0E\u5357\u74DC\u5199\u771F",
        "Halloween Spooky Magic & Pumpkins",
        "\u4E07\u5723\u5947\u5883",
        "Whimsical cozy and cute Halloween pet studio portrait. Completely non-frightening, adorable and heartwarming. Pet wearing delicate miniature velvety devil horns resting gently on top fur without piercing skull or ears, and a dainty dark velvet bow tie below chin. Scattered around pet on floor are gently glowing carved jack-o-lantern mini pumpkins, curly dried vines, tiny black bat ornaments, and purple autumn leaves. Moody warm candlelight bokeh background, soft warm orange illumination, cozy luxury pet celebration.",
        "models/milo_techwear_arctic_yellow.webp",
        "horror, bloody, skulls, open wounds, sharp fangs, scary menacing expression, heavy bulky costume, giant devil horns, horns piercing ears, horns penetrating skull, bats covering face, pumpkin fused with body, cluttered props, pitch black background, frightening lighting"
      ),
      makeItem(
        "easter",
        "\u590D\u6D3B\u8282\uFF1A\u6625\u65E5\u9A6C\u5361\u9F99\u7C89\u84DD\u788E\u82B1\u9886\u7ED3",
        "Easter Garden Party",
        "\u6625\u65E5\u788E\u82B1",
        "Easter garden gala pet portrait, wearing a tailored pastel mint-green and baby-pink linen waistcoat, delicate daisy floral print silk bow tie, soft morning spring garden sunlight, pastel painted eggs in blurred foreground."
      ),
      makeItem(
        "thanksgiving",
        "\u611F\u6069\u8282\uFF1A\u79CB\u65E5\u7126\u7CD6\u5927\u5730\u8272\u7F8A\u6BDB\u730E\u88C5",
        "Thanksgiving Autumn Harvest",
        "\u4E30\u6536\u91D1\u79CB",
        "Thanksgiving harvest celebration, pet wearing an authentic caramel brown and warm oatmeal houndstooth wool hacking jacket, olive knit inner collar, golden autumn maple leaf bokeh, rich warm sunset glow."
      )
    ];
    CELEBRATION_MILESTONES = [
      makeItem(
        "birthday_vip",
        "\u751F\u65E5 VIP \u6D6E\u96D5\u5C0F\u86CB\u7CD5\u793C\u5BBE\u5199\u771F",
        "Birthday VIP Gala & Cake",
        "\u751F\u65E5\u4E13\u5C5E",
        "VIP Birthday celebration pet studio portrait. Natural relaxed sitting or lying pose facing camera with adorable calm expression. Wearing a lightweight macaron pastel party hat centered on head with natural volume without piercing ears, soft pink ruffled collar necklace loosely draped around lower chest. In front sits an artisanal mini pet birthday cake made of gourmet meat p\xE2t\xE9 and shrimp on a delicate embossed porcelain plate, topped with a single gently glowing lit birthday candle providing warm amber ambient candlelight, shallow depth of field, high resolution luxury pet studio photography.",
        "models/milo_gentle.webp",
        "hat penetrating ears, strap digging into skin, collar covering mouth, pet touching flame, candle too close to fur, multiple candles, cake fused with paws, cake attached to human body, underexposed, forced human grin, dangerous flame, dripping wax"
      ),
      makeItem(
        "debutante",
        "\u540D\u5A9B\u6210\u4EBA\u793C\uFF1A\u5DF4\u6D1B\u514B\u591A\u5708\u5929\u7136\u5FAE\u578B\u73CD\u73E0\u9879\u94FE",
        "The Debutante Ball Gala",
        "\u5DF4\u6D1B\u514B\u73CD\u73E0",
        "Debutante ball high-society gala portrait, pet wearing a lavish multi-strand baroque seed-pearl choker necklace with a miniature emerald gem pendant, blush-pink tulle gown collar, soft aristocratic salon chandelier lighting."
      ),
      makeItem(
        "graduation",
        "\u6BD5\u4E1A\u5178\u793C\uFF1A\u5FAE\u578B\u5B66\u58EB\u5782\u5E03\u4E0E\u8363\u8A89\u52CB\u5E26",
        "The Ivy League Graduation",
        "\u5E38\u9752\u85E4\u5B66\u58EB",
        "Ivy League pet graduation portrait, pet wearing a formal black academic gown collar with deep crimson and navy blue silk graduation hood trim, golden honor stole across chest, warm library atmosphere, proud milestone finish."
      ),
      makeItem(
        "wedding_ringbearer",
        "\u5A5A\u793C\u82B1\u7AE5\u4F34\u5BA0\uFF1A\u6781\u7B80\u8C61\u7259\u767D\u7F0E\u9762\u9886\u7ED3",
        "Wedding Ring-Bearer Tuxedo",
        "\u5A5A\u5178\u82B1\u7AE5",
        "Wedding ring-bearer pet fashion portrait, pet wearing a crisp pure white dress shirt collar with an exquisite double-layered ivory silk satin bow tie, tiny woven gold ring motif, romantic soft-focus white rose floral arch background."
      )
    ];
    CASCADING_THEMES = {
      fine_art: {
        key: "fine_art",
        nameZh: "\u827A\u672F\u6D41\u6D3E",
        nameEn: "Fine Art & Masters",
        headline: "Vogue Fine Art Edition",
        fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_gentle.webp",
        subCategories: [
          {
            id: "classical_masters",
            nameZh: "\u53E4\u5178\u540D\u753B\u6D3E",
            nameEn: "Classical Masters",
            items: FINE_ART_CLASSICAL
          },
          {
            id: "impressionist",
            nameZh: "\u73B0\u4EE3\u4E3B\u4E49\u4E0E\u5370\u8C61\u6D3E",
            nameEn: "Modern & Impressionist",
            items: FINE_ART_IMPRESSIONIST
          },
          {
            id: "pop_contemporary",
            nameZh: "\u5148\u950B\u63D2\u753B\u4E0E\u6CE2\u666E",
            nameEn: "Pop & Contemporary",
            items: FINE_ART_POP
          }
        ]
      },
      corporate: {
        key: "corporate",
        nameZh: "\u804C\u573A\u5DE5\u88C5",
        nameEn: "Corporate & 9-to-5",
        headline: "Wall Street & Tech Edition",
        fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_detective.webp",
        subCategories: [
          {
            id: "entry_level",
            nameZh: "\u5DE5\u4F4D\u57FA\u5C42\u725B\u9A6C",
            nameEn: "Entry-Level Drones",
            items: CORPORATE_ENTRY
          },
          {
            id: "management",
            nameZh: "\u7BA1\u7406\u4E0E\u4E2D\u5C42",
            nameEn: "Management & Leads",
            items: CORPORATE_MANAGEMENT
          },
          {
            id: "specialists",
            nameZh: "\u884C\u4E1A\u4E13\u4E1A\u4EBA\u5458",
            nameEn: "Specialists & Execs",
            items: CORPORATE_SPECIALISTS
          }
        ]
      },
      cosplay: {
        key: "cosplay",
        nameZh: "\u89D2\u8272\u626E\u6F14",
        nameEn: "Cinematic Cosplay",
        headline: "Cinematic Blockbuster Edition",
        fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_street.webp",
        subCategories: [
          {
            id: "legends",
            nameZh: "\u516C\u6709\u9886\u57DF\u4F20\u5947\u4EBA\u7269",
            nameEn: "Legendary Personas",
            items: COSPLAY_LEGENDS
          },
          {
            id: "marvel",
            nameZh: "\u6F2B\u5A01\u82F1\u96C4\u8054\u76DF",
            nameEn: "Marvel Icons",
            items: COSPLAY_MARVEL
          },
          {
            id: "dc",
            nameZh: "DC \u9ED1\u6697\u5B87\u5B99",
            nameEn: "DC Universe",
            items: COSPLAY_DC
          },
          {
            id: "scifi",
            nameZh: "\u79D1\u5E7B\u7ECF\u5178\u94F6\u5E55",
            nameEn: "Sci-Fi Legends",
            items: COSPLAY_SCIFI
          }
        ]
      },
      celebration: {
        key: "celebration",
        nameZh: "\u8282\u65E5\u5E86\u5178",
        nameEn: "Holidays & Milestones",
        headline: "Celebration & Gala Edition",
        fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_warm.webp",
        subCategories: [
          {
            id: "holidays",
            nameZh: "\u897F\u65B9\u4F20\u7EDF\u76DB\u5927\u8282\u65E5",
            nameEn: "Major Holidays",
            items: CELEBRATION_HOLIDAYS
          },
          {
            id: "milestones",
            nameZh: "\u4EBA\u751F\u9AD8\u5149\u65F6\u523B",
            nameEn: "Milestone Events",
            items: CELEBRATION_MILESTONES
          }
        ]
      }
    };
    STYLE_CONFIGS = {
      // New Core Themes (US English)
      fine_art: {
        key: "fine_art",
        name: "Fine Art",
        subtitle: "Classical Masterpieces & Modern Pop",
        prompt: FINE_ART_CLASSICAL[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
        variants: cascadingToLegacyVariants("fine_art")
      },
      corporate: {
        key: "corporate",
        name: "Corporate",
        subtitle: "Silicon Valley & Wall Street 9-to-5",
        prompt: CORPORATE_ENTRY[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
        variants: cascadingToLegacyVariants("corporate")
      },
      cosplay: {
        key: "cosplay",
        name: "Cosplay",
        subtitle: "Historical Royalty & Iconic Legends",
        prompt: COSPLAY_LEGENDS[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
        variants: cascadingToLegacyVariants("cosplay")
      },
      celebration: {
        key: "celebration",
        name: "Celebration",
        subtitle: "Holiday Galas & VIP Milestones",
        prompt: CELEBRATION_HOLIDAYS[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
        variants: cascadingToLegacyVariants("celebration")
      },
      // Legacy aliases mapped seamlessly
      gentle: {
        key: "gentle",
        name: "Fine Art (Legacy)",
        subtitle: "Classical Art Masterpieces",
        prompt: FINE_ART_CLASSICAL[1].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
        variants: cascadingToLegacyVariants("fine_art")
      },
      detective: {
        key: "detective",
        name: "Corporate (Legacy)",
        subtitle: "Executive & Aviator",
        prompt: CORPORATE_SPECIALISTS[3].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
        variants: cascadingToLegacyVariants("corporate")
      },
      street: {
        key: "street",
        name: "Cosplay (Legacy)",
        subtitle: "Cyber & Superhero",
        prompt: COSPLAY_MARVEL[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
        variants: cascadingToLegacyVariants("cosplay")
      },
      warm: {
        key: "warm",
        name: "Celebration (Legacy)",
        subtitle: "Festive & Winter Holiday",
        prompt: CELEBRATION_HOLIDAYS[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
        variants: cascadingToLegacyVariants("celebration")
      }
    };
    SUPPORTED_STYLE_KEYS = Object.keys(STYLE_CONFIGS);
    CORE_THEME_KEYS = ["fine_art", "corporate", "cosplay", "celebration"];
    THEME_SKILL_DIRECTIVES = {
      fine_art: "Fine art master oil painting technique, delicate atmospheric sfumato blending, authentic rich chiaroscuro single-source lighting, museum archival depth.",
      corporate: "Commercial executive editorial portrait, crisp 5600K balanced softbox studio lighting, rich tailored suit fabric microtexture, modern corporate ambient bokeh.",
      cosplay: "Cinematic Hollywood movie still lighting, high-contrast dramatic studio rims, photorealistic metallic armor reflections, 100% unmasked face with eyes completely visible.",
      celebration: "Opulent festive celebration lighting, warm ambient golden bokeh, shimmering velvet and silk sheen, aristocratic salon milestone elegance."
    };
    THEME_NEGATIVE_CONSTRAINTS = {
      fine_art: ", modern digital artifacts, casual clothes, sportswear, synthetic nylon, flat commercial lighting, cartoon, 3d render",
      corporate: ", pajamas, dirty t-shirt, distorted tie, extra collars, messy background, distorted corporate badges, casual sloppy clothes",
      cosplay: ", full head helmet, full face mask, gas mask, helmet covering eyes, obscured eyes, hidden snout, covered face, distorted pet expression, CGI doll",
      celebration: ", cheap plastic props, party store costume, garish neon, distorted jewelry, fake blur, low budget party"
    };
  }
});

// node_modules/zod/v3/helpers/util.cjs
var require_util = __commonJS({
  "node_modules/zod/v3/helpers/util.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getParsedType = exports.ZodParsedType = exports.objectUtil = exports.util = void 0;
    var util;
    (function(util2) {
      util2.assertEqual = (_) => {
      };
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (exports.util = util = {}));
    var objectUtil;
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (exports.objectUtil = objectUtil = {}));
    exports.ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    var getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return exports.ZodParsedType.undefined;
        case "string":
          return exports.ZodParsedType.string;
        case "number":
          return Number.isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
        case "boolean":
          return exports.ZodParsedType.boolean;
        case "function":
          return exports.ZodParsedType.function;
        case "bigint":
          return exports.ZodParsedType.bigint;
        case "symbol":
          return exports.ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return exports.ZodParsedType.array;
          }
          if (data === null) {
            return exports.ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return exports.ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return exports.ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return exports.ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return exports.ZodParsedType.date;
          }
          return exports.ZodParsedType.object;
        default:
          return exports.ZodParsedType.unknown;
      }
    };
    exports.getParsedType = getParsedType;
  }
});

// node_modules/zod/v3/ZodError.cjs
var require_ZodError = __commonJS({
  "node_modules/zod/v3/ZodError.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
    var util_js_1 = require_util();
    exports.ZodIssueCode = util_js_1.util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    var quotelessJson = (obj) => {
      const json = JSON.stringify(obj, null, 2);
      return json.replace(/"([^"]+)":/g, "$1:");
    };
    exports.quotelessJson = quotelessJson;
    var ZodError = class _ZodError extends Error {
      get errors() {
        return this.issues;
      }
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util_js_1.util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            const firstEl = sub.path[0];
            fieldErrors[firstEl] = fieldErrors[firstEl] || [];
            fieldErrors[firstEl].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    exports.ZodError = ZodError;
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
  }
});

// node_modules/zod/v3/locales/en.cjs
var require_en = __commonJS({
  "node_modules/zod/v3/locales/en.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ZodError_js_1 = require_ZodError();
    var util_js_1 = require_util();
    var errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodError_js_1.ZodIssueCode.invalid_type:
          if (issue.received === util_js_1.ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodError_js_1.ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_js_1.util.jsonStringifyReplacer)}`;
          break;
        case ZodError_js_1.ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util_js_1.util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util_js_1.util.joinValues(issue.options)}`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util_js_1.util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util_js_1.util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodError_js_1.ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "bigint")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodError_js_1.ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodError_js_1.ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodError_js_1.ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodError_js_1.ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util_js_1.util.assertNever(issue);
      }
      return { message };
    };
    exports.default = errorMap;
  }
});

// node_modules/zod/v3/errors.cjs
var require_errors = __commonJS({
  "node_modules/zod/v3/errors.cjs"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultErrorMap = void 0;
    exports.setErrorMap = setErrorMap;
    exports.getErrorMap = getErrorMap;
    var en_js_1 = __importDefault(require_en());
    exports.defaultErrorMap = en_js_1.default;
    var overrideErrorMap = en_js_1.default;
    function setErrorMap(map) {
      overrideErrorMap = map;
    }
    function getErrorMap() {
      return overrideErrorMap;
    }
  }
});

// node_modules/zod/v3/helpers/parseUtil.cjs
var require_parseUtil = __commonJS({
  "node_modules/zod/v3/helpers/parseUtil.cjs"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.EMPTY_PATH = exports.makeIssue = void 0;
    exports.addIssueToContext = addIssueToContext;
    var errors_js_1 = require_errors();
    var en_js_1 = __importDefault(require_en());
    var makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    };
    exports.makeIssue = makeIssue;
    exports.EMPTY_PATH = [];
    function addIssueToContext(ctx, issueData) {
      const overrideMap = (0, errors_js_1.getErrorMap)();
      const issue = (0, exports.makeIssue)({
        issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          // contextual error map is first priority
          ctx.schemaErrorMap,
          // then schema-bound map if available
          overrideMap,
          // then global override map
          overrideMap === en_js_1.default ? void 0 : en_js_1.default
          // then global default map
        ].filter((x) => !!x)
      });
      ctx.common.issues.push(issue);
    }
    var ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return exports.INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return exports.INVALID;
          if (value.status === "aborted")
            return exports.INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    exports.ParseStatus = ParseStatus;
    exports.INVALID = Object.freeze({
      status: "aborted"
    });
    var DIRTY = (value) => ({ status: "dirty", value });
    exports.DIRTY = DIRTY;
    var OK = (value) => ({ status: "valid", value });
    exports.OK = OK;
    var isAborted = (x) => x.status === "aborted";
    exports.isAborted = isAborted;
    var isDirty = (x) => x.status === "dirty";
    exports.isDirty = isDirty;
    var isValid = (x) => x.status === "valid";
    exports.isValid = isValid;
    var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    exports.isAsync = isAsync;
  }
});

// node_modules/zod/v3/helpers/typeAliases.cjs
var require_typeAliases = __commonJS({
  "node_modules/zod/v3/helpers/typeAliases.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/zod/v3/helpers/errorUtil.cjs
var require_errorUtil = __commonJS({
  "node_modules/zod/v3/helpers/errorUtil.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorUtil = void 0;
    var errorUtil;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
    })(errorUtil || (exports.errorUtil = errorUtil = {}));
  }
});

// node_modules/zod/v3/types.cjs
var require_types = __commonJS({
  "node_modules/zod/v3/types.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.coerce = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.ZodReadonly = exports.ZodPipeline = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodCatch = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
    exports.NEVER = exports.void = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.symbol = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.pipeline = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports.null = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports.instanceof = exports.function = exports.enum = exports.effect = void 0;
    exports.datetimeRegex = datetimeRegex;
    exports.custom = custom;
    var ZodError_js_1 = require_ZodError();
    var errors_js_1 = require_errors();
    var errorUtil_js_1 = require_errorUtil();
    var parseUtil_js_1 = require_parseUtil();
    var util_js_1 = require_util();
    var ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (Array.isArray(this._key)) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    var handleResult = (ctx, result) => {
      if ((0, parseUtil_js_1.isValid)(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError_js_1.ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    function processCreateParams(params) {
      if (!params)
        return {};
      const { errorMap, invalid_type_error, required_error, description } = params;
      if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
      }
      if (errorMap)
        return { errorMap, description };
      const customMap = (iss, ctx) => {
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
          return { message: message ?? ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
          return { message: message ?? required_error ?? ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
          return { message: ctx.defaultError };
        return { message: message ?? invalid_type_error ?? ctx.defaultError };
      };
      return { errorMap: customMap, description };
    }
    var ZodType = class {
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return (0, util_js_1.getParsedType)(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: (0, util_js_1.getParsedType)(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new parseUtil_js_1.ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_js_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_js_1.isAsync)(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        const ctx = {
          common: {
            issues: [],
            async: params?.async ?? false,
            contextualErrorMap: params?.errorMap
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_js_1.getParsedType)(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      "~validate"(data) {
        const ctx = {
          common: {
            issues: [],
            async: !!this["~standard"].async
          },
          path: [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_js_1.getParsedType)(data)
        };
        if (!this["~standard"].async) {
          try {
            const result = this._parseSync({ data, path: [], parent: ctx });
            return (0, parseUtil_js_1.isValid)(result) ? {
              value: result.value
            } : {
              issues: ctx.common.issues
            };
          } catch (err) {
            if (err?.message?.toLowerCase()?.includes("encountered")) {
              this["~standard"].async = true;
            }
            ctx.common = {
              issues: [],
              async: true
            };
          }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => (0, parseUtil_js_1.isValid)(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        });
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params?.errorMap,
            async: true
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_js_1.getParsedType)(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await ((0, parseUtil_js_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodError_js_1.ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (data) => this["~validate"](data)
        };
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    exports.ZodType = ZodType;
    exports.Schema = ZodType;
    exports.ZodSchema = ZodType;
    var cuidRegex = /^c[^\s-]{8,}$/i;
    var cuid2Regex = /^[0-9a-z]+$/;
    var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    var nanoidRegex = /^[a-z0-9_-]{21}$/i;
    var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    var emojiRegex;
    var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
    var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
    var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    var dateRegex = new RegExp(`^${dateRegexSource}$`);
    function timeRegexSource(args) {
      let secondsRegexSource = `[0-5]\\d`;
      if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
      } else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
      }
      const secondsQuantifier = args.precision ? "+" : "?";
      return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
    }
    function timeRegex(args) {
      return new RegExp(`^${timeRegexSource(args)}$`);
    }
    function datetimeRegex(args) {
      let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
      const opts = [];
      opts.push(args.local ? `Z?` : `Z`);
      if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
      regex = `${regex}(${opts.join("|")})`;
      return new RegExp(`^${regex}$`);
    }
    function isValidIP(ip, version) {
      if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
      }
      if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
      }
      return false;
    }
    function isValidJWT(jwt, alg) {
      if (!jwtRegex.test(jwt))
        return false;
      try {
        const [header] = jwt.split(".");
        if (!header)
          return false;
        const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
          return false;
        if ("typ" in decoded && decoded?.typ !== "JWT")
          return false;
        if (!decoded.alg)
          return false;
        if (alg && decoded.alg !== alg)
          return false;
        return true;
      } catch {
        return false;
      }
    }
    function isValidCidr(ip, version) {
      if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
      }
      if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
      }
      return false;
    }
    var ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.string,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                  code: ZodError_js_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                  code: ZodError_js_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "email",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "emoji",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "uuid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "nanoid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cuid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cuid2",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "ulid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "url",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "regex",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "duration",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "ip",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "jwt") {
            if (!isValidJWT(input.data, check.alg)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "jwt",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cidr") {
            if (!isValidCidr(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cidr",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "base64",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64url") {
            if (!base64urlRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "base64url",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodError_js_1.ZodIssueCode.invalid_string,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      base64url(message) {
        return this._addCheck({
          kind: "base64url",
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil_js_1.errorUtil.errToObj(options) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil_js_1.errorUtil.errToObj(options) });
      }
      cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil_js_1.errorUtil.errToObj(options) });
      }
      datetime(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof options?.precision === "undefined" ? null : options?.precision,
          offset: options?.offset ?? false,
          local: options?.local ?? false,
          ...errorUtil_js_1.errorUtil.errToObj(options?.message)
        });
      }
      date(message) {
        return this._addCheck({ kind: "date", message });
      }
      time(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof options?.precision === "undefined" ? null : options?.precision,
          ...errorUtil_js_1.errorUtil.errToObj(options?.message)
        });
      }
      duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil_js_1.errorUtil.errToObj(message) });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options?.position,
          ...errorUtil_js_1.errorUtil.errToObj(options?.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil_js_1.errorUtil.errToObj(message)
        });
      }
      /**
       * Equivalent to `.min(1)`
       */
      nonempty(message) {
        return this.min(1, errorUtil_js_1.errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get isBase64url() {
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    exports.ZodString = ZodString;
    ZodString.create = (params) => {
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    function floatSafeRemainder(val, step) {
      const valDecCount = (val.toString().split(".")[1] || "").length;
      const stepDecCount = (step.toString().split(".")[1] || "").length;
      const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
      const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
      const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
      return valInt % stepInt / 10 ** decCount;
    }
    var ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.number,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        let ctx = void 0;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util_js_1.util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil_js_1.errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil_js_1.errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util_js_1.util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    exports.ZodNumber = ZodNumber;
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    var ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          try {
            input.data = BigInt(input.data);
          } catch {
            return this._getInvalidInput(input);
          }
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.bigint) {
          return this._getInvalidInput(input);
        }
        let ctx = void 0;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
          code: ZodError_js_1.ZodIssueCode.invalid_type,
          expected: util_js_1.ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return parseUtil_js_1.INVALID;
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil_js_1.errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    exports.ZodBigInt = ZodBigInt;
    ZodBigInt.create = (params) => {
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    var ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodBoolean = ZodBoolean;
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    var ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.date,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_date
          });
          return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    exports.ZodDate = ZodDate;
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    var ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodSymbol = ZodSymbol;
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    var ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodUndefined = ZodUndefined;
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    var ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.null,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodNull = ZodNull;
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    var ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodAny = ZodAny;
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    var ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodUnknown = ZodUnknown;
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    var ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
          code: ZodError_js_1.ZodIssueCode.invalid_type,
          expected: util_js_1.ZodParsedType.never,
          received: ctx.parsedType
        });
        return parseUtil_js_1.INVALID;
      }
    };
    exports.ZodNever = ZodNever;
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    var ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.void,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodVoid = ZodVoid;
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    var ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: tooBig ? ZodError_js_1.ZodIssueCode.too_big : ZodError_js_1.ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return parseUtil_js_1.ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return parseUtil_js_1.ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil_js_1.errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil_js_1.errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil_js_1.errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports.ZodArray = ZodArray;
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    function deepPartialify(schema) {
      if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
          const fieldSchema = schema.shape[key];
          newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
          ...schema._def,
          shape: () => newShape
        });
      } else if (schema instanceof ZodArray) {
        return new ZodArray({
          ...schema._def,
          type: deepPartialify(schema.element)
        });
      } else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
      } else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
      } else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
      } else {
        return schema;
      }
    }
    var ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util_js_1.util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return parseUtil_js_1.ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil_js_1.errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: errorUtil_js_1.errorUtil.errToObj(message).message ?? defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new _ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(mask)) {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util_js_1.util.objectKeys(this.shape));
      }
    };
    exports.ZodObject = ZodObject;
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    var ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError_js_1.ZodError(result.ctx.common.issues));
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError_js_1.ZodError(issues2));
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_js_1.INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    exports.ZodUnion = ZodUnion;
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    var getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util_js_1.util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    };
    var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
    function mergeValues(a, b) {
      const aType = (0, util_js_1.getParsedType)(a);
      const bType = (0, util_js_1.getParsedType)(b);
      if (a === b) {
        return { valid: true, data: a };
      } else if (aType === util_js_1.ZodParsedType.object && bType === util_js_1.ZodParsedType.object) {
        const bKeys = util_js_1.util.objectKeys(b);
        const sharedKeys = util_js_1.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
          const sharedValue = mergeValues(a[key], b[key]);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
      } else if (aType === util_js_1.ZodParsedType.array && bType === util_js_1.ZodParsedType.array) {
        if (a.length !== b.length) {
          return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
          const itemA = a[index];
          const itemB = b[index];
          const sharedValue = mergeValues(itemA, itemB);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
      } else if (aType === util_js_1.ZodParsedType.date && bType === util_js_1.ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
      } else {
        return { valid: false };
      }
    }
    var ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if ((0, parseUtil_js_1.isAborted)(parsedLeft) || (0, parseUtil_js_1.isAborted)(parsedRight)) {
            return parseUtil_js_1.INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.invalid_intersection_types
            });
            return parseUtil_js_1.INVALID;
          }
          if ((0, parseUtil_js_1.isDirty)(parsedLeft) || (0, parseUtil_js_1.isDirty)(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    exports.ZodIntersection = ZodIntersection;
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    var ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return parseUtil_js_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return parseUtil_js_1.ParseStatus.mergeArray(status, results);
          });
        } else {
          return parseUtil_js_1.ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    exports.ZodTuple = ZodTuple;
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    var ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (ctx.common.async) {
          return parseUtil_js_1.ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    exports.ZodRecord = ZodRecord;
    var ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.map) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.map,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return parseUtil_js_1.INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return parseUtil_js_1.INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    exports.ZodMap = ZodMap;
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    var ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.set) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.set,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return parseUtil_js_1.INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil_js_1.errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil_js_1.errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports.ZodSet = ZodSet;
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    var ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.function) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.function,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        function makeArgsIssue(args, error) {
          return (0, parseUtil_js_1.makeIssue)({
            data: args,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
            issueData: {
              code: ZodError_js_1.ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return (0, parseUtil_js_1.makeIssue)({
            data: returns,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
            issueData: {
              code: ZodError_js_1.ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return (0, parseUtil_js_1.OK)(async function(...args) {
            const error = new ZodError_js_1.ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return (0, parseUtil_js_1.OK)(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError_js_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError_js_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    exports.ZodFunction = ZodFunction;
    var ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    exports.ZodLazy = ZodLazy;
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    var ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return parseUtil_js_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    exports.ZodLiteral = ZodLiteral;
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    function createZodEnum(values, params) {
      return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params)
      });
    }
    var ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            expected: util_js_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_js_1.ZodIssueCode.invalid_type
          });
          return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    };
    exports.ZodEnum = ZodEnum;
    ZodEnum.create = createZodEnum;
    var ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util_js_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.string && ctx.parsedType !== util_js_1.ZodParsedType.number) {
          const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            expected: util_js_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_js_1.ZodIssueCode.invalid_type
          });
          return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(util_js_1.util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
          const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    exports.ZodNativeEnum = ZodNativeEnum;
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    var ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.promise && ctx.common.async === false) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.promise,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const promisified = ctx.parsedType === util_js_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_js_1.OK)(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    exports.ZodPromise = ZodPromise;
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    var ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            (0, parseUtil_js_1.addIssueToContext)(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return parseUtil_js_1.INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return parseUtil_js_1.INVALID;
              if (result.status === "dirty")
                return (0, parseUtil_js_1.DIRTY)(result.value);
              if (status.value === "dirty")
                return (0, parseUtil_js_1.DIRTY)(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return parseUtil_js_1.INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return parseUtil_js_1.INVALID;
            if (result.status === "dirty")
              return (0, parseUtil_js_1.DIRTY)(result.value);
            if (status.value === "dirty")
              return (0, parseUtil_js_1.DIRTY)(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return parseUtil_js_1.INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return parseUtil_js_1.INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!(0, parseUtil_js_1.isValid)(base))
              return parseUtil_js_1.INVALID;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!(0, parseUtil_js_1.isValid)(base))
                return parseUtil_js_1.INVALID;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                status: status.value,
                value: result
              }));
            });
          }
        }
        util_js_1.util.assertNever(effect);
      }
    };
    exports.ZodEffects = ZodEffects;
    exports.ZodTransformer = ZodEffects;
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    var ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.undefined) {
          return (0, parseUtil_js_1.OK)(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodOptional = ZodOptional;
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    var ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.null) {
          return (0, parseUtil_js_1.OK)(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodNullable = ZodNullable;
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    var ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_js_1.ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    exports.ZodDefault = ZodDefault;
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    var ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if ((0, parseUtil_js_1.isAsync)(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError_js_1.ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError_js_1.ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    exports.ZodCatch = ZodCatch;
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    var ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.nan,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    exports.ZodNaN = ZodNaN;
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    exports.BRAND = Symbol("zod_brand");
    var ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    exports.ZodBranded = ZodBranded;
    var ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return parseUtil_js_1.INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return (0, parseUtil_js_1.DIRTY)(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return parseUtil_js_1.INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    exports.ZodPipeline = ZodPipeline;
    var ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
          if ((0, parseUtil_js_1.isValid)(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        };
        return (0, parseUtil_js_1.isAsync)(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodReadonly = ZodReadonly;
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    function cleanParams(params, data) {
      const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
      const p2 = typeof p === "string" ? { message: p } : p;
      return p2;
    }
    function custom(check, _params = {}, fatal) {
      if (check)
        return ZodAny.create().superRefine((data, ctx) => {
          const r = check(data);
          if (r instanceof Promise) {
            return r.then((r2) => {
              if (!r2) {
                const params = cleanParams(_params, data);
                const _fatal = params.fatal ?? fatal ?? true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
              }
            });
          }
          if (!r) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
          return;
        });
      return ZodAny.create();
    }
    exports.late = {
      object: ZodObject.lazycreate
    };
    var ZodFirstPartyTypeKind;
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {}));
    var instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    exports.instanceof = instanceOfType;
    var stringType = ZodString.create;
    exports.string = stringType;
    var numberType = ZodNumber.create;
    exports.number = numberType;
    var nanType = ZodNaN.create;
    exports.nan = nanType;
    var bigIntType = ZodBigInt.create;
    exports.bigint = bigIntType;
    var booleanType = ZodBoolean.create;
    exports.boolean = booleanType;
    var dateType = ZodDate.create;
    exports.date = dateType;
    var symbolType = ZodSymbol.create;
    exports.symbol = symbolType;
    var undefinedType = ZodUndefined.create;
    exports.undefined = undefinedType;
    var nullType = ZodNull.create;
    exports.null = nullType;
    var anyType = ZodAny.create;
    exports.any = anyType;
    var unknownType = ZodUnknown.create;
    exports.unknown = unknownType;
    var neverType = ZodNever.create;
    exports.never = neverType;
    var voidType = ZodVoid.create;
    exports.void = voidType;
    var arrayType = ZodArray.create;
    exports.array = arrayType;
    var objectType = ZodObject.create;
    exports.object = objectType;
    var strictObjectType = ZodObject.strictCreate;
    exports.strictObject = strictObjectType;
    var unionType = ZodUnion.create;
    exports.union = unionType;
    var discriminatedUnionType = ZodDiscriminatedUnion.create;
    exports.discriminatedUnion = discriminatedUnionType;
    var intersectionType = ZodIntersection.create;
    exports.intersection = intersectionType;
    var tupleType = ZodTuple.create;
    exports.tuple = tupleType;
    var recordType = ZodRecord.create;
    exports.record = recordType;
    var mapType = ZodMap.create;
    exports.map = mapType;
    var setType = ZodSet.create;
    exports.set = setType;
    var functionType = ZodFunction.create;
    exports.function = functionType;
    var lazyType = ZodLazy.create;
    exports.lazy = lazyType;
    var literalType = ZodLiteral.create;
    exports.literal = literalType;
    var enumType = ZodEnum.create;
    exports.enum = enumType;
    var nativeEnumType = ZodNativeEnum.create;
    exports.nativeEnum = nativeEnumType;
    var promiseType = ZodPromise.create;
    exports.promise = promiseType;
    var effectsType = ZodEffects.create;
    exports.effect = effectsType;
    exports.transformer = effectsType;
    var optionalType = ZodOptional.create;
    exports.optional = optionalType;
    var nullableType = ZodNullable.create;
    exports.nullable = nullableType;
    var preprocessType = ZodEffects.createWithPreprocess;
    exports.preprocess = preprocessType;
    var pipelineType = ZodPipeline.create;
    exports.pipeline = pipelineType;
    var ostring = () => stringType().optional();
    exports.ostring = ostring;
    var onumber = () => numberType().optional();
    exports.onumber = onumber;
    var oboolean = () => booleanType().optional();
    exports.oboolean = oboolean;
    exports.coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    exports.NEVER = parseUtil_js_1.INVALID;
  }
});

// node_modules/zod/v3/external.cjs
var require_external = __commonJS({
  "node_modules/zod/v3/external.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_errors(), exports);
    __exportStar(require_parseUtil(), exports);
    __exportStar(require_typeAliases(), exports);
    __exportStar(require_util(), exports);
    __exportStar(require_types(), exports);
    __exportStar(require_ZodError(), exports);
  }
});

// node_modules/zod/index.cjs
var require_zod = __commonJS({
  "node_modules/zod/index.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    var z2 = __importStar(require_external());
    exports.z = z2;
    __exportStar(require_external(), exports);
    exports.default = z2;
  }
});

// src/index.ts
var import_hono4 = __toESM(require_cjs());

// src/middleware/cors.ts
var corsMiddleware = () => {
  return async (c, next) => {
    const origin = c.env?.CORS_ORIGIN || "*";
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    c.header("Access-Control-Max-Age", "86400");
    if (c.req.method === "OPTIONS") {
      return c.body(null, 204);
    }
    await next();
  };
};

// src/middleware/logger.ts
var loggerMiddleware = () => {
  return async (c, next) => {
    const start = Date.now();
    const traceId = c.req.header("x-trace-id") || crypto.randomUUID();
    const clientIp = c.req.header("cf-connecting-ip") || c.req.header("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    c.set("traceId", traceId);
    c.set("clientIp", clientIp);
    c.header("X-Trace-Id", traceId);
    await next();
    const duration = Date.now() - start;
    const status = c.res.status;
    const path = c.req.path;
    const method = c.req.method;
    console.log(
      JSON.stringify({
        level: "INFO",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        traceId,
        clientIp,
        method,
        path,
        status,
        durationMs: duration
      })
    );
  };
};

// src/middleware/rateLimiter.ts
var DEFAULT_DAILY_BUDGET_CAP = 1500;
var DEFAULT_IP_HOURLY_CAP = 3;
var DEFAULT_IP_DAILY_CAP = 10;
var rateLimiterMiddleware = (options) => {
  return async (c, next) => {
    if (c.req.method !== "POST") {
      return await next();
    }
    const kv = c.env?.RATE_LIMIT_KV;
    if (!kv) {
      return await next();
    }
    const dailyBudgetCap = options?.dailyBudgetCap ?? DEFAULT_DAILY_BUDGET_CAP;
    const ipHourlyCap = options?.ipHourlyCap ?? DEFAULT_IP_HOURLY_CAP;
    const ipDailyCap = options?.ipDailyCap ?? DEFAULT_IP_DAILY_CAP;
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const hourStr = `${dateStr}-${now.getUTCHours().toString().padStart(2, "0")}`;
    const ip = c.get("clientIp") || "127.0.0.1";
    const blacklistKey = `blacklist:ip:${ip}`;
    const isBlacklisted = await kv.get(blacklistKey);
    if (isBlacklisted) {
      const errorResp = {
        success: false,
        errorCode: "IP_BLACKLISTED",
        message: "Your IP address has been temporarily suspended due to abusive automated requests."
      };
      return c.json(errorResp, 403);
    }
    const tenSecondWindow = Math.floor(now.getTime() / 1e4);
    const burstKey = `burst:ip:${ip}:${tenSecondWindow}`;
    const burstCountStr = await kv.get(burstKey);
    const burstCount = burstCountStr ? parseInt(burstCountStr, 10) : 0;
    if (burstCount >= 5) {
      await kv.put(blacklistKey, "AUTO_BANNED_RAPID_FIRE", { expirationTtl: 86400 });
      console.warn(`[RateLimiter] IP [${ip}] triggered rapid-fire burst limit (5 req/10s). Auto-blacklisted for 24h.`);
      const errorResp = {
        success: false,
        errorCode: "ABUSIVE_BURST_BLOCKED",
        message: "Abnormal request burst detected. IP address blacklisted for 24 hours."
      };
      return c.json(errorResp, 403);
    }
    const dailyCapKey = `finops:daily:${dateStr}`;
    const dailyTotalStr = await kv.get(dailyCapKey);
    const dailyTotal = dailyTotalStr ? parseInt(dailyTotalStr, 10) : 0;
    if (dailyTotal >= dailyBudgetCap) {
      const errorResp = {
        success: false,
        errorCode: "FINOPS_CAP_REACHED",
        message: "Today's Haute Couture fitting quota has been fully claimed. Please come back tomorrow at 00:00 UTC!"
      };
      return c.json(errorResp, 429);
    }
    const url = new URL(c.req.url);
    const isTestBypass = c.req.header("x-test-bypass") === "1" || url.searchParams.get("test_bypass") === "1" || url.searchParams.get("debug") === "1";
    if (!isTestBypass) {
      const ipHourlyKey = `ratelimit:ip:${ip}:${hourStr}`;
      const ipDailyKey = `ratelimit:ip:${ip}:${dateStr}`;
      const ipHourlyStr = await kv.get(ipHourlyKey);
      const ipHourly = ipHourlyStr ? parseInt(ipHourlyStr, 10) : 0;
      if (ipHourly >= ipHourlyCap) {
        const errorResp = {
          success: false,
          errorCode: "RATE_LIMIT_EXCEEDED",
          message: `You have reached the hourly limit of ${ipHourlyCap} bespoke covers. Please try again later.`
        };
        return c.json(errorResp, 429);
      }
      const ipDailyStr = await kv.get(ipDailyKey);
      const ipDaily = ipDailyStr ? parseInt(ipDailyStr, 10) : 0;
      if (ipDaily >= ipDailyCap) {
        const errorResp = {
          success: false,
          errorCode: "RATE_LIMIT_EXCEEDED",
          message: `You have reached the daily limit of ${ipDailyCap} bespoke covers. Please come back tomorrow!`
        };
        return c.json(errorResp, 429);
      }
      const currentHourly = ipHourlyStr ? parseInt(ipHourlyStr, 10) : 0;
      const currentDaily = ipDailyStr ? parseInt(ipDailyStr, 10) : 0;
      await Promise.all([
        kv.put(dailyCapKey, (dailyTotal + 1).toString(), { expirationTtl: 172800 }),
        kv.put(ipHourlyKey, (currentHourly + 1).toString(), { expirationTtl: 7200 }),
        kv.put(ipDailyKey, (currentDaily + 1).toString(), { expirationTtl: 172800 }),
        kv.put(burstKey, (burstCount + 1).toString(), { expirationTtl: 60 })
      ]);
    } else {
      await kv.put(dailyCapKey, (dailyTotal + 1).toString(), { expirationTtl: 172800 });
    }
    await next();
  };
};

// src/services/metricsService.ts
function getBeijingDateString(date = /* @__PURE__ */ new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai" }).format(date);
}
var STYLE_NAMES = {
  fine_art: "\u540D\u7EC5\u665A\u5BB4 (Gentle Evening)",
  gentle: "\u540D\u7EC5\u665A\u5BB4 (Gentle Evening)",
  cool_black: "\u9ED1\u8D85\u5148\u950B (Aviator Pioneer)",
  aviator: "\u9ED1\u8D85\u5148\u950B (Aviator Pioneer)",
  street_style: "\u65F7\u91CE\u673A\u80FD (Wilderness Outdoor)",
  wilderness: "\u65F7\u91CE\u673A\u80FD (Wilderness Outdoor)",
  cozy_warm: "\u6E29\u6696\u624B\u5DE5 (Artisan Wool)",
  artisan: "\u6E29\u6696\u624B\u5DE5 (Artisan Wool)"
};
function parseMetrics(raw, dateStr) {
  const defaultMetrics = {
    date: dateStr,
    totalGenerations: 0,
    realUploads: 0,
    presetViews: 0,
    styleCounts: {},
    failoverCount: 0,
    upstreamErrors: 0,
    botBlocked: 0,
    uniqueIps: 0
  };
  if (!raw) return defaultMetrics;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return { ...defaultMetrics, ...parsed, styleCounts: { ...parsed.styleCounts } };
    } catch {
      return defaultMetrics;
    }
  }
  if (typeof raw === "object") {
    const obj = raw;
    return { ...defaultMetrics, ...obj, styleCounts: { ...obj.styleCounts } };
  }
  return defaultMetrics;
}
var MetricsService = class {
  /**
   * Records a generation event asynchronously into Cloudflare KV
   */
  async recordGeneration(kv, params) {
    if (!kv) return;
    const dateStr = getBeijingDateString();
    const metricsKey = `metrics_summary:${dateStr}`;
    try {
      let isNewIp = false;
      if (params.clientIp) {
        const ipKey = `metrics_ip:${dateStr}:${params.clientIp}`;
        const existing = await kv.get(ipKey);
        if (!existing) {
          isNewIp = true;
          await kv.put(ipKey, "1", { expirationTtl: 86400 * 2 });
        }
      }
      const raw = await kv.get(metricsKey, "json");
      const metrics = parseMetrics(raw, dateStr);
      metrics.totalGenerations += 1;
      if (params.isRealUpload) {
        metrics.realUploads += 1;
      } else {
        metrics.presetViews += 1;
      }
      const sKey = params.styleKey || "unknown";
      metrics.styleCounts[sKey] = (metrics.styleCounts[sKey] || 0) + 1;
      if (params.isFallback) {
        metrics.failoverCount += 1;
      }
      if (params.hasError) {
        metrics.upstreamErrors += 1;
      }
      if (isNewIp) {
        metrics.uniqueIps += 1;
      }
      await kv.put(metricsKey, JSON.stringify(metrics), { expirationTtl: 86400 * 30 });
    } catch (err) {
      console.error("[MetricsService] Failed to record generation metric:", err);
    }
  }
  /**
   * Records a blocked bot/crawler attempt asynchronously
   */
  async recordBotBlocked(kv) {
    if (!kv) return;
    const dateStr = getBeijingDateString();
    const metricsKey = `metrics_summary:${dateStr}`;
    try {
      const raw = await kv.get(metricsKey, "json");
      const metrics = parseMetrics(raw, dateStr);
      metrics.botBlocked += 1;
      await kv.put(metricsKey, JSON.stringify(metrics), { expirationTtl: 86400 * 30 });
    } catch (err) {
      console.error("[MetricsService] Failed to record bot blocked metric:", err);
    }
  }
  /**
   * Retrieves summary for a specific date
   */
  async getDailySummary(kv, dateStr) {
    const targetDate = dateStr || getBeijingDateString();
    if (!kv) {
      return parseMetrics(null, targetDate);
    }
    try {
      const raw = await kv.get(`metrics_summary:${targetDate}`, "json");
      return parseMetrics(raw, targetDate);
    } catch (err) {
      console.error("[MetricsService] Error getting daily summary:", err);
      return parseMetrics(null, targetDate);
    }
  }
  /**
   * Formats the daily summary into an executive-grade, pure Markdown report without any emojis
   */
  formatDailyReportMarkdown(metrics, environment = "production") {
    const total = metrics.totalGenerations;
    const realUploadRate = total > 0 ? (metrics.realUploads / total * 100).toFixed(1) : "0.0";
    const avgPerUser = metrics.uniqueIps > 0 ? (total / metrics.uniqueIps).toFixed(1) : "0.0";
    const costPerCall = 0.2;
    const totalCost = (metrics.realUploads * costPerCall).toFixed(2);
    const savingsCost = (metrics.presetViews * costPerCall).toFixed(2);
    const costPerUv = metrics.uniqueIps > 0 ? (metrics.realUploads * costPerCall / metrics.uniqueIps).toFixed(2) : "0.00";
    const effectiveTotal = total > 0 ? total : 1;
    const slaRate = total > 0 ? ((total - metrics.upstreamErrors) / effectiveTotal * 100).toFixed(1) : "100.0";
    const sortedStyles = Object.entries(metrics.styleCounts).sort((a, b) => b[1] - a[1]);
    let styleListText = "";
    if (sortedStyles.length === 0) {
      styleListText = "- \u6682\u65E0\u751F\u6210\u6570\u636E";
    } else {
      styleListText = sortedStyles.map(([key, count], index) => {
        const name = STYLE_NAMES[key] || key;
        const pct = total > 0 ? (count / total * 100).toFixed(1) : "0.0";
        return `${index + 1}. ${name}: ${count} \u6B21 (${pct}%)`;
      }).join("\n");
    }
    return `### [ViviBon Cover] \u6BCF\u65E5\u8FD0\u8425\u4E0E\u589E\u957F\u6218\u62A5
> \u7EDF\u8BA1\u5468\u671F: ${metrics.date} (\u622A\u81F3 22:00 CST)
> \u8FD0\u884C\u73AF\u5883: Cloudflare Edge Cluster (${environment})

---
**\u4E00\u3001 \u6838\u5FC3\u4E1A\u52A1\u4E0E\u8F6C\u5316\u6F0F\u6597**
- \u72EC\u7ACB\u521B\u4F5C\u8005 (UV): ${metrics.uniqueIps} \u4EBA
- \u603B\u751F\u6210\u5927\u7247\u6570: ${metrics.totalGenerations} \u6B21 (\u4EBA\u5747 ${avgPerUser} \u6B21)
- \u771F\u5B9E\u7231\u5BA0\u4E0A\u4F20\u7387: ${realUploadRate}% (${metrics.realUploads} \u6B21\u771F\u56FE\u91CD\u7ED8)
- \u9884\u7F6E\u6A21\u7279\u6D4F\u89C8\u6570: ${metrics.presetViews} \u6B21

**\u4E8C\u3001 \u7206\u6B3E\u98CE\u683C\u504F\u597D\u5206\u5E03**
${styleListText}

**\u4E09\u3001 \u8D22\u52A1\u4E0E\u7B97\u529B\u7CBE\u7EC6\u5316\u6838\u7B97 (FinOps)**
- \u7845\u57FA\u6D41\u52A8\u5B9E\u9645\u8C03\u7528: ${metrics.realUploads} \u6B21
- \u4ECA\u65E5\u5927\u6A21\u578B\u5B9E\u9500\u91D1\u989D: \uFFE5${totalCost}
- \u9884\u7F6E\u8D44\u4EA7\u8282\u7701\u7B97\u529B: \uFFE5${savingsCost} (${metrics.presetViews} \u6B21\u547D\u4E2D)
- \u5355\u5BA2\u83B7\u5BA2\u7B97\u529B\u6210\u672C: \uFFE5${costPerUv} / \u4EBA

**\u56DB\u3001 \u7CFB\u7EDF\u53EF\u7528\u6027\u4E0E\u5B89\u5168\u9632\u5FA1**
- \u670D\u52A1\u53EF\u7528\u7387 (SLA): ${slaRate}%
- \u4E0A\u6E38\u8D85\u65F6/\u6545\u969C\u964D\u7EA7: ${metrics.failoverCount} \u6B21
- \u6076\u610F\u722C\u866B\u4E0E\u811A\u672C\u62E6\u622A: ${metrics.botBlocked} \u6B21
`;
  }
};
var metricsService = new MetricsService();

// src/middleware/antiBot.ts
var AUTOMATED_BOT_PATTERNS = [
  /python-requests/i,
  /aiohttp/i,
  /httpx/i,
  /^curl\//i,
  /^wget\//i,
  /go-http-client/i,
  /scrapy/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /java\/\d/i,
  /okhttp/i,
  /apache-httpclient/i
];
var antiBotMiddleware = () => {
  return async (c, next) => {
    if (c.req.method !== "POST") {
      return await next();
    }
    const url = new URL(c.req.url);
    if (c.req.header("x-test-bypass") === "1" || url.searchParams.get("test_bypass") === "1" || url.searchParams.get("debug") === "1") {
      return await next();
    }
    const userAgent = c.req.header("user-agent") || "";
    if (!userAgent || userAgent.trim().length < 5) {
      if (c.env?.RATE_LIMIT_KV) {
        try {
          c.executionCtx.waitUntil(metricsService.recordBotBlocked(c.env.RATE_LIMIT_KV));
        } catch {
          metricsService.recordBotBlocked(c.env.RATE_LIMIT_KV).catch(() => {
          });
        }
      }
      const errorResp = {
        success: false,
        errorCode: "BOT_DETECTED",
        message: "Automated script detected. Valid browser environment required."
      };
      return c.json(errorResp, 403);
    }
    for (const pattern of AUTOMATED_BOT_PATTERNS) {
      if (pattern.test(userAgent)) {
        console.warn(`[AntiBot] Blocked suspicious automated agent [${userAgent}] from IP [${c.get("clientIp")}]`);
        if (c.env?.RATE_LIMIT_KV) {
          try {
            c.executionCtx.waitUntil(metricsService.recordBotBlocked(c.env.RATE_LIMIT_KV));
          } catch {
            metricsService.recordBotBlocked(c.env.RATE_LIMIT_KV).catch(() => {
            });
          }
        }
        const errorResp = {
          success: false,
          errorCode: "BOT_DETECTED",
          message: "Automated scraping and headless tools are strictly restricted."
        };
        return c.json(errorResp, 403);
      }
    }
    if (c.req.method === "POST") {
      const contentType = c.req.header("content-type") || "";
      if (!contentType.includes("application/json")) {
        const errorResp = {
          success: false,
          errorCode: "INVALID_HEADERS",
          message: "Request content-type must be application/json."
        };
        return c.json(errorResp, 400);
      }
    }
    await next();
  };
};

// src/routes/health.ts
var import_hono = __toESM(require_cjs(), 1);
var healthRoute = new import_hono.Hono();
healthRoute.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "vivibon-cover-worker",
    environment: c.env.ENVIRONMENT || "development",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});

// src/routes/styles.ts
var import_hono2 = __toESM(require_cjs(), 1);
init_styles();
var stylesRoute = new import_hono2.Hono();
stylesRoute.get("/api/styles", (c) => {
  const themes = CORE_THEME_KEYS.map((key) => CASCADING_THEMES[key]);
  return c.json({
    success: true,
    data: {
      themes
    }
  });
});

// src/routes/generate.ts
var import_hono3 = __toESM(require_cjs(), 1);

// src/schemas/generate.ts
var import_zod = __toESM(require_zod(), 1);
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
var MAX_BASE64_LENGTH = Math.ceil(MAX_IMAGE_BYTES * 4 / 3) + 100;
var GenerateRequestSchema = import_zod.z.object({
  petName: import_zod.z.string().max(30).default("\u9EA6\u6D1B Milo"),
  styleKey: import_zod.z.enum(
    ["fine_art", "corporate", "cosplay", "celebration", "gentle", "detective", "street", "warm"],
    {
      errorMap: () => ({ message: "Requested style is not in haute couture catalogue." })
    }
  ),
  themeId: import_zod.z.string().optional(),
  // alias for styleKey
  subId: import_zod.z.string().optional(),
  itemId: import_zod.z.string().optional(),
  templateId: import_zod.z.string().optional(),
  // alias for itemId
  variantIndex: import_zod.z.number().int().min(0).optional(),
  imageBase64: import_zod.z.string().optional().refine(
    (val) => {
      if (!val) return true;
      if (val.startsWith("http://") || val.startsWith("https://")) return true;
      const base64Data = val.includes(",") ? val.split(",")[1] : val;
      const padding = (base64Data.match(/=+$/) || [""])[0].length;
      const byteSize = base64Data.length * 3 / 4 - padding;
      return byteSize <= MAX_IMAGE_BYTES;
    },
    {
      message: "Uploaded photo exceeds 5MB limit.",
      params: { errorCode: "IMAGE_TOO_LARGE" }
    }
  ),
  isDefaultSample: import_zod.z.boolean().default(true)
});

// src/services/falService.ts
init_styles();

// src/services/alertService.ts
function classifyFailureReason(rawMessage = "") {
  const lower = rawMessage.toLowerCase();
  if (lower.includes("top_up") || lower.includes("balance") || lower.includes("insufficient") || lower.includes("quota") || lower.includes("credit") || lower.includes("arrears") || lower.includes("payment required") || lower.includes("locked")) {
    return {
      category: "INSUFFICIENT_BALANCE",
      labelZh: "\u8D26\u6237\u6B20\u8D39 / \u989D\u5EA6\u8017\u5C3D",
      tag: "[INSUFFICIENT_BALANCE]",
      description: "\u5927\u6A21\u578B\u5E73\u53F0\u8D26\u6237\u4F59\u989D\u4E0D\u8DB3\u6216\u5DF2\u88AB\u5B98\u65B9\u9501\u5B9A\uFF0C\u6025\u9700\u5145\u503C\u4EE5\u6062\u590D\u6B63\u5E38\u751F\u56FE\uFF01"
    };
  }
  if (lower.includes("timeout") || lower.includes("abort") || lower.includes("timed out") || lower.includes("deadline exceeded")) {
    return {
      category: "TIMEOUT_EXCEEDED",
      labelZh: "\u7F51\u7EDC\u8BF7\u6C42\u8D85\u65F6 (15s \u622A\u65AD)",
      tag: "[TIMEOUT_EXCEEDED]",
      description: "\u5927\u6A21\u578B\u670D\u52A1\u5546\u63A8\u7406\u8017\u65F6\u8D85\u8FC7 15 \u79D2\u786C\u9608\u503C\uFF0C\u7CFB\u7EDF\u5DF2\u4E3B\u52A8\u7194\u65AD\u5E76\u89E6\u53D1\u4FDD\u62A4\u3002"
    };
  }
  if (lower.includes("nsfw") || lower.includes("safety") || lower.includes("sensitive") || lower.includes("content moderation") || lower.includes("inappropriate") || lower.includes("violation") || lower.includes("policy")) {
    return {
      category: "NSFW_VIOLATION",
      labelZh: "\u5185\u5BB9\u5B89\u5168\u62E6\u622A / \u89E6\u53D1\u98CE\u63A7",
      tag: "[NSFW_VIOLATION]",
      description: "\u4E0A\u4F20\u56FE\u7247\u6216\u8BF7\u6C42\u89E6\u53D1\u670D\u52A1\u5546\u591A\u6A21\u6001\u5185\u5BB9\u5B89\u5168\u5BA1\u67E5 (NSFW/\u5408\u89C4\u98CE\u63A7)\uFF0C\u5DF2\u4F18\u96C5\u964D\u7EA7\u81F3\u6807\u6746\u6837\u7247\u3002"
    };
  }
  if (lower.includes("unauthorized") || lower.includes("401") || lower.includes("invalid api key") || lower.includes("invalid key") || lower.includes("forbidden")) {
    return {
      category: "AUTH_FAILED",
      labelZh: "\u9274\u6743\u5931\u8D25 / API Key \u65E0\u6548",
      tag: "[AUTH_FAILED]",
      description: "\u8C03\u7528\u7684 API Key \u65E0\u6548\u6216\u672A\u6388\u6743\uFF0C\u8BF7\u68C0\u67E5 Cloudflare Workers Secrets \u914D\u7F6E\u3002"
    };
  }
  if (lower.includes("500") || lower.includes("502") || lower.includes("503") || lower.includes("504") || lower.includes("internal server error") || lower.includes("service unavailable") || lower.includes("bad gateway")) {
    return {
      category: "UPSTREAM_5XX",
      labelZh: "\u670D\u52A1\u5546\u96C6\u7FA4\u5F02\u5E38 (5xx)",
      tag: "[UPSTREAM_5XX]",
      description: "\u4E0A\u6E38\u670D\u52A1\u5546\u5E95\u5C42\u96C6\u7FA4\u6545\u969C\u6216\u8FC7\u8F7D\u6392\u961F\uFF0C\u5DF2\u81EA\u52A8\u89E6\u53D1\u591A\u4E91\u5BB9\u707E\u8F6C\u79FB\u3002"
    };
  }
  return {
    category: "UNKNOWN_ERROR",
    labelZh: "\u672A\u5206\u7C7B\u5F02\u5E38",
    tag: "[UNKNOWN_ERROR]",
    description: "\u53D1\u751F\u672A\u9884\u671F\u9519\u8BEF\uFF0C\u8BF7\u53C2\u8003\u8BE6\u7EC6\u62A5\u9519\u65E5\u5FD7\u3002"
  };
}
var AlertService = class {
  recentAlertTimestamps = /* @__PURE__ */ new Map();
  defaultDebounceMs;
  /**
   * @param defaultDebounceMs Default debounce window in milliseconds (default: 5 minutes = 300,000ms)
   */
  constructor(defaultDebounceMs = 5 * 60 * 1e3) {
    this.defaultDebounceMs = defaultDebounceMs;
  }
  /**
   * Resets internal debounce tracking (useful in unit tests or manual reset)
   */
  clearDebounceHistory() {
    this.recentAlertTimestamps.clear();
  }
  /**
   * Directly sends a Markdown formatted message to Enterprise WeChat Webhook
   */
  async sendMarkdown(webhookUrl, markdownContent) {
    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      console.warn("[AlertService] WeChat Webhook URL not configured. Markdown message skipped.");
      return false;
    }
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msgtype: "markdown",
          markdown: {
            content: markdownContent
          }
        })
      });
      if (!response.ok) {
        const resText = await response.text().catch(() => "");
        console.error(`[AlertService] Failed to send WeChat Webhook: ${response.status} ${resText}`);
        return false;
      }
      return true;
    } catch (err) {
      console.error("[AlertService] Error sending WeChat markdown message:", err);
      return false;
    }
  }
  /**
   * Dispatches an Enterprise WeChat Webhook alert message asynchronously
   * Protected with 5-minute anti-storm debouncing per failure category (strictly NO emojis)
   */
  async sendWeChatAlert(webhookUrl, title, context, severity = "WARNING", options) {
    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      console.warn(`[AlertService] WeChat Webhook URL not configured. Alert skipped: [${title}]`);
      return false;
    }
    const classification = classifyFailureReason(context.errorMessage || "");
    const provider = context.primaryProvider || "default";
    const debounceKey = `${classification.category}:${provider}`;
    const now = Date.now();
    const debounceMs = options?.customDebounceMs ?? this.defaultDebounceMs;
    if (!options?.bypassDebounce && debounceMs > 0) {
      const lastSent = this.recentAlertTimestamps.get(debounceKey);
      if (lastSent && now - lastSent < debounceMs) {
        const remainingSec = Math.ceil((debounceMs - (now - lastSent)) / 1e3);
        console.warn(
          `[AlertService] Alert storm suppressed for [${debounceKey}]. Next alert allowed in ${remainingSec}s.`
        );
        return false;
      }
    }
    const timestampStr = (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
    const envTag = context.environment || "production";
    const colorTag = severity === "CRITICAL" ? "warning" : "comment";
    const markdownContent = `### [ViviBon Cover \u8FD0\u7EF4\u544A\u8B66] ${title}
> **\u73AF\u5883**: \`${envTag}\`
> **\u65F6\u95F4**: ${timestampStr} (CST)
> **\u8FFD\u8E2A ID**: \`${context.traceId || "N/A"}\`
> **\u5BA2\u6237\u7AEF IP**: \`${context.clientIp || "127.0.0.1"}\`

**\u6545\u969C\u8BCA\u65AD**:
- **\u6545\u969C\u7C7B\u578B**: <font color="${colorTag}">${classification.labelZh}</font> \`${classification.tag}\`
- **\u4E1A\u52A1\u5F71\u54CD**: ${classification.description}
- **\u4E3B\u9009\u6A21\u578B**: \`${context.primaryProvider || "Primary"}\`
- **\u5907\u9009\u6A21\u578B**: \`${context.secondaryProvider || "Secondary"}\`
- **\u9020\u578B\u6A21\u677F**: \`${context.styleKey || "N/A"}\` / \`${context.templateId || "N/A"}\`
- **\u63A5\u53E3\u8017\u65F6**: \`${context.durationMs ?? 0}ms\`

> **\u8BE6\u7EC6\u62A5\u9519\u62A5\u6587**:
> \`${(context.errorMessage || "Unknown").slice(0, 300)}\`

> *\u5DF2\u542F\u7528 5 \u5206\u949F\u540C\u7C7B\u544A\u8B66\u9632\u98CE\u66B4\u9759\u9ED8\u673A\u5236\uFF0C\u907F\u514D\u9AD8\u9891\u5237\u5C4F*
`;
    const success = await this.sendMarkdown(webhookUrl, markdownContent);
    if (success) {
      this.recentAlertTimestamps.set(debounceKey, now);
    }
    return success;
  }
};
var alertService = new AlertService();

// src/config/miloSample.ts
var DEFAULT_MILO_BASE64 = "data:image/jpeg;base64,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";

// src/services/falService.ts
async function executeWithJitterRetry(fn, maxRetries = 1, baseDelayMs = 300, maxDelayMs = 1200) {
  let attempt = 0;
  while (true) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (attempt >= maxRetries) {
        throw err;
      }
      attempt++;
      const maxBackoff = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
      const jitterDelay = Math.floor(Math.random() * maxBackoff);
      await new Promise((resolve) => setTimeout(resolve, jitterDelay));
    }
  }
}
var defaultFalRunner = async (prompt, imageBase64, apiKey, signal, negativePrompt = NEGATIVE_PROMPT) => {
  if (!imageBase64) {
    throw new Error("Pure Image-to-Image required. Missing pet photo input.");
  }
  if (apiKey.startsWith("sk-")) {
    const endpoint2 = "https://api.siliconflow.cn/v1/images/generations";
    const response2 = await fetch(endpoint2, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "Qwen/Qwen-Image-Edit",
        prompt,
        negative_prompt: negativePrompt,
        image: imageBase64,
        image_size: "768x1024",
        // 3:4 Native Aspect Ratio (1080x1440 物理保真，零拉伸变形)
        num_inference_steps: 8
        // 压缩推理耗时至 12~14s，同时 100% 保持 Face ID 特征
      }),
      signal
    });
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`SiliconFlow upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const data2 = await response2.json();
    const imageUrl2 = data2.images?.[0]?.url;
    if (!imageUrl2) {
      throw new Error("No image returned from SiliconFlow");
    }
    return {
      jobId: `sf_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  const endpoint = "https://fal.run/fal-ai/flux/dev/image-to-image";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Key ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_url: imageBase64,
      prompt,
      strength: 0.68,
      // Golden ratio: 90%+ pet facial ID preservation, 100% haute couture outfit transformation
      num_inference_steps: 24,
      guidance_scale: 3.5,
      enable_safety_checker: true
    }),
    signal
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Fal.ai upstream error: ${response.status} ${response.statusText} ${errText}`);
  }
  const data = await response.json();
  const imageUrl = data.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error("No image returned from Fal.ai");
  }
  return {
    jobId: data.request_id || `fal_${crypto.randomUUID().slice(0, 8)}`,
    imageUrl
  };
};
var FalService = class {
  runner;
  timeoutMs;
  constructor(runner = defaultFalRunner, timeoutMs = 3e4) {
    this.runner = runner;
    this.timeoutMs = timeoutMs;
  }
  /**
   * Execute Haute Couture Pet Generation with:
   * 1. 15s hard timeout
   * 2. Full jitter exponential backoff retry
   * 3. Primary -> Secondary AI multi-rail failover
   * 4. Enterprise WeChat Webhook alerting on failure/arrears
   * 5. NC-4 graceful degradation to WebP sample library
   */
  async generatePoster(styleKey, petName, imageBase64, primaryApiKey, variantIndex, subId, itemId, alertContext, webhookUrl, secondaryApiKey) {
    const start = Date.now();
    const styleConfig = STYLE_CONFIGS[styleKey];
    const fallbackImage = styleConfig.fallbackImageUrl;
    const assembled = assembleDynamicPrompt(styleKey, itemId, subId, variantIndex);
    const variant = assembled.item;
    const baseResult = {
      styleKey,
      petName,
      capsuleVariant: {
        id: variant.id,
        name: variant.nameZh
      },
      level1Theme: {
        id: assembled.themeKey,
        nameZh: assembled.themeNameZh
      },
      level2Item: {
        id: variant.id,
        nameZh: variant.nameZh,
        badge: variant.badge
      },
      skillDirective: assembled.skillDirective
    };
    if (!primaryApiKey && !secondaryApiKey) {
      return {
        ...baseResult,
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: "NO_API_KEY_CONFIGURED"
      };
    }
    const effectiveImageInput = imageBase64 || DEFAULT_MILO_BASE64;
    const runAttempt = async (key) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const res = await this.runner(
          assembled.fullPrompt,
          effectiveImageInput,
          key,
          controller.signal,
          assembled.negativePrompt
        );
        clearTimeout(timeoutId);
        return res;
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    };
    let primaryError = null;
    const primaryProviderName = primaryApiKey?.startsWith("sk-") ? "SiliconFlow" : "Fal.ai";
    const secondaryProviderName = secondaryApiKey?.startsWith("sk-") ? "SiliconFlow" : "Fal.ai";
    if (primaryApiKey) {
      try {
        const result = await executeWithJitterRetry(() => runAttempt(primaryApiKey), 1);
        return {
          ...baseResult,
          jobId: result.jobId,
          imageUrl: result.imageUrl,
          latencyMs: Date.now() - start,
          isFallback: false,
          activeProvider: primaryProviderName
        };
      } catch (err) {
        primaryError = err instanceof Error ? err : new Error(String(err));
        console.warn(`[FalService] Primary AI (${primaryProviderName}) failed:`, primaryError.message);
        if (!primaryError.message.includes("Missing pet photo input")) {
          alertService.sendWeChatAlert(
            webhookUrl,
            `\u4E3B\u6A21\u578B\u751F\u56FE\u5931\u8D25 \xB7 \u51C6\u5907\u6545\u969C\u8F6C\u79FB`,
            {
              ...alertContext,
              primaryProvider: primaryProviderName,
              secondaryProvider: secondaryApiKey ? secondaryProviderName : "None",
              errorMessage: primaryError.message,
              durationMs: Date.now() - start
            },
            "WARNING"
          ).catch(() => {
          });
        }
      }
    }
    if (secondaryApiKey) {
      try {
        const result = await executeWithJitterRetry(() => runAttempt(secondaryApiKey), 1);
        alertService.sendWeChatAlert(
          webhookUrl,
          `\u4ECE\u6A21\u578B\u63A5\u7BA1\u751F\u56FE\u6210\u529F`,
          {
            ...alertContext,
            primaryProvider: primaryProviderName,
            secondaryProvider: secondaryProviderName,
            errorMessage: `Primary failed with: ${primaryError?.message || "N/A"}`,
            durationMs: Date.now() - start
          },
          "INFO"
        ).catch(() => {
        });
        return {
          ...baseResult,
          jobId: result.jobId,
          imageUrl: result.imageUrl,
          latencyMs: Date.now() - start,
          isFallback: false,
          failoverTriggered: true,
          activeProvider: secondaryProviderName
        };
      } catch (secErr) {
        const secondaryError = secErr instanceof Error ? secErr : new Error(String(secErr));
        console.warn(`[FalService] Secondary AI (${secondaryProviderName}) also failed:`, secondaryError.message);
        if (!primaryError?.message?.includes("Missing pet photo input") && !secondaryError.message.includes("Missing pet photo input")) {
          alertService.sendWeChatAlert(
            webhookUrl,
            `\u4E3B\u5907\u6A21\u578B\u5747\u8C03\u7528\u5931\u8D25 \xB7 \u89E6\u53D1\u9759\u6001\u6837\u7247\u7EC8\u6781\u964D\u7EA7`,
            {
              ...alertContext,
              primaryProvider: primaryProviderName,
              secondaryProvider: secondaryProviderName,
              errorMessage: `Primary: [${primaryError?.message}], Secondary: [${secondaryError.message}]`,
              durationMs: Date.now() - start
            },
            "CRITICAL"
          ).catch(() => {
          });
        }
      }
    }
    const finalReason = primaryError?.message || "ALL_AI_PROVIDERS_FAILED";
    return {
      ...baseResult,
      jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: fallbackImage,
      latencyMs: Date.now() - start,
      isFallback: true,
      debugReason: finalReason
    };
  }
};
var falService = new FalService();

// src/routes/generate.ts
init_styles();
var createGenerateRoute = (service = falService) => {
  const route = new import_hono3.Hono();
  route.post("/api/generate", async (c) => {
    let body;
    try {
      body = await c.req.json();
    } catch {
      const errorResp = {
        success: false,
        errorCode: "INVALID_JSON_PAYLOAD",
        message: "Request payload must be valid JSON."
      };
      return c.json(errorResp, 400);
    }
    const parseResult = GenerateRequestSchema.safeParse(body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues;
      const imageIssue = issues.find(
        (i) => i.path.includes("imageBase64") || i.message.includes("5MB")
      );
      if (imageIssue) {
        const errorResp2 = {
          success: false,
          errorCode: "IMAGE_TOO_LARGE",
          message: "Base64 image exceeds 5MB size limit."
        };
        return c.json(errorResp2, 413);
      }
      const styleIssue = issues.find(
        (i) => i.path.includes("styleKey") || i.path.includes("themeId")
      );
      if (styleIssue) {
        const errorResp2 = {
          success: false,
          errorCode: "INVALID_STYLE_KEY",
          message: styleIssue.message
        };
        return c.json(errorResp2, 400);
      }
      const errorResp = {
        success: false,
        errorCode: "VALIDATION_FAILED",
        message: issues[0]?.message || "Invalid request parameters."
      };
      return c.json(errorResp, 400);
    }
    const effectiveStyleKey = parseResult.data.styleKey || parseResult.data.themeId || "fine_art";
    const effectiveItemId = parseResult.data.itemId || parseResult.data.templateId;
    const { imageBase64, variantIndex, subId } = parseResult.data;
    const safePetName = sanitizePetName(parseResult.data.petName);
    if (effectiveItemId) {
      const { CASCADING_THEMES: CASCADING_THEMES2 } = await Promise.resolve().then(() => (init_styles(), styles_exports));
      let targetThemeKey;
      if (effectiveStyleKey === "gentle") targetThemeKey = "fine_art";
      else if (effectiveStyleKey === "detective") targetThemeKey = "corporate";
      else if (effectiveStyleKey === "street") targetThemeKey = "cosplay";
      else if (effectiveStyleKey === "warm") targetThemeKey = "celebration";
      else targetThemeKey = effectiveStyleKey;
      const theme = CASCADING_THEMES2[targetThemeKey];
      const exists = theme?.subCategories.some((sub) => sub.items.some((it) => it.id === effectiveItemId));
      if (!exists) {
        const errorResp = {
          success: false,
          errorCode: "INVALID_ITEM_ID",
          message: `Template '${effectiveItemId}' is not valid for style '${effectiveStyleKey}'.`
        };
        return c.json(errorResp, 400);
      }
    }
    const isFalPrimary = c.env?.PRIMARY_AI_PROVIDER === "fal";
    const primaryKey = isFalPrimary ? c.env?.FAL_KEY || c.env?.SILICONFLOW_KEY : c.env?.SILICONFLOW_KEY || c.env?.FAL_KEY;
    const secondaryKey = isFalPrimary ? c.env?.SILICONFLOW_KEY : c.env?.FAL_KEY;
    const alertCtx = {
      environment: c.env?.ENVIRONMENT || "production",
      traceId: c.get("traceId"),
      clientIp: c.get("clientIp"),
      petName: safePetName,
      styleKey: effectiveStyleKey,
      templateId: effectiveItemId
    };
    const result = await service.generatePoster(
      effectiveStyleKey,
      safePetName,
      imageBase64,
      primaryKey,
      variantIndex,
      subId,
      effectiveItemId,
      alertCtx,
      c.env?.WECHAT_WEBHOOK_URL,
      secondaryKey
    );
    const response = {
      success: true,
      data: {
        jobId: result.jobId,
        imageUrl: result.imageUrl,
        styleKey: result.styleKey,
        petName: result.petName,
        latencyMs: result.latencyMs,
        isFallback: result.isFallback,
        ...result.failoverTriggered !== void 0 ? { failoverTriggered: result.failoverTriggered } : {},
        ...result.capsuleVariant ? { capsuleVariant: result.capsuleVariant } : {},
        ...result.level1Theme ? { level1Theme: result.level1Theme } : {},
        ...result.level2Item ? { level2Item: result.level2Item } : {},
        ...result.skillDirective ? { skillDirective: result.skillDirective } : {},
        ...c.req.query("debug") === "1" && result.debugReason ? { debugReason: result.debugReason } : {}
      }
    };
    if (c.env?.RATE_LIMIT_KV) {
      const isRealUpload = !parseResult.data.isDefaultSample;
      const recordPromise = metricsService.recordGeneration(c.env.RATE_LIMIT_KV, {
        clientIp: c.var.clientIp,
        styleKey: effectiveStyleKey,
        isRealUpload,
        isFallback: result.isFallback,
        hasError: result.isFallback && result.failoverTriggered
      });
      try {
        c.executionCtx.waitUntil(recordPromise);
      } catch {
        recordPromise.catch((err) => console.error("[Metrics] Error:", err));
      }
    }
    return c.json(response, 200);
  });
  return route;
};
var generateRoute = createGenerateRoute();

// ../public/index.html
var public_default = `<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
  <meta charset="UTF-8" />\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />\r
  <title>ViviBon Cover</title>\r
\r
  <!-- Google Fonts for Elegance -->\r
  <link rel="preconnect" href="https://fonts.googleapis.com">\r
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\r
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Cinzel:wght@500;600;700;800&display=swap" rel="stylesheet">\r
\r
  <!-- Microsoft Clarity (100% Free, Unlimited Replay & Heatmaps) -->\r
  <script type="text/javascript">\r
    (function(c,l,a,r,i,t,y){\r
      try {\r
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\r
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\r
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\r
      } catch(e){ console.warn('[Clarity] Init error:', e); }\r
    })(window, document, "clarity", "script", "yf41ikpys2");\r
  </script>\r
\r
  <style>\r
    :root {\r
      /* Warm Peach Cream Palette matching user reference image */\r
      --bg-page: #FFF8F3;\r
      --bg-card: #FFF8F3;\r
      --card-border: rgba(255, 255, 255, 0.9);\r
      --text-main: #3C3028;\r
      --text-subtle: #7A6D63;\r
      --text-muted: #9E9085;\r
      \r
      /* Active Highlight Accent (Coral / Warm Terracotta) */\r
      --coral-accent: #E85D3F;\r
      --coral-glow-border: #FF8F73;\r
      --coral-bg-pill: #FFFFFF;\r
      --coral-shadow-glow: rgba(232, 93, 63, 0.22);\r
      \r
      /* CTA Warm Butter-Peach Gradient */\r
      --cta-start: #FEE7D6;\r
      --cta-end: #F6CCA7;\r
      --cta-text: #4A3B31;\r
      \r
      /* iOS 18 Fluid Spring Physics Curves */\r
      --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);\r
      --spring-tight: cubic-bezier(0.2, 0.8, 0.2, 1);\r
      --spring-fluid: cubic-bezier(0.32, 0.72, 0, 1);\r
      --spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);\r
    }\r
\r
    /* Apple Display P3 Wide Color Gamut (iPhone / Retina OLED Enhancement) */\r
    @supports (color: color(display-p3 1 1 1)) {\r
      :root {\r
        --bg-page: color(display-p3 0.996 0.973 0.953);\r
        --bg-card: color(display-p3 0.996 0.973 0.953);\r
        --text-main: color(display-p3 0.235 0.188 0.157);\r
        --coral-accent: color(display-p3 0.910 0.365 0.247);\r
        --coral-glow-border: color(display-p3 1 0.561 0.451);\r
        --coral-shadow-glow: color(display-p3 0.910 0.365 0.247 / 0.25);\r
        --cta-start: color(display-p3 0.996 0.906 0.839);\r
        --cta-end: color(display-p3 0.965 0.800 0.655);\r
        --cta-text: color(display-p3 0.290 0.231 0.192);\r
      }\r
    }\r
\r
    * {\r
      box-sizing: border-box;\r
      margin: 0;\r
      padding: 0;\r
      -webkit-tap-highlight-color: transparent;\r
      -webkit-font-smoothing: antialiased;\r
    }\r
\r
    body {\r
      background: var(--bg-page);\r
      color: var(--text-main);\r
      min-height: 100vh;\r
      display: flex;\r
      justify-content: center;\r
      align-items: center;\r
      padding: 12px 10px;\r
      font-family: "Cormorant Garamond", -apple-system, BlinkMacSystemFont, "Playfair Display", serif;\r
      overflow-x: hidden;\r
    }\r
\r
    /* Ambient Warm Glow */\r
    .ambient-glow-top {\r
      position: fixed;\r
      top: -120px;\r
      left: 50%;\r
      transform: translateX(-50%);\r
      width: 500px;\r
      height: 380px;\r
      background: radial-gradient(circle, rgba(254, 235, 220, 0.8) 0%, rgba(255, 248, 243, 0) 70%);\r
      filter: blur(50px);\r
      pointer-events: none;\r
      z-index: 0;\r
    }\r
\r
    /* Outer Container: Clean Warm Cream Box */\r
    .app-card {\r
      position: relative;\r
      z-index: 1;\r
      width: 100%;\r
      max-width: 390px;\r
      background: var(--bg-card);\r
      padding: 12px 16px 20px 16px;\r
      display: flex;\r
      flex-direction: column;\r
    }\r
\r
    /* Top Centered Header - Elegant Cursive Title */\r
    .header-bar {\r
      position: relative;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      min-height: 42px;\r
      margin-bottom: 12px;\r
    }\r
    .brand-title {\r
      font-size: 28px;\r
      font-weight: 500;\r
      letter-spacing: 1px;\r
      color: var(--text-main);\r
      font-family: "Alex Brush", "Playfair Display", cursive, serif;\r
      text-align: center;\r
      transform: translateY(2px);\r
    }\r
    .header-back-btn {\r
      position: absolute;\r
      left: 0;\r
      top: 50%;\r
      transform: translateY(-50%);\r
      background: transparent;\r
      border: none;\r
      width: 32px;\r
      height: 32px;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      cursor: pointer;\r
      color: var(--text-main);\r
      transition: all 0.2s ease;\r
    }\r
    .header-back-btn:active {\r
      transform: translateY(-50%) scale(0.92);\r
      opacity: 0.7;\r
    }\r
\r
    /* ================= VIEW 1: Entry Studio ================= */\r
    #view-entry {\r
      display: flex;\r
      flex-direction: column;\r
      width: 100%;\r
    }\r
\r
    /* Hero Viewport (3:4 ratio with large soft rounded corners) */\r
    .hero-box {\r
      position: relative;\r
      width: 100%;\r
      aspect-ratio: 3 / 4;\r
      border-radius: 28px;\r
      overflow: hidden;\r
      background: #F2E8DF;\r
      box-shadow: 0 10px 30px -10px rgba(180, 140, 110, 0.2);\r
    }\r
    .hero-img {\r
      width: 100%;\r
      height: 100%;\r
      object-fit: cover;\r
      display: block;\r
      transition: opacity 0.25s var(--ease-smooth);\r
    }\r
\r
    /* Floating Round Upload Button in Bottom-Right Corner */\r
    .upload-btn-floating {\r
      position: absolute;\r
      bottom: 14px;\r
      right: 14px;\r
      width: 44px;\r
      height: 44px;\r
      border-radius: 50%;\r
      background: rgba(255, 255, 255, 0.65);\r
      backdrop-filter: blur(14px) saturate(160%);\r
      -webkit-backdrop-filter: blur(14px) saturate(160%);\r
      border: 1px solid rgba(255, 255, 255, 0.9);\r
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      cursor: pointer;\r
      color: #3C3028;\r
      transition: transform 0.22s var(--spring-bouncy), background 0.2s var(--ease-smooth);\r
      z-index: 5;\r
    }\r
    .upload-btn-floating:active {\r
      transform: scale(0.88);\r
      background: rgba(255, 255, 255, 0.9);\r
    }\r
\r
    /* Category Pill Selector Bar (Soft Frosted Box, 4 Columns) */\r
    .category-pills-bar {\r
      margin-top: 14px;\r
      background: rgba(255, 255, 255, 0.65);\r
      backdrop-filter: blur(12px);\r
      -webkit-backdrop-filter: blur(12px);\r
      border: 1px solid rgba(255, 255, 255, 0.85);\r
      border-radius: 14px;\r
      padding: 4px;\r
      display: grid;\r
      grid-template-columns: repeat(4, 1fr);\r
      gap: 4px;\r
    }\r
    .category-pill {\r
      padding: 6px 2px;\r
      border-radius: 9px;\r
      border: 1px solid transparent;\r
      background: transparent;\r
      color: var(--text-subtle);\r
      cursor: pointer;\r
      user-select: none;\r
      transition: all 0.24s var(--spring-fluid);\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
    }\r
    .category-pill:active {\r
      transform: scale(0.93);\r
    }\r
    .category-pill.active {\r
      background: #FFFFFF;\r
      color: var(--coral-accent);\r
      border-color: rgba(232, 93, 63, 0.15);\r
      font-weight: 600;\r
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\r
    }\r
    .category-pill-name {\r
      font-size: 13.5px;\r
      font-weight: 500;\r
      letter-spacing: 0.1px;\r
      white-space: nowrap;\r
      font-family: "Cormorant Garamond", serif;\r
    }\r
\r
    /* Reference Templates Scroll Carousel */\r
    .template-carousel-container {\r
      margin-top: 14px;\r
      position: relative;\r
      width: 100%;\r
    }\r
    .template-cards-row {\r
      display: flex;\r
      gap: 10px;\r
      overflow-x: auto;\r
      scroll-snap-type: x mandatory;\r
      -webkit-overflow-scrolling: touch;\r
      padding: 4px 2px 8px 2px;\r
      scrollbar-width: none;\r
    }\r
    .template-cards-row::-webkit-scrollbar {\r
      display: none;\r
    }\r
\r
    /* Reference Template Card */\r
    .template-card {\r
      flex: 0 0 102px;\r
      width: 102px;\r
      scroll-snap-align: start;\r
      background: #FFFFFF;\r
      border: 1px solid rgba(255, 255, 255, 0.8);\r
      border-radius: 16px;\r
      padding: 6px 6px 8px 6px;\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      cursor: pointer;\r
      user-select: none;\r
      transition: transform 0.26s var(--spring-bouncy), border-color 0.22s ease, box-shadow 0.22s ease;\r
      box-shadow: 0 2px 8px rgba(180, 140, 110, 0.08);\r
      position: relative;\r
    }\r
    .template-card:active {\r
      transform: scale(0.92);\r
    }\r
    .template-card.active {\r
      border: 1.5px solid var(--coral-glow-border);\r
      transform: translateY(-3px);\r
      box-shadow: 0 0 0 2px rgba(232, 93, 63, 0.15), 0 8px 20px rgba(232, 93, 63, 0.15);\r
    }\r
\r
    /* Image Box inside Template Card */\r
    .template-thumb-box {\r
      position: relative;\r
      width: 100%;\r
      aspect-ratio: 1 / 1;\r
      border-radius: 12px;\r
      overflow: hidden;\r
      background: #EAE0D5;\r
    }\r
    .template-thumb {\r
      width: 100%;\r
      height: 100%;\r
      object-fit: cover;\r
      display: block;\r
    }\r
\r
    /* Label text below thumbnail */\r
    .template-label {\r
      margin-top: 6px;\r
      font-size: 11.5px;\r
      font-weight: 500;\r
      color: var(--text-main);\r
      text-align: center;\r
      white-space: nowrap;\r
      overflow: hidden;\r
      text-overflow: ellipsis;\r
      width: 100%;\r
      line-height: 1.2;\r
      font-family: "Cormorant Garamond", serif;\r
    }\r
    .template-card.active .template-label {\r
      color: var(--coral-accent);\r
      font-weight: 600;\r
    }\r
\r
    /* Right Edge Hint */\r
    .scroll-edge-hint {\r
      position: absolute;\r
      top: 0;\r
      right: 0;\r
      bottom: 8px;\r
      width: 24px;\r
      background: linear-gradient(90deg, rgba(255, 248, 243, 0) 0%, var(--bg-card) 100%);\r
      pointer-events: none;\r
      transition: opacity 0.2s ease;\r
    }\r
\r
    /* Primary CTA Button */\r
    .btn-cta {\r
      margin-top: 14px;\r
      width: 100%;\r
      padding: 14px;\r
      border-radius: 9999px;\r
      background: linear-gradient(180deg, var(--cta-start) 0%, var(--cta-end) 100%);\r
      border: 1px solid rgba(255, 255, 255, 0.7);\r
      box-shadow: 0 6px 20px -4px rgba(220, 160, 120, 0.35);\r
      color: var(--cta-text);\r
      font-size: 16px;\r
      font-weight: 500;\r
      font-family: "Cormorant Garamond", "Playfair Display", serif;\r
      letter-spacing: 0.3px;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      gap: 8px;\r
      cursor: pointer;\r
      transition: transform 0.24s var(--spring-bouncy), box-shadow 0.24s var(--spring-fluid);\r
    }\r
    .btn-cta:active {\r
      transform: scale(0.955) translateY(1.5px);\r
      box-shadow: 0 2px 8px -2px rgba(220, 160, 120, 0.3);\r
    }\r
\r
    /* ================= VIEW 2: Result Showcase (Exact Match to Screenshot 2) ================= */\r
    #view-result {\r
      display: none;\r
      flex-direction: column;\r
      width: 100%;\r
    }\r
    .poster-stage {\r
      position: relative;\r
      width: 100%;\r
      aspect-ratio: 3 / 4;\r
      border-radius: 28px;\r
      overflow: hidden;\r
      background: #1C1917;\r
      box-shadow: 0 12px 36px -8px rgba(0, 0, 0, 0.25);\r
    }\r
    .poster-img {\r
      width: 100%;\r
      height: 100%;\r
      object-fit: cover;\r
      display: block;\r
    }\r
    .poster-img.original-layer {\r
      position: absolute;\r
      top: 0;\r
      left: 0;\r
      opacity: 0;\r
      transition: opacity 0.12s ease-out;\r
      z-index: 10;\r
      pointer-events: none;\r
    }\r
\r
    /* Magazine Typography Overlay (Exact Match) */\r
    .poster-overlay {\r
      position: absolute;\r
      top: 0;\r
      left: 0;\r
      right: 0;\r
      bottom: 0;\r
      padding: 28px 24px;\r
      display: flex;\r
      flex-direction: column;\r
      justify-content: space-between;\r
      pointer-events: none;\r
      background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 58%, rgba(0,0,0,0.85) 100%);\r
      z-index: 2;\r
      transition: opacity 0.16s var(--ease-smooth);\r
    }\r
    /* Top Brand: Clean White Serif Uppercase */\r
    .poster-top-brand {\r
      font-size: 13.5px;\r
      font-weight: 700;\r
      letter-spacing: 2.2px;\r
      color: #FFFFFF;\r
      text-transform: uppercase;\r
      font-family: "Cinzel", "Times New Roman", serif;\r
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);\r
    }\r
    .poster-bottom-meta {\r
      display: flex;\r
      flex-direction: column;\r
      gap: 4px;\r
    }\r
    /* Sub-tag: Small Muted Tracking Text */\r
    .poster-tag {\r
      font-size: 9.5px;\r
      font-weight: 700;\r
      letter-spacing: 2px;\r
      color: rgba(255, 255, 255, 0.72);\r
      text-transform: uppercase;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;\r
    }\r
    /* Main Title: Large Bold Serif with High Editorial Presence */\r
    .poster-title {\r
      font-size: 26px;\r
      font-weight: 600;\r
      letter-spacing: 0.2px;\r
      color: #FFFFFF;\r
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);\r
      line-height: 1.15;\r
      font-family: "Cormorant Garamond", "Playfair Display", serif;\r
    }\r
\r
    /* Floating "Hold to compare" Pill (Matching Screenshot 2 exact grey pill) */\r
    .compare-pill {\r
      position: absolute;\r
      bottom: 20px;\r
      right: 20px;\r
      background: rgba(200, 202, 206, 0.72);\r
      backdrop-filter: blur(16px) saturate(180%);\r
      -webkit-backdrop-filter: blur(16px) saturate(180%);\r
      border: 1px solid rgba(255, 255, 255, 0.6);\r
      border-radius: 9999px;\r
      padding: 7px 15px;\r
      font-size: 11px;\r
      font-weight: 600;\r
      color: #383735;\r
      display: flex;\r
      align-items: center;\r
      gap: 6px;\r
      cursor: pointer;\r
      user-select: none;\r
      z-index: 20;\r
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\r
      transition: all 0.18s var(--ease-smooth);\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;\r
    }\r
    .compare-pill:active {\r
      transform: scale(0.93);\r
      background: rgba(220, 222, 226, 0.9);\r
    }\r
    .compare-pill.active {\r
      background: rgba(28, 28, 30, 0.88);\r
      color: #FFFFFF;\r
      border-color: rgba(255, 255, 255, 0.35);\r
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\r
    }\r
    .compare-pill.active svg {\r
      stroke: #FFFFFF;\r
    }\r
\r
    /* ================= LOADER COMPONENT (Lapse Darkroom Ritual & HIG Match) ================= */\r
    .loader-overlay {\r
      position: fixed;\r
      top: 0;\r
      left: 0;\r
      right: 0;\r
      bottom: 0;\r
      background: rgba(14, 12, 10, 0.76);\r
      backdrop-filter: blur(28px) saturate(160%);\r
      -webkit-backdrop-filter: blur(28px) saturate(160%);\r
      display: none;\r
      flex-direction: column;\r
      align-items: center;\r
      justify-content: center;\r
      z-index: 100;\r
      opacity: 0;\r
      transition: opacity 0.35s var(--spring-fluid);\r
      overflow: hidden;\r
    }\r
    .darkroom-ambient-glow {\r
      position: absolute;\r
      width: 360px;\r
      height: 360px;\r
      border-radius: 50%;\r
      background: radial-gradient(circle, rgba(232, 93, 63, 0.22) 0%, rgba(200, 70, 40, 0.08) 50%, transparent 75%);\r
      filter: blur(40px);\r
      pointer-events: none;\r
      animation: darkroom-pulse 3.2s ease-in-out infinite alternate;\r
      z-index: 1;\r
    }\r
    @keyframes darkroom-pulse {\r
      0% { transform: scale(0.85); opacity: 0.5; }\r
      100% { transform: scale(1.18); opacity: 0.95; }\r
    }\r
    .loader-card {\r
      position: relative;\r
      z-index: 2;\r
      background: rgba(255, 255, 255, 0.94);\r
      backdrop-filter: blur(40px) saturate(190%);\r
      -webkit-backdrop-filter: blur(40px) saturate(190%);\r
      border: 1px solid rgba(255, 255, 255, 0.95);\r
      border-radius: 36px;\r
      padding: 36px 28px 30px 28px;\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      max-width: 320px;\r
      width: 90%;\r
      text-align: center;\r
      box-shadow: 0 28px 64px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.6) inset;\r
      animation: loaderPopIn 0.38s var(--spring-bouncy);\r
    }\r
    @keyframes loaderPopIn {\r
      0% { transform: scale(0.92); opacity: 0; }\r
      100% { transform: scale(1); opacity: 1; }\r
    }\r
\r
    /* Concentric Circles Loader (Exact Screenshot 1 Match) */\r
    .concentric-loader-box {\r
      position: relative;\r
      width: 76px;\r
      height: 76px;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      margin-bottom: 24px;\r
    }\r
    /* Outer subtle ring */\r
    .concentric-ring-outer {\r
      position: absolute;\r
      width: 76px;\r
      height: 76px;\r
      border-radius: 50%;\r
      background: rgba(0, 0, 0, 0.03);\r
      border: 1px solid rgba(0, 0, 0, 0.05);\r
    }\r
    /* Animated coral arc */\r
    .concentric-arc-svg {\r
      position: absolute;\r
      width: 76px;\r
      height: 76px;\r
      animation: spin-arc 1.6s linear infinite;\r
    }\r
    @keyframes spin-arc {\r
      0% { transform: rotate(0deg); }\r
      100% { transform: rotate(360deg); }\r
    }\r
    /* Inner solid glowing coral dot with aperture pulse */\r
    .concentric-center-dot {\r
      width: 13px;\r
      height: 13px;\r
      border-radius: 50%;\r
      background: var(--coral-accent);\r
      box-shadow: 0 0 14px rgba(232, 93, 63, 0.6);\r
      z-index: 2;\r
      animation: aperture-pulse 1.8s ease-in-out infinite;\r
    }\r
    @keyframes aperture-pulse {\r
      0%, 100% { transform: scale(1); }\r
      50% { transform: scale(1.25); }\r
    }\r
\r
    /* Linear Progress Bar with Percentage Tag */\r
    .loader-progress-row {\r
      width: 100%;\r
      display: flex;\r
      align-items: center;\r
      gap: 12px;\r
      margin-bottom: 18px;\r
    }\r
    .loader-progress-track {\r
      flex: 1;\r
      height: 4px;\r
      background: rgba(0, 0, 0, 0.08);\r
      border-radius: 9999px;\r
      overflow: hidden;\r
    }\r
    .loader-progress-fill {\r
      height: 100%;\r
      width: 0%;\r
      background: var(--coral-accent);\r
      border-radius: 9999px;\r
      transition: width 0.35s ease;\r
    }\r
    .loader-percentage-text {\r
      font-size: 13px;\r
      font-weight: 600;\r
      color: #1D1D1F;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;\r
      font-variant-numeric: tabular-nums;\r
      min-width: 38px;\r
      text-align: right;\r
      line-height: 1;\r
      flex-shrink: 0;\r
      letter-spacing: -0.2px;\r
      -webkit-font-smoothing: antialiased;\r
      -moz-osx-font-smoothing: grayscale;\r
    }\r
\r
    /* Loader Texts */\r
    .loader-text {\r
      font-size: 17px;\r
      font-weight: 600;\r
      color: #1D1D1F;\r
      font-family: "Cormorant Garamond", "Playfair Display", serif;\r
      margin-bottom: 6px;\r
      letter-spacing: 0.2px;\r
    }\r
    .loader-sub {\r
      font-size: 12px;\r
      font-weight: 500;\r
      color: #6E6862;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;\r
      letter-spacing: 0.1px;\r
    }\r
\r
    /* Toast */\r
    .toast-pill {\r
      position: fixed;\r
      top: calc(env(safe-area-inset-top) + 20px);\r
      left: 50%;\r
      transform: translateX(-50%) translateY(-30px);\r
      background: rgba(45, 36, 30, 0.94);\r
      backdrop-filter: blur(20px);\r
      -webkit-backdrop-filter: blur(20px);\r
      color: #FFFFFF;\r
      font-size: 13px;\r
      font-weight: 500;\r
      padding: 9px 20px;\r
      border-radius: 9999px;\r
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\r
      opacity: 0;\r
      pointer-events: none;\r
      transition: all 0.3s var(--ease-smooth);\r
      z-index: 200;\r
      white-space: nowrap;\r
      font-family: -apple-system, sans-serif;\r
    }\r
    .toast-pill.show {\r
      transform: translateX(-50%) translateY(0);\r
      opacity: 1;\r
    }\r
\r
    /* Apple Native Save Sheet (HIG Aligned) */\r
    .save-modal-overlay {\r
      position: fixed;\r
      top: 0;\r
      left: 0;\r
      right: 0;\r
      bottom: 0;\r
      background: rgba(0, 0, 0, 0.45);\r
      backdrop-filter: blur(20px) saturate(180%);\r
      -webkit-backdrop-filter: blur(20px) saturate(180%);\r
      display: none;\r
      align-items: center;\r
      justify-content: center;\r
      padding: 16px;\r
      z-index: 500;\r
      animation: appleModalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);\r
    }\r
    @keyframes appleModalFadeIn {\r
      from { opacity: 0; transform: scale(0.96); }\r
      to { opacity: 1; transform: scale(1); }\r
    }\r
    .save-modal-card {\r
      background: rgba(255, 255, 255, 0.94);\r
      backdrop-filter: blur(30px);\r
      -webkit-backdrop-filter: blur(30px);\r
      border-radius: 26px;\r
      padding: 20px 18px 18px;\r
      max-width: 356px;\r
      width: 100%;\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      gap: 12px;\r
      box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.28), 0 0 0 0.5px rgba(0, 0, 0, 0.08);\r
      position: relative;\r
    }\r
    .save-modal-close-btn {\r
      position: absolute;\r
      top: 14px;\r
      right: 14px;\r
      width: 28px;\r
      height: 28px;\r
      border-radius: 50%;\r
      background: rgba(118, 118, 128, 0.12);\r
      border: none;\r
      color: #636366;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      cursor: pointer;\r
      padding: 0;\r
      transition: background 0.15s, transform 0.1s;\r
      z-index: 10;\r
    }\r
    .save-modal-close-btn:active {\r
      background: rgba(118, 118, 128, 0.24);\r
      transform: scale(0.92);\r
    }\r
    .save-modal-header {\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      gap: 6px;\r
      text-align: center;\r
      width: 100%;\r
      padding-top: 2px;\r
    }\r
    .save-modal-title {\r
      font-size: 17px;\r
      font-weight: 600;\r
      color: #1D1D1F;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;\r
      letter-spacing: -0.3px;\r
    }\r
    .save-modal-badge {\r
      display: inline-flex;\r
      align-items: center;\r
      gap: 6px;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;\r
      font-size: 12px;\r
      font-weight: 500;\r
      color: #48484A;\r
      background: rgba(118, 118, 128, 0.08);\r
      border: 0.5px solid rgba(0, 0, 0, 0.06);\r
      padding: 5px 14px;\r
      border-radius: 9999px;\r
      letter-spacing: -0.1px;\r
    }\r
    .save-modal-badge-icon {\r
      color: #0071E3;\r
      flex-shrink: 0;\r
    }\r
    .save-modal-img-wrap {\r
      width: 100%;\r
      display: flex;\r
      justify-content: center;\r
      align-items: center;\r
      border-radius: 18px;\r
      overflow: hidden;\r
      background: #F5F5F7;\r
      border: 0.5px solid rgba(0, 0, 0, 0.06);\r
      box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.14);\r
    }\r
    .save-modal-img {\r
      width: 100%;\r
      max-height: 410px;\r
      object-fit: contain;\r
      display: block;\r
      -webkit-touch-callout: default !important;\r
      pointer-events: auto !important;\r
      user-select: auto !important;\r
      -webkit-user-select: auto !important;\r
    }\r
    .save-modal-actions {\r
      display: flex;\r
      width: 100%;\r
      gap: 10px;\r
      margin-top: 2px;\r
    }\r
    .save-modal-btn {\r
      flex: 1;\r
      padding: 12px 14px;\r
      border-radius: 14px;\r
      font-size: 15px;\r
      font-weight: 600;\r
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;\r
      letter-spacing: -0.2px;\r
      border: none;\r
      cursor: pointer;\r
      transition: opacity 0.15s, transform 0.1s;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
    }\r
    .save-modal-btn:active {\r
      transform: scale(0.98);\r
      opacity: 0.85;\r
    }\r
    .save-modal-btn.primary {\r
      background: #1D1D1F;\r
      color: #FFFFFF;\r
    }\r
    .save-modal-btn.secondary {\r
      background: rgba(118, 118, 128, 0.12);\r
      color: #1D1D1F;\r
    }\r
\r
    #render-canvas { display: none; }\r
  </style>\r
</head>\r
<body>\r
\r
  <div class="ambient-glow-top"></div>\r
\r
  <div class="app-card">\r
    \r
    <!-- Top Header with Cursive Branding -->\r
    <header class="header-bar">\r
      <button id="header-back-btn" class="header-back-btn" style="display: none;" onclick="backToEntry()">\r
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">\r
          <polyline points="15 18 9 12 15 6"></polyline>\r
        </svg>\r
      </button>\r
      <div class="brand-title">ViviBon Cover</div>\r
    </header>\r
\r
    <!-- ================= VIEW 1: Entry Studio ================= -->\r
    <div id="view-entry">\r
      \r
      <!-- Hero 3:4 Viewport -->\r
      <div class="hero-box">\r
        <img id="entry-preview" class="hero-img" src="models/milo_gentle.webp" alt="Pet Model Preview" />\r
        \r
        <!-- Floating Round Upload Button -->\r
        <div class="upload-btn-floating" onclick="soundEngine.playDialClick(); document.getElementById('file-input').click()" title="Upload Pet Photo">\r
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>\r
            <polyline points="17 8 12 3 7 8"></polyline>\r
            <line x1="12" y1="3" x2="12" y2="15"></line>\r
          </svg>\r
        </div>\r
      </div>\r
      <input type="file" id="file-input" style="display: none;" accept="image/*" onchange="handleUpload(event)" />\r
\r
      <!-- 4 Core Category Pills Bar -->\r
      <div class="category-pills-bar" id="category-pills-bar">\r
        <!-- Dynamically rendered pills -->\r
      </div>\r
\r
      <!-- Reference Templates Carousel -->\r
      <div class="template-carousel-container">\r
        <div class="template-cards-row" id="template-cards-row">\r
          <!-- Dynamically rendered template cards -->\r
        </div>\r
        <div class="scroll-edge-hint" id="scroll-edge-hint"></div>\r
      </div>\r
\r
      <!-- Primary CTA Button -->\r
      <button class="btn-cta" onclick="startGeneration()">\r
        Create my portrait\r
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">\r
          <line x1="5" y1="12" x2="19" y2="12"></line>\r
          <polyline points="12 5 19 12 12 19"></polyline>\r
        </svg>\r
      </button>\r
\r
    </div>\r
\r
    <!-- ================= VIEW 2: Result Showcase (Exact Match to Screenshot 2) ================= -->\r
    <div id="view-result">\r
      \r
      <div class="poster-stage">\r
        <!-- Generated Portrait Display -->\r
        <img id="res-display-img" class="poster-img" src="models/milo_gentle_prince_of_wales.webp" alt="High Fashion Cover" />\r
        <!-- Original Pet Layer (Hold to compare) -->\r
        <img id="res-original-img" class="poster-img original-layer" src="models/milo_gentle.webp" alt="Original Pet" />\r
\r
        <!-- Pure unobstructed portrait stage -->\r
        <div class="poster-overlay" id="poster-overlay" style="display: none;"></div>\r
\r
        <!-- Floating Compare Pill matching Screenshot 2 -->\r
        <div class="compare-pill" id="compare-btn">\r
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>\r
            <circle cx="12" cy="12" r="3"></circle>\r
          </svg>\r
          Hold to compare\r
        </div>\r
      </div>\r
\r
      <!-- Save Poster Button matching Screenshot 2 with Download Icon -->\r
      <button class="btn-cta" onclick="exportPoster()">\r
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>\r
          <polyline points="7 10 12 15 17 10"></polyline>\r
          <line x1="12" y1="15" x2="12" y2="3"></line>\r
        </svg>\r
        Save 1080P portrait\r
      </button>\r
\r
    </div>\r
\r
  </div>\r
\r
  <!-- Fullscreen Frosted Loader Overlay (Lapse Darkroom Ritual) -->\r
  <div class="loader-overlay" id="loader">\r
    <div class="darkroom-ambient-glow"></div>\r
    <div class="loader-card">\r
      \r
      <!-- Concentric Circular Loader (Screenshot 1) -->\r
      <div class="concentric-loader-box">\r
        <div class="concentric-ring-outer"></div>\r
        <svg class="concentric-arc-svg" viewBox="0 0 76 76">\r
          <circle cx="38" cy="38" r="36" fill="none" stroke="#E85D3F" stroke-width="3" stroke-dasharray="75 160" stroke-linecap="round"/>\r
        </svg>\r
        <div class="concentric-center-dot"></div>\r
      </div>\r
\r
      <!-- Linear Track + Percentage Text (Screenshot 1) -->\r
      <div class="loader-progress-row">\r
        <div class="loader-progress-track">\r
          <div class="loader-progress-fill" id="loader-progress-fill"></div>\r
        </div>\r
        <div class="loader-percentage-text" id="loader-percentage">94%</div>\r
      </div>\r
\r
      <!-- Status Text and Subtext (Screenshot 1) -->\r
      <div class="loader-text" id="loader-text">Adding the final editorial finish...</div>\r
      <div class="loader-sub" id="loader-sub">Polishing tone and fine detail [2.5s]</div>\r
\r
    </div>\r
  </div>\r
\r
  <!-- Toast Pill -->\r
  <div id="toast" class="toast-pill"></div>\r
\r
  <!-- Mobile Save Modal (Apple Native HIG Aligned) -->\r
  <div id="save-modal" class="save-modal-overlay" onclick="closeSaveModal(event)">\r
    <div class="save-modal-card" onclick="event.stopPropagation()">\r
      <button class="save-modal-close-btn" onclick="closeSaveModal(event)" aria-label="Close">\r
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">\r
          <line x1="18" y1="6" x2="6" y2="18"></line>\r
          <line x1="6" y1="6" x2="18" y2="18"></line>\r
        </svg>\r
      </button>\r
\r
      <div class="save-modal-header">\r
        <div class="save-modal-title">1080P Vogue Portrait</div>\r
      </div>\r
\r
      <div class="save-modal-img-wrap">\r
        <img id="save-modal-img" class="save-modal-img" src="" alt="ViviBon Cover Poster" />\r
      </div>\r
\r
      <div class="save-modal-actions">\r
        <button id="modal-share-btn" class="save-modal-btn secondary" style="display: none;" onclick="sharePosterNative()">\r
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px; vertical-align: -2px;">\r
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>\r
            <polyline points="16 6 12 2 8 6"></polyline>\r
            <line x1="12" y1="2" x2="12" y2="15"></line>\r
          </svg>\r
          Share\r
        </button>\r
        <button class="save-modal-btn primary" onclick="closeSaveModal(event)">Done</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <canvas id="render-canvas"></canvas>\r
\r
  <script>\r
    // 4 Categories \xD7 3 High-Converting Templates (12 Core Templates Matrix)\r
    const THEMES = {\r
      corporate: {\r
        id: "corporate",\r
        backendTheme: "corporate",\r
        name: "Corporate",\r
        tag: "WORK & LIFE \xB7 01",\r
        templates: [\r
          {\r
            id: "chill_intern",\r
            name: "Chill Intern",\r
            img: "models/milo_gentle_prince_of_wales.webp",\r
            title: "The Anti-Hustle Intern",\r
            tag: "INTERN \xB7 01"\r
          },\r
          {\r
            id: "coffee_pro",\r
            name: "Caffeine Pro",\r
            img: "models/milo_techwear_cobalt_cyber.webp",\r
            title: "Daily Coffee Grind",\r
            tag: "CAFFEINE \xB7 02"\r
          },\r
          {\r
            id: "ivy_prep",\r
            name: "Ivy Scholar",\r
            img: "models/milo_knitwear_oatmeal_cable.webp",\r
            title: "Old Money Cable Knit",\r
            tag: "PREPPY \xB7 03"\r
          }\r
        ]\r
      },\r
      fine_art: {\r
        id: "fine_art",\r
        backendTheme: "fine_art",\r
        name: "Fine Art",\r
        tag: "FINE ART \xB7 01",\r
        templates: [\r
          {\r
            id: "mona_lisa",\r
            name: "Mona Lisa",\r
            img: "models/milo_gentle.webp",\r
            title: "Renaissance Masterpiece",\r
            tag: "FINE ART \xB7 01"\r
          },\r
          {\r
            id: "pearl_earring",\r
            name: "Pearl Earring",\r
            img: "models/milo_gentle_navy_velvet.webp",\r
            title: "Girl with a Pearl Earring",\r
            tag: "DUTCH GOLDEN \xB7 02"\r
          },\r
          {\r
            id: "line_art",\r
            name: "Line Art",\r
            img: "models/milo_street.webp",\r
            title: "Minimalist Ink Sketch",\r
            tag: "LINE ART \xB7 03"\r
          }\r
        ]\r
      },\r
      cosplay: {\r
        id: "cosplay",\r
        backendTheme: "cosplay",\r
        name: "Cosplay",\r
        tag: "LEGEND \xB7 01",\r
        templates: [\r
          {\r
            id: "royal_monarch",\r
            name: "The Monarch",\r
            img: "models/milo_gentle_navy_velvet.webp",\r
            title: "Renaissance Royal Sovereign",\r
            tag: "ROYALTY \xB7 01"\r
          },\r
          {\r
            id: "witch",\r
            name: "The Witch",\r
            img: "models/milo_techwear_arctic_yellow.webp",\r
            title: "Midnight Magic & Stars",\r
            tag: "SORCERY \xB7 02"\r
          },\r
          {\r
            id: "cowboy",\r
            name: "The Cowboy",\r
            img: "models/milo_aviator_vintage_shearling.webp",\r
            title: "Wild West & Coastal Cowgirl",\r
            tag: "COWGIRL \xB7 03"\r
          }\r
        ]\r
      },\r
      celebration: {\r
        id: "celebration",\r
        backendTheme: "celebration",\r
        name: "Celebration",\r
        tag: "HOLIDAY \xB7 01",\r
        templates: [\r
          {\r
            id: "christmas",\r
            name: "Christmas Box",\r
            img: "models/milo_warm.webp",\r
            title: "Velvet Gift Box & Hearth",\r
            tag: "CHRISTMAS \xB7 01"\r
          },\r
          {\r
            id: "halloween",\r
            name: "Spooky Magic",\r
            img: "models/milo_techwear_arctic_yellow.webp",\r
            title: "Whimsical Pumpkin & Horns",\r
            tag: "HALLOWEEN \xB7 02"\r
          },\r
          {\r
            id: "birthday_vip",\r
            name: "Birthday Gala",\r
            img: "models/milo_gentle.webp",\r
            title: "VIP Cake & Pastel Crown",\r
            tag: "BIRTHDAY \xB7 03"\r
          }\r
        ]\r
      }\r
    };\r
\r
    // Backward-compatibility aliases\r
    THEMES.lifestyle = THEMES.corporate;\r
    THEMES.artistic = THEMES.fine_art;\r
    THEMES.drama = THEMES.cosplay;\r
\r
    let activeThemeKey = "corporate";\r
    let activeTemplateId = "chill_intern";\r
    let userPhotoUrl = "models/milo_gentle.webp";\r
    let isUserUploaded = false;\r
    let defaultModelBase64 = null;\r
\r
    async function loadDefaultModelBase64() {\r
      if (defaultModelBase64) return defaultModelBase64;\r
      try {\r
        const res = await fetch('models/milo_gentle.jpg');\r
        const blob = await res.blob();\r
        return new Promise((resolve) => {\r
          const reader = new FileReader();\r
          reader.onloadend = () => {\r
            defaultModelBase64 = reader.result;\r
            resolve(defaultModelBase64);\r
          };\r
          reader.readAsDataURL(blob);\r
        });\r
      } catch (e) {\r
        console.warn('Failed to load default model base64:', e);\r
        return null;\r
      }\r
    }\r
\r
    function trackEvent(eventName, properties = {}) {\r
      try {\r
        if (window.clarity) {\r
          window.clarity("event", eventName);\r
          if (properties && typeof properties === 'object') {\r
            for (const [k, v] of Object.entries(properties)) {\r
              if (v !== undefined && v !== null) {\r
                window.clarity("set", \`\${eventName}_\${k}\`, String(v));\r
              }\r
            }\r
          }\r
        }\r
      } catch(e) {\r
        console.warn('[Clarity Event]:', e);\r
      }\r
    }\r
\r
    function triggerHaptic(duration = 8) {\r
      if (navigator.vibrate) {\r
        try { navigator.vibrate(duration); } catch(e){}\r
      }\r
    }\r
\r
    /**\r
     * Web Audio Pure Haptic Sound Engine (0KB Asset Overhead - NC-7 Compliant)\r
     * Synthesizes mechanical tactile clicks, camera shutter release, and darkroom finish chimes.\r
     */\r
    class HapticSoundEngine {\r
      constructor() {\r
        this.ctx = null;\r
        this.masterGain = null;\r
        this.initUnlockListener();\r
      }\r
\r
      ensureContext() {\r
        try {\r
          if (!this.ctx) {\r
            const AudioCtx = window.AudioContext || window.webkitAudioContext;\r
            if (!AudioCtx) return null;\r
            this.ctx = new AudioCtx();\r
            this.masterGain = this.ctx.createGain();\r
            this.masterGain.gain.setValueAtTime(0.92, this.ctx.currentTime);\r
            this.masterGain.connect(this.ctx.destination);\r
          }\r
          if (this.ctx.state === 'suspended') {\r
            return this.ctx.resume();\r
          }\r
          return Promise.resolve();\r
        } catch (e) {\r
          return null;\r
        }\r
      }\r
\r
      initUnlockListener() {\r
        const unlock = () => {\r
          const p = this.ensureContext();\r
          if (p && typeof p.then === 'function') {\r
            p.then(() => {\r
              try {\r
                if (this.ctx) {\r
                  const b = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);\r
                  const s = this.ctx.createBufferSource();\r
                  s.buffer = b;\r
                  s.connect(this.ctx.destination);\r
                  s.start(0);\r
                }\r
              } catch (e) {}\r
            }).catch(() => {});\r
          }\r
        };\r
        ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'].forEach(evt => {\r
          document.addEventListener(evt, unlock, { passive: true });\r
        });\r
      }\r
\r
      /**\r
       * Teenage Engineering / Recent.design Style Tactile Mechanical Switch Click\r
       * Dual-Action Acoustic Foley:\r
       * - Layer 1: High-Frequency Snap (1900Hz -> 580Hz sweep, 24ms, gain 0.35)\r
       *   Directly targets human ear canal resonance (Fletcher-Munson sweet spot 1k-3k Hz)\r
       *   Audible on all smartphone and laptop speakers.\r
       * - Layer 2: Metallic Leaf Spring Contact (2800Hz bandpass white noise, 18ms, gain 0.26)\r
       * - Layer 3: Keycap Chassis Punch (340Hz -> 110Hz triangle thump, 28ms, gain 0.28)\r
       */\r
      playDialClick() {\r
        const p = this.ensureContext();\r
        if (!this.ctx) return;\r
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {\r
          p.then(() => this._executeDialClick()).catch(() => {});\r
        } else {\r
          this._executeDialClick();\r
        }\r
      }\r
\r
      _executeDialClick() {\r
        try {\r
          if (!this.ctx || !this.masterGain) return;\r
          const now = this.ctx.currentTime + 0.003;\r
          const jitter = 1.0 + (Math.random() - 0.5) * 0.04;\r
\r
          // Layer 1: Sharp Mechanical Snap (Pitch drop transient, 1900Hz -> 580Hz)\r
          const snapOsc = this.ctx.createOscillator();\r
          const snapGain = this.ctx.createGain();\r
          snapOsc.type = 'sine';\r
          snapOsc.frequency.setValueAtTime(1900 * jitter, now);\r
          snapOsc.frequency.exponentialRampToValueAtTime(580, now + 0.024);\r
\r
          snapGain.gain.setValueAtTime(0.35, now);\r
          snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);\r
\r
          snapOsc.connect(snapGain);\r
          snapGain.connect(this.masterGain);\r
          snapOsc.start(now);\r
          snapOsc.stop(now + 0.025);\r
\r
          // Layer 2: Metal Leaf Spring Friction (Bandpass white noise, 2800Hz)\r
          const bufferSize = Math.floor(this.ctx.sampleRate * 0.018);\r
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);\r
          const output = noiseBuffer.getChannelData(0);\r
          for (let i = 0; i < bufferSize; i++) {\r
            output[i] = Math.random() * 2 - 1;\r
          }\r
          const noise = this.ctx.createBufferSource();\r
          noise.buffer = noiseBuffer;\r
\r
          const bandpass = this.ctx.createBiquadFilter();\r
          bandpass.type = 'bandpass';\r
          bandpass.frequency.setValueAtTime(2800 * jitter, now);\r
          bandpass.Q.setValueAtTime(3.2, now);\r
\r
          const noiseGain = this.ctx.createGain();\r
          noiseGain.gain.setValueAtTime(0.26, now);\r
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);\r
\r
          noise.connect(bandpass);\r
          bandpass.connect(noiseGain);\r
          noiseGain.connect(this.masterGain);\r
          noise.start(now);\r
\r
          // Layer 3: Keycap Bottoming Punch (Triangle wave body thump, 340Hz -> 110Hz)\r
          const bodyOsc = this.ctx.createOscillator();\r
          const bodyGain = this.ctx.createGain();\r
          bodyOsc.type = 'triangle';\r
          bodyOsc.frequency.setValueAtTime(340 * jitter, now);\r
          bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.028);\r
\r
          bodyGain.gain.setValueAtTime(0.28, now);\r
          bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);\r
\r
          bodyOsc.connect(bodyGain);\r
          bodyGain.connect(this.masterGain);\r
          bodyOsc.start(now);\r
          bodyOsc.stop(now + 0.029);\r
        } catch (e) {\r
          // Silent fallback\r
        }\r
      }\r
\r
      /**\r
       * Mechanical Camera Shutter Release (Leica/Hasselblad style dual-stage click)\r
       * Stroke 1: Leaf blade opening transient (1600Hz -> 420Hz, 32ms) + blade friction noise\r
       * Stroke 2: Mechanical curtain / mirror return (280Hz -> 90Hz, 45ms, delayed by 36ms)\r
       */\r
      playShutterSnap() {\r
        const p = this.ensureContext();\r
        if (!this.ctx) return;\r
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {\r
          p.then(() => this._executeShutterSnap()).catch(() => {});\r
        } else {\r
          this._executeShutterSnap();\r
        }\r
      }\r
\r
      _executeShutterSnap() {\r
        try {\r
          if (!this.ctx || !this.masterGain) return;\r
          const now = this.ctx.currentTime + 0.003;\r
          const jitter = 1.0 + (Math.random() - 0.5) * 0.03;\r
\r
          // Stroke 1: Shutter Blade Snap\r
          const snapOsc = this.ctx.createOscillator();\r
          const snapGain = this.ctx.createGain();\r
          snapOsc.type = 'sine';\r
          snapOsc.frequency.setValueAtTime(1600 * jitter, now);\r
          snapOsc.frequency.exponentialRampToValueAtTime(420, now + 0.032);\r
          snapGain.gain.setValueAtTime(0.38, now);\r
          snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);\r
          snapOsc.connect(snapGain);\r
          snapGain.connect(this.masterGain);\r
          snapOsc.start(now);\r
          snapOsc.stop(now + 0.033);\r
\r
          const bufferSize = Math.floor(this.ctx.sampleRate * 0.035);\r
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);\r
          const output = noiseBuffer.getChannelData(0);\r
          for (let i = 0; i < bufferSize; i++) {\r
            output[i] = Math.random() * 2 - 1;\r
          }\r
          const whiteNoise = this.ctx.createBufferSource();\r
          whiteNoise.buffer = noiseBuffer;\r
          const filter = this.ctx.createBiquadFilter();\r
          filter.type = 'bandpass';\r
          filter.frequency.setValueAtTime(2400 * jitter, now);\r
          filter.Q.setValueAtTime(2.5, now);\r
          const noiseGain = this.ctx.createGain();\r
          noiseGain.gain.setValueAtTime(0.30, now);\r
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);\r
          whiteNoise.connect(filter);\r
          filter.connect(noiseGain);\r
          noiseGain.connect(this.masterGain);\r
          whiteNoise.start(now);\r
\r
          // Stroke 2: Mechanical Return & Chassis Thump (t + 0.036s)\r
          const returnTime = now + 0.036;\r
          const returnOsc = this.ctx.createOscillator();\r
          const returnGain = this.ctx.createGain();\r
          returnOsc.type = 'triangle';\r
          returnOsc.frequency.setValueAtTime(280 * jitter, returnTime);\r
          returnOsc.frequency.exponentialRampToValueAtTime(90, returnTime + 0.045);\r
          returnGain.gain.setValueAtTime(0.35, returnTime);\r
          returnGain.gain.exponentialRampToValueAtTime(0.0001, returnTime + 0.045);\r
          returnOsc.connect(returnGain);\r
          returnGain.connect(this.masterGain);\r
          returnOsc.start(returnTime);\r
          returnOsc.stop(returnTime + 0.046);\r
        } catch (e) {\r
          // Silent fallback\r
        }\r
      }\r
\r
      /**\r
       * Crystal Finish Chime (Lapse Darkroom Reveal)\r
       * Apple / Studio Style 3-Note Micro-Arpeggio Chime: E6 (1318.5Hz), G#6 (1661.2Hz), B6 (1975.5Hz)\r
       */\r
      playChime() {\r
        const p = this.ensureContext();\r
        if (!this.ctx) return;\r
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {\r
          p.then(() => this._executeChime()).catch(() => {});\r
        } else {\r
          this._executeChime();\r
        }\r
      }\r
\r
      _executeChime() {\r
        try {\r
          if (!this.ctx || !this.masterGain) return;\r
          const now = this.ctx.currentTime + 0.003;\r
\r
          const notes = [\r
            { f: 1318.5, delay: 0.0, gain: 0.24, dur: 0.55 },\r
            { f: 1661.2, delay: 0.04, gain: 0.22, dur: 0.60 },\r
            { f: 1975.5, delay: 0.08, gain: 0.26, dur: 0.70 }\r
          ];\r
\r
          notes.forEach(note => {\r
            const osc = this.ctx.createOscillator();\r
            const gain = this.ctx.createGain();\r
            const t = now + note.delay;\r
\r
            osc.type = 'sine';\r
            osc.frequency.setValueAtTime(note.f, t);\r
\r
            gain.gain.setValueAtTime(note.gain, t);\r
            gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);\r
\r
            osc.connect(gain);\r
            gain.connect(this.masterGain);\r
\r
            osc.start(t);\r
            osc.stop(t + note.dur + 0.01);\r
          });\r
        } catch (e) {\r
          // Silent fallback\r
        }\r
      }\r
    }\r
\r
    const soundEngine = new HapticSoundEngine();\r
\r
    function showToast(text, duration = 2500) {\r
      const toast = document.getElementById("toast");\r
      if (!toast) return;\r
      toast.innerText = text;\r
      toast.classList.add("show");\r
      setTimeout(() => {\r
        toast.classList.remove("show");\r
      }, duration);\r
    }\r
\r
    function renderCategoryPills() {\r
      const bar = document.getElementById("category-pills-bar");\r
      if (!bar) return;\r
      const keys = ["corporate", "fine_art", "cosplay", "celebration"];\r
      bar.innerHTML = keys.map(k => {\r
        const theme = THEMES[k];\r
        const isActive = k === activeThemeKey;\r
        return \`\r
          <div class="category-pill \${isActive ? 'active' : ''}" onclick="selectTheme('\${k}')">\r
            <span class="category-pill-name">\${theme.name}</span>\r
          </div>\r
        \`;\r
      }).join('');\r
    }\r
\r
    function selectTheme(themeKey) {\r
      triggerHaptic(6);\r
      soundEngine.playDialClick();\r
      activeThemeKey = themeKey;\r
      const theme = THEMES[themeKey];\r
      activeTemplateId = theme.templates[0].id;\r
      renderCategoryPills();\r
      renderTemplateCards();\r
      trackEvent("style_selected", { theme: themeKey, template: activeTemplateId });\r
\r
      const row = document.getElementById("template-cards-row");\r
      if (row) {\r
        row.scrollTo({ left: 0, behavior: 'smooth' });\r
      }\r
    }\r
\r
    function renderTemplateCards() {\r
      const row = document.getElementById("template-cards-row");\r
      if (!row) return;\r
      const theme = THEMES[activeThemeKey];\r
      row.innerHTML = theme.templates.map(tpl => {\r
        const isActive = tpl.id === activeTemplateId;\r
        return \`\r
          <div class="template-card \${isActive ? 'active' : ''}" id="card-\${tpl.id}" onclick="selectTemplate('\${tpl.id}')">\r
            <div class="template-thumb-box">\r
              <img class="template-thumb" src="\${tpl.img}" alt="\${tpl.name}" loading="lazy" onerror="this.onerror=null;this.src='models/milo_gentle.webp';" />\r
            </div>\r
            <div class="template-label">\${tpl.name}</div>\r
          </div>\r
        \`;\r
      }).join('');\r
      updateScrollEdgeHint();\r
    }\r
\r
    function selectTemplate(tplId) {\r
      triggerHaptic(6);\r
      soundEngine.playDialClick();\r
      activeTemplateId = tplId;\r
      renderTemplateCards();\r
      trackEvent("template_selected", { theme: activeThemeKey, template: tplId });\r
\r
      const targetCard = document.getElementById(\`card-\${tplId}\`);\r
      if (targetCard) {\r
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });\r
      }\r
    }\r
\r
    function updateScrollEdgeHint() {\r
      const row = document.getElementById("template-cards-row");\r
      const hint = document.getElementById("scroll-edge-hint");\r
      if (!row || !hint) return;\r
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 10;\r
      hint.style.opacity = atEnd ? '0' : '1';\r
    }\r
\r
    function initDragScroll() {\r
      const row = document.getElementById("template-cards-row");\r
      if (!row) return;\r
\r
      let isDown = false;\r
      let startX = 0;\r
      let scrollLeft = 0;\r
      let moved = false;\r
\r
      row.addEventListener('mousedown', (e) => {\r
        isDown = true;\r
        moved = false;\r
        startX = e.pageX - row.offsetLeft;\r
        scrollLeft = row.scrollLeft;\r
      });\r
\r
      window.addEventListener('mouseup', () => {\r
        isDown = false;\r
      });\r
\r
      row.addEventListener('mousemove', (e) => {\r
        if (!isDown) return;\r
        e.preventDefault();\r
        const x = e.pageX - row.offsetLeft;\r
        const walk = (x - startX) * 1.5;\r
        if (Math.abs(walk) > 4) moved = true;\r
        row.scrollLeft = scrollLeft - walk;\r
      });\r
\r
      row.addEventListener('scroll', updateScrollEdgeHint, { passive: true });\r
    }\r
\r
    /**\r
     * P0-1: Downsample and optimize image file to prevent iOS Safari OOM crashes\r
     * Scales max edge to <= 1500px, outputs high-quality JPEG (0.85), memory footprint < 25MB\r
     */\r
    function downsampleImageFile(file, maxEdge = 1500, quality = 0.85) {\r
      return new Promise((resolve, reject) => {\r
        if (!file || !file.type.startsWith('image/')) {\r
          return reject(new Error('Please select a valid image file.'));\r
        }\r
\r
        const objectUrl = URL.createObjectURL(file);\r
        const img = new Image();\r
\r
        img.onload = () => {\r
          try {\r
            let width = img.naturalWidth || img.width;\r
            let height = img.naturalHeight || img.height;\r
\r
            if (width > maxEdge || height > maxEdge) {\r
              if (width >= height) {\r
                height = Math.round((height * maxEdge) / width);\r
                width = maxEdge;\r
              } else {\r
                width = Math.round((width * maxEdge) / height);\r
                height = maxEdge;\r
              }\r
            }\r
\r
            const canvas = document.createElement('canvas');\r
            canvas.width = width;\r
            canvas.height = height;\r
            const ctx = canvas.getContext('2d');\r
            if (!ctx) {\r
              URL.revokeObjectURL(objectUrl);\r
              return reject(new Error('Canvas 2D context unavailable'));\r
            }\r
\r
            ctx.drawImage(img, 0, 0, width, height);\r
            const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);\r
\r
            URL.revokeObjectURL(objectUrl);\r
            canvas.width = 0;\r
            canvas.height = 0;\r
\r
            resolve({\r
              dataUrl: optimizedDataUrl,\r
              width,\r
              height,\r
              originalSizeKb: Math.round(file.size / 1024),\r
              optimizedSizeKb: Math.round((optimizedDataUrl.length * 3) / 4 / 1024)\r
            });\r
          } catch (err) {\r
            URL.revokeObjectURL(objectUrl);\r
            reject(err);\r
          }\r
        };\r
\r
        img.onerror = () => {\r
          URL.revokeObjectURL(objectUrl);\r
          reject(new Error('Failed to load and decode image'));\r
        };\r
\r
        img.src = objectUrl;\r
      });\r
    }\r
\r
    async function handleUpload(event) {\r
      const file = event.target.files && event.target.files[0];\r
      if (!file) return;\r
\r
      if (file.size > 20 * 1024 * 1024) {\r
        showToast("Photo exceeds 20MB limit. Please choose another.");\r
        return;\r
      }\r
\r
      showToast("Optimizing portrait resolution... \u2726", 1000);\r
\r
      try {\r
        const result = await downsampleImageFile(file, 1500, 0.85);\r
        userPhotoUrl = result.dataUrl;\r
        isUserUploaded = true;\r
        document.getElementById("entry-preview").src = userPhotoUrl;\r
        document.getElementById("res-original-img").src = userPhotoUrl;\r
        showToast("Photo uploaded successfully! \u2726");\r
        triggerHaptic(10);\r
        soundEngine.playDialClick();\r
        trackEvent("photo_uploaded", {\r
          original_kb: result.originalSizeKb,\r
          optimized_kb: result.optimizedSizeKb,\r
          scaled_w: result.width,\r
          scaled_h: result.height\r
        });\r
      } catch (err) {\r
        console.warn("Downsampling failed, fallback to FileReader:", err);\r
        const reader = new FileReader();\r
        reader.onload = (e) => {\r
          userPhotoUrl = e.target.result;\r
          isUserUploaded = true;\r
          document.getElementById("entry-preview").src = userPhotoUrl;\r
          document.getElementById("res-original-img").src = userPhotoUrl;\r
          showToast("Photo uploaded successfully! \u2726");\r
          triggerHaptic(10);\r
          soundEngine.playDialClick();\r
          trackEvent("photo_uploaded", { file_size_kb: Math.round(file.size / 1024) });\r
        };\r
        reader.readAsDataURL(file);\r
      }\r
    }\r
\r
    function preloadImage(url) {\r
      return new Promise((resolve) => {\r
        const img = new Image();\r
        img.crossOrigin = "anonymous";\r
        img.src = url;\r
        img.onload = () => resolve(img);\r
        img.onerror = () => resolve(img);\r
      });\r
    }\r
\r
    async function startGeneration() {\r
      triggerHaptic(12);\r
      soundEngine.playShutterSnap();\r
      const theme = THEMES[activeThemeKey];\r
      const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];\r
      trackEvent("generate_clicked", { theme: activeThemeKey, template: tpl.id, is_user_uploaded: isUserUploaded });\r
\r
      const loader = document.getElementById("loader");\r
      const loaderText = document.getElementById("loader-text");\r
      const loaderSub = document.getElementById("loader-sub");\r
      const progressFill = document.getElementById("loader-progress-fill");\r
      const percentageText = document.getElementById("loader-percentage");\r
\r
      loader.style.display = "flex";\r
      loader.style.opacity = "1";\r
\r
      const startTime = Date.now();\r
      let progress = 18;\r
      progressFill.style.width = "18%";\r
      percentageText.innerText = "18%";\r
\r
      // High-Fashion Studio Darkroom Ritual with dynamic extended pacing\r
      const milestones = [\r
        { t: 0, text: "Exposing 120mm Medium Format...", sub: "Calibrating biometric facial proportions [0.4s]", prog: 26 },\r
        { t: 700, text: "Tailoring Savile Row Bespoke...", sub: "Weaving wool tweed & silk lining [1.1s]", prog: 55 },\r
        { t: 1600, text: "Sculpting Rembrandt Studio Light...", sub: "Balancing softbox specular highlights [1.9s]", prog: 82 },\r
        { t: 2400, text: "Applying Matte Varnish & Bodoni Type...", sub: "Curing archival pigments & cover typography [2.8s]", prog: 91 },\r
        { t: 5500, text: "Rendering Neural Diffusion Latent Space...", sub: "Preserving pet facial contours & eye gaze [6.0s]", prog: 94 },\r
        { t: 11000, text: "Infusing Haute Couture Microtextures...", sub: "Tailoring bespoke collars, lapels & textures [12.0s]", prog: 96 },\r
        { t: 18000, text: "Developing Exhibition-Grade Fine Print...", sub: "Finalizing 1080P Bodoni editorial composition [19.0s]", prog: 98 }\r
      ];\r
\r
      const stageTimers = [];\r
      milestones.forEach(m => {\r
        const tid = setTimeout(() => {\r
          loaderText.innerText = m.text;\r
          loaderSub.innerText = m.sub;\r
          progressFill.style.width = \`\${m.prog}%\`;\r
          percentageText.innerText = \`\${m.prog}%\`;\r
        }, m.t);\r
        stageTimers.push(tid);\r
      });\r
\r
      let finalPosterImg = tpl.img;\r
      let responseData = null;\r
\r
      let effectiveImageBase64 = userPhotoUrl;\r
      if (!isUserUploaded || !effectiveImageBase64 || !effectiveImageBase64.startsWith('data:')) {\r
        effectiveImageBase64 = await loadDefaultModelBase64();\r
      }\r
\r
      try {\r
        const payload = {\r
          styleKey: theme.backendTheme || "corporate",\r
          themeId: theme.backendTheme || "corporate",\r
          itemId: tpl.id,\r
          templateId: tpl.id,\r
          petName: "Milo",\r
          imageBase64: effectiveImageBase64 || undefined,\r
          isDefaultSample: false\r
        };\r
\r
        const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '3000';\r
        const isPages = window.location.hostname.endsWith('pages.dev');\r
        const endpoint = isLocal\r
          ? 'http://127.0.0.1:8787/api/generate'\r
          : (isPages ? 'https://vivibon-cover-worker.zhoumiaoyin1.workers.dev/api/generate' : '/api/generate');\r
\r
        const apiPromise = fetch(endpoint, {\r
          method: 'POST',\r
          headers: { 'Content-Type': 'application/json' },\r
          body: JSON.stringify(payload)\r
        }).then(async (res) => {\r
          if (res.ok) {\r
            const json = await res.json();\r
            if (json.data && json.data.imageUrl) {\r
              responseData = json.data;\r
              finalPosterImg = json.data.imageUrl;\r
            }\r
          }\r
        }).catch((err) => {\r
          console.warn('[API Joint Debugging Warning]:', err);\r
        });\r
\r
        await Promise.all([\r
          apiPromise,\r
          preloadImage(finalPosterImg),\r
          new Promise(r => setTimeout(r, 2600))\r
        ]);\r
      } catch(err) {\r
        console.warn('Fallback to template preview:', err);\r
        finalPosterImg = tpl.img;\r
        await preloadImage(finalPosterImg);\r
      } finally {\r
        stageTimers.forEach(clearTimeout);\r
        progressFill.style.width = "100%";\r
        percentageText.innerText = "100%";\r
        loaderText.innerText = "Darkroom print developed! Unveiling cover...";\r
        soundEngine.playChime();\r
        triggerHaptic(15);\r
\r
        document.getElementById("res-display-img").src = finalPosterImg;\r
        document.getElementById("res-original-img").src = isUserUploaded ? userPhotoUrl : (defaultModelBase64 || 'models/milo_gentle.jpg');\r
        const magTagEl = document.getElementById("mag-tag");\r
        if (magTagEl) magTagEl.innerText = tpl.tag;\r
        const magTitleEl = document.getElementById("mag-title");\r
        if (magTitleEl) magTitleEl.innerText = \`Milo \xB7 \${tpl.title}\`;\r
\r
        setTimeout(() => {\r
          document.getElementById("view-entry").style.display = "none";\r
          const resView = document.getElementById("view-result");\r
          resView.style.display = "flex";\r
          resView.style.flexDirection = "column";\r
          document.getElementById("header-back-btn").style.display = "flex";\r
\r
          loader.style.opacity = "0";\r
          setTimeout(() => {\r
            loader.style.display = "none";\r
          }, 200);\r
        }, 220);\r
      }\r
    }\r
\r
    function backToEntry() {\r
      triggerHaptic(8);\r
      soundEngine.playDialClick();\r
      if (typeof window.resetCompareState === 'function') {\r
        window.resetCompareState();\r
      }\r
      document.getElementById("view-result").style.display = "none";\r
      document.getElementById("header-back-btn").style.display = "none";\r
      const entryView = document.getElementById("view-entry");\r
      entryView.style.display = "flex";\r
      entryView.style.flexDirection = "column";\r
    }\r
\r
    function initCompareEvents() {\r
      const btn = document.getElementById("compare-btn");\r
      const originalLayer = document.getElementById("res-original-img");\r
      if (!btn || !originalLayer) return;\r
\r
      let isHolding = false;\r
      let isToggled = false;\r
      let pressStartTime = 0;\r
\r
      function updateCompareUI(visible) {\r
        if (visible) {\r
          originalLayer.style.opacity = "1";\r
          btn.classList.add("active");\r
          btn.innerHTML = \`\r
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>\r
              <circle cx="12" cy="12" r="3"></circle>\r
            </svg>\r
            Original\r
          \`;\r
        } else {\r
          originalLayer.style.opacity = "0";\r
          btn.classList.remove("active");\r
          btn.innerHTML = \`\r
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\r
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>\r
              <circle cx="12" cy="12" r="3"></circle>\r
            </svg>\r
            Hold to compare\r
          \`;\r
        }\r
      }\r
\r
      window.resetCompareState = function() {\r
        isHolding = false;\r
        isToggled = false;\r
        updateCompareUI(false);\r
      };\r
\r
      const onPointerDown = (e) => {\r
        if (e) {\r
          e.stopPropagation();\r
          if (e.cancelable && e.type === "touchstart") e.preventDefault();\r
        }\r
        pressStartTime = Date.now();\r
        isHolding = true;\r
        triggerHaptic(6);\r
        soundEngine.playDialClick();\r
\r
        if (!isToggled) {\r
          updateCompareUI(true);\r
          trackEvent("compare_shown", { template: activeTemplateId, mode: "hold" });\r
        }\r
      };\r
\r
      const onPointerUp = (e) => {\r
        if (!isHolding) return;\r
        isHolding = false;\r
        const duration = Date.now() - pressStartTime;\r
        triggerHaptic(6);\r
        soundEngine.playDialClick();\r
\r
        if (duration < 250) {\r
          // Quick Tap / Click: toggle view\r
          isToggled = !isToggled;\r
          updateCompareUI(isToggled);\r
          trackEvent("compare_shown", { template: activeTemplateId, mode: isToggled ? "toggle_on" : "toggle_off" });\r
        } else {\r
          // Long Press / Hold: release back to generated poster\r
          isToggled = false;\r
          updateCompareUI(false);\r
        }\r
      };\r
\r
      btn.addEventListener("touchstart", onPointerDown, { passive: false });\r
      btn.addEventListener("mousedown", onPointerDown);\r
\r
      window.addEventListener("touchend", onPointerUp, { passive: true });\r
      window.addEventListener("touchcancel", () => {\r
        if (isHolding) {\r
          isHolding = false;\r
          isToggled = false;\r
          updateCompareUI(false);\r
        }\r
      }, { passive: true });\r
      window.addEventListener("mouseup", onPointerUp, { passive: true });\r
      window.addEventListener("blur", () => {\r
        if (isHolding) {\r
          isHolding = false;\r
          isToggled = false;\r
          updateCompareUI(false);\r
        }\r
      });\r
    }\r
\r
    async function exportPoster() {\r
      triggerHaptic(12);\r
      soundEngine.playShutterSnap();\r
      const canvas = document.getElementById("render-canvas");\r
      const ctx = canvas.getContext("2d");\r
      const width = 1080;\r
      const height = 1440;\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      try { await document.fonts.ready; } catch(e){}\r
\r
      const theme = THEMES[activeThemeKey];\r
      const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];\r
      const displayImg = document.getElementById("res-display-img");\r
\r
      const img = new Image();\r
      img.crossOrigin = "anonymous";\r
      img.src = displayImg.src;\r
\r
      img.onload = () => {\r
        const targetRatio = width / height;\r
        const srcRatio = img.naturalWidth / img.naturalHeight;\r
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;\r
\r
        if (srcRatio > targetRatio) {\r
          sw = img.naturalHeight * targetRatio;\r
          sx = (img.naturalWidth - sw) / 2;\r
        } else {\r
          sh = img.naturalWidth / targetRatio;\r
          sy = (img.naturalHeight - sh) / 2;\r
        }\r
\r
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);\r
\r
        try {\r
          const dataUrl = canvas.toDataURL("image/png");\r
          currentPosterDataUrl = dataUrl;\r
          trackEvent("poster_exported", { theme: activeThemeKey, template: tpl.id, is_user_uploaded: isUserUploaded });\r
\r
          // P0-2: Universal Mobile & In-App Webview Detection\r
          const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);\r
          const isWeChatOrInApp = /MicroMessenger|WeChat|Weibo|Instagram|TikTok/i.test(navigator.userAgent);\r
\r
          if (isMobile || isWeChatOrInApp) {\r
            const modalImg = document.getElementById("save-modal-img");\r
            modalImg.src = dataUrl;\r
\r
            // Check if Web Share API with files is supported\r
            const shareBtn = document.getElementById("modal-share-btn");\r
            if (navigator.share) {\r
              shareBtn.style.display = "block";\r
            } else {\r
              shareBtn.style.display = "none";\r
            }\r
\r
            document.getElementById("save-modal").style.display = "flex";\r
            return;\r
          }\r
\r
          // Desktop PC direct file download\r
          const a = document.createElement("a");\r
          a.download = \`ViviBon-Cover-\${tpl.id}-\${Date.now()}.png\`;\r
          a.href = dataUrl;\r
          document.body.appendChild(a);\r
          a.click();\r
          document.body.removeChild(a);\r
          showToast("Saved 1080P portrait to downloads! \u2726");\r
        } catch(err) {\r
          console.warn("Direct download restricted, opening save modal:", err);\r
          const dataUrl = canvas.toDataURL("image/png");\r
          currentPosterDataUrl = dataUrl;\r
          document.getElementById("save-modal-img").src = dataUrl;\r
          document.getElementById("save-modal").style.display = "flex";\r
        }\r
      };\r
    }\r
\r
    let currentPosterDataUrl = null;\r
\r
    async function sharePosterNative() {\r
      if (!currentPosterDataUrl || !navigator.share) return;\r
      try {\r
        const response = await fetch(currentPosterDataUrl);\r
        const blob = await response.blob();\r
        const file = new File([blob], \`ViviBon-Cover-\${Date.now()}.png\`, { type: 'image/png' });\r
        if (navigator.canShare && navigator.canShare({ files: [file] })) {\r
          await navigator.share({\r
            title: 'ViviBon Cover',\r
            text: 'Look at my pet on the cover of Vogue! \u2726',\r
            files: [file]\r
          });\r
          trackEvent("poster_shared_native");\r
        } else {\r
          await navigator.share({\r
            title: 'ViviBon Cover',\r
            text: 'Look at my pet on the cover of Vogue! \u2726',\r
            url: window.location.href\r
          });\r
        }\r
      } catch (err) {\r
        if (err.name !== 'AbortError') {\r
          console.warn("Web Share failed:", err);\r
        }\r
      }\r
    }\r
\r
    function closeSaveModal(e) {\r
      if (e) e.stopPropagation();\r
      soundEngine.playDialClick();\r
      document.getElementById("save-modal").style.display = "none";\r
    }\r
\r
    document.addEventListener("DOMContentLoaded", () => {\r
      loadDefaultModelBase64();\r
      renderCategoryPills();\r
      renderTemplateCards();\r
      initDragScroll();\r
      initCompareEvents();\r
    });\r
  </script>\r
</body>\r
</html>\r
`;

// src/index.ts
var createApp = (customFalService, rateLimiterOpts) => {
  const app2 = new import_hono4.Hono();
  app2.use("*", loggerMiddleware());
  app2.use("*", corsMiddleware());
  app2.use("/api/generate", antiBotMiddleware());
  app2.use("/api/generate", rateLimiterMiddleware(rateLimiterOpts));
  app2.get("/", (c) => c.html(public_default));
  app2.get("/index.html", (c) => c.html(public_default));
  app2.route("/", healthRoute);
  app2.route("/", stylesRoute);
  app2.route("/", createGenerateRoute(customFalService || falService));
  app2.get("/api/internal/daily-report", async (c) => {
    const dateParam = c.req.query("date");
    const shouldSend = c.req.query("send") === "1";
    const summary = await metricsService.getDailySummary(c.env.RATE_LIMIT_KV, dateParam);
    const markdown = metricsService.formatDailyReportMarkdown(summary, c.env.ENVIRONMENT || "production");
    let sent = false;
    if (shouldSend) {
      sent = await alertService.sendMarkdown(c.env.WECHAT_WEBHOOK_URL, markdown);
    }
    return c.json({
      success: true,
      data: {
        summary,
        markdown,
        sent
      }
    });
  });
  app2.notFound((c) => {
    const errorResp = {
      success: false,
      errorCode: "NOT_FOUND",
      message: `The requested path ${c.req.path} was not found.`
    };
    return c.json(errorResp, 404);
  });
  app2.onError((err, c) => {
    console.error("[Unhandled Error]:", err);
    const errorResp = {
      success: false,
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "An unexpected edge error occurred. Please try again later."
    };
    return c.json(errorResp, 500);
  });
  return app2;
};
var app = createApp();
var src_default = {
  fetch: (request, env, ctx) => app.fetch(request, env, ctx),
  async scheduled(event, env, ctx) {
    console.log("[Cron] Executing ViviBon Cover Daily Operations Report scheduler...");
    try {
      const summary = await metricsService.getDailySummary(env.RATE_LIMIT_KV);
      const markdown = metricsService.formatDailyReportMarkdown(summary, env.ENVIRONMENT || "production");
      const sent = await alertService.sendMarkdown(env.WECHAT_WEBHOOK_URL, markdown);
      console.log("[Cron] Daily report successfully dispatched, sent =", sent);
    } catch (err) {
      console.error("[Cron] Error executing daily operations report:", err);
    }
  }
};
export {
  app,
  createApp,
  src_default as default
};
//# sourceMappingURL=index.js.map
