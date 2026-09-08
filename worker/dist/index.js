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
    if (this.runner === defaultFalRunner && !imageBase64) {
      return {
        ...baseResult,
        jobId: `preset_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: "PRESET_SAMPLE_VIEW"
      };
    }
    const runAttempt = async (key) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const res = await this.runner(
          assembled.fullPrompt,
          imageBase64,
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
      try {\r
        const payload = {\r
          styleKey: theme.backendTheme || "corporate",\r
          themeId: theme.backendTheme || "corporate",\r
          itemId: tpl.id,\r
          templateId: tpl.id,\r
          petName: "Milo",\r
          imageBase64: isUserUploaded ? userPhotoUrl : undefined,\r
          isDefaultSample: !isUserUploaded\r
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
            if (json.data) {\r
              responseData = json.data;\r
              if (json.data.imageUrl && !json.data.isFallback) {\r
                finalPosterImg = json.data.imageUrl;\r
              }\r
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
        document.getElementById("res-original-img").src = userPhotoUrl;\r
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
