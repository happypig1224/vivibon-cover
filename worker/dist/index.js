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
      HonoBase: () => Hono7
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
    var Hono7 = class _Hono {
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
      Hono: () => Hono7
    });
    module.exports = __toCommonJS(hono_exports);
    var import_hono_base = require_hono_base();
    var import_reg_exp_router = require_reg_exp_router();
    var import_smart_router = require_smart_router();
    var import_trie_router = require_trie_router();
    var Hono7 = class extends import_hono_base.HonoBase {
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
      Hono: () => import_hono6.Hono
    });
    module.exports = __toCommonJS(index_exports);
    var import_hono6 = require_hono();
    var import_context = require_context();
  }
});

// src/config/styles.ts
var styles_exports = {};
__export(styles_exports, {
  CASCADING_THEMES: () => CASCADING_THEMES,
  CELEBRATION_TEMPLATES: () => CELEBRATION_TEMPLATES,
  CORE_THEME_KEYS: () => CORE_THEME_KEYS,
  CORPORATE_TEMPLATES: () => CORPORATE_TEMPLATES,
  COSPLAY_TEMPLATES: () => COSPLAY_TEMPLATES,
  FINE_ART_TEMPLATES: () => FINE_ART_TEMPLATES,
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
    fullPrompt: `${wardrobePrompt} ${IDENTITY_ANCHOR} ${STUDIO_FINISH}`,
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
    let targetId = itemId;
    if (itemId === "dark_knight") targetId = "secret_agent";
    else if (itemId === "witch") targetId = "caribbean_pirate";
    for (const sub of theme.subCategories) {
      if (!subId || sub.id === subId) {
        const found = sub.items.find((it) => it.id === targetId);
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
  const fullPrompt = `${item.wardrobePrompt} ${IDENTITY_ANCHOR} ${skillDirective} ${STUDIO_FINISH}`;
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
var IDENTITY_ANCHOR, STUDIO_FINISH, NEGATIVE_PROMPT, FINE_ART_TEMPLATES, CORPORATE_TEMPLATES, COSPLAY_TEMPLATES, CELEBRATION_TEMPLATES, CASCADING_THEMES, STYLE_CONFIGS, SUPPORTED_STYLE_KEYS, CORE_THEME_KEYS, THEME_SKILL_DIRECTIVES, THEME_NEGATIVE_CONSTRAINTS;
var init_styles = __esm({
  "src/config/styles.ts"() {
    "use strict";
    IDENTITY_ANCHOR = "Meticulously preserve the specific pet's core biological identity from Photo 1, including native fur coloration, distinctive markings, stripe geometry, natural eye hue and iris color, snout proportions, and ear structure. The pet is the expressive living protagonist of the scene: breathe lifelike emotional depth, subtle facial micro-expressions, and natural somatic posture tailored to the narrative, avoiding stiff static head-pasting. Strict quadruped anatomical law: The subject is a 100% pure animal pet. All visible limbs must terminate solely in authentic, fluffy animal paws with species-correct fur and soft paw pads. Strictly and absolutely NO human arms, NO human hands, NO human fingers, NO human thumbs, NO opposable thumbs, NO fingernails, NO human skin or flesh, NO human wrists, NO human joints, NO hybrid chimera anatomy. Both animal paws must rest naturally and interact convincingly with the scene. Absolutely NO person or human body parts in frame, NO hands holding cameras, NO hands holding phones, NO hands holding cups, NO selfie sticks. Unmasked face, natural expressive eyes and lively whiskers.";
    STUDIO_FINISH = "Hyperdetailed, 8k resolution, cinematic lighting, sharp focus on pet eyes, rich vibrant natural color grading, high dynamic range, glossy fur highlights, deep warm studio lighting, masterpiece quality, no text, no logo, award-winning composition.";
    NEGATIVE_PROMPT = "human hand, human hands, human fingers, human thumb, human palm, fingernails, human wrist, human skin, human arms, human body, person holding camera, person holding phone, human hand holding phone, taking selfie, smartphone in hand, hand reaching into frame, selfie stick, person in photo, human taking picture, chimera, hybrid human-animal, anthropomorphic hands, furry hands, human hands on pet, human arms on pet, bare skin, fleshy fingers, knuckles, second pet, other animals, duplicate subject, breed change, facial change, fur color change, marking change, eye asymmetry, strabismus, clothes clipping, accessories clipping, distorted anatomy, warped snout, deformed eyes, extra legs, missing legs, extra paws, fused limbs, severed limbs, blurry, low quality, noisy, jpeg artifacts, text, typography, letters, watermark, signature, logo, brand name, cartoon, 3D render, CGI doll, monochrome, black and white, grayscale, desaturated, dull colors, washed out, low contrast, hazy, dim, underexposed, dark muddy shadows, plastic texture, human cleavage, bare skin, naked, nude, bikini, erotic, suggestive, extra fingers, deformed paws.";
    FINE_ART_TEMPLATES = [
      makeItem(
        "mona_lisa",
        "\u590D\u523B\u300A\u8499\u5A1C\u4E3D\u838E\u300B\u53E4\u5178\u6CB9\u753B",
        "The Mona Lisa Smile",
        "\u6587\u827A\u590D\u5174",
        "A masterwork classical Renaissance oil painting in the style of Leonardo da Vinci's Mona Lisa, starring the specific pet from Photo 1. Meticulously preserving the pet's authentic fur markings, facial identity, and eye color. Somatic posture: The pet is posed in the iconic Leonardo 3/4 seated turn, with its upper body angled slightly away while its head turns back toward the viewer, and both furry paws are gracefully folded over the rich pleated velvet gown. Contextual facial acting: The pet radiates the quintessential Mona Lisa enigma\u2014gentle, wise, and serene eyes meeting the viewer's gaze, with a faint, subtle, almost imperceptible upturn at the corners of its mouth forming that famous mysterious smile. Dressed in the authentic dark olive-green pleated Renaissance velvet gown with gold embroidery. Sfumato soft chiaroscuro lighting, misty river and mountain landscape in the distant background, antique oil painting canvas craquelure texture.",
        "models/mona_lisa.png",
        "human ears, ears hidden inside wig, wig covering eyes, wig covering snout, front legs stretched into human arms, human fingers, human hands, human neck, human skin exposed, fused paws, long robe penetrating body"
      ),
      makeItem(
        "pearl_earring",
        "\u300A\u6234\u73CD\u73E0\u8033\u73AF\u7684\u5C11\u5973\u300B\u53E4\u5178\u8096\u50CF",
        "Girl with a Pearl Earring",
        "\u8377\u5170\u9EC4\u91D1\u65F6\u4EE3",
        "A classical 17th-century Dutch Golden Age master oil painting in the exact composition of Johannes Vermeer's Girl with a Pearl Earring, featuring the specific pet from Photo 1. Somatic posture: The pet is positioned in a dynamic over-the-shoulder turn, body facing away toward the right with shoulders shrouded in an ochre wool coat, turning its head sharply back to look directly into the camera lens over its left shoulder. Contextual facial acting: A luminous, intimate gaze\u2014wide, clear, glistening moist eyes reflecting the studio light, mouth relaxed and parted by a millimeter in spontaneous wonder, conveying a captivating momentary glance as if called by name. Wearing an iconic ultramarine blue and gold silk turban wrapped around its head, beside which hangs a single large, radiant teardrop pearl catchlight. Deep dramatic chiaroscuro against a pure dark backdrop, delicate directional light caressing the cheek and iris, rich craquelure glaze.",
        "models/pearl_earring.png",
        "visible pet ears, human ears, two or more pearls, pearl penetrating skin, pearl penetrating turban, turban flattening skull, turban covering eyes, distorted neck, human neck, human collarbone, exposed human skin, bare arms, bare paws, exposed paws, uncovered paws, bare fur on torso, open chest, deep V-neck, frontal pose, facing front, symmetrical shoulders, casual clothes"
      ),
      makeItem(
        "line_art",
        "\u5927\u5E08\u7EA7\u624B\u7ED8\u901F\u5199\u7814\u7A76\u672C",
        "Master's Sketchbook Study",
        "\u624B\u7ED8\u901F\u5199",
        "A masterclass artist sketchbook study page featuring the specific pet from Photo 1. The page presents 4 dynamic charcoal-and-watercolor study sketches capturing the pet in varied lifelike emotional states: a focused frontal study, an inquisitive 3/4 tilted head glance, a yawn with curled tongue, and a tranquil sleeping pose. Subtle vintage cursive handwritten anatomical and shading notes in the sepia margins. Authentic deckle-edge aged parchment texture, expressive contour strokes, fine art museum draftsmanship.",
        "models/line_art.png",
        "realistic pencil sketch, colorful, gray gradient, smooth vector lines, 3D render, solid black fill, busy background, cropped subject, typography covering subject, long text, gibberish letters, misspelled words, over-stylized unrecognizable cartoon"
      )
    ];
    CORPORATE_TEMPLATES = [
      makeItem(
        "coffee_pro",
        "\u65E9\u516B\u6253\u5DE5\u6478\u9C7C\u72D7",
        "Daily Life of a 9-to-5 Working Pet",
        "\u6253\u5DE5\u65E5\u5E38",
        "A humorous, hyperrealistic workplace documentary portrait of the specific pet from Photo 1, themed Daily Life of a 9-to-5 Working Pet. Somatic posture: The pet exhibits a relatable, weary forward-slumping desk posture, leaning softly over its office workstation. Both authentic furry animal paws with soft pads rest naturally on the desk surface\u2014one paw limp beside the keyboard, the other softly steadying a clear takeaway cup filled with iced Americano. Contextual facial acting: The pet radiates the quintessential exhausted 9-to-5 corporate mood\u2014weary, heavy-lidded half-open eyes with a relatable glazed Monday-morning stare, yet its pupils are sharp and sparked with subtle caffeine alertness. Its furry mouth and lips are gently pursed directly around the drinking straw, actively sipping the cold beverage, whiskers twitched forward in realistic suction motion. Dressed in a snug dark chocolate brown ribbed knit turtleneck sweater with clean cuffs around its furry ankles and a clear acrylic employee lanyard badge labeled 'Professional Slacker'. Crucial photographic identity consistency: The miniature ID photo printed on the employee badge must show the identical face of the specific pet from Photo 1 (matching its exact breed, fur color, and tabby markings), serving as the pet's own official employee ID photo. Authentic modern open-plan office background with soft out-of-focus computer screens and warm indoor lighting. Pure animal anatomy, natural glossy fur. Absolutely no human hands or smartphones in frame.",
        "models/caffeine_pro.png",
        "different pet on employee badge, mismatching animal on ID card, white cat on badge, human face on badge, wrong photo on employee card, smartphone, mobile phone, cell phone, holding phone, phone held by hand, taking selfie, selfie pose, arm reaching toward camera, human hand, human fingers, human thumb, opposable thumb, human palm, fingernails, human wrist, human arm, human skin, chimera, half-human, hybrid hands, hands holding cup, coffee spilled on fur, pet drinking hot coffee, dislocated paws"
      ),
      makeItem(
        "airline_captain",
        "\u9876\u7EA7\u6C11\u822A\u673A\u957F",
        "The Airline Captain",
        "\u6C11\u822A\u673A\u957F",
        "A humorous and delightful, viral ultra-wide fisheye cockpit documentary selfie of the specific pet from Photo 1 as an authentic commercial airline captain. Composition and camera: Dramatic close-up wide-angle GoPro cockpit selfie perspective with subtle curved barrel distortion. The pet's large, adorable face is centered close to the camera lens with engaging visual impact. Somatic posture and headwear: Wearing dark olive-green tactical aviator goggles stylishly pushed up onto its forehead/brow, allowing both furry animal ears to perk up naturally on either side (no bulky pilot hat, no peaked cap). Contextual facial acting: Big round curious eyes looking directly into the camera lens with irresistible charismatic charm, pink nose, whiskers flared outward in alert concentration. Attire: Fitted with a snug black tactical flight harness and seatbelt straps featuring silver and yellow safety buckles strapped over its animal chest and shoulders (no human suit jacket, no necktie). Environment: Inside an authentic airplane flight deck cockpit, surrounded by glowing overhead panels, illuminated switchboards, and multi-function flight displays. Through the panoramic cockpit windshield, an airport tarmac apron with parked ground service vehicles is visible under natural bright daylight. Razor-sharp glossy fur texture, photorealistic animal anatomy, high-fashion pet meme masterpiece.",
        "models/airline_captain.png",
        "peaked cap, pilot cap, captain hat, service cap, visor hat, hat covering ears, uniform jacket, formal suit, necktie, buttoned blazer, epaulettes, distant horizon gaze, looking away from camera, telephoto lens, zoomed out, full body portrait, human arms, human body, human fingers, human hands, human thumb, opposable thumb, person holding controls, distorted dials, high altitude sky, clouds in window, flying in sky, dislocated paws, cartoon, 3d render, blurry, distorted face, changing pet identity"
      ),
      makeItem(
        "michelin_chef",
        "\u5BA0\u7269\u5927\u53A8\u505A\u996D\u65E5\u5E38",
        "The Michelin Executive Chef",
        "\u7C73\u5176\u6797\u4E3B\u53A8",
        "A delightful, viral comedic culinary portrait of the specific pet from Photo 1 as an executive Michelin chef. Somatic posture: The pet leans forward over a pristine stainless steel prep counter, body angled with professional culinary focus. One furry paw rests firmly on the cutting board beside miniature culinary pans, while its other paw is delicately hovering above a gourmet dish as if placing the final micro-herb with artistic precision. Contextual facial acting: The pet bears the quintessential discerning critique of a three-star chef\u2014sharp focused eyes looking down intensely at the plating, whiskers angled downward with concentrated scrutiny, and mouth set in a proud, exacting line. Wearing a tall puffy white pleated chef toque hat on its head and a crisp beige-and-brown checkered kitchen apron tied snugly around its chest. Warm, bustling professional restaurant kitchen background with soft bokeh. Photorealistic pet fur, delightful high-fashion meme aesthetic.",
        "models/michelin_chef.png",
        "realistic human fingers, realistic human arms, human hands, human thumbs, fleshy hands, human skin, hairy arms, furry paws holding spatula, dirty apron, grease stains, dark gloomy messy kitchen, burning stove, chef hat covering eyes, hat swallowing ears, hat piercing skull, deformed hands"
      )
    ];
    COSPLAY_TEMPLATES = [
      makeItem(
        "assumption_of_mary",
        "\u5DF4\u6D1B\u514B\u300A\u5723\u6BCD\u5347\u5929\u300B\u53E4\u5178\u540D\u753B",
        "The Assumption of the Virgin",
        "\u795E\u5723\u5347\u5929",
        "A dramatic Baroque religious classical oil painting in the style of Titian and Peter Paul Rubens' The Assumption of the Virgin, starring the specific pet from Photo 1. Somatic posture: The pet is ascending gracefully toward heaven on glowing golden clouds, body weightlessly buoyed upwards with limbs elegantly outstretched, wrapped in billowing crimson and white silk robes. Both furry paws are raised outward in gentle divine blessing. Contextual facial acting: The pet radiates transcendent serenity and sublime bliss\u2014reverent eyes lifted upward toward the celestial golden light, mouth relaxed in peaceful divine beatitude, ears framed by a glowing heavenly halo with radiant sunbeams. Choirs of fluttering cherubs surround it in misty golden skies, while mortal disciples gaze up from below in awe. Rich Venetian red and gold palette, authentic craquelure oil painting glaze.",
        "models/assumption_of_mary.png",
        "human body on pet, human head on pet, pet with human arms, pet with human fingers, human hands, human fingers, human wrists, human skin, human elbows, five fingers, plain background, studio backdrop, pet face distorted, halo piercing skull, deformed paws"
      ),
      makeItem(
        "caribbean_pirate",
        "\u52A0\u52D2\u6BD4\u6D77\u76D7\u8239\u957F",
        "Pirates of the Caribbean",
        "\u4F20\u5947\u6D77\u76D7",
        "A detailed cinematic film still of the specific pet from Photo 1 as a legendary pirate captain of the high seas. Somatic posture: The pet stands resolutely on the quarterdeck of a wooden galleon, body tilted into the sea wind with front paws gripping the weathered wooden ship railing. Contextual facial acting: An iconic roguish smirk\u2014one eye slightly narrowed with seasoned cunning, piercing confident gaze locking onto the viewer, whiskers bristled defiantly against the salty spray, projecting unmistakable pirate bravado and maritime leadership. Wearing an ornate weathered crimson-red leather tricorne hat with gold embroidery and a skull emblem, draped in a rich velvet captain coat. Background features stormy ocean waves, distant tall ships, and a moody golden hour sunset sky with theatrical rim lighting. Pure animal anatomy, cinematic depth of field.",
        "models/caribbean_pirate.png",
        "human hands, human arms, human fingers, human thumb, opposable thumb, human wrist, human skin, person holding camera, taking selfie, text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, human body, human face, extra limbs"
      ),
      makeItem(
        "secret_agent",
        "\u5BA0\u7269\u7B28\u8D3C/\u571F\u5473\u7279\u5DE5",
        "The Secret Agent",
        "\u571F\u5473\u7279\u5DE5",
        "A hilarious viral 0.5x ultra-wide fisheye snapshot of the specific pet from Photo 1 caught in a comical stealth mission. Somatic posture: Close-up low-angle framing, head pulled back slightly into its shoulders in guilty surprise, with body crouched behind a shadowy living room sofa. Contextual facial acting: An unforgettable expression of comical shock\u2014huge round innocent eyes wide open in startled disbelief as if caught red-handed, dilated pupils, and whiskers splayed forward with tension. A snug black ribbed knit balaclava hood is stretched securely over its head, snugly framing its cheeks and snout while exposing its expressive eyes and pink nose. Genuine iPhone snapshot flash lighting texture, real glistening fur, comedic suspense mood.",
        "models/secret_agent.png",
        "human hands, human fingers, human arms, human thumb, human body, person taking picture, holding phone, smartphone in hand, studio lighting, 3D render, CGI, digital illustration, cartoon, anime, horror, deformed snout, deformed eyes"
      )
    ];
    CELEBRATION_TEMPLATES = [
      makeItem(
        "christmas",
        "\u82F1\u4F26\u5723\u8BDE\u793C\u76D2\u4E3B\u9898\u5199\u771F",
        "British Christmas Velvet Box",
        "\u5723\u8BDE\u76DB\u5178",
        "A warm, festive British Christmas fine-art photographic portrait starring the specific pet from Photo 1. Somatic posture: The pet is nestled luxuriously inside a vintage burgundy velvet Christmas gift box, body comfortably sinking into plush silk cushions, with its front furry paws resting casually over the ornate gold filigree rim of the box. Contextual facial acting: The pet radiates cozy, aristocratic contentment\u2014soft half-lidded almond eyes glowing with warmth from the nearby hearth, relaxed gentle expression, ears softly resting under a festive dark green knit scarf with a golden ribbon bow. Surrounded by twinkling fairy lights, decorated evergreen boughs with red baubles, and gentle falling snow dust. Rich warm cinematic bokeh, magazine editorial luxury.",
        "models/christmas.png",
        "text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, extra limbs"
      ),
      makeItem(
        "halloween",
        "\u4E07\u5723\u8282\u5357\u74DC\u706F\u9A6C\u8F66\u5947\u5883",
        "Halloween Magical Pumpkin Carriage",
        "\u4E07\u5723\u5947\u5883",
        "An enchanting Halloween fairy-tale photographic portrait featuring the specific pet from Photo 1. Somatic posture: The adorable pet peeks inquisitively out from the hollow window of an enormous glowing Jack-o'-lantern carriage, with one curious paw resting lightly on the carved pumpkin sill. Contextual facial acting: Wide, glistening eyes full of childlike wonder and playful mischief reflecting the amber candle glow, head tilted inquisitively by a few degrees, whiskers perked with curiosity. Wearing a tiny vintage velvet pointed witch hat with a crescent moon clasp and a delicate frilled ruff collar. Magical twilight enchanted forest background with soft violet mist, floating translucent ghost lanterns, and warm firefly sparkles. Masterpiece storybook cinematic lighting.",
        "models/halloween.png",
        "deformed face, scary horror, text, watermark, extra limbs, human face, cartoon illustration, anime, noise"
      ),
      makeItem(
        "birthday_vip",
        "VIP\u4E13\u5C5E\u751F\u65E5\u76DB\u5178\u5199\u771F",
        "VIP Birthday Gala & Cake",
        "\u751F\u65E5\u4E13\u5C5E",
        "An intimate, heartwarming VIP pet birthday celebration photograph starring the specific pet from Photo 1. Somatic posture: The pet sits dutifully on a warm polished hardwood floor, front paws tucked neatly together in patient anticipation before a fine porcelain floral plate. Contextual facial acting: Pure, unadulterated joy and longing\u2014eyes sparkling with eager excitement locked onto a gourmet meat birthday cake topped with plump fresh shrimp, tongue tip subtly peeking out in lip-licking anticipation, whiskers twitching with delight. Wearing a playful polka-dot cone party hat with a fluffy pom-pom and a festive satin collar. Background glows with warm golden fairy string lights and soft out-of-focus pastel balloons. Photorealistic cozy celebration atmosphere.",
        "models/birthday_vip.png",
        "text, watermark, subtitle, signature, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, extra fingers"
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
            id: "featured",
            nameZh: "\u7CBE\u9009\u9AD8\u5B9A\u6A21\u677F",
            nameEn: "Featured Templates",
            items: FINE_ART_TEMPLATES
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
            id: "featured",
            nameZh: "\u7CBE\u9009\u9AD8\u5B9A\u6A21\u677F",
            nameEn: "Featured Templates",
            items: CORPORATE_TEMPLATES
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
            id: "featured",
            nameZh: "\u7CBE\u9009\u9AD8\u5B9A\u6A21\u677F",
            nameEn: "Featured Templates",
            items: COSPLAY_TEMPLATES
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
            id: "featured",
            nameZh: "\u7CBE\u9009\u9AD8\u5B9A\u6A21\u677F",
            nameEn: "Featured Templates",
            items: CELEBRATION_TEMPLATES
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
        prompt: FINE_ART_TEMPLATES[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
        variants: cascadingToLegacyVariants("fine_art")
      },
      corporate: {
        key: "corporate",
        name: "Corporate",
        subtitle: "Silicon Valley & Wall Street 9-to-5",
        prompt: CORPORATE_TEMPLATES[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
        variants: cascadingToLegacyVariants("corporate")
      },
      cosplay: {
        key: "cosplay",
        name: "Cosplay",
        subtitle: "Historical Royalty & Iconic Legends",
        prompt: COSPLAY_TEMPLATES[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
        variants: cascadingToLegacyVariants("cosplay")
      },
      celebration: {
        key: "celebration",
        name: "Celebration",
        subtitle: "Holiday Galas & VIP Milestones",
        prompt: CELEBRATION_TEMPLATES[0].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
        variants: cascadingToLegacyVariants("celebration")
      },
      // Legacy aliases mapped seamlessly
      gentle: {
        key: "gentle",
        name: "Fine Art (Legacy)",
        subtitle: "Classical Art Masterpieces",
        prompt: FINE_ART_TEMPLATES[1].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
        variants: cascadingToLegacyVariants("fine_art")
      },
      detective: {
        key: "detective",
        name: "Corporate (Legacy)",
        subtitle: "Executive & Aviator",
        prompt: CORPORATE_TEMPLATES[1].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
        variants: cascadingToLegacyVariants("corporate")
      },
      street: {
        key: "street",
        name: "Cosplay (Legacy)",
        subtitle: "Cyber & Superhero",
        prompt: COSPLAY_TEMPLATES[1].fullPrompt,
        fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
        variants: cascadingToLegacyVariants("cosplay")
      },
      warm: {
        key: "warm",
        name: "Celebration (Legacy)",
        subtitle: "Festive & Winter Holiday",
        prompt: CELEBRATION_TEMPLATES[1].fullPrompt,
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
var import_hono5 = __toESM(require_cjs());

// src/middleware/cors.ts
var isOriginAllowed = (origin, env) => {
  if (!origin) {
    return true;
  }
  if (env?.CORS_ORIGIN) {
    if (env.CORS_ORIGIN === "*") return true;
    if (env.CORS_ORIGIN === origin) return true;
  }
  if (origin === "https://vivibon-cover.pages.dev") return true;
  if (/^https:\/\/[a-zA-Z0-9-]+\.vivibon-cover\.pages\.dev$/.test(origin)) return true;
  if (origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000" || origin === "http://localhost:8787" || origin === "http://127.0.0.1:8787") {
    return true;
  }
  if (env?.ENVIRONMENT === "test" && (origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("vivibon.com"))) {
    return true;
  }
  return false;
};
var corsMiddleware = () => {
  return async (c, next) => {
    const origin = c.req.header("origin");
    const allowed = isOriginAllowed(origin, c.env);
    if (c.req.method === "OPTIONS") {
      if (origin && !allowed) {
        return c.body(null, 403);
      }
      c.header("Access-Control-Allow-Origin", origin || "*");
      c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-request-timestamp, x-request-nonce, x-admin-bypass-key, x-test-bypass");
      c.header("Access-Control-Max-Age", "86400");
      return c.body(null, 204);
    }
    if (origin) {
      if (!allowed) {
        return c.json({
          success: false,
          errorCode: "FORBIDDEN_ORIGIN",
          message: "Cross-origin request blocked by ViviBon security policy."
        }, 403);
      }
      c.header("Access-Control-Allow-Origin", origin);
    } else {
      c.header("Access-Control-Allow-Origin", c.env?.CORS_ORIGIN || "*");
    }
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-request-timestamp, x-request-nonce, x-admin-bypass-key, x-test-bypass");
    c.header("Access-Control-Expose-Headers", "Server-Timing, X-Model-Provider, X-Model-Latency-Ms, X-Worker-Total-Ms");
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
var DEFAULT_IP_HOURLY_CAP = 10;
var DEFAULT_IP_DAILY_CAP = 20;
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
    const reqTimestampStr = c.req.header("x-request-timestamp");
    const reqNonce = c.req.header("x-request-nonce");
    if (reqTimestampStr) {
      const reqTimestamp = parseInt(reqTimestampStr, 10);
      if (isNaN(reqTimestamp) || Math.abs(now.getTime() - reqTimestamp) > 6e4) {
        const errorResp = {
          success: false,
          errorCode: "REQUEST_EXPIRED",
          message: "Request timestamp is invalid or expired. Please refresh the page and try again."
        };
        return c.json(errorResp, 403);
      }
    }
    if (reqNonce) {
      if (reqNonce.length < 8 || reqNonce.length > 64) {
        const errorResp = {
          success: false,
          errorCode: "INVALID_NONCE",
          message: "Invalid request nonce token."
        };
        return c.json(errorResp, 403);
      }
      const nonceKey = `replay:nonce:${reqNonce}`;
      const seen = await kv.get(nonceKey);
      if (seen) {
        const errorResp = {
          success: false,
          errorCode: "REPLAY_ATTACK_DETECTED",
          message: "Replay attack blocked. Each request token can only be used once."
        };
        return c.json(errorResp, 403);
      }
      await kv.put(nonceKey, "1", { expirationTtl: 120 });
    }
    const isAdminBypass = Boolean(
      c.env?.ADMIN_BYPASS_KEY && c.req.header("x-admin-bypass-key") === c.env.ADMIN_BYPASS_KEY
    );
    const isTestBypass = c.env?.ENVIRONMENT !== "production" && c.req.header("x-test-bypass") === "1";
    const shouldBypass = isAdminBypass || isTestBypass;
    if (!shouldBypass) {
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
    const isAdminBypass = Boolean(
      c.env?.ADMIN_BYPASS_KEY && c.req.header("x-admin-bypass-key") === c.env.ADMIN_BYPASS_KEY
    );
    const isTestBypass = c.env?.ENVIRONMENT !== "production" && c.req.header("x-test-bypass") === "1";
    if (isAdminBypass || isTestBypass) {
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

// src/routes/ping.ts
var import_hono2 = __toESM(require_cjs(), 1);
var pingRouter = new import_hono2.Hono();
pingRouter.get("/", (c) => {
  c.header("Cache-Control", "no-store, no-cache, must-revalidate");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  return c.body(null, 204);
});
pingRouter.all("/", (c) => {
  c.header("Cache-Control", "no-store, no-cache, must-revalidate");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  return c.body(null, 204);
});

// src/routes/styles.ts
var import_hono3 = __toESM(require_cjs(), 1);
init_styles();
var stylesRoute = new import_hono3.Hono();
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
var import_hono4 = __toESM(require_cjs(), 1);

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
  isDefaultSample: import_zod.z.boolean().default(true),
  referenceImageUrl: import_zod.z.string().url().optional()
});

// src/services/falService.ts
init_styles();

// src/services/alertService.ts
function classifyFailureReason(rawMessage = "", timeoutMs) {
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
    let detectedSec = timeoutMs && timeoutMs > 0 ? Math.round(timeoutMs / 1e3) : null;
    if (!detectedSec) {
      const msMatch = rawMessage.match(/(\d+)\s*ms/i);
      if (msMatch) {
        detectedSec = Math.round(parseInt(msMatch[1], 10) / 1e3);
      } else {
        const sMatch = rawMessage.match(/(\d+)\s*s(?:ec)?(?:onds?)?/i);
        if (sMatch) {
          detectedSec = parseInt(sMatch[1], 10);
        }
      }
    }
    const secLabel = detectedSec ? `${detectedSec}s \u622A\u65AD` : "\u786C\u9608\u503C\u7194\u65AD";
    const secDesc = detectedSec ? `\u8D85\u8FC7 ${detectedSec} \u79D2\u786C\u9608\u503C` : "\u8D85\u8FC7\u7CFB\u7EDF\u8BBE\u5B9A\u7684\u786C\u9608\u503C";
    return {
      category: "TIMEOUT_EXCEEDED",
      labelZh: `\u7F51\u7EDC\u8BF7\u6C42\u8D85\u65F6 (${secLabel})`,
      tag: "[TIMEOUT_EXCEEDED]",
      description: `\u5927\u6A21\u578B\u670D\u52A1\u5546\u63A8\u7406\u8017\u65F6${secDesc}\uFF0C\u7CFB\u7EDF\u5DF2\u4E3B\u52A8\u7194\u65AD\u5E76\u89E6\u53D1\u4FDD\u62A4\u3002`
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
    const classification = classifyFailureReason(context.errorMessage || "", context.timeoutMs);
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
      const isTimeout = err instanceof Error && (err.name === "AbortError" || err.message.includes("aborted") || err.message.includes("timeout"));
      if (isTimeout || attempt >= maxRetries) {
        throw err;
      }
      attempt++;
      const maxBackoff = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
      const jitterDelay = Math.floor(Math.random() * maxBackoff);
      await new Promise((resolve) => setTimeout(resolve, jitterDelay));
    }
  }
}
var defaultFalRunner = async (prompt, imageBase64, apiKey, signal, negativePrompt = NEGATIVE_PROMPT, providerName, referenceImageUrl, options) => {
  if (!imageBase64) {
    throw new Error("Pure Image-to-Image required. Missing pet photo input.");
  }
  if (providerName === "302ai") {
    const endpoint2 = options?.endpoint || "https://api.302.ai/v1/chat/completions";
    const model = options?.modelId || "gemini-3.1-flash-lite-image";
    let formattedImage = imageBase64;
    if (!formattedImage.startsWith("http://") && !formattedImage.startsWith("https://") && !formattedImage.startsWith("data:")) {
      formattedImage = `data:image/jpeg;base64,${formattedImage}`;
    }
    const contentList = [
      { type: "text", text: prompt },
      { type: "image_url", image_url: { url: formattedImage } }
    ];
    if (referenceImageUrl) {
      let resolvedRef = referenceImageUrl;
      if (!resolvedRef.startsWith("http") && !resolvedRef.startsWith("data:")) {
        resolvedRef = `https://vivibon-cover.pages.dev/${resolvedRef.replace(/^\/+/, "")}`;
      }
      contentList.push({
        type: "image_url",
        image_url: { url: resolvedRef }
      });
    }
    const payload = {
      model,
      messages: [
        {
          role: "user",
          content: contentList
        }
      ]
    };
    const t302Start = Date.now();
    const response2 = await fetch(endpoint2, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal
    });
    const t302TTFBMs = Date.now() - t302Start;
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`302.ai upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const rawText = await response2.text().catch(() => "");
    const t302TotalMs = Date.now() - t302Start;
    const t302TransferMs = t302TotalMs - t302TTFBMs;
    console.log(`[302.AI Network Telemetry] TTFB (GPU Compute + Proxy Queue): ${t302TTFBMs}ms, Body Transfer: ${t302TransferMs}ms, Total: ${t302TotalMs}ms`);
    let data2;
    try {
      data2 = JSON.parse(rawText);
    } catch {
      const firstCloseBrace = rawText.indexOf("}}");
      if (firstCloseBrace !== -1) {
        try {
          data2 = JSON.parse(rawText.slice(0, firstCloseBrace + 2));
        } catch {
          throw new Error(`Invalid JSON returned from 302.ai Gemini: ${rawText.slice(0, 200)}`);
        }
      } else {
        throw new Error(`Failed to parse 302.ai response: ${rawText.slice(0, 200)}`);
      }
    }
    let imageUrl2;
    if (data2.choices && data2.choices[0]?.message?.content) {
      const content = data2.choices[0].message.content;
      const mdMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/i);
      if (mdMatch) {
        imageUrl2 = mdMatch[1];
      } else {
        const urlMatch = content.match(/(https?:\/\/[^\s\)\"\'\<\>]+)/i);
        if (urlMatch) {
          imageUrl2 = urlMatch[1];
        } else if (content.startsWith("data:image/")) {
          imageUrl2 = content.trim();
        }
      }
    }
    if (!imageUrl2 && data2.data && data2.data[0]) {
      const item = data2.data[0];
      if (item.url) {
        imageUrl2 = item.url;
      } else if (item.b64_json) {
        imageUrl2 = item.b64_json.startsWith("data:") ? item.b64_json : `data:image/jpeg;base64,${item.b64_json}`;
      }
    }
    if (!imageUrl2) {
      throw new Error("No image returned from 302.ai Gemini");
    }
    if (imageUrl2.startsWith("http://") || imageUrl2.startsWith("https://")) {
      try {
        const relayRes = await fetch(imageUrl2, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          signal
        });
        if (relayRes.ok) {
          const buf = await relayRes.arrayBuffer();
          if (buf.byteLength >= 15e3) {
            const bytes = new Uint8Array(buf);
            const CHUNK_SZ = 32768;
            const chunks = [];
            for (let i = 0; i < bytes.length; i += CHUNK_SZ) {
              chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SZ)));
            }
            const b64 = btoa(chunks.join(""));
            const rawType = relayRes.headers.get("content-type") || "image/jpeg";
            const cleanType = rawType.split(";")[0].trim();
            imageUrl2 = `data:${cleanType};base64,${b64}`;
          } else {
            console.warn(`[302.ai Edge Inlining Warning]: Image byte length abnormally small (${buf.byteLength} bytes)`);
          }
        }
      } catch (relayErr) {
        console.warn("[302.ai Edge Inlining Warning]: Failed to inline remote image:", relayErr);
      }
    }
    return {
      jobId: `gemini_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  if (providerName === "segmind") {
    const endpoint2 = options?.endpoint || "https://api.segmind.com/v1/sdxl-img2img";
    const cleanBase64 = imageBase64.includes("base64,") ? imageBase64.split("base64,")[1] : imageBase64;
    const payload = {
      image: cleanBase64,
      prompt,
      negative_prompt: negativePrompt || "ugly, deformed, disfigured, blurry, low quality, bad anatomy, mutated",
      samples: 1,
      scheduler: "EulerDiscreteScheduler",
      num_inference_steps: 25,
      guidance_scale: 7.5,
      strength: 0.65,
      base64: true
    };
    const response2 = await fetch(endpoint2, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal
    });
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`Segmind upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const contentType = response2.headers.get("content-type") || "";
    let imageUrl2 = "";
    if (contentType.includes("application/json")) {
      const data2 = await response2.json();
      if (data2.image) {
        imageUrl2 = data2.image.startsWith("data:") ? data2.image : `data:image/jpeg;base64,${data2.image}`;
      } else if (data2.data) {
        imageUrl2 = data2.data.startsWith("data:") ? data2.data : `data:image/jpeg;base64,${data2.data}`;
      }
    } else {
      const arrBuffer = await response2.arrayBuffer();
      const b64 = Buffer.from(arrBuffer).toString("base64");
      imageUrl2 = `data:image/jpeg;base64,${b64}`;
    }
    if (!imageUrl2) {
      throw new Error("No image returned from Segmind");
    }
    return {
      jobId: `segmind_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  if (providerName === "volcengine") {
    const endpoint2 = options?.endpoint || "https://ark.cn-beijing.volces.com/api/v3/images/generations";
    const model = options?.modelId || "ep-20260910130528-l8thd";
    let formattedImage = imageBase64;
    if (!formattedImage.startsWith("http://") && !formattedImage.startsWith("https://") && !formattedImage.startsWith("data:")) {
      formattedImage = `data:image/jpeg;base64,${formattedImage}`;
    }
    const payload = {
      model,
      prompt,
      image: formattedImage,
      size: options?.size || "2K",
      // Seedream 5.0 Lite requires at least 3,686,400 pixels ("2K" preset)
      response_format: "url"
    };
    const response2 = await fetch(endpoint2, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal
    });
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`Volcengine upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const data2 = await response2.json();
    const item = data2.data?.[0];
    let imageUrl2 = item?.url;
    if (!imageUrl2 && item?.b64_json) {
      imageUrl2 = `data:image/png;base64,${item.b64_json}`;
    }
    if (!imageUrl2) {
      throw new Error("No image returned from Volcengine Ark");
    }
    return {
      jobId: `ark_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  if (providerName === "wokey") {
    const endpoint2 = "https://api.wokey.ai/v1/images/edits";
    const cleanBase64 = imageBase64.includes("base64,") ? imageBase64.split("base64,")[1] : imageBase64;
    let effectivePrompt = prompt;
    let imageArray = [cleanBase64];
    if (referenceImageUrl) {
      try {
        if (referenceImageUrl.startsWith("data:")) {
          const cleanRef = referenceImageUrl.includes("base64,") ? referenceImageUrl.split("base64,")[1] : referenceImageUrl;
          imageArray.push(cleanRef);
        } else {
          let fetchUrl = referenceImageUrl;
          if (!fetchUrl.startsWith("http://") && !fetchUrl.startsWith("https://")) {
            fetchUrl = `https://vivibon-cover.pages.dev/${fetchUrl.replace(/^\/+/, "")}`;
          }
          const refRes = await fetch(fetchUrl, { signal });
          if (refRes.ok) {
            const arrBuffer = await refRes.arrayBuffer();
            const base64String = Buffer.from(arrBuffer).toString("base64");
            imageArray.push(base64String);
          } else {
            console.warn("[Wokey] Failed to fetch reference image:", refRes.status);
          }
        }
      } catch (err) {
        console.warn("[Wokey] Error fetching reference image:", err);
      }
    }
    if (imageArray.length > 1) {
      const prefix = "[Photo 1: user pet face identity. Photo 2: outfit, pose and scene reference. Strictly preserve Photo 1 pet face, eyes, fur and breed exactly.] ";
      const maxRemaining = 1e3 - prefix.length;
      if (effectivePrompt.length > maxRemaining) {
        const trimmed = effectivePrompt.slice(0, maxRemaining);
        const lastPunct = Math.max(trimmed.lastIndexOf("."), trimmed.lastIndexOf("\uFF0C"), trimmed.lastIndexOf("\u3002"), trimmed.lastIndexOf(","));
        effectivePrompt = lastPunct > 200 ? trimmed.slice(0, lastPunct + 1) : trimmed;
      }
      effectivePrompt = `${prefix}${effectivePrompt}`;
    } else if (effectivePrompt.length > 1e3) {
      const trimmed = effectivePrompt.slice(0, 1e3);
      const lastPunct = Math.max(trimmed.lastIndexOf("."), trimmed.lastIndexOf("\uFF0C"), trimmed.lastIndexOf("\u3002"), trimmed.lastIndexOf(","));
      effectivePrompt = lastPunct > 500 ? trimmed.slice(0, lastPunct + 1) : trimmed;
    }
    const response2 = await fetch(endpoint2, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: effectivePrompt,
        image: imageArray
      }),
      signal
    });
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`Wokey upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const data2 = await response2.json();
    const item = data2.data?.[0];
    let imageUrl2 = item?.url;
    if (!imageUrl2 && item?.b64_json) {
      imageUrl2 = `data:image/png;base64,${item.b64_json}`;
    }
    if (!imageUrl2) {
      throw new Error("No image returned from Wokey");
    }
    return {
      jobId: `wk_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  if (providerName === "siliconflow" || !providerName && apiKey.startsWith("sk-")) {
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
        num_inference_steps: 20,
        // 20 步黄金标准去噪：极致微米级毛发与面部五官保真
        guidance_scale: 3.5
        // 3.5 黄金引导值：紧紧锁定原图花纹分区与原生眼眸瞳色，杜绝文本大词先验污染（防杂色虎斑与变色）
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
  constructor(runner = defaultFalRunner, timeoutMs = 6e4) {
    this.runner = runner;
    this.timeoutMs = timeoutMs;
  }
  /**
   * Execute Haute Couture Pet Generation with:
   * 1. 30s hard timeout
   * 2. Full jitter exponential backoff retry
   * 3. Primary -> Secondary AI multi-rail failover
   * 4. Enterprise WeChat Webhook alerting on failure/arrears
   * 5. NC-4 graceful degradation to WebP sample library
   */
  async generatePoster(styleKey, petName, imageBase64, primaryApiKey, variantIndex, subId, itemId, alertContext, webhookUrl, secondaryApiKey, rails, referenceImageUrl) {
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
    let resolvedRefUrl = referenceImageUrl;
    if (resolvedRefUrl && (resolvedRefUrl.includes("localhost") || resolvedRefUrl.includes("127.0.0.1"))) {
      try {
        const pathname = new URL(resolvedRefUrl).pathname.replace(/^\/+/, "");
        resolvedRefUrl = `https://vivibon-cover.pages.dev/${pathname}`;
      } catch (_) {
        resolvedRefUrl = void 0;
      }
    }
    const isUserUpload = Boolean(imageBase64 && imageBase64 !== DEFAULT_MILO_BASE64);
    const effectiveReferenceUrl = resolvedRefUrl || (!isUserUpload && variant.sampleImageUrl ? variant.sampleImageUrl.startsWith("http") ? variant.sampleImageUrl : `https://vivibon-cover.pages.dev/${variant.sampleImageUrl.replace(/^\/+/, "")}` : void 0);
    if (rails && rails.length > 0) {
      const activeRails = rails.filter((r) => Boolean(r.apiKey));
      if (activeRails.length === 0) {
        return {
          ...baseResult,
          jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
          imageUrl: fallbackImage,
          latencyMs: Date.now() - start,
          isFallback: true,
          debugReason: "NO_API_KEY_CONFIGURED"
        };
      }
      const effectiveImageInput2 = imageBase64 || DEFAULT_MILO_BASE64;
      const previousErrors = [];
      for (let i = 0; i < activeRails.length; i++) {
        const rail = activeRails[i];
        const displayName = rail.provider === "segmind" ? "Segmind (SDXL Img2Img)" : rail.provider === "302ai" ? "302.AI (Gemini 3.1 Flash Lite)" : rail.provider === "volcengine" ? "Volcengine Ark (Seedream 5.0 Lite)" : rail.provider === "wokey" ? "Wokey" : rail.provider === "siliconflow" ? "SiliconFlow" : "Fal.ai";
        const timeoutLimit = rail.timeoutMs || 6e4;
        const runRailAttempt = async () => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeoutLimit);
          try {
            const res = await this.runner(
              assembled.fullPrompt,
              effectiveImageInput2,
              rail.apiKey,
              controller.signal,
              assembled.negativePrompt,
              rail.provider,
              effectiveReferenceUrl,
              {
                modelId: rail.modelId,
                endpoint: rail.endpoint
              }
            );
            clearTimeout(timeoutId);
            return res;
          } catch (err) {
            clearTimeout(timeoutId);
            throw err;
          }
        };
        try {
          const result = await executeWithJitterRetry(() => runRailAttempt(), 1);
          if (i > 0) {
            alertService.sendWeChatAlert(
              webhookUrl,
              `\u4ECE\u6A21\u578B\u63A5\u7BA1\u751F\u56FE\u6210\u529F`,
              {
                ...alertContext,
                primaryProvider: activeRails[0].provider,
                secondaryProvider: displayName,
                errorMessage: `Primary failed with: ${previousErrors[0] || "N/A"}`,
                durationMs: Date.now() - start,
                timeoutMs: activeRails[0]?.timeoutMs
              },
              "INFO"
            ).catch(() => {
            });
          }
          return {
            ...baseResult,
            jobId: result.jobId,
            imageUrl: result.imageUrl,
            latencyMs: Date.now() - start,
            isFallback: false,
            failoverTriggered: i > 0,
            activeProvider: displayName
          };
        } catch (err) {
          const errorObj = err instanceof Error ? err : new Error(String(err));
          previousErrors.push(`${displayName}: [${errorObj.message}]`);
          console.warn(`[FalService] Rail ${i} (${displayName}) failed:`, errorObj.message);
          if (i < activeRails.length - 1 && !errorObj.message.includes("Missing pet photo input")) {
            alertService.sendWeChatAlert(
              webhookUrl,
              `\u4E3B\u6A21\u578B\u751F\u56FE\u5931\u8D25 \xB7 \u51C6\u5907\u6545\u969C\u8F6C\u79FB`,
              {
                ...alertContext,
                primaryProvider: displayName,
                secondaryProvider: activeRails[i + 1].provider,
                errorMessage: errorObj.message,
                durationMs: Date.now() - start,
                timeoutMs: rail.timeoutMs
              },
              "WARNING"
            ).catch(() => {
            });
          }
        }
      }
      if (webhookUrl && previousErrors.length > 0) {
        alertService.sendWeChatAlert(
          webhookUrl,
          `\u4E3B\u5907\u6A21\u578B\u5747\u8C03\u7528\u5931\u8D25 \xB7 \u89E6\u53D1\u9759\u6001\u6837\u7247\u7EC8\u6781\u964D\u7EA7`,
          {
            ...alertContext,
            primaryProvider: activeRails[0]?.provider,
            secondaryProvider: activeRails[1]?.provider || "None",
            errorMessage: previousErrors.join(", "),
            durationMs: Date.now() - start,
            timeoutMs: activeRails[0]?.timeoutMs
          },
          "CRITICAL"
        ).catch(() => {
        });
      }
      return {
        ...baseResult,
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: previousErrors.join("; ")
      };
    }
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
          assembled.negativePrompt,
          void 0,
          effectiveReferenceUrl
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
              durationMs: Date.now() - start,
              timeoutMs: this.timeoutMs
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
            durationMs: Date.now() - start,
            timeoutMs: this.timeoutMs
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
              durationMs: Date.now() - start,
              timeoutMs: this.timeoutMs
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
  const route = new import_hono4.Hono();
  route.post("/api/generate", async (c) => {
    const requestReceivedAt = Date.now();
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
    const { imageBase64, variantIndex, subId, referenceImageUrl } = parseResult.data;
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
    const rails = [];
    const primaryPref = c.env?.PRIMARY_AI_PROVIDER || "302ai";
    const arkKey = c.env?.ARK_API_KEY || c.env?.VOLCENGINE_API_KEY;
    const volcengineModelId = c.env?.VOLCENGINE_MODEL_ID || "ep-20260910130528-l8thd";
    const volcengineEndpoint = c.env?.VOLCENGINE_ENDPOINT;
    const add302ai = () => {
      if (c.env?.AI302_API_KEY) {
        rails.push({
          provider: "302ai",
          apiKey: c.env.AI302_API_KEY,
          timeoutMs: 3e4,
          modelId: c.env?.AI302_MODEL_ID || "gemini-3.1-flash-lite-image",
          endpoint: c.env?.AI302_ENDPOINT || "https://api.302.ai/v1/chat/completions"
        });
      }
    };
    const addVolcengine = () => {
      if (arkKey) {
        rails.push({
          provider: "volcengine",
          apiKey: arkKey,
          timeoutMs: 6e4,
          modelId: volcengineModelId,
          endpoint: volcengineEndpoint
        });
      }
    };
    const addWokey = () => {
      if (c.env?.WOKEY_API_KEY) {
        rails.push({ provider: "wokey", apiKey: c.env.WOKEY_API_KEY, timeoutMs: 75e3 });
      }
    };
    const addSiliconflow = () => {
      if (c.env?.SILICONFLOW_KEY) {
        rails.push({ provider: "siliconflow", apiKey: c.env.SILICONFLOW_KEY, timeoutMs: 6e4 });
      }
    };
    const addFal = () => {
      if (c.env?.FAL_KEY) {
        rails.push({ provider: "fal", apiKey: c.env.FAL_KEY, timeoutMs: 6e4 });
      }
    };
    const addSegmind = () => {
      if (c.env?.SEGMIND_API_KEY) {
        rails.push({ provider: "segmind", apiKey: c.env.SEGMIND_API_KEY, timeoutMs: 25e3 });
      }
    };
    if (primaryPref === "segmind") {
      addSegmind();
      addVolcengine();
      add302ai();
      addSiliconflow();
      addFal();
    } else if (primaryPref === "302ai") {
      add302ai();
      addVolcengine();
      addSegmind();
      addSiliconflow();
      addWokey();
      addFal();
    } else if (primaryPref === "volcengine") {
      addVolcengine();
      addSegmind();
      add302ai();
      addSiliconflow();
      addFal();
    } else if (primaryPref === "wokey") {
      addWokey();
      addSegmind();
      add302ai();
      addSiliconflow();
      addVolcengine();
      addFal();
    } else if (primaryPref === "siliconflow") {
      addSiliconflow();
      addSegmind();
      add302ai();
      addVolcengine();
      addWokey();
      addFal();
    } else if (primaryPref === "fal") {
      addFal();
      addSegmind();
      add302ai();
      addSiliconflow();
      addVolcengine();
      addWokey();
    } else {
      addSegmind();
      addVolcengine();
      add302ai();
      addSiliconflow();
      addWokey();
      addFal();
    }
    const primaryKey = rails[0]?.apiKey || c.env?.AI302_API_KEY || arkKey || c.env?.SILICONFLOW_KEY || c.env?.WOKEY_API_KEY || c.env?.FAL_KEY;
    const secondaryKey = rails[1]?.apiKey || c.env?.SILICONFLOW_KEY || c.env?.WOKEY_API_KEY || c.env?.FAL_KEY;
    const alertCtx = {
      environment: c.env?.ENVIRONMENT || "production",
      traceId: c.get("traceId"),
      clientIp: c.get("clientIp"),
      petName: safePetName,
      styleKey: effectiveStyleKey,
      templateId: effectiveItemId
    };
    const upstreamStart = Date.now();
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
      secondaryKey,
      rails,
      referenceImageUrl
    );
    const upstreamMs = Date.now() - upstreamStart;
    const workerPrepMs = upstreamStart - requestReceivedAt;
    const totalWorkerMs = Date.now() - requestReceivedAt;
    c.header("Server-Timing", `prep;dur=${workerPrepMs};desc="Worker Prep", upstream;dur=${upstreamMs};desc="AI Provider Inference", total;dur=${totalWorkerMs};desc="Total Edge Execution"`);
    c.header("X-Model-Provider", result.activeProvider || "Unknown");
    c.header("X-Model-Latency-Ms", String(upstreamMs));
    c.header("X-Worker-Total-Ms", String(totalWorkerMs));
    const response = {
      success: true,
      data: {
        jobId: result.jobId,
        imageUrl: result.imageUrl,
        styleKey: result.styleKey,
        petName: result.petName,
        latencyMs: result.latencyMs,
        isFallback: result.isFallback,
        timings: {
          workerPrepMs,
          upstreamInferenceMs: upstreamMs,
          totalWorkerMs
        },
        ...result.activeProvider ? { activeProvider: result.activeProvider } : {},
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
var public_default = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>ViviBon Cover</title>

  <!-- Declarative TCP/TLS Pre-warming for 0-RTT Connection Reuse -->
  <link rel="preconnect" href="https://vivibon-cover-worker.zhoumiaoyin1.workers.dev" crossorigin />
  <link rel="dns-prefetch" href="https://vivibon-cover-worker.zhoumiaoyin1.workers.dev" />

  <!-- Instant Eager Preload for Initial Corporate Templates -->
  <link rel="preload" as="image" href="models/airline_captain.webp" type="image/webp" fetchpriority="high" />
  <link rel="preload" as="image" href="models/caffeine_pro.webp" type="image/webp" fetchpriority="high" />
  <link rel="preload" as="image" href="models/michelin_chef.webp" type="image/webp" fetchpriority="high" />

  <!-- High-fashion Atelier Monogram Favicon (0KB Network Request, Eliminates 404) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23111111'/><circle cx='16' cy='16' r='6' fill='%23FAF8F5'/></svg>" />

  <!-- Microsoft Clarity (100% Free, Unlimited Replay & Heatmaps) -->
  <script type="text/javascript">
    (function (c, l, a, r, i, t, y) {
      try {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      } catch (e) { console.warn('[Clarity] Init error:', e); }
    })(window, document, "clarity", "script", "yf41ikpys2");
  </script>

  <style>
    :root {
      --bg-page: #FAF8F5;
      --bg-card: #FFFFFF;
      --card-border: rgba(0, 0, 0, 0.07);
      --text-main: #111111;
      --text-subtle: #4A4A4A;
      --text-muted: #8E8E93;

      --focus-bg: #111111;
      --focus-text: #FFFFFF;
      --focus-border: #111111;
      --focus-shadow: rgba(0, 0, 0, 0.18);

      --unfocus-bg: rgba(255, 255, 255, 0.78);
      --unfocus-border: rgba(0, 0, 0, 0.07);
      --unfocus-text: #555555;

      --cta-bg: #111111;
      --cta-text: #FFFFFF;
      --cta-shadow: rgba(0, 0, 0, 0.25);

      --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
      --spring-tight: cubic-bezier(0.2, 0.8, 0.2, 1);
      --spring-fluid: cubic-bezier(0.32, 0.72, 0, 1);
      --spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @supports (color: color(display-p3 1 1 1)) {
      :root {
        --bg-page: color(display-p3 0.982 0.973 0.962);
        --bg-card: color(display-p3 1 1 1);
        --text-main: color(display-p3 0.067 0.067 0.067);
        --focus-bg: color(display-p3 0.067 0.067 0.067);
        --focus-text: color(display-p3 1 1 1);
        --focus-border: color(display-p3 0.067 0.067 0.067);
        --cta-bg: color(display-p3 0.067 0.067 0.067);
        --cta-text: color(display-p3 1 1 1);
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
    }

    html,
    body {
      height: 100%;
      height: 100dvh;
      overflow: hidden;
      overflow-x: hidden !important;
      margin: 0;
      padding: 0;
      background-color: var(--bg-page);
      -webkit-overflow-scrolling: auto;
    }

    body {
      background-color: var(--bg-page);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", system-ui, sans-serif;
      width: 100%;
    }

    .ambient-glow-top {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 380px;
      background: radial-gradient(120% 100% at 50% 0%, rgba(238, 233, 222, 0.65) 0%, rgba(250, 248, 245, 0) 100%);
      pointer-events: none;
      z-index: 0;
    }

    .app-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 440px;
      height: 100%;
      height: 100dvh;
      max-height: 100dvh;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: max(8px, env(safe-area-inset-top)) 16px max(14px, env(safe-area-inset-bottom)) 16px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Top Masthead */
    .header-bar {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      min-height: clamp(38px, 4.8vh, 48px);
      margin-bottom: clamp(2px, 0.6vh, 6px);
      padding: 2px 0;
      width: 100%;
    }

    .brand-masthead {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      user-select: none;
      gap: 2px;
      width: 100%;
    }

    .brand-title {
      font-size: clamp(17.5px, 4.6vw, 21.5px);
      font-weight: 700;
      letter-spacing: 0.24em;
      text-indent: 0.24em;
      color: var(--text-main);
      font-family: "Didot", "Bodoni MT", "Cinzel", "Times New Roman", serif;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .brand-subtitle-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
    }

    .brand-subtitle {
      font-size: clamp(7.5px, 1.9vw, 8.5px);
      font-weight: 600;
      letter-spacing: 0.22em;
      text-indent: 0.22em;
      color: var(--text-muted);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
      text-transform: uppercase;
    }

    .vernier-caliper-gauge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 92%;
      max-width: 320px;
      margin-top: 2px;
      opacity: 0.55;
      user-select: none;
    }

    .vernier-stamp {
      font-size: 7px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", monospace;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .vernier-ticks {
      flex: 1 1 auto;
      height: 5px;
      margin: 0 10px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.35) 0,
        rgba(0, 0, 0, 0.35) 1px,
        transparent 1px,
        transparent 5px
      );
      mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
    }

    .header-back-btn {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-main);
      transition: all 0.2s ease;
      z-index: 10;
    }

    .header-back-btn:active {
      transform: translateY(-50%) scale(0.92);
      opacity: 0.7;
    }

    /* Views */
    #view-entry {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex: 1 1 0;
      min-height: 0;
      overflow: hidden;
      justify-content: space-between;
    }

    /* 3D Perspective Stage */
    .deck-stage-container {
      position: relative;
      width: 100%;
      flex: 1 1 0;
      min-height: 0;
      perspective: 1200px;
      perspective-origin: 50% 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      overflow: visible;
    }

    .deck-cards-viewport {
      position: relative;
      width: min(calc((100dvh - 215px) * 0.75), 80vw, 340px);
      aspect-ratio: 3 / 4;
      max-height: 100%;
      transform-style: preserve-3d;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .deck-cover {
      position: absolute;
      inset: 0;
      border-radius: clamp(18px, 2.6vh, 24px);
      overflow: hidden;
      background: #0D0D0F;
      box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      will-change: transform, opacity, filter, border-radius, box-shadow;
      touch-action: none;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .deck-paper-sheen {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 4;
      opacity: 0;
      mix-blend-mode: overlay;
      transition: opacity 0.12s ease-out;
    }

    .deck-paper-shadow {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.12s ease-out;
    }

    .deck-paper-back {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: #FAF8F5;
      box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      z-index: 5;
      pointer-events: none;
    }

    .paper-back-watermark {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      opacity: 0.25;
      color: #111111;
      font-family: "Didot", "Bodoni MT", serif;
      letter-spacing: 0.24em;
    }

    .paper-back-logo {
      font-size: 14px;
      font-weight: 700;
    }

    .paper-back-spec {
      font-size: 7.5px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", monospace;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .deck-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: opacity 0.22s ease;
    }

    .deck-cover-overlay {
      position: absolute;
      inset: 0;
      padding: clamp(14px, 2vh, 18px) clamp(14px, 3.4vw, 18px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0.82) 100%);
      color: #FFFFFF;
      pointer-events: none;
      z-index: 2;
    }

    .deck-cover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .cover-brand-micro {
      font-size: clamp(10px, 2.4vw, 11px);
      font-weight: 700;
      letter-spacing: 0.24em;
      font-family: "Didot", "Bodoni MT", serif;
      text-transform: uppercase;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
    }

    .cover-issue-tag {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", monospace;
      text-transform: uppercase;
      opacity: 0.88;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 2.5px 8px;
      border-radius: 9999px;
      border: 0.5px solid rgba(255, 255, 255, 0.25);
    }

    .deck-cover-footer {
      display: flex;
      flex-direction: column;
      gap: 9px;
      width: 100%;
    }

    .cover-editorial-title {
      font-size: clamp(16px, 4.4vw, 20.5px);
      font-weight: 600;
      line-height: 1.16;
      letter-spacing: 0.02em;
      font-family: "Didot", "Bodoni MT", "Cinzel", serif;
      color: #FFFFFF;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
      margin: 0;
    }

    .cover-feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      align-self: flex-start;
      padding: clamp(6px, 1vh, 8px) clamp(12px, 3.2vw, 15px);
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: #111111;
      font-size: clamp(10px, 2.5vw, 11px);
      font-weight: 700;
      letter-spacing: 0.06em;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      text-transform: uppercase;
      pointer-events: auto;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
    }

    .cover-feature-pill:hover {
      background: #111111;
      color: #FFFFFF;
    }

    .cover-feature-pill:active {
      transform: scale(0.95);
    }

    /* Bottom Controls: Anchors, Scrubber, CTA */
    .bottom-controls {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 100%;
      gap: clamp(5px, 0.9vh, 8px);
      background: transparent;
      border: none;
      padding: 0;
    }

    .scrubber-anchors {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 6px;
    }

    .scrubber-anchor {
      font-size: clamp(9px, 2.3vw, 10.5px);
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      cursor: pointer;
      padding: 3px 6px;
      border-radius: 9999px;
      transition: all 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      user-select: none;
    }

    .scrubber-anchor.active {
      color: #111111;
      font-weight: 700;
      background: rgba(0, 0, 0, 0.06);
    }

    .scrubber-rail-wrap {
      position: relative;
      width: 100%;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .scrubber-track {
      position: relative;
      width: 100%;
      height: 18px;
      background: rgba(0, 0, 0, 0.04);
      border: 0.5px solid rgba(0, 0, 0, 0.09);
      border-radius: 9999px;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 16px;
      box-sizing: border-box;
    }

    .scrubber-ticks {
      position: absolute;
      inset: 0 16px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.28) 0,
        rgba(0, 0, 0, 0.28) 1px,
        transparent 1px,
        transparent 6px
      );
      opacity: 0.65;
      pointer-events: none;
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }

    .scrubber-thumb {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 22px;
      background: #111111;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 0.5px 0 rgba(255, 255, 255, 0.3);
      cursor: grab;
      touch-action: none;
      user-select: none;
      z-index: 3;
    }

    .scrubber-thumb:active {
      cursor: grabbing;
    }

    .scrubber-thumb-num {
      font-size: 8.5px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.2px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", monospace;
    }

    .btn-cta {
      margin-top: 0;
      flex-shrink: 0;
      width: 100%;
      padding: clamp(12px, 1.6vh, 15px) 16px;
      border-radius: 9999px;
      background: var(--cta-bg);
      color: var(--cta-text);
      font-size: clamp(12px, 3.1vw, 13px);
      font-weight: 600;
      letter-spacing: 0.08em;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 16px var(--cta-shadow);
      transition: all 0.22s var(--ease-smooth);
      user-select: none;
      text-transform: uppercase;
    }

    .btn-cta:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    /* Result View */
    #view-result {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      flex: 1 1 0;
      min-height: 0;
      gap: clamp(10px, 1.6vh, 16px);
    }

    .poster-stage {
      position: relative;
      width: min(calc((100dvh - 200px) * 0.75), 84vw, 360px);
      aspect-ratio: 3 / 4;
      max-height: calc(100dvh - 200px);
      margin: 0 auto;
      background: #0D0D0F;
      border-radius: clamp(18px, 2.6vh, 24px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12);
      flex-shrink: 0;
    }

    #view-result .btn-cta {
      width: min(calc((100dvh - 200px) * 0.75), 84vw, 360px);
      margin: 0 auto;
    }

    .poster-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      -webkit-touch-callout: default;
      opacity: 1;
      transform: scale(1);
      transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    #res-display-img.unveiling {
      opacity: 0;
      transform: scale(0.985);
      transition: none !important;
    }

    .poster-img.original-layer {
      position: absolute;
      inset: 0;
      opacity: 0;
      transform: none !important;
      transition: opacity 0.15s ease-out;
      pointer-events: none;
      z-index: 5;
    }

    .compare-pill {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(17, 17, 17, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 0.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 9999px;
      padding: 7px 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #FFFFFF;
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      z-index: 10;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      transition: all 0.2s ease;
    }

    .compare-pill.active {
      background: #FFFFFF;
      color: #111111;
    }

    /* Fullscreen Frosted Loader */
    .loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(250, 248, 245, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .loader-card {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      text-align: center;
      padding: 24px;
    }

    .darkroom-ripple-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .darkroom-agitate-hint {
      font-size: 10px;
      color: var(--text-muted);
      opacity: 0.52;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      margin-top: 4px;
      pointer-events: none;
      user-select: none;
    }

    .ripple-aperture-box {
      position: relative;
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aperture-beam-wrap {
      position: relative;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aperture-beam-svg {
      width: 100%;
      height: 100%;
      animation: spinBeam 1.8s linear infinite;
    }

    @keyframes spinBeam {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .aperture-center-core {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #111111;
    }

    .darkroom-phase-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 9999px;
    }

    .darkroom-phase-beacon {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #111111;
      animation: pulseBeacon 1.2s infinite ease-in-out;
    }

    @keyframes pulseBeacon {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .darkroom-phase-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
    }

    .darkroom-phase-sub {
      font-size: 11px;
      color: var(--text-muted);
    }

    .darkroom-cancel-btn {
      margin-top: 10px;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 11px;
      color: var(--text-muted);
      cursor: pointer;
    }

    /* Toast */
    .toast-pill {
      position: fixed;
      top: max(20px, env(safe-area-inset-top));
      left: 50%;
      transform: translateX(-50%) translateY(-30px);
      background: rgba(17, 17, 17, 0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 9999px;
      pointer-events: none;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 200;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }

    .toast-pill.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* Error Modal */
    .studio-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 150;
      opacity: 0;
      transition: opacity 0.25s ease;
      padding: 24px;
    }

    .studio-modal-overlay.active {
      opacity: 1;
    }

    .studio-modal-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    }

    .studio-modal-title {
      font-size: 16px;
      font-weight: 700;
      margin: 12px 0 6px 0;
      color: #111111;
    }

    .studio-modal-desc {
      font-size: 12.5px;
      color: var(--text-subtle);
      line-height: 1.4;
      margin-bottom: 20px;
    }

    .studio-modal-actions {
      display: flex;
      gap: 10px;
      width: 100%;
    }

    .studio-modal-btn {
      flex: 1;
      padding: 10px 0;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }

    .studio-modal-btn.primary {
      background: #111111;
      color: #FFFFFF;
    }

    .studio-modal-btn.secondary {
      background: rgba(0, 0, 0, 0.06);
      color: #111111;
    }
  </style>
</head>

<body>

  <div class="ambient-glow-top"></div>

  <div class="app-card">

    <header class="header-bar">
      <button id="header-back-btn" class="header-back-btn" style="display: none;" onclick="backToEntry()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="brand-masthead">
        <div class="brand-title">V I V I B O N</div>
        <div class="brand-subtitle-wrap">
          <span class="brand-subtitle">HAUTE OPTIQUE ATELIER \xB7 DROP N\xB0 09</span>
        </div>
        <div class="vernier-caliper-gauge" aria-hidden="true">
          <span class="vernier-stamp">CAL. 1080\xD71440</span>
          <span class="vernier-ticks"></span>
          <span class="vernier-stamp">TOL. 0.00MM</span>
        </div>
      </div>
    </header>

    <!-- ================= VIEW 1: 3D Spatial Deck ================= -->
    <div id="view-entry">

      <div class="deck-stage-container" id="deck-stage">
        <div class="deck-cards-viewport" id="deck-viewport">
          <!-- 12 3D covers dynamically rendered here -->
        </div>
      </div>

      <input type="file" id="file-input" style="display: none;" accept="image/*" onchange="handleUpload(event)" />

      <!-- Precision Vernier Scrubber & Bottom Controls -->
      <div class="bottom-controls">
        <!-- 4 Core Collection Anchors -->
        <div class="scrubber-anchors" id="scrubber-anchors">
          <span class="scrubber-anchor active" onclick="jumpToCategory('corporate')">BOARDROOM</span>
          <span class="scrubber-anchor" onclick="jumpToCategory('fine_art')">LOUVRE</span>
          <span class="scrubber-anchor" onclick="jumpToCategory('cosplay')">DRAMA</span>
          <span class="scrubber-anchor" onclick="jumpToCategory('celebration')">GALA</span>
        </div>

        <!-- Vernier Mechanical Scrubber Rail -->
        <div class="scrubber-rail-wrap" id="scrubber-rail-wrap">
          <div class="scrubber-track" id="scrubber-track">
            <div class="scrubber-ticks"></div>
            <div class="scrubber-thumb" id="scrubber-thumb">
              <span class="scrubber-thumb-num" id="scrubber-thumb-num">01</span>
            </div>
          </div>
        </div>

        <!-- Primary CTA Shutter Key -->
        <button class="btn-cta" id="main-cta-btn" onclick="startGeneration()">
          CALIBRATE & FEATURE PET
        </button>
      </div>

    </div>

    <!-- ================= VIEW 2: Result Showcase ================= -->
    <div id="view-result">

      <div class="poster-stage">
        <img id="res-display-img" class="poster-img" src="models/milo_gentle_prince_of_wales.webp" alt="High Fashion Cover" />
        <img id="res-original-img" class="poster-img original-layer" src="models/milo_gentle.webp" alt="Original Pet" />

        <div class="compare-pill" id="compare-btn" role="button" aria-pressed="false" tabindex="0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span id="compare-label">Hold to compare</span>
        </div>
      </div>

      <button class="btn-cta" onclick="exportPoster()">
        Save 1080P portrait
      </button>

    </div>

  </div>

  <!-- Fullscreen Frosted Loader Overlay -->
  <div class="loader-overlay" id="loader">
    <canvas id="darkroom-ripple-canvas" class="darkroom-ripple-canvas"></canvas>
    <div class="loader-card">
      <div class="ripple-aperture-box">
        <div class="aperture-beam-wrap">
          <svg class="aperture-beam-svg" viewBox="0 0 68 68">
            <circle cx="34" cy="34" r="33" fill="none" stroke="#111111" stroke-width="2.2" stroke-dasharray="38 170" stroke-linecap="round" />
          </svg>
          <div class="aperture-center-core"></div>
        </div>
      </div>

      <div class="darkroom-phase-pill">
        <div class="darkroom-phase-beacon"></div>
        <div class="darkroom-phase-title" id="loader-phase-title">Analyzing facial features</div>
      </div>
      <div class="darkroom-phase-sub" id="loader-phase-sub">Detecting subject lighting & geometry</div>

      <button class="darkroom-cancel-btn" type="button" onclick="cancelGeneration()">
        Cancel
      </button>
      <div class="darkroom-agitate-hint">Touch to agitate silver gelatin print</div>
    </div>
  </div>

  <!-- Toast Pill -->
  <div class="toast-pill" id="toast"></div>

  <!-- Error Modal -->
  <div class="studio-modal-overlay" id="error-modal" onclick="closeErrorModal(event)">
    <div class="studio-modal-card" onclick="event.stopPropagation()">
      <div class="studio-modal-title" id="error-modal-title">Studio Queue Busy</div>
      <div class="studio-modal-desc" id="error-modal-desc">
        High demand on rendering servers. Your pet photo and chosen style have been safely preserved.
      </div>
      <div class="studio-modal-actions">
        <button class="studio-modal-btn secondary" type="button" onclick="closeErrorModal(event)">Dismiss</button>
        <button class="studio-modal-btn primary" type="button" onclick="retryGeneration()">Try Again</button>
      </div>
    </div>
  </div>

  <canvas id="render-canvas" style="display: none;"></canvas>

  <script>
    // 4 Categories \xD7 3 High-Converting Templates (Haute Optique Drops)
    const THEMES = {
      corporate: {
        id: "corporate",
        backendTheme: "corporate",
        name: "01 / BOARDROOM",
        tag: "BOARDROOM \xB7 01",
        templates: [
          {
            id: "airline_captain",
            name: "Captain",
            img: "models/airline_captain.webp",
            title: "Frequent Flyer Chief Fluff",
            tag: "AVIATOR \xB7 01"
          },
          {
            id: "coffee_pro",
            name: "Caffeine Pro",
            img: "models/caffeine_pro.webp",
            title: "Caffeine Fueled Overtime",
            tag: "OVERTIME \xB7 02"
          },
          {
            id: "michelin_chef",
            name: "Chef",
            img: "models/michelin_chef.webp",
            title: "Michelin Treat Specialist",
            tag: "CHEF \xB7 03"
          }
        ]
      },
      fine_art: {
        id: "fine_art",
        backendTheme: "fine_art",
        name: "02 / LOUVRE",
        tag: "LOUVRE \xB7 02",
        templates: [
          {
            id: "mona_lisa",
            name: "Mona Lisa",
            img: "models/mona_lisa.webp",
            title: "Louvre Heist In Progress",
            tag: "HEIST \xB7 01"
          },
          {
            id: "pearl_earring",
            name: "Pearl Earring",
            img: "models/pearl_earring.webp",
            title: "Golden Age Pure Elegance",
            tag: "VERMEER \xB7 02"
          },
          {
            id: "line_art",
            name: "Line Art",
            img: "models/line_art.webp",
            title: "Minimalist Modern Ink",
            tag: "SKETCH \xB7 03"
          }
        ]
      },
      cosplay: {
        id: "cosplay",
        backendTheme: "cosplay",
        name: "03 / DRAMA",
        tag: "DRAMA \xB7 03",
        templates: [
          {
            id: "assumption_of_mary",
            name: "Baroque",
            img: "models/assumption_of_mary.webp",
            title: "Renaissance Dramatic Lead",
            tag: "BAROQUE \xB7 01"
          },
          {
            id: "caribbean_pirate",
            name: "Pirate",
            img: "models/caribbean_pirate.webp",
            title: "Seven Seas Treat Corsair",
            tag: "CORSAIR \xB7 02"
          },
          {
            id: "secret_agent",
            name: "Agent",
            img: "models/secret_agent.webp",
            title: "Midnight Heist Secret Agent",
            tag: "AGENT \xB7 03"
          }
        ]
      },
      celebration: {
        id: "celebration",
        backendTheme: "celebration",
        name: "04 / GALA",
        tag: "GALA \xB7 04",
        templates: [
          {
            id: "christmas",
            name: "Velvet",
            img: "models/christmas.webp",
            title: "Velvet Gift Box Aristocrat",
            tag: "VELVET \xB7 01"
          },
          {
            id: "halloween",
            name: "Pumpkin",
            img: "models/halloween.webp",
            title: "Cinderella Pumpkin Rider",
            tag: "PUMPKIN \xB7 02"
          },
          {
            id: "birthday_vip",
            name: "VIP Gala",
            img: "models/birthday_vip.webp",
            title: "Met Gala Crasher VIP",
            tag: "GALA \xB7 03"
          }
        ]
      }
    };

    THEMES.lifestyle = THEMES.corporate;
    THEMES.artistic = THEMES.fine_art;
    THEMES.drama = THEMES.cosplay;

    let activeThemeKey = "corporate";
    let activeTemplateId = "airline_captain";
    let userPhotoUrl = "models/milo_gentle.webp";
    let isUserUploaded = false;

    function trackEvent(eventName, properties = {}) {
      try {
        if (window.clarity) {
          window.clarity("event", eventName);
          if (properties && typeof properties === 'object') {
            for (const [k, v] of Object.entries(properties)) {
              if (v !== undefined && v !== null) {
                window.clarity("set", \`\${eventName}_\${k}\`, String(v));
              }
            }
          }
        }
      } catch (e) {
        console.warn('[Clarity Event]:', e);
      }
    }

    let userHasInteracted = false;
    const markUserInteraction = () => {
      userHasInteracted = true;
    };
    ['pointerdown', 'touchstart', 'mousedown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, markUserInteraction, { capture: true, passive: true, once: true });
    });

    function triggerHaptic(duration = 8) {
      if (!userHasInteracted) return;
      if (navigator.vibrate) {
        try { navigator.vibrate(duration); } catch (e) { }
      }
    }

    /**
     * Web Audio Pure Haptic Sound Engine (0KB Asset Overhead - NC-7 Compliant)
     */
    class HapticSoundEngine {
      constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.initUnlockListener();
      }

      ensureContext() {
        if (!userHasInteracted) return null;
        try {
          if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.92, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
          }
          if (this.ctx.state === 'suspended') {
            return this.ctx.resume();
          }
          return Promise.resolve();
        } catch (e) {
          return null;
        }
      }

      initUnlockListener() {
        const unlock = () => {
          userHasInteracted = true;
          const p = this.ensureContext();
          if (p && typeof p.then === 'function') {
            p.then(() => {
              try {
                if (this.ctx) {
                  const b = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
                  const s = this.ctx.createBufferSource();
                  s.buffer = b;
                  s.connect(this.ctx.destination);
                  s.start(0);
                }
              } catch (e) { }
            }).catch(() => { });
          }
        };
        ['pointerdown', 'touchstart', 'mousedown', 'keydown'].forEach(evt => {
          window.addEventListener(evt, unlock, { capture: true, passive: true, once: true });
        });
      }

      playDialClick() {
        const p = this.ensureContext();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {
          p.then(() => this._executeDialClick()).catch(() => { });
        } else {
          this._executeDialClick();
        }
      }

      _executeDialClick() {
        try {
          if (!this.ctx || !this.masterGain) return;
          const now = this.ctx.currentTime + 0.003;
          const jitter = 1.0 + (Math.random() - 0.5) * 0.04;

          const snapOsc = this.ctx.createOscillator();
          const snapGain = this.ctx.createGain();
          snapOsc.type = 'sine';
          snapOsc.frequency.setValueAtTime(1900 * jitter, now);
          snapOsc.frequency.exponentialRampToValueAtTime(580, now + 0.024);

          snapGain.gain.setValueAtTime(0.35, now);
          snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

          snapOsc.connect(snapGain);
          snapGain.connect(this.masterGain);
          snapOsc.start(now);
          snapOsc.stop(now + 0.025);

          const bufferSize = Math.floor(this.ctx.sampleRate * 0.018);
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = noiseBuffer;

          const bandpass = this.ctx.createBiquadFilter();
          bandpass.type = 'bandpass';
          bandpass.frequency.setValueAtTime(2800 * jitter, now);
          bandpass.Q.setValueAtTime(3.2, now);

          const noiseGain = this.ctx.createGain();
          noiseGain.gain.setValueAtTime(0.26, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

          noise.connect(bandpass);
          bandpass.connect(noiseGain);
          noiseGain.connect(this.masterGain);
          noise.start(now);

          const bodyOsc = this.ctx.createOscillator();
          const bodyGain = this.ctx.createGain();
          bodyOsc.type = 'triangle';
          bodyOsc.frequency.setValueAtTime(340 * jitter, now);
          bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.028);

          bodyGain.gain.setValueAtTime(0.28, now);
          bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

          bodyOsc.connect(bodyGain);
          bodyGain.connect(this.masterGain);
          bodyOsc.start(now);
          bodyOsc.stop(now + 0.029);
        } catch (e) { }
      }

      playShutterSnap() {
        const p = this.ensureContext();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {
          p.then(() => this._executeShutterSnap()).catch(() => { });
        } else {
          this._executeShutterSnap();
        }
      }

      _executeShutterSnap() {
        try {
          if (!this.ctx || !this.masterGain) return;
          const now = this.ctx.currentTime + 0.003;
          const jitter = 1.0 + (Math.random() - 0.5) * 0.03;

          const snapOsc = this.ctx.createOscillator();
          const snapGain = this.ctx.createGain();
          snapOsc.type = 'sine';
          snapOsc.frequency.setValueAtTime(1600 * jitter, now);
          snapOsc.frequency.exponentialRampToValueAtTime(420, now + 0.032);
          snapGain.gain.setValueAtTime(0.38, now);
          snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
          snapOsc.connect(snapGain);
          snapGain.connect(this.masterGain);
          snapOsc.start(now);
          snapOsc.stop(now + 0.033);

          const bufferSize = Math.floor(this.ctx.sampleRate * 0.035);
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const whiteNoise = this.ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2400 * jitter, now);
          filter.Q.setValueAtTime(2.5, now);
          const noiseGain = this.ctx.createGain();
          noiseGain.gain.setValueAtTime(0.30, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
          whiteNoise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(this.masterGain);
          whiteNoise.start(now);

          const returnTime = now + 0.036;
          const returnOsc = this.ctx.createOscillator();
          const returnGain = this.ctx.createGain();
          returnOsc.type = 'triangle';
          returnOsc.frequency.setValueAtTime(280 * jitter, returnTime);
          returnOsc.frequency.exponentialRampToValueAtTime(90, returnTime + 0.045);
          returnGain.gain.setValueAtTime(0.35, returnTime);
          returnGain.gain.exponentialRampToValueAtTime(0.0001, returnTime + 0.045);
          returnOsc.connect(returnGain);
          returnGain.connect(this.masterGain);
          returnOsc.start(returnTime);
          returnOsc.stop(returnTime + 0.046);
        } catch (e) { }
      }

      playPaperRustle(intensity = 1.0) {
        const p = this.ensureContext();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended' && p && typeof p.then === 'function') {
          p.then(() => this._executePaperRustle(intensity)).catch(() => { });
        } else {
          this._executePaperRustle(intensity);
        }
      }

      _executePaperRustle(intensity) {
        try {
          if (!this.ctx || !this.masterGain) return;
          const now = this.ctx.currentTime + 0.002;
          const duration = 0.042;
          const bufferSize = Math.floor(this.ctx.sampleRate * duration);
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.42));
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = noiseBuffer;

          const bandpass = this.ctx.createBiquadFilter();
          bandpass.type = 'bandpass';
          bandpass.frequency.setValueAtTime(1480, now);
          bandpass.Q.setValueAtTime(1.9, now);

          const rustleGain = this.ctx.createGain();
          const gainVal = Math.min(0.24, 0.10 * intensity);
          rustleGain.gain.setValueAtTime(gainVal, now);
          rustleGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          noise.connect(bandpass);
          bandpass.connect(rustleGain);
          rustleGain.connect(this.masterGain);
          noise.start(now);
          noise.stop(now + duration + 0.005);
        } catch (e) { }
      }
    }

    const soundEngine = new HapticSoundEngine();

    function showToast(text, duration = 2500) {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.innerText = text;
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, duration);
    }

    // Flatten 12 High-Fashion Templates
    const ALL_TEMPLATES = [];
    const CATEGORY_START_INDEX = {};
    const CATEGORY_KEYS = ["corporate", "fine_art", "cosplay", "celebration"];

    CATEGORY_KEYS.forEach(k => {
      const theme = THEMES[k];
      if (!theme) return;
      CATEGORY_START_INDEX[k] = ALL_TEMPLATES.length;
      theme.templates.forEach((tpl, idx) => {
        ALL_TEMPLATES.push({
          ...tpl,
          categoryKey: k,
          categoryName: theme.name,
          categoryTag: theme.tag,
          localIndex: idx,
          globalIndex: ALL_TEMPLATES.length
        });
      });
    });

    let currentDeckIndex = 0;
    let deckProgress = 0.0;
    let cardElements = [];
    let cardSheens = [];
    let cardShadows = [];
    let lastHapticIndex = 0;
    let lastClickTimestamp = 0;
    let animFrameId = null;

    function handleHeroClick() {
      soundEngine.playDialClick();
      const input = document.getElementById('file-input');
      if (input) input.click();
    }

    function renderDeckStage() {
      const viewport = document.getElementById("deck-viewport");
      if (!viewport) return;

      viewport.innerHTML = ALL_TEMPLATES.map((tpl, i) => {
        const isCurrentActive = i === currentDeckIndex;
        const displaySrc = (isCurrentActive && isUserUploaded && userPhotoUrl) ? userPhotoUrl : tpl.img;
        const pillText = (isCurrentActive && isUserUploaded) ? "RECALIBRATE PET" : "FEATURE MY PET";

        return \`
          <div class="deck-cover" id="deck-card-\${i}" onclick="onDeckCardClick(\${i})" aria-label="\${tpl.title}">
            <img class="deck-cover-img" id="deck-img-\${i}" src="\${displaySrc}" alt="\${tpl.title}" decoding="async" fetchpriority="\${isCurrentActive ? 'high' : 'auto'}" onerror="this.onerror=null;this.src='models/milo_gentle.webp';" />
            <div class="deck-paper-sheen" id="deck-sheen-\${i}"></div>
            <div class="deck-paper-shadow" id="deck-shadow-\${i}"></div>
            <div class="deck-paper-back">
              <div class="paper-back-watermark">
                <span class="paper-back-logo">VIVIBON</span>
                <span class="paper-back-spec">HAUTE COUTURE ARCHIVE \xB7 1 OF 1</span>
              </div>
            </div>
            <div class="deck-cover-overlay">
              <div class="deck-cover-header">
                <span class="cover-brand-micro">VIVIBON</span>
                <span class="cover-issue-tag">\${tpl.tag}</span>
              </div>
              <div class="deck-cover-footer">
                <h2 class="cover-editorial-title">\${tpl.title}</h2>
                <div class="cover-feature-pill" id="deck-pill-\${i}" onclick="event.stopPropagation(); handleHeroClick()">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                    <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                    <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                    <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                    <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                    <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                  </svg>
                  <span id="deck-pill-label-\${i}">\${pillText}</span>
                </div>
              </div>
            </div>
          </div>
        \`;
      }).join('');

      cardElements = Array.from(viewport.querySelectorAll(".deck-cover"));
      cardSheens = Array.from(viewport.querySelectorAll(".deck-paper-sheen"));
      cardShadows = Array.from(viewport.querySelectorAll(".deck-paper-shadow"));
      applyDeckProgress(deckProgress);
    }

    /**
     * Haute Couture Cylindrical Paper Roll Mathematics:
     * Continuous 120 FPS physical paper curl with dynamic specular sweep & fold shadow.
     */
    function applyDeckProgress(progress, silent = false) {
      const total = ALL_TEMPLATES.length;
      const clampedProgress = Math.max(0, Math.min(total - 1, progress));

      cardElements.forEach((card, i) => {
        const diff = i - clampedProgress;
        const absDiff = Math.abs(diff);

        if (absDiff > 2.6) {
          card.style.display = 'none';
          return;
        }
        card.style.display = 'block';

        const rotateY = -diff * 32; // Cylindrical curl curvature
        const rotateZ = diff * 3.6;  // Organic paper sag & lift
        const skewY = diff * 3.0;    // Flexible paper shear
        const translateX = diff * 70; // 3D translation
        const translateZ = -absDiff * 80 - Math.pow(absDiff, 2) * 22; // Recess depth
        const scale = Math.max(0.66, 1 - absDiff * 0.16);
        const brightness = Math.max(0.38, 1 - absDiff * 0.28);
        const blur = Math.min(1.5, Math.max(0, (absDiff - 0.25) * 0.8));
        const opacity = absDiff < 0.2 ? 1 : Math.max(0, 1 - (absDiff - 0.45) * 0.82);
        const zIndex = Math.round(60 - absDiff * 15);
        const isCenter = absDiff < 0.35;

        // Dynamic paper border-radius (tighter curl on leading edge)
        const rCurled = Math.min(36, Math.round(20 + absDiff * 14));
        const radiusStyle = diff < 0 
          ? \`20px \${rCurled}px \${rCurled}px 20px\` 
          : \`\${rCurled}px 20px 20px \${rCurled}px\`;

        // Shift transform origin along curl axis
        const originX = diff < 0 ? '25%' : (diff > 0 ? '75%' : '50%');

        card.style.transformOrigin = \`\${originX} 50%\`;
        card.style.transform = \`translateX(\${translateX}%) scale(\${scale}) translateZ(\${translateZ}px) rotateY(\${rotateY}deg) rotateZ(\${rotateZ}deg) skewY(\${skewY}deg)\`;
        card.style.borderRadius = radiusStyle;
        card.style.opacity = String(opacity);
        card.style.filter = \`brightness(\${brightness}) blur(\${blur}px)\`;
        card.style.zIndex = String(zIndex);
        
        // Contact drop shadow cast by curling card onto next sheet
        const shadowX = -diff * 22;
        const shadowSpread = Math.round(absDiff * 8);
        card.style.boxShadow = isCenter
          ? '0 24px 56px -10px rgba(0, 0, 0, 0.40), 0 0 0 1px rgba(255, 255, 255, 0.20)'
          : \`\${shadowX}px 20px 48px -\${shadowSpread}px rgba(0, 0, 0, \${0.30 + absDiff * 0.20}), 0 0 0 1px rgba(255, 255, 255, \${Math.max(0.04, 0.18 - absDiff * 0.15)})\`;
        card.style.pointerEvents = absDiff < 1.3 ? 'auto' : 'none';

        // Dynamic Specular Sheen (sweeping reflection band along the crest)
        const sheen = cardSheens[i];
        if (sheen) {
          if (absDiff < 0.04) {
            sheen.style.opacity = '0';
          } else {
            const crest = diff < 0 ? (100 - absDiff * 70) : (absDiff * 70);
            const sheenIntensity = Math.min(0.55, absDiff * 0.75);
            sheen.style.opacity = '1';
            sheen.style.background = \`linear-gradient(\${diff < 0 ? 105 : 75}deg, transparent \${crest - 20}%, rgba(255, 255, 255, \${sheenIntensity}) \${crest}%, transparent \${crest + 20}%)\`;
          }
        }

        // Dynamic Ambient Occlusion Crease Shadow
        const shadow = cardShadows[i];
        if (shadow) {
          if (absDiff < 0.05) {
            shadow.style.opacity = '0';
          } else {
            const shadowIntensity = Math.min(0.46, absDiff * 0.62);
            shadow.style.opacity = '1';
            shadow.style.background = \`linear-gradient(\${diff < 0 ? 'to left' : 'to right'}, rgba(0, 0, 0, \${shadowIntensity}) 0%, transparent 62%)\`;
          }
        }
      });

      // Scrubber Thumb Sync
      const thumb = document.getElementById("scrubber-thumb");
      const thumbNum = document.getElementById("scrubber-thumb-num");
      const track = document.getElementById("scrubber-track");
      if (thumb && track) {
        const percent = clampedProgress / Math.max(1, total - 1);
        const trackWidth = track.clientWidth || 320;
        const thumbWidth = 32;
        const usableWidth = trackWidth - thumbWidth;
        const leftPx = (thumbWidth / 2) + (percent * usableWidth);
        thumb.style.left = \`\${leftPx}px\`;

        const nearest = Math.round(clampedProgress);
        if (thumbNum) {
          thumbNum.innerText = String(nearest + 1).padStart(2, '0');
        }

        if (nearest !== lastHapticIndex) {
          lastHapticIndex = nearest;
          const now = performance.now();
          if (!silent && (now - lastClickTimestamp > 45)) {
            lastClickTimestamp = now;
            triggerHaptic(6);
            soundEngine.playDialClick();
          }
          highlightActiveCategory(ALL_TEMPLATES[nearest].categoryKey);
        }
      }
    }

    function highlightActiveCategory(catKey) {
      const anchors = document.querySelectorAll(".scrubber-anchor");
      anchors.forEach(a => {
        const cat = a.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
        if (cat === catKey) {
          a.classList.add("active");
        } else {
          a.classList.remove("active");
        }
      });
    }

    function updateCtaButtonLabel() {
      const mainCta = document.getElementById("main-cta-btn");
      if (mainCta) {
        if (isUserUploaded) {
          mainCta.innerText = "START EXPOSURE \u2794";
        } else {
          mainCta.innerText = "CALIBRATE & FEATURE PET";
        }
      }
    }

    function updateScrubberUI() {
      applyDeckProgress(deckProgress);
      updateCtaButtonLabel();
    }

    function onDeckCardClick(index) {
      if (Math.abs(index - deckProgress) < 0.3) {
        handleHeroClick();
      } else {
        triggerHaptic(6);
        soundEngine.playDialClick();
        animateToDeckIndex(index);
      }
    }

    /**
     * Inertial Flywheel Physics Engine (Euler Momentum + Magnetic Ratchet Snap)
     * Upgrades drag and scrubber gestures with authentic brass mechanical momentum.
     */
    let flywheelVelocity = 0;
    let isFlywheelGliding = false;

    function cancelFlywheel() {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      isFlywheelGliding = false;
      flywheelVelocity = 0;
    }

    function startFlywheelGlide(initialVelocity) {
      cancelFlywheel();
      flywheelVelocity = initialVelocity;
      isFlywheelGliding = true;

      const FRICTION = 0.938;
      const MAX_BOUND = ALL_TEMPLATES.length - 1;
      let lastTime = performance.now();

      function glideStep(now) {
        if (!isFlywheelGliding) return;
        const dt = Math.min(32, Math.max(1, now - lastTime));
        lastTime = now;

        // Friction decay normalized to ~16.6ms
        const frameFriction = Math.pow(FRICTION, dt / 16.6);
        flywheelVelocity *= frameFriction;

        // Position step
        deckProgress += flywheelVelocity * dt;

        // Rubberband boundary tension
        if (deckProgress < 0) {
          deckProgress += (0 - deckProgress) * 0.18;
          flywheelVelocity *= 0.65;
        } else if (deckProgress > MAX_BOUND) {
          deckProgress += (MAX_BOUND - deckProgress) * 0.18;
          flywheelVelocity *= 0.65;
        }

        // Apply deck and dynamic ratchet acoustic feedback
        applyDeckProgress(deckProgress, false);

        // Low speed threshold -> engage magnetic snap
        if (Math.abs(flywheelVelocity) < 0.0018) {
          isFlywheelGliding = false;
          flywheelVelocity = 0;
          const target = Math.max(0, Math.min(MAX_BOUND, Math.round(deckProgress)));
          animateToDeckIndex(target);
          return;
        }

        animFrameId = requestAnimationFrame(glideStep);
      }

      animFrameId = requestAnimationFrame(glideStep);
    }

    function animateToDeckIndex(targetIndex) {
      cancelFlywheel();
      const target = Math.max(0, Math.min(ALL_TEMPLATES.length - 1, targetIndex));
      const start = deckProgress;
      const change = target - start;

      if (Math.abs(change) < 0.001) {
        deckProgress = target;
        currentDeckIndex = target;
        activeThemeKey = ALL_TEMPLATES[currentDeckIndex].categoryKey;
        activeTemplateId = ALL_TEMPLATES[currentDeckIndex].id;
        applyDeckProgress(deckProgress, true);
        updateCtaButtonLabel();
        return;
      }

      const startTime = performance.now();
      const duration = Math.min(380, Math.max(180, Math.abs(change) * 150));

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progressRatio = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progressRatio, 4);
        deckProgress = start + change * ease;
        // Intermediate steps are muted during smooth flight
        applyDeckProgress(deckProgress, true);

        if (progressRatio < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          deckProgress = target;
          currentDeckIndex = target;
          activeThemeKey = ALL_TEMPLATES[currentDeckIndex].categoryKey;
          activeTemplateId = ALL_TEMPLATES[currentDeckIndex].id;
          applyDeckProgress(deckProgress, true);
          updateCtaButtonLabel();
          triggerHaptic(8);
          soundEngine.playDialClick();
          trackEvent("template_selected", { theme: activeThemeKey, template: activeTemplateId });
        }
      }

      animFrameId = requestAnimationFrame(step);
    }

    function goToDeckIndex(index, withAudio = true) {
      const clamped = Math.max(0, Math.min(ALL_TEMPLATES.length - 1, index));
      if (withAudio && clamped !== currentDeckIndex) {
        triggerHaptic(6);
        soundEngine.playDialClick();
      }
      animateToDeckIndex(clamped);
    }

    function jumpToCategory(categoryKey) {
      const targetIdx = CATEGORY_START_INDEX[categoryKey];
      if (targetIdx !== undefined) {
        if (targetIdx !== currentDeckIndex) {
          triggerHaptic(8);
          soundEngine.playDialClick();
        }
        animateToDeckIndex(targetIdx);
      }
    }

    function initDeckGestures() {
      const stage = document.getElementById("deck-stage");
      if (!stage) return;

      let isDragging = false;
      let hasDragged = false;
      let suppressClickUntil = 0;
      let startX = 0;
      let startY = 0;
      let startProgress = 0;
      let lastX = 0;
      let lastTime = 0;
      let smoothedVelocity = 0;
      let isHorizontalGesture = null;
      let lastRustleTime = 0;

      stage.addEventListener("pointerdown", (e) => {
        if (e.target.closest('.cover-feature-pill')) return;
        cancelFlywheel();
        isDragging = true;
        hasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        lastX = e.clientX;
        lastTime = performance.now();
        startProgress = deckProgress;
        smoothedVelocity = 0;
        isHorizontalGesture = null;
        lastRustleTime = performance.now();
        stage.setPointerCapture?.(e.pointerId);
      });

      stage.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        const instVel = (e.clientX - lastX) / dt;
        smoothedVelocity = smoothedVelocity * 0.4 + instVel * 0.6;
        lastX = e.clientX;
        lastTime = now;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (isHorizontalGesture === null) {
          if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
            isHorizontalGesture = Math.abs(deltaX) >= Math.abs(deltaY);
          }
        }

        if (isHorizontalGesture === false) return;

        if (Math.abs(deltaX) > 8) {
          hasDragged = true;
        }

        // Tactile paper rustle foley during drag
        if (Math.abs(smoothedVelocity) > 0.15 && now - lastRustleTime > 140) {
          lastRustleTime = now;
          soundEngine.playPaperRustle(Math.min(1.5, Math.abs(smoothedVelocity) * 1.8));
        }

        const deltaProgress = -deltaX / 220;
        let newProgress = startProgress + deltaProgress;
        if (newProgress < 0) {
          newProgress = newProgress * 0.35;
        } else if (newProgress > ALL_TEMPLATES.length - 1) {
          const maxP = ALL_TEMPLATES.length - 1;
          newProgress = maxP + (newProgress - maxP) * 0.35;
        }
        deckProgress = newProgress;
        applyDeckProgress(deckProgress);
      });

      const onPointerEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;
        stage.releasePointerCapture?.(e.pointerId);

        const now = performance.now();
        if (now - lastTime > 65) {
          smoothedVelocity = 0;
        }

        if (hasDragged) {
          suppressClickUntil = performance.now() + 380;
          soundEngine.playPaperRustle(0.75);
        }

        if (isHorizontalGesture === false) return;

        const progressVelocity = -smoothedVelocity / 220;

        if (Math.abs(progressVelocity) > 0.0018) {
          startFlywheelGlide(progressVelocity);
        } else {
          const target = Math.max(0, Math.min(ALL_TEMPLATES.length - 1, Math.round(deckProgress)));
          animateToDeckIndex(target);
        }
      };

      stage.addEventListener("pointerup", onPointerEnd);
      stage.addEventListener("pointercancel", onPointerEnd);

      // Prevent accidental card click opening upload after a swipe/drag gesture
      stage.addEventListener("click", (e) => {
        if (performance.now() < suppressClickUntil) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    function initScrubberGestures() {
      const track = document.getElementById("scrubber-track");
      if (!track) return;

      let isScrubbing = false;
      let lastScrubTime = 0;
      let lastScrubProgress = 0;
      let scrubberVelocity = 0;

      const handleScrub = (clientX, now) => {
        const rect = track.getBoundingClientRect();
        if (rect.width <= 0) return;
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const normalized = x / rect.width;
        const newProgress = normalized * (ALL_TEMPLATES.length - 1);

        if (lastScrubTime > 0) {
          const dt = Math.max(1, now - lastScrubTime);
          const instVel = (newProgress - lastScrubProgress) / dt;
          scrubberVelocity = scrubberVelocity * 0.4 + instVel * 0.6;
        }
        lastScrubTime = now;
        lastScrubProgress = newProgress;

        deckProgress = Math.max(0, Math.min(ALL_TEMPLATES.length - 1, newProgress));
        applyDeckProgress(deckProgress);
      };

      track.addEventListener("pointerdown", (e) => {
        cancelFlywheel();
        isScrubbing = true;
        scrubberVelocity = 0;
        lastScrubTime = performance.now();
        lastScrubProgress = deckProgress;
        track.setPointerCapture?.(e.pointerId);
        handleScrub(e.clientX, performance.now());
      });

      track.addEventListener("pointermove", (e) => {
        if (!isScrubbing) return;
        handleScrub(e.clientX, performance.now());
      });

      const stopScrub = (e) => {
        if (!isScrubbing) return;
        isScrubbing = false;
        track.releasePointerCapture?.(e.pointerId);

        const now = performance.now();
        if (now - lastScrubTime > 65) {
          scrubberVelocity = 0;
        }

        if (Math.abs(scrubberVelocity) > 0.0018) {
          startFlywheelGlide(scrubberVelocity);
        } else {
          const target = Math.max(0, Math.min(ALL_TEMPLATES.length - 1, Math.round(deckProgress)));
          animateToDeckIndex(target);
        }
      };

      track.addEventListener("pointerup", stopScrub);
      track.addEventListener("pointercancel", stopScrub);
    }

    const WORKER_SCRIPT = \`self.onmessage=async(e)=>{const{id,file,maxEdge,quality}=e.data;try{const bitmap=await createImageBitmap(file,{imageOrientation:'from-image'});let width=bitmap.width,height=bitmap.height;if(width>maxEdge||height>maxEdge){if(width>=height){height=Math.round((height*maxEdge)/width);width=maxEdge}else{width=Math.round((width*maxEdge)/height);height=maxEdge}}width=Math.max(256,Math.round(width/16)*16);height=Math.max(256,Math.round(height/16)*16);const canvas=new OffscreenCanvas(width,height);const ctx=canvas.getContext('2d',{alpha:false});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(bitmap,0,0,width,height);bitmap.close();const blob=await canvas.convertToBlob({type:'image/jpeg',quality:quality||0.82});canvas.width=0;canvas.height=0;let dataUrl='';if(typeof FileReaderSync!=='undefined'){dataUrl=new FileReaderSync().readAsDataURL(blob)}else{dataUrl=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)})}self.postMessage({id,success:true,dataUrl,width,height,originalSizeKb:Math.round(file.size/1024),optimizedSizeKb:Math.round((dataUrl.length*3)/4/1024)})}catch(err){self.postMessage({id,success:false,error:err.message||'Worker processing failed'})}};\`;

    let offscreenWorkerInstance = null;
    let workerTaskId = 0;
    const workerCallbacks = new Map();

    function getOffscreenWorker() {
      if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') {
        return null;
      }
      if (!offscreenWorkerInstance) {
        try {
          const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
          const workerUrl = URL.createObjectURL(blob);
          offscreenWorkerInstance = new Worker(workerUrl);
          URL.revokeObjectURL(workerUrl);

          offscreenWorkerInstance.onmessage = (e) => {
            const { id, success, dataUrl, width, height, originalSizeKb, optimizedSizeKb, error } = e.data;
            const cb = workerCallbacks.get(id);
            if (cb) {
              workerCallbacks.delete(id);
              if (success) {
                cb.resolve({ dataUrl, width, height, originalSizeKb, optimizedSizeKb });
              } else {
                cb.reject(new Error(error));
              }
            }
          };

          offscreenWorkerInstance.onerror = (err) => {
            console.warn('[Offscreen Worker Error]:', err);
            workerCallbacks.forEach((cb) => cb.reject(err));
            workerCallbacks.clear();
            offscreenWorkerInstance.terminate();
            offscreenWorkerInstance = null;
          };
        } catch (e) {
          console.warn('[Worker Init Notice]:', e);
          offscreenWorkerInstance = null;
        }
      }
      return offscreenWorkerInstance;
    }

    async function downsampleMainThread(file, maxEdge = 1024, quality = 0.82) {
      let sourceWidth = 0;
      let sourceHeight = 0;
      let drawSource = null;
      let cleanup = () => {};

      if ('createImageBitmap' in window) {
        try {
          const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
          sourceWidth = bitmap.width;
          sourceHeight = bitmap.height;
          drawSource = bitmap;
          cleanup = () => { try { bitmap.close(); } catch (_) {} };
        } catch (_) {
          drawSource = null;
        }
      }

      if (!drawSource) {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = objectUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load image'));
        });
        sourceWidth = img.naturalWidth || img.width;
        sourceHeight = img.naturalHeight || img.height;
        drawSource = img;
        cleanup = () => { URL.revokeObjectURL(objectUrl); };
      }

      try {
        let width = sourceWidth;
        let height = sourceHeight;

        if (width > maxEdge || height > maxEdge) {
          if (width >= height) {
            height = Math.round((height * maxEdge) / width);
            width = maxEdge;
          } else {
            width = Math.round((width * maxEdge) / height);
            height = maxEdge;
          }
        }

        width = Math.max(256, Math.round(width / 16) * 16);
        height = Math.max(256, Math.round(height / 16) * 16);

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(drawSource, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // VRAM explicit deallocation
        canvas.width = 0;
        canvas.height = 0;
        ctx = null;
        canvas = null;

        return {
          dataUrl: optimizedDataUrl,
          width,
          height,
          originalSizeKb: Math.round(file.size / 1024),
          optimizedSizeKb: Math.round((optimizedDataUrl.length * 3) / 4 / 1024)
        };
      } finally {
        cleanup();
      }
    }

    async function downsampleImageFile(file, maxEdge = 1024, quality = 0.82) {
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file.');
      }

      const worker = getOffscreenWorker();
      if (worker) {
        try {
          const taskId = ++workerTaskId;
          return await new Promise((resolve, reject) => {
            const timeoutTimer = setTimeout(() => {
              workerCallbacks.delete(taskId);
              reject(new Error('Worker processing timeout'));
            }, 6000);

            workerCallbacks.set(taskId, {
              resolve: (res) => { clearTimeout(timeoutTimer); resolve(res); },
              reject: (err) => { clearTimeout(timeoutTimer); reject(err); }
            });

            worker.postMessage({ id: taskId, file, maxEdge, quality });
          });
        } catch (workerErr) {
          console.warn('[Worker Downsample Fallback]:', workerErr);
        }
      }

      return downsampleMainThread(file, maxEdge, quality);
    }

    async function handleUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      try {
        const result = await downsampleImageFile(file, 1024, 0.82);
        userPhotoUrl = result.dataUrl;
        isUserUploaded = true;
        renderDeckStage();
        updateScrubberUI();
        const resOrig = document.getElementById("res-original-img");
        if (resOrig) resOrig.src = userPhotoUrl;
        showToast("Portrait calibrated successfully");

        try {
          const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '3000';
          const pingUrl = isLocal ? 'http://127.0.0.1:8787/api/ping' : 'https://vivibon-cover-worker.zhoumiaoyin1.workers.dev/api/ping';
          fetch(pingUrl, { method: 'GET', keepalive: true, mode: 'no-cors' }).catch(() => {});
        } catch (_) {}

        triggerHaptic(10);
        soundEngine.playDialClick();
        trackEvent("photo_uploaded", {
          original_kb: result.originalSizeKb,
          optimized_kb: result.optimizedSizeKb,
          scaled_w: result.width,
          scaled_h: result.height
        });
      } catch (err) {
        console.warn("Downsampling failed, fallback to FileReader:", err);
        const reader = new FileReader();
        reader.onload = (e) => {
          userPhotoUrl = e.target.result;
          isUserUploaded = true;
          renderDeckStage();
          updateScrubberUI();
          const resOrig = document.getElementById("res-original-img");
          if (resOrig) resOrig.src = userPhotoUrl;
          showToast("Portrait calibrated successfully");
          triggerHaptic(10);
          soundEngine.playDialClick();
          trackEvent("photo_uploaded", { file_size_kb: Math.round(file.size / 1024) });
        };
        reader.readAsDataURL(file);
      }
    }

    // ==========================================
    // OPTION C: Darkroom Liquid Agitation Ceremony Engine
    // ==========================================
    let darkroomRippleAnimId = null;
    let darkroomCanvas = null;
    let darkroomCtx = null;
    const darkroomRipples = [];
    const silverParticles = [];
    let darkroomLastAutoDrop = 0;

    function initDarkroomAgitation() {
      const loader = document.getElementById("loader");
      darkroomCanvas = document.getElementById("darkroom-ripple-canvas");
      if (!loader || !darkroomCanvas) return;
      darkroomCtx = darkroomCanvas.getContext("2d");

      const handleAgitate = (cx, cy) => {
        const rect = darkroomCanvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const x = (cx - rect.left) * dpr;
        const y = (cy - rect.top) * dpr;
        addDarkroomRipple(x, y, 1.0);
        triggerHaptic(4);
      };

      loader.addEventListener("pointerdown", (e) => {
        if (e.target && e.target.closest && e.target.closest(".darkroom-cancel-btn")) return;
        handleAgitate(e.clientX, e.clientY);
      });

      loader.addEventListener("pointermove", (e) => {
        if (e.buttons === 1) {
          if (e.target && e.target.closest && e.target.closest(".darkroom-cancel-btn")) return;
          if (Math.random() < 0.3) {
            handleAgitate(e.clientX, e.clientY);
          }
        }
      });
    }

    function addDarkroomRipple(x, y, intensity = 1.0) {
      if (darkroomRipples.length > 8) darkroomRipples.shift();
      const dpr = window.devicePixelRatio || 1;
      darkroomRipples.push({
        x,
        y,
        radius: 4 * dpr,
        maxRadius: 180 * dpr * (0.8 + Math.random() * 0.4),
        alpha: 0.35 * intensity,
        speed: (2.4 + Math.random() * 0.8) * dpr
      });

      const shockRadius = 130 * dpr;
      for (let i = 0; i < silverParticles.length; i++) {
        const p = silverParticles[i];
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < shockRadius) {
          const force = (1 - dist / shockRadius) * 3.5 * dpr;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    }

    function startDarkroomAgitationLoop() {
      if (!darkroomCanvas) {
        darkroomCanvas = document.getElementById("darkroom-ripple-canvas");
        if (darkroomCanvas) darkroomCtx = darkroomCanvas.getContext("2d");
      }
      if (!darkroomCanvas || !darkroomCtx) return;

      const loader = document.getElementById("loader");
      const dpr = window.devicePixelRatio || 1;
      const w = loader.clientWidth || window.innerWidth;
      const h = loader.clientHeight || window.innerHeight;

      darkroomCanvas.width = Math.floor(w * dpr);
      darkroomCanvas.height = Math.floor(h * dpr);
      darkroomCanvas.style.width = w + "px";
      darkroomCanvas.style.height = h + "px";

      darkroomRipples.length = 0;
      silverParticles.length = 0;

      for (let i = 0; i < 28; i++) {
        silverParticles.push({
          x: Math.random() * darkroomCanvas.width,
          y: Math.random() * darkroomCanvas.height,
          vx: (Math.random() - 0.5) * 0.4 * dpr,
          vy: (Math.random() - 0.5) * 0.4 * dpr,
          radius: (0.8 + Math.random() * 1.4) * dpr,
          baseAlpha: 0.14 + Math.random() * 0.22,
          pulse: Math.random() * Math.PI * 2
        });
      }

      addDarkroomRipple(darkroomCanvas.width * 0.5, darkroomCanvas.height * 0.45, 0.8);
      darkroomLastAutoDrop = performance.now();

      if (darkroomRippleAnimId) cancelAnimationFrame(darkroomRippleAnimId);

      const render = (now) => {
        if (!darkroomCtx || darkroomCanvas.width === 0) return;

        if (now - darkroomLastAutoDrop > 2400) {
          darkroomLastAutoDrop = now;
          const rx = darkroomCanvas.width * (0.35 + Math.random() * 0.3);
          const ry = darkroomCanvas.height * (0.35 + Math.random() * 0.3);
          addDarkroomRipple(rx, ry, 0.5);
        }

        darkroomCtx.clearRect(0, 0, darkroomCanvas.width, darkroomCanvas.height);

        for (let i = darkroomRipples.length - 1; i >= 0; i--) {
          const r = darkroomRipples[i];
          r.radius += r.speed;
          const progress = r.radius / r.maxRadius;
          const curAlpha = r.alpha * (1 - progress);

          if (progress >= 1 || curAlpha <= 0.005) {
            darkroomRipples.splice(i, 1);
            continue;
          }

          darkroomCtx.beginPath();
          darkroomCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          darkroomCtx.lineWidth = Math.max(0.8, (1.8 * (1 - progress * 0.7)) * (window.devicePixelRatio || 1));
          darkroomCtx.strokeStyle = \`rgba(17, 17, 17, \${curAlpha.toFixed(3)})\`;
          darkroomCtx.stroke();

          if (r.radius > 18 * (window.devicePixelRatio || 1)) {
            darkroomCtx.beginPath();
            darkroomCtx.arc(r.x, r.y, Math.max(1, r.radius - 12 * (window.devicePixelRatio || 1)), 0, Math.PI * 2);
            darkroomCtx.lineWidth = 0.8 * (window.devicePixelRatio || 1);
            darkroomCtx.strokeStyle = \`rgba(30, 30, 30, \${(curAlpha * 0.35).toFixed(3)})\`;
            darkroomCtx.stroke();
          }
        }

        for (let i = 0; i < silverParticles.length; i++) {
          const p = silverParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.pulse += 0.02;

          // Wrap boundaries
          if (p.x < 0) p.x = darkroomCanvas.width;
          if (p.x > darkroomCanvas.width) p.x = 0;
          if (p.y < 0) p.y = darkroomCanvas.height;
          if (p.y > darkroomCanvas.height) p.y = 0;

          const alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.pulse));
          darkroomCtx.beginPath();
          darkroomCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          darkroomCtx.fillStyle = \`rgba(18, 18, 18, \${alpha.toFixed(3)})\`;
          darkroomCtx.fill();
        }

        darkroomRippleAnimId = requestAnimationFrame(render);
      };

      darkroomRippleAnimId = requestAnimationFrame(render);
    }

    function stopDarkroomAgitationLoop() {
      if (darkroomRippleAnimId) {
        cancelAnimationFrame(darkroomRippleAnimId);
        darkroomRippleAnimId = null;
      }
      darkroomRipples.length = 0;
      silverParticles.length = 0;
      // Instant VRAM release: resetting width/height clears GPU backing store
      if (darkroomCanvas) {
        darkroomCanvas.width = 0;
        darkroomCanvas.height = 0;
      }
    }

    let generationAbortController = null;
    let activeMilestoneTimers = [];

    function cancelGeneration() {
      stopDarkroomAgitationLoop();
      if (generationAbortController) {
        try { generationAbortController.abort(); } catch (_) { }
        generationAbortController = null;
      }
      activeMilestoneTimers.forEach(clearTimeout);
      activeMilestoneTimers = [];

      const loader = document.getElementById("loader");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 200);
      }
      triggerHaptic(8);
      soundEngine.playDialClick();
      showToast("Exposure cancelled");
    }

    function preloadAndDecodeImage(url, timeoutMs = 7000) {
      return new Promise((resolve, reject) => {
        let settled = false;
        const img = new Image();
        if (url && !url.startsWith('data:')) {
          img.crossOrigin = "anonymous";
        }

        const timer = setTimeout(() => {
          if (!settled) {
            settled = true;
            img.src = "";
            reject(new Error('Image preload timeout'));
          }
        }, timeoutMs);

        const onFinish = () => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
              resolve(img);
            } else {
              reject(new Error('Image has zero dimensions'));
            }
          }
        };

        const tryDecode = () => {
          if (typeof img.decode === 'function') {
            img.decode().then(onFinish).catch((decodeErr) => {
              if (!settled) {
                settled = true;
                clearTimeout(timer);
                reject(decodeErr || new Error('Image decode failed'));
              }
            });
          } else {
            onFinish();
          }
        };

        img.onload = tryDecode;
        img.onerror = () => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            reject(new Error('Image network load failed'));
          }
        };
        img.src = url;

        if (img.complete && img.naturalWidth > 0) {
          tryDecode();
        }
      });
    }

    async function startGeneration() {
      const tGenerationStart = performance.now();
      if (!isUserUploaded || !userPhotoUrl) {
        triggerHaptic(12);
        soundEngine.playDialClick();
        showToast("Please introduce your pet to begin bespoke draping");
        const fileInput = document.getElementById("file-input");
        if (fileInput) fileInput.click();
        return;
      }

      triggerHaptic(12);
      soundEngine.playShutterSnap();
      const currentTpl = ALL_TEMPLATES[currentDeckIndex] || ALL_TEMPLATES[0];
      activeThemeKey = currentTpl.categoryKey;
      activeTemplateId = currentTpl.id;
      const theme = THEMES[activeThemeKey];
      const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];
      trackEvent("generate_clicked", { theme: activeThemeKey, template: tpl.id, is_user_uploaded: isUserUploaded });

      const loader = document.getElementById("loader");
      const phaseTitle = document.getElementById("loader-phase-title");
      const phaseSub = document.getElementById("loader-phase-sub");

      loader.style.display = "flex";
      loader.style.opacity = "1";
      startDarkroomAgitationLoop();

      if (generationAbortController) {
        try { generationAbortController.abort(); } catch (_) { }
      }
      generationAbortController = new AbortController();
      activeMilestoneTimers.forEach(clearTimeout);
      activeMilestoneTimers = [];

      const phases = [
        { t: 0, text: "Analyzing facial features", sub: "Detecting subject lighting & geometry" },
        { t: 1200, text: "Styling bespoke couture", sub: "Tailoring high-fashion silhouette" },
        { t: 3200, text: "Sculpting studio lighting", sub: "Calibrating contrast & depth" },
        { t: 6500, text: "Developing darkroom print", sub: "Polishing 1080P artistic fidelity" },
        { t: 12000, text: "Finalizing editorial cover", sub: "Harmonizing tones & texture" }
      ];

      phases.forEach(p => {
        const tid = setTimeout(() => {
          if (phaseTitle) phaseTitle.innerText = p.text;
          if (phaseSub) phaseSub.innerText = p.sub;
          triggerHaptic(5);
        }, p.t);
        activeMilestoneTimers.push(tid);
      });

      let finalPosterImg = null;
      let responseData = null;
      let isSuccess = false;
      let failureMsg = "";

      const effectiveImageBase64 = userPhotoUrl;

      try {
        const payload = {
          styleKey: theme.backendTheme || "corporate",
          themeId: theme.backendTheme || "corporate",
          itemId: tpl.id,
          templateId: tpl.id,
          petName: "Milo",
          imageBase64: effectiveImageBase64 || undefined,
          isDefaultSample: false,
          referenceImageUrl: undefined
        };

        const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '3000';
        const isPages = window.location.hostname.endsWith('pages.dev');
        let endpoint = isLocal
          ? 'http://127.0.0.1:8787/api/generate'
          : (isPages ? 'https://vivibon-cover-worker.zhoumiaoyin1.workers.dev/api/generate' : '/api/generate');

        const reqTimestamp = Date.now().toString();
        const reqNonce = (typeof crypto !== 'undefined' && crypto.randomUUID)
          ? crypto.randomUUID()
          : (Math.random().toString(36).slice(2) + Date.now().toString(36));

        const requestHeaders = {
          'Content-Type': 'application/json',
          'x-request-timestamp': reqTimestamp,
          'x-request-nonce': reqNonce
        };

        const tFetchStart = performance.now();
        let res;
        try {
          res = await fetch(endpoint, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(payload),
            signal: generationAbortController.signal
          });
        } catch (fetchErr) {
          if (endpoint.includes('127.0.0.1:8787') && !generationAbortController.signal.aborted) {
            console.warn('[Network Resilience] Local 8787 unreachable, auto-routing to production cloud worker...');
            endpoint = 'https://vivibon-cover-worker.zhoumiaoyin1.workers.dev/api/generate';
            res = await fetch(endpoint, {
              method: 'POST',
              headers: requestHeaders,
              body: JSON.stringify(payload),
              signal: generationAbortController.signal
            });
          } else {
            throw fetchErr;
          }
        }

        const tFetchDone = performance.now();
        if (!res.ok) {
          throw new Error(\`Server returned status: \${res.status}\`);
        }

        const json = await res.json();
        if (json.success && json.data && json.data.imageUrl) {
          responseData = json.data;
          finalPosterImg = json.data.imageUrl;
          isSuccess = true;
        } else {
          throw new Error(json.error || "Generation payload incomplete");
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.warn('[Studio Fallback]:', err);
        failureMsg = err.message || "Failed";
        // Graceful degradation: Fallback to benchmark preset
        finalPosterImg = tpl.img;
        isSuccess = true;
      }

      activeMilestoneTimers.forEach(clearTimeout);
      activeMilestoneTimers = [];

      if (!isSuccess || !finalPosterImg) {
        stopDarkroomAgitationLoop();
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 200);
        openErrorModal("Studio Queue Busy", "High demand on rendering servers. Your pet photo and chosen style have been safely preserved.");
        return;
      }

      // 1. \u663E\u5F71\u7EC8\u7AE0\u60C5\u611F\u8FC7\u6E21 (Emotional Darkroom Transition)
      if (phaseTitle) phaseTitle.innerText = "Developing darkroom print";
      if (phaseSub) phaseSub.innerText = "Unveiling 1080P high fashion masterwork";

      // 2. GPU \u663E\u5B58\u9759\u9ED8\u9884\u5149\u6805\u5316\u95E8\u7981 (In-Memory GPU Pre-Decode Gate)
      let decodedImageElement = null;
      try {
        decodedImageElement = await preloadAndDecodeImage(finalPosterImg, 8000);
      } catch (e) {
        console.warn("[Pre-decode warning -> Auto Healing Degradation]:", e);
        // NC-4 \u4F18\u96C5\u81EA\u6108\uFF1A\u82E5\u751F\u6210\u56FE\u7247\u7F51\u7EDC\u4E0B\u8F7D\u622A\u65AD\u6216\u635F\u574F\uFF0C\u6BEB\u79D2\u7EA7\u964D\u7EA7\u81F3\u6807\u6746\u9884\u7F6E\u6837\u7247
        finalPosterImg = tpl.img;
        try {
          decodedImageElement = await preloadAndDecodeImage(finalPosterImg, 4000);
        } catch (_) {}
      }

      // 3. \u8BBE\u7F6E\u6210\u7247\u5E76\u65BD\u52A0\u5B9A\u683C\u521D\u59CB\u6001
      const displayImg = document.getElementById("res-display-img");
      displayImg.classList.add("unveiling");
      displayImg.src = finalPosterImg;

      // 4. \u591A\u5DF4\u80FA\u5FAE\u8109\u51B2\u4E0E\u673A\u68B0\u54AC\u5408\u58F0\u5B66\u53CD\u9988
      triggerHaptic(10);
      soundEngine.playDialClick();

      // 5. \u5E73\u6ED1\u63ED\u6653\u906E\u7F69\u5E76\u5B9A\u683C\u6D6E\u73B0\u6210\u7247 (Silk Cross-Fade & Scale Lock)
      loader.style.opacity = "0";
      setTimeout(() => {
        stopDarkroomAgitationLoop();
        loader.style.display = "none";
        document.getElementById("view-entry").style.display = "none";
        const resView = document.getElementById("view-result");
        resView.style.display = "flex";
        document.getElementById("header-back-btn").style.display = "flex";
        startResultParallax();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            displayImg.classList.remove("unveiling");
          });
        });

        preparePosterCache(finalPosterImg, decodedImageElement);
      }, 200);
    }

    // ==========================================
    // OPTION D: Sotheby's 3D Micro-Parallax & Bespoke Embossed Seal
    // ==========================================
    let parallaxRafId = null;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let isParallaxActive = false;

    function initResultParallax() {
      const stage = document.querySelector(".poster-stage");
      if (!stage) return;

      const handlePointerMove = (e) => {
        if (!isParallaxActive) return;
        const rect = stage.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const nx = (clientX - (rect.left + rect.width * 0.5)) / (rect.width * 0.5);
        const ny = (clientY - (rect.top + rect.height * 0.5)) / (rect.height * 0.5);
        targetTiltY = Math.max(-1, Math.min(1, nx)) * 4.6;
        targetTiltX = -Math.max(-1, Math.min(1, ny)) * 4.6;
      };

      const handlePointerLeave = () => {
        targetTiltX = 0;
        targetTiltY = 0;
      };

      stage.addEventListener("pointermove", handlePointerMove);
      stage.addEventListener("pointerleave", handlePointerLeave);

      const handleOrientation = (e) => {
        if (!isParallaxActive || e.gamma === null || e.beta === null) return;
        const gamma = Math.max(-25, Math.min(25, e.gamma));
        const beta = Math.max(-25, Math.min(25, e.beta - 45));
        targetTiltY = (gamma / 25) * 4.6;
        targetTiltX = -(beta / 25) * 4.6;
      };

      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      }
    }

    function startResultParallax() {
      const stage = document.querySelector(".poster-stage");
      if (!stage) return;
      isParallaxActive = true;
      targetTiltX = 0;
      targetTiltY = 0;
      currentTiltX = 0;
      currentTiltY = 0;

      if (parallaxRafId) cancelAnimationFrame(parallaxRafId);

      const loop = () => {
        if (!isParallaxActive) return;
        currentTiltX += (targetTiltX - currentTiltX) * 0.12;
        currentTiltY += (targetTiltY - currentTiltY) * 0.12;

        stage.style.transform = \`perspective(1000px) rotateX(\${currentTiltX.toFixed(2)}deg) rotateY(\${currentTiltY.toFixed(2)}deg)\`;

        parallaxRafId = requestAnimationFrame(loop);
      };

      parallaxRafId = requestAnimationFrame(loop);
    }

    function stopResultParallax() {
      isParallaxActive = false;
      if (parallaxRafId) {
        cancelAnimationFrame(parallaxRafId);
        parallaxRafId = null;
      }
      const stage = document.querySelector(".poster-stage");
      if (stage) {
        stage.style.transform = "";
      }
    }

    function drawEmbossedSeal(ctx, width, height, petName = "MILO") {
      const cx = width - 128, cy = height - 138, r = 66;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx - 0.9, cy - 0.9, r, 0, Math.PI * 2);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.36)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx + 1.1, cy + 1.1, r, 0, Math.PI * 2);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(10, 10, 10, 0.44)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx - 0.7, cy - 0.7, r - 9, 0, Math.PI * 2);
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx + 0.9, cy + 0.9, r - 9, 0, Math.PI * 2);
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgba(10, 10, 10, 0.35)";
      ctx.stroke();

      function drawArcText(text, radius, startAngle, endAngle, outward = true) {
        const chars = text.split("");
        const angleStep = (endAngle - startAngle) / Math.max(chars.length - 1, 1);
        for (let i = 0; i < chars.length; i++) {
          const angle = startAngle + i * angleStep;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.translate(0, outward ? -radius : radius);
          if (!outward) ctx.rotate(Math.PI);
          ctx.font = "bold 7.5px 'Bodoni MT', 'Didot', 'Georgia', serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(10, 10, 10, 0.40)";
          ctx.fillText(chars[i], 0.7, 0.7);
          ctx.fillStyle = "rgba(255, 255, 255, 0.34)";
          ctx.fillText(chars[i], -0.6, -0.6);
          ctx.restore();
        }
      }

      drawArcText("VIVIBON \xB7 HAUTE COUTURE", r - 16, -Math.PI * 0.78, -Math.PI * 0.22, true);
      drawArcText("ARCHIVAL PROOF \xB7 1 OF 1", r - 16, Math.PI * 0.78, Math.PI * 0.22, false);

      ctx.font = "italic bold 17px 'Bodoni MT', 'Didot', 'Georgia', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(10, 10, 10, 0.42)";
      ctx.fillText("VB", cx + 0.9, cy + 0.9);
      ctx.fillStyle = "rgba(255, 255, 255, 0.36)";
      ctx.fillText("VB", cx - 0.7, cy - 0.7);

      const drawFlankDot = (dx, dy) => {
        ctx.beginPath();
        ctx.arc(cx + dx + 0.6, cy + dy + 0.6, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 10, 10, 0.38)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + dx - 0.5, cy + dy - 0.5, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
        ctx.fill();
      };
      drawFlankDot(-25, 0);
      drawFlankDot(25, 0);
      ctx.restore();
    }

    function backToEntry() {
      stopResultParallax();
      triggerHaptic(8);
      soundEngine.playDialClick();
      if (typeof window.resetCompareState === 'function') {
        window.resetCompareState();
      }
      document.getElementById("view-result").style.display = "none";
      document.getElementById("header-back-btn").style.display = "none";
      const entryView = document.getElementById("view-entry");
      entryView.style.display = "flex";
      applyDeckProgress(deckProgress);
    }

    function initCompareEvents() {
      const btn = document.getElementById("compare-btn");
      const label = document.getElementById("compare-label");
      const originalLayer = document.getElementById("res-original-img");
      if (!btn || !originalLayer) return;

      let isHolding = false;
      let isToggled = false;
      let pressStartTime = 0;

      function setCompareState(visible) {
        if (visible) {
          originalLayer.style.opacity = "1";
          btn.classList.add("active");
          btn.setAttribute("aria-pressed", "true");
          if (label) label.textContent = "Original";
        } else {
          originalLayer.style.opacity = "0";
          btn.classList.remove("active");
          btn.setAttribute("aria-pressed", "false");
          if (label) label.textContent = "Hold to compare";
        }
      }

      window.resetCompareState = function () {
        isHolding = false;
        isToggled = false;
        setCompareState(false);
      };

      const handlePointerDown = (e) => {
        if (e) {
          e.stopPropagation();
          if (e.cancelable) e.preventDefault();
        }
        pressStartTime = performance.now();
        isHolding = true;
        triggerHaptic(6);
        soundEngine.playDialClick();

        if (isToggled) {
          setCompareState(false);
        } else {
          setCompareState(true);
        }
      };

      const handlePointerUp = (e) => {
        if (!isHolding) return;
        isHolding = false;
        const duration = performance.now() - pressStartTime;
        triggerHaptic(6);

        if (duration < 280) {
          isToggled = !isToggled;
          setCompareState(isToggled);
        } else {
          isToggled = false;
          setCompareState(false);
        }
      };

      btn.addEventListener("pointerdown", handlePointerDown);
      btn.addEventListener("pointerup", handlePointerUp);
      btn.addEventListener("pointercancel", () => {
        if (isHolding) {
          isHolding = false;
          isToggled = false;
          setCompareState(false);
        }
      });
    }

    let cachedPosterBlob = null;
    let cachedPosterFile = null;
    let isPreparingCache = false;

    async function preparePosterCache(imgSrc, preloadedImg) {
      if (isPreparingCache) return;
      isPreparingCache = true;

      try {
        const theme = THEMES[activeThemeKey];
        const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];

        const canvas = document.getElementById("render-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = 1080;
        const height = 1440;
        canvas.width = width;
        canvas.height = height;

        let img = (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0)
          ? preloadedImg
          : null;

        if (!img) {
          img = new Image();
          const targetSrc = imgSrc || document.getElementById("res-display-img").src;
          if (targetSrc && !targetSrc.startsWith('data:')) {
            img.crossOrigin = "anonymous";
          }
          img.src = targetSrc;

          await new Promise((resolve, reject) => {
            const onDone = () => {
              if (typeof img.decode === 'function') {
                img.decode().then(resolve).catch(reject);
              } else {
                resolve();
              }
            };
            if (img.complete && img.naturalWidth > 0) return onDone();
            img.onload = onDone;
            img.onerror = () => reject(new Error('Image failed to load in preparePosterCache'));
          });
        }

        const targetRatio = width / height;
        const srcRatio = img.naturalWidth / img.naturalHeight;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

        if (srcRatio > targetRatio) {
          sw = img.naturalHeight * targetRatio;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / targetRatio;
          sy = (img.naturalHeight - sh) / 2;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

        drawEmbossedSeal(ctx, width, height, tpl.petName || "MILO");

        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              cachedPosterBlob = blob;
              cachedPosterFile = new File([blob], \`ViviBon-Cover-\${tpl.id}-\${Date.now()}.png\`, { type: 'image/png' });
              const displayImg = document.getElementById("res-display-img");
              if (displayImg) {
                try {
                  displayImg.src = URL.createObjectURL(blob);
                } catch (_) {}
              }
            }
            resolve();
          }, 'image/png');
        });
      } catch (e) {
        console.warn('[Poster Cache Self-Healing]: Image corrupted or failed, auto-healing to pristine sample:', e);
        try {
          const theme = THEMES[activeThemeKey];
          const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];
          const displayImg = document.getElementById("res-display-img");
          if (displayImg && tpl && tpl.img) {
            displayImg.src = tpl.img;
          }
        } catch (_) {}
      } finally {
        isPreparingCache = false;
      }
    }

    async function exportPoster() {
      triggerHaptic(12);
      soundEngine.playShutterSnap();

      const theme = THEMES[activeThemeKey];
      const tpl = theme.templates.find(t => t.id === activeTemplateId) || theme.templates[0];

      if (!cachedPosterBlob || !cachedPosterFile) {
        await preparePosterCache();
      }

      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || 
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isRestrictedInApp = /MicroMessenger|WeChat|Weibo|Instagram|TikTok/i.test(navigator.userAgent);

      if (isMobile && !isRestrictedInApp && navigator.canShare && cachedPosterFile && navigator.canShare({ files: [cachedPosterFile] })) {
        try {
          await navigator.share({
            files: [cachedPosterFile],
            title: 'ViviBon Cover',
            text: 'ViviBon Bespoke Editorial Cover'
          });
          trackEvent("poster_saved_native_share", { theme: activeThemeKey, template: tpl.id });
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
          console.warn("Native share interrupted:", err);
        }
      }

      if (cachedPosterBlob) {
        try {
          const url = URL.createObjectURL(cachedPosterBlob);
          const a = document.createElement("a");
          a.download = \`ViviBon-Cover-\${tpl.id}-\${Date.now()}.png\`;
          a.href = url;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          showToast("Saved 1080P portrait to downloads");
          trackEvent("poster_saved_direct_download", { theme: activeThemeKey, template: tpl.id });
          return;
        } catch (downloadErr) {
          console.warn("Direct blob download failed:", downloadErr);
        }
      }

      showToast("Press & hold portrait above to save to Photos", 3000);
    }

    function openErrorModal(title, message) {
      triggerHaptic(15);
      const modal = document.getElementById("error-modal");
      if (!modal) return;
      if (title) document.getElementById("error-modal-title").innerText = title;
      if (message) document.getElementById("error-modal-desc").innerText = message;
      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("active");
      });
    }

    function closeErrorModal(e) {
      if (e) e.stopPropagation();
      triggerHaptic(6);
      soundEngine.playDialClick();
      const modal = document.getElementById("error-modal");
      if (modal) {
        modal.classList.remove("active");
        setTimeout(() => {
          modal.style.display = "none";
        }, 250);
      }
    }

    function retryGeneration() {
      const modal = document.getElementById("error-modal");
      if (modal) {
        modal.classList.remove("active");
        setTimeout(() => {
          modal.style.display = "none";
          startGeneration();
        }, 200);
      } else {
        startGeneration();
      }
    }

    function preloadAllTemplateThumbnails() {
      const activeTheme = THEMES[activeThemeKey];
      if (activeTheme && activeTheme.templates) {
        activeTheme.templates.forEach(tpl => {
          const img = new Image();
          img.src = tpl.img;
        });
      }

      const preloadRemaining = () => {
        Object.keys(THEMES).forEach(k => {
          if (k === activeThemeKey) return;
          const theme = THEMES[k];
          if (theme && theme.templates) {
            theme.templates.forEach(tpl => {
              const img = new Image();
              img.src = tpl.img;
            });
          }
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadRemaining, { timeout: 1500 });
      } else {
        setTimeout(preloadRemaining, 300);
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      preloadAllTemplateThumbnails();
      renderDeckStage();
      updateScrubberUI();
      initDeckGestures();
      initScrubberGestures();
      initDarkroomAgitation();
      initResultParallax();
      window.addEventListener('resize', () => updateScrubberUI());
      initCompareEvents();

      if ('fonts' in document) {
        try {
          document.fonts.load('bold 48px "Didot"').catch(() => {});
          document.fonts.load('bold 48px "Bodoni MT"').catch(() => {});
        } catch (_) {}
      }
    });
  </script>
</body>

</html>`;

// src/index.ts
var createApp = (customFalService, rateLimiterOpts) => {
  const app2 = new import_hono5.Hono();
  app2.use("*", loggerMiddleware());
  app2.use("*", corsMiddleware());
  app2.use("/api/generate", antiBotMiddleware());
  app2.use("/api/generate", rateLimiterMiddleware(rateLimiterOpts));
  app2.get("/", (c) => c.html(public_default));
  app2.get("/index.html", (c) => c.html(public_default));
  app2.route("/api/ping", pingRouter);
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
  app2.all("/api/test/pruna", async (c) => {
    if (!c.env.AI) {
      return c.json({ success: false, error: "Cloudflare AI binding (env.AI) is not available" }, 500);
    }
    const t0 = Date.now();
    try {
      let prompt = "Transform this pet into a 17th century baroque royal oil painting portrait wearing golden embroidered luxury velvet costume";
      let images = ["https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg"];
      let aspectRatio = "3:4";
      let turbo = true;
      if (c.req.method === "POST") {
        const body = await c.req.json().catch(() => ({}));
        if (body.prompt) prompt = body.prompt;
        if (Array.isArray(body.images) && body.images.length > 0) images = body.images;
        if (body.aspectRatio) aspectRatio = body.aspectRatio;
        if (typeof body.turbo === "boolean") turbo = body.turbo;
      }
      const aiResponse = await c.env.AI.run("pruna/p-image-edit", {
        prompt,
        images,
        aspect_ratio: aspectRatio,
        turbo,
        disable_safety_checker: false
      });
      const latencyMs = Date.now() - t0;
      return c.json({
        success: true,
        model: "pruna/p-image-edit",
        latencyMs,
        response: aiResponse
      });
    } catch (err) {
      const latencyMs = Date.now() - t0;
      return c.json({
        success: false,
        model: "pruna/p-image-edit",
        latencyMs,
        error: err?.message || String(err),
        stack: err?.stack
      }, 500);
    }
  });
  app2.all("/api/test/flux2", async (c) => {
    if (!c.env.AI) {
      return c.json({ success: false, error: "Cloudflare AI binding (env.AI) is not available" }, 500);
    }
    const t0 = Date.now();
    const modelId = c.req.query("model") || "@cf/black-forest-labs/flux-2-klein-4b";
    try {
      const formData = new FormData();
      formData.append("prompt", "A cute fluffy orange cat sitting gracefully, baroque royal oil painting portrait");
      if (c.req.method === "POST") {
        const body = await c.req.json().catch(() => ({}));
        if (body.prompt) {
          formData.set("prompt", body.prompt);
        }
        if (body.image) {
          const base64Data = body.image.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Uint8Array.from(atob(base64Data), (c2) => c2.charCodeAt(0));
          const blob = new Blob([buffer], { type: "image/jpeg" });
          formData.append("image", blob, "input.jpg");
        }
      }
      let bodyPayload = {
        prompt: "A cute fluffy orange cat, baroque oil painting portrait"
      };
      if (c.req.method === "POST") {
        const custom = await c.req.json().catch(() => ({}));
        if (custom.body) {
          bodyPayload = custom.body;
        } else if (custom.prompt) {
          bodyPayload.prompt = custom.prompt;
        }
      }
      let result1, error1;
      try {
        result1 = await c.env.AI.run(modelId, {
          multipart: {
            contentType: "multipart/form-data",
            body: bodyPayload
          }
        });
      } catch (e) {
        error1 = e.message;
      }
      const latencyMs = Date.now() - t0;
      return c.json({
        model: modelId,
        latencyMs,
        sentBody: bodyPayload,
        result1,
        error1
      });
    } catch (err) {
      const latencyMs = Date.now() - t0;
      return c.json({
        success: false,
        model: modelId,
        latencyMs,
        error: err?.message || String(err),
        stack: err?.stack
      }, 500);
    }
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
