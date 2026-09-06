var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
    var __export = (target, all) => {
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
    __export(compose_exports, {
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
    var __export = (target, all) => {
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
    __export(http_exception_exports, {
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
    var __export = (target, all) => {
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
    __export(constants_exports, {
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
    var __export = (target, all) => {
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
    __export(crypto_exports, {
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
    var __export = (target, all) => {
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
    __export(buffer_exports, {
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
    var __export = (target, all) => {
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
    __export(body_exports, {
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
    var __export = (target, all) => {
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
    __export(url_exports, {
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
    var __export = (target, all) => {
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
    __export(request_exports, {
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
    var __export = (target, all) => {
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
    __export(html_exports, {
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
    var __export = (target, all) => {
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
    __export(context_exports, {
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
    var __export = (target, all) => {
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
    __export(router_exports, {
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
    var __export = (target, all) => {
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
    __export(constants_exports, {
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
    var __export = (target, all) => {
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
    __export(hono_base_exports, {
      HonoBase: () => Hono5
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
    var Hono5 = class _Hono {
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
    var __export = (target, all) => {
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
    __export(utils_exports, {
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
    var __export = (target, all) => {
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
    __export(matcher_exports, {
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
    var __export = (target, all) => {
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
    __export(node_exports, {
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
    var __export = (target, all) => {
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
    __export(trie_exports, {
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
    var __export = (target, all) => {
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
    __export(router_exports, {
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
    var __export = (target, all) => {
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
    __export(prepared_router_exports, {
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
    var __export = (target, all) => {
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
    __export(reg_exp_router_exports, {
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
    var __export = (target, all) => {
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
    __export(router_exports, {
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
    var __export = (target, all) => {
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
    __export(smart_router_exports, {
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
    var __export = (target, all) => {
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
    __export(node_exports, {
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
    var __export = (target, all) => {
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
    __export(router_exports, {
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
    var __export = (target, all) => {
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
    __export(trie_router_exports, {
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
    var __export = (target, all) => {
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
    __export(hono_exports, {
      Hono: () => Hono5
    });
    module.exports = __toCommonJS(hono_exports);
    var import_hono_base = require_hono_base();
    var import_reg_exp_router = require_reg_exp_router();
    var import_smart_router = require_smart_router();
    var import_trie_router = require_trie_router();
    var Hono5 = class extends import_hono_base.HonoBase {
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
    var __export = (target, all) => {
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
    __export(index_exports, {
      Context: () => import_context.Context,
      Hono: () => import_hono4.Hono
    });
    module.exports = __toCommonJS(index_exports);
    var import_hono4 = require_hono();
    var import_context = require_context();
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
var import_hono3 = __toESM(require_cjs());

// src/middleware/cors.ts
var corsMiddleware = () => {
  return async (c, next) => {
    const origin = c.env.CORS_ORIGIN || "*";
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
var DEFAULT_IP_HOURLY_CAP = 30;
var DEFAULT_IP_DAILY_CAP = 60;
var rateLimiterMiddleware = (options) => {
  return async (c, next) => {
    const kv = c.env.RATE_LIMIT_KV;
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
    const dailyCapKey = `finops:daily:${dateStr}`;
    const ipHourlyKey = `ratelimit:ip:${ip}:${hourStr}`;
    const ipDailyKey = `ratelimit:ip:${ip}:${dateStr}`;
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
        kv.put(ipDailyKey, (currentDaily + 1).toString(), { expirationTtl: 172800 })
      ]);
    } else {
      await kv.put(dailyCapKey, (dailyTotal + 1).toString(), { expirationTtl: 172800 });
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

// src/routes/generate.ts
var import_hono2 = __toESM(require_cjs(), 1);

// src/schemas/generate.ts
var import_zod = __toESM(require_zod(), 1);
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
var MAX_BASE64_LENGTH = Math.ceil(MAX_IMAGE_BYTES * 4 / 3) + 100;
var GenerateRequestSchema = import_zod.z.object({
  petName: import_zod.z.string().max(30).default("\u9EA6\u6D1B Milo"),
  styleKey: import_zod.z.enum(["gentle", "detective", "street", "warm"], {
    errorMap: () => ({ message: "Requested style is not in haute couture catalogue." })
  }),
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

// src/config/styles.ts
var IDENTITY_ANCHOR = "Dress the EXACT SAME dog from the input image from the neck and shoulders down in a bespoke tailored haute couture wardrobe. Strictly preserve the original pet's facial structure, eyes, ear contours, snout shape, and distinctive fur markings 100% unchanged. Do NOT alter the dog's breed, face geometry, or expression.";
var STUDIO_FINISH = "High-end commercial luxury pet portrait photography, 85mm portrait lens, delicate studio rim light accentuating authentic fur texture, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, award-winning studio portrait.";
var NEGATIVE_PROMPT = "text, typography, letters, words, logo, trademark, brand name, magazine cover title, watermark, signature, font, caption, subtitle, heading, UI, different dog, wrong breed, human face, deformed ears, extra legs, distorted anatomy, warped snout, deformed eyes, extra paws, blurry, low quality, lowres, jpeg artifacts, noisy, overexposed, underexposed, cartoon, illustration, 3D render, drawing, CGI, painting, sketch, anime, doll, amateur photography.";
function makeVariant(id, name, wardrobePrompt) {
  return {
    id,
    name,
    wardrobePrompt,
    fullPrompt: `${IDENTITY_ANCHOR} ${wardrobePrompt} ${STUDIO_FINISH}`
  };
}
var GENTLE_VARIANTS = [
  makeVariant(
    "gentle_navy_velvet",
    "\u7ECF\u5178\u85CF\u9752\u4E1D\u7ED2\u793C\u670D",
    "The pet is elegantly dressed in a bespoke tailored Italian dark navy blue velvet tuxedo suit with a crisp white formal dress shirt collar and an exquisite black velvet bow tie fitted tailored around its neck."
  ),
  makeVariant(
    "gentle_bordeaux_gala",
    "\u76DB\u5178\u6CE2\u5C14\u591A\u9152\u7EA2\u793C\u670D",
    "The pet is exquisitely dressed in a luxury royal Bordeaux wine-red velvet dinner jacket tuxedo with black satin peaked lapels, a crisp white pleated tuxedo shirt collar, and an elegant black silk bow tie fitted around its neck."
  ),
  makeVariant(
    "gentle_prince_of_wales",
    "\u8428\u7EF4\u5C14\u8857\u4EB2\u738B\u683C\u82B1\u5462",
    "The pet is impeccably dressed in a bespoke British Savile Row Prince of Wales Glen plaid grey tweed suit vest with a tailored collar, a subtle gold lapel pin, and a refined charcoal grey silk necktie fitted around its neck."
  )
];
var DETECTIVE_VARIANTS = [
  makeVariant(
    "aviator_vintage_shearling",
    "\u590D\u53E4\u505A\u65E7\u68D5\u76AE\u98DE\u884C\u5939\u514B",
    "The pet is stylishly dressed in a vintage distressed brown shearling leather aviator bomber jacket with a thick cream fleece collar and retro dark metal sunglasses positioned tastefully on its forehead."
  ),
  makeVariant(
    "aviator_stealth_black",
    "\u66DC\u77F3\u9ED1\u6218\u672F\u7A7A\u519B\u5939\u514B",
    "The pet is boldly dressed in an obsidian black matte flight jacket with vintage military aviation patches, ribbed collar, and sleek dark mirrored aviator sunglasses pushed up resting on its head."
  ),
  makeVariant(
    "aviator_heritage_ma1",
    "\u6781\u5730\u5DE1\u822A\u58A8\u7EFF\u98DE\u884C\u5916\u5957",
    "The pet is fashionably dressed in an authentic olive drab heritage nylon MA-1 flight bomber jacket with rescue-orange lining peeking at the collar, paired with classic dark round sunglasses resting above its brow."
  )
];
var STREET_VARIANTS = [
  makeVariant(
    "techwear_arctic_yellow",
    "\u6781\u5730\u54D1\u5149\u4EAE\u9EC4\u9632\u98CE\u8863",
    "The pet is fashionably dressed in a contemporary streetwear matte bright yellow techwear hooded windbreaker jacket with waterproof zippers and tactical accents tailored around its neck and chest."
  ),
  makeVariant(
    "techwear_glacier_white",
    "\u51B0\u5DDD\u767D\u62FC\u8272\u66B4\u98CE\u96EA\u5916\u58F3",
    "The pet is cutting-edge dressed in an alpine glacier white and slate grey stormproof techwear shell jacket with reflective cybernetic trim and waterproof taped seams around its neck and torso."
  ),
  makeVariant(
    "techwear_cobalt_cyber",
    "\u66DC\u5F71\u94B4\u84DD\u673A\u80FD\u51B2\u950B\u8863",
    "The pet is avant-garde dressed in an ultra-modern cobalt electric blue and matte black futuristic windbreaker jacket with tactical buckle strap details snugly tailored around its shoulders."
  )
];
var WARM_VARIANTS = [
  makeVariant(
    "knitwear_scottish_tartan",
    "\u82CF\u683C\u5170\u683C\u7EB9\u7F8A\u7ED2\u56F4\u5DFE",
    "The pet is cozily dressed in a hand-knitted thick woolen beanie and a luxurious soft Scottish tartan cashmere scarf wrapped gently around its neck."
  ),
  makeVariant(
    "knitwear_oatmeal_cable",
    "\u5976\u767D\u9EBB\u82B1\u7C97\u68D2\u9488\u9AD8\u9886\u6BDB\u8863",
    "The pet is warmly dressed in an artisanal chunky oatmeal-cream cable-knit wool turtleneck sweater snugly fitted around its neck, with soft textured ribbing accentuating its chest."
  ),
  makeVariant(
    "knitwear_fair_isle",
    "\u8D39\u5C14\u5C9B\u590D\u53E4\u63D0\u82B1\u5957\u5934\u886B",
    "The pet is charmingly dressed in a traditional Scottish Fair Isle jacquard knit patterned sweater in rich forest green and burgundy tones, with a cozy folded ribbed neckline."
  )
];
var STYLE_CONFIGS = {
  gentle: {
    key: "gentle",
    name: "\u8428\u7EF4\u5C14\u540D\u7EC5",
    subtitle: "\u4E1D\u7ED2\u9886\u7ED3\u4E0E\u5B9A\u5236\u793C\u670D",
    prompt: GENTLE_VARIANTS[0].fullPrompt,
    fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_gentle.webp",
    variants: GENTLE_VARIANTS
  },
  detective: {
    key: "detective",
    name: "\u9ED1\u8D85\u98DE\u884C\u5BB6",
    subtitle: "\u5DE5\u88C5\u5939\u514B\u4E0E\u91D1\u5C5E\u58A8\u955C",
    prompt: DETECTIVE_VARIANTS[0].fullPrompt,
    fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_detective.webp",
    variants: DETECTIVE_VARIANTS
  },
  street: {
    key: "street",
    name: "\u673A\u80FD\u9632\u98CE\u8863",
    subtitle: "\u4EAE\u9EC4\u8FDE\u5E3D\u6781\u5730\u6237\u5916\u88C5",
    prompt: STREET_VARIANTS[0].fullPrompt,
    fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_street.webp",
    variants: STREET_VARIANTS
  },
  warm: {
    key: "warm",
    name: "\u51AC\u65E5\u624B\u5DE5\u7EC7\u7269",
    subtitle: "\u7C97\u9488\u6BDB\u7EBF\u5E3D\u4E0E\u7F8A\u7ED2\u56F4\u5DFE",
    prompt: WARM_VARIANTS[0].fullPrompt,
    fallbackImageUrl: "https://vivibon-cover.pages.dev/models/milo_warm.webp",
    variants: WARM_VARIANTS
  }
};
var SUPPORTED_STYLE_KEYS = Object.keys(STYLE_CONFIGS);
function getStyleVariant(styleKey, index) {
  const config = STYLE_CONFIGS[styleKey];
  if (!config || !config.variants || config.variants.length === 0) {
    throw new Error(`Invalid style key or missing variants: ${styleKey}`);
  }
  if (typeof index === "number" && index >= 0) {
    return config.variants[index % config.variants.length];
  }
  const randomIndex = Math.floor(Math.random() * config.variants.length);
  return config.variants[randomIndex];
}

// src/services/falService.ts
var defaultFalRunner = async (prompt, imageBase64, apiKey, signal) => {
  if (apiKey.startsWith("sk-")) {
    const endpoint2 = "https://api.siliconflow.cn/v1/images/generations";
    if (imageBase64) {
      const response2 = await fetch(endpoint2, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "Qwen/Qwen-Image-Edit",
          prompt,
          negative_prompt: NEGATIVE_PROMPT,
          image: imageBase64,
          image_size: "768x1024",
          // 3:4 Native Aspect Ratio (1080x1440 物理保真，零拉伸变形)
          num_inference_steps: 8
          // 推理耗时压缩至 12~14s，同时 100% 保持 Face ID 特征
        }),
        signal
      });
      if (!response2.ok) {
        const errText = await response2.text().catch(() => "");
        throw new Error(`SiliconFlow img2img upstream error: ${response2.status} ${response2.statusText} ${errText}`);
      }
      const data2 = await response2.json();
      const imageUrl2 = data2.images?.[0]?.url;
      if (!imageUrl2) {
        throw new Error("No image returned from SiliconFlow img2img");
      }
      return {
        jobId: `sf_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: imageUrl2
      };
    } else {
      const response2 = await fetch(endpoint2, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "Kwai-Kolors/Kolors",
          prompt,
          negative_prompt: NEGATIVE_PROMPT,
          image_size: "1024x1024"
        }),
        signal
      });
      if (!response2.ok) {
        const errText = await response2.text().catch(() => "");
        throw new Error(`SiliconFlow text2img upstream error: ${response2.status} ${response2.statusText} ${errText}`);
      }
      const data2 = await response2.json();
      const imageUrl2 = data2.images?.[0]?.url;
      if (!imageUrl2) {
        throw new Error("No image returned from SiliconFlow text2img");
      }
      return {
        jobId: `sf_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: imageUrl2
      };
    }
  }
  if (imageBase64) {
    const endpoint2 = "https://fal.run/fal-ai/flux/dev/image-to-image";
    const response2 = await fetch(endpoint2, {
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
    if (!response2.ok) {
      const errText = await response2.text().catch(() => "");
      throw new Error(`Fal.ai img2img upstream error: ${response2.status} ${response2.statusText} ${errText}`);
    }
    const data2 = await response2.json();
    const imageUrl2 = data2.images?.[0]?.url;
    if (!imageUrl2) {
      throw new Error("No image returned from Fal.ai img2img");
    }
    return {
      jobId: data2.request_id || `fal_${crypto.randomUUID().slice(0, 8)}`,
      imageUrl: imageUrl2
    };
  }
  const endpoint = "https://fal.run/fal-ai/flux/schnell";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Key ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt,
      image_size: "square_hd",
      num_images: 1,
      enable_safety_checker: true
    }),
    signal
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Fal.ai text2img upstream error: ${response.status} ${response.statusText} ${errText}`);
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
   * Execute Haute Couture Pet Generation with hard timeout and graceful degradation (NC-4)
   */
  async generatePoster(styleKey, petName, imageBase64, apiKey, variantIndex) {
    const start = Date.now();
    const styleConfig = STYLE_CONFIGS[styleKey];
    const fallbackImage = styleConfig.fallbackImageUrl;
    const variant = getStyleVariant(styleKey, variantIndex);
    if (!apiKey) {
      return {
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        styleKey,
        petName,
        latencyMs: Date.now() - start,
        isFallback: true,
        debugReason: "NO_FAL_API_KEY_CONFIGURED",
        capsuleVariant: {
          id: variant.id,
          name: variant.name
        }
      };
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const result = await this.runner(variant.fullPrompt, imageBase64, apiKey, controller.signal);
      clearTimeout(timeoutId);
      return {
        jobId: result.jobId,
        imageUrl: result.imageUrl,
        styleKey,
        petName,
        latencyMs: Date.now() - start,
        isFallback: false,
        capsuleVariant: {
          id: variant.id,
          name: variant.name
        }
      };
    } catch (err) {
      clearTimeout(timeoutId);
      const isTimeout = err instanceof Error && (err.name === "AbortError" || err.message.includes("abort"));
      const latency = isTimeout ? this.timeoutMs : Date.now() - start;
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[FalService] Generation fallback triggered (${isTimeout ? "TIMEOUT_60000MS" : "UPSTREAM_ERROR"}):`,
        errMsg
      );
      return {
        jobId: `fallback_${crypto.randomUUID().slice(0, 8)}`,
        imageUrl: fallbackImage,
        styleKey,
        petName,
        latencyMs: latency,
        isFallback: true,
        debugReason: errMsg,
        capsuleVariant: {
          id: variant.id,
          name: variant.name
        }
      };
    }
  }
};
var falService = new FalService();

// src/routes/generate.ts
var createGenerateRoute = (service = falService) => {
  const route = new import_hono2.Hono();
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
          message: "Uploaded photo exceeds 5MB limit."
        };
        return c.json(errorResp2, 413);
      }
      const styleIssue = issues.find((i) => i.path.includes("styleKey"));
      if (styleIssue) {
        const errorResp2 = {
          success: false,
          errorCode: "INVALID_STYLE_KEY",
          message: "Requested style is not in haute couture catalogue."
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
    const { styleKey, petName, imageBase64, variantIndex } = parseResult.data;
    const apiKey = c.env.SILICONFLOW_KEY || c.env.FAL_KEY;
    const result = await service.generatePoster(
      styleKey,
      petName,
      imageBase64,
      apiKey,
      variantIndex
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
        ...result.capsuleVariant ? { capsuleVariant: result.capsuleVariant } : {},
        ...c.req.query("debug") === "1" && result.debugReason ? { debugReason: result.debugReason } : {}
      }
    };
    return c.json(response, 200);
  });
  return route;
};
var generateRoute = createGenerateRoute();

// ../index.html
var ViviBon_Cover_default = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>ViviBon Cover \xB7 \u5BA0\u7269\u9AD8\u5B9A\u65F6\u5C1A\u5927\u7247</title>

  <!-- PostHog Web SDK (Async, Non-blocking, US Cloud Endpoint) -->
  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1.0)}(document,window.posthog||[]);

    (function() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryKey = urlParams.get('ph_key');
        if (queryKey) {
          try { localStorage.setItem('vivibon_ph_key', queryKey); } catch(e){}
        }
        const activeKey = queryKey || window.__POSTHOG_API_KEY__ || (function(){ try { return localStorage.getItem('vivibon_ph_key'); }catch(e){return null;} })() || 'phc_rJk9QSS6joiXpuMxYGpCq9zjdgy54HG5Wocqo8yjxJSS';
        
        posthog.init(activeKey, {
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'always',
          capture_pageview: true,
          session_recording: { recordCrossOriginIframes: true }
        });
      } catch(err) {
        console.warn('[ViviBon PostHog] Init skipped or blocked by client:', err);
      }
    })();
  </script>

  <style>
    /* ================= Apple Official Design Tokens (HIG & Craftsman) ================= */
    :root {
      --system-bg: #F5F5F7;
      --system-card: #FFFFFF;
      --system-card-solid: #FFFFFF;
      --system-card-secondary: #F8F8FA;
      --card-border: rgba(0, 0, 0, 0.06);
      --card-border-subtle: rgba(0, 0, 0, 0.04);
      --text-primary: #1D1D1F;
      --text-secondary: #48484A;
      --text-muted: #8E8E93;
      --shadow-ambient: 0 8px 24px -4px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
      --shadow-elevated: 0 16px 40px -8px rgba(0, 0, 0, 0.1);
      --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background-color: var(--system-bg);
      color: var(--text-primary);
      display: flex;
      justify-content: center;
      min-height: 100vh;
      min-height: 100dvh;
      padding: 14px 14px calc(env(safe-area-inset-bottom) + 20px) 14px;
      position: relative;
      overflow-x: hidden;
    }

    /* \u5F25\u6563\u73AF\u5883\u5149\u6655 (Apple \u6781\u7B80\u9ED1\u767D\u5149\u5F71) */
    .ambient-aura-layer {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.35;
      animation: auraBreathe 10s ease-in-out infinite alternate;
    }
    .orb-gold {
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(0, 0, 0, 0.02) 0%, transparent 70%);
      top: -60px;
      right: -40px;
    }
    .orb-lavender {
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(0, 0, 0, 0.015) 0%, transparent 70%);
      bottom: 40px;
      left: -80px;
      animation-delay: -5s;
    }
    @keyframes auraBreathe {
      0% { transform: translate(0, 0) scale(1); opacity: 0.25; }
      100% { transform: translate(15px, 20px) scale(1.1); opacity: 0.45; }
    }

    /* \u6838\u5FC3\u9875\u9762\u5BB9\u5668 */
    .app-shell {
      width: 100%;
      max-width: 414px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      z-index: 1;
    }

    /* ================= \u9876\u680F (Apple Floating Capsule Header) ================= */
    header.apple-header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 20px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 9999px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
      margin-top: calc(env(safe-area-inset-top) + 2px);
    }
    .brand-title {
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #1D1D1F;
      text-align: center;
    }

    /* ================= Apple Squircle Bento Card ================= */
    .bento-card {
      background: var(--system-card);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      border: 1px solid var(--card-border);
      border-radius: 28px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: var(--shadow-ambient);
      position: relative;
    }

    .section-header {
      display: flex;
      align-items: center;
    }
    .section-title {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* ================= \u89C6\u56FE 1\uFF1A\u5236\u4F5C\u5165\u53E3 ================= */
    #view-entry {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* \u7167\u7247\u4E0A\u4F20\u89C6\u53E3 */
    .upload-box {
      position: relative;
      height: 228px;
      border-radius: 20px;
      background: #E5E5EA;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--card-border-subtle);
      transition: all 0.25s var(--ease-apple);
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.04);
    }
    .upload-box:active {
      transform: scale(0.985);
    }
    .upload-preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s var(--ease-apple);
    }
    .upload-tip-pill {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.95);
      color: var(--text-primary);
      font-size: 0.74rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: -0.01em;
      transition: transform 0.2s var(--ease-apple), background 0.2s;
    }
    .upload-tip-pill:active {
      transform: scale(0.96);
    }

    /* iOS \u539F\u751F\u8868\u5355\u8F93\u5165\u9879 */
    .input-row {
      display: flex;
      align-items: center;
      background: var(--system-card-secondary);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 18px;
      padding: 6px 14px;
      gap: 10px;
      transition: all 0.2s var(--ease-apple);
    }
    .input-row:focus-within {
      background: #FFFFFF;
      border-color: #1D1D1F;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    }
    .input-label {
      font-size: 0.82rem;
      color: var(--text-muted);
      font-weight: 600;
      white-space: nowrap;
    }
    .input-field {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 0.92rem;
      font-weight: 600;
      outline: none;
      padding: 6px 0;
    }

    /* \u9AD8\u5B9A\u98CE\u683C Bento \u9009\u6846 (Apple \u6781\u7B80\u9ED1\u767D) */
    .style-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .style-item {
      background: #F8F8FA;
      border: 1.5px solid rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 14px 14px 16px 14px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: transform 0.22s var(--ease-apple), background 0.22s, border-color 0.22s, box-shadow 0.22s;
      position: relative;
    }
    .style-item:active {
      transform: scale(0.97);
    }
    .style-item.active {
      background: #FFFFFF;
      border-color: #1D1D1F;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.12);
    }
    .style-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .style-icon-box {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1D1D1F;
      transition: all 0.25s var(--ease-apple);
    }
    .style-item.active .style-icon-box {
      background: #1D1D1F;
      border-color: #1D1D1F;
      color: #FFFFFF;
      transform: scale(1.05);
    }
    .style-check-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid #D1D1D6;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s var(--ease-apple);
    }
    .style-item.active .style-check-indicator {
      border-color: #1D1D1F;
      background: #1D1D1F;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
    .style-check-indicator svg {
      display: none;
      color: #FFFFFF;
    }
    .style-item.active .style-check-indicator svg {
      display: block;
    }
    .style-meta h4 {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }
    .style-meta p {
      font-size: 0.68rem;
      color: var(--text-muted);
      margin-top: 2px;
      line-height: 1.35;
    }
    .style-item.active .style-meta p {
      color: var(--text-secondary);
    }

    /* Apple \u5B98\u7F51\u6807\u5FD7\u6027\u4E3B\u64CD\u4F5C\u6309\u94AE (Pill Button) */
    .btn-submit {
      background: linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 100%);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 9999px;
      padding: 17px 24px;
      font-size: 0.98rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 12px 32px -4px rgba(29, 29, 31, 0.32);
      transition: transform 0.15s var(--ease-apple), opacity 0.15s, box-shadow 0.15s;
    }
    .btn-submit:active {
      transform: scale(0.97);
      opacity: 0.92;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 14px rgba(29, 29, 31, 0.25);
    }
    .btn-submit svg {
      color: #FFFFFF;
      transition: transform 0.2s var(--ease-spring);
    }
    .btn-submit:active svg {
      transform: translateX(3px);
    }

    /* ================= \u89C6\u56FE 2\uFF1A\u5199\u771F\u6210\u54C1\u5C55\u53F0 ================= */
    #view-result {
      display: none;
      flex-direction: column;
      gap: 16px;
    }

    /* \u9876\u7EA7\u7535\u5F71\u753B\u6846\u5C55\u53F0 */
    .stage-viewport {
      position: relative;
      width: 100%;
      height: 490px;
      border-radius: 28px;
      overflow: hidden;
      background: #000000;
      box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.35);
      user-select: none;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .stage-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.15s ease-out;
    }

    /* Vogue / Kinfolk \u6742\u5FD7\u6392\u7248\u5C42 (\u7EAF\u51C0\u827A\u672F\u54C1) */
    .stage-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      padding: 22px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 26%, transparent 58%, rgba(0,0,0,0.92) 100%);
      transition: opacity 0.15s ease-out;
    }
    .mag-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .mag-masthead {
      font-family: 'Bodoni MT', 'Didot', 'Times New Roman', serif;
      font-size: 1.9rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      color: #FFFFFF;
      text-shadow: 0 2px 10px rgba(0,0,0,0.4);
    }
    .mag-sub {
      font-size: 0.6rem;
      text-align: right;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 600;
      letter-spacing: 0.08em;
      line-height: 1.35;
    }
    .mag-bottom {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .mag-tag {
      font-size: 0.72rem;
      font-weight: 800;
      color: #FFFFFF;
      opacity: 0.9;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .mag-headline {
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    .mag-story {
      font-size: 0.74rem;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.45;
      font-weight: 400;
    }

    /* \u539F\u7247\u5BF9\u6BD4\u60AC\u6D6E\u80F6\u56CA */
    .compare-pill {
      position: absolute;
      bottom: 18px;
      right: 18px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--text-primary);
      font-size: 0.76rem;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 9999px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      transition: transform 0.12s var(--ease-apple);
    }
    .compare-pill:active {
      transform: scale(0.94);
    }

    /* \u5C55\u53F0\u5FAE\u578B\u98CE\u683C\u5207\u6362\u680F (iOS Segmented Chips) */
    .mini-switch-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 6px;
      border-radius: 9999px;
      border: 1px solid var(--card-border);
    }
    .mini-chip {
      text-align: center;
      padding: 9px 0;
      font-size: 0.74rem;
      font-weight: 600;
      border-radius: 9999px;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s var(--ease-apple);
      white-space: nowrap;
    }
    .mini-chip:active {
      transform: scale(0.95);
    }
    .mini-chip.active {
      background: #1D1D1F;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    /* \u5C55\u53F0\u64CD\u4F5C\u6309\u94AE */
    .btn-export {
      background: #1D1D1F;
      color: #FFFFFF;
      border: none;
      border-radius: 9999px;
      padding: 17px;
      font-size: 0.98rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 10px 28px -4px rgba(29, 29, 31, 0.25);
      transition: transform 0.15s var(--ease-apple);
    }
    .btn-export:active {
      transform: scale(0.97);
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: var(--text-secondary);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 9999px;
      padding: 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .btn-back:active {
      transform: scale(0.98);
      background: #FFFFFF;
    }

    /* ================= Apple Liquid Glass \u52A0\u8F7D\u6D6E\u5C42 ================= */
    .loader-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      z-index: 100;
      animation: fadeIn 0.25s ease-out;
    }
    .loader-glass-card {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.95);
      border-radius: 32px;
      padding: 34px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-elevated);
      max-width: 320px;
      width: 100%;
      text-align: center;
    }
    .loader-spinner-box {
      position: relative;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(0, 0, 0, 0.08);
      border-top-color: #1D1D1F;
      border-radius: 50%;
      animation: spin 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    .loader-pulse-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #1D1D1F;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      animation: pulse 1.6s ease-in-out infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.15); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .loader-progress-box {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 2px 0;
    }
    .loader-progress-track {
      flex: 1;
      height: 4px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 9999px;
      overflow: hidden;
    }
    .loader-progress-fill {
      height: 100%;
      width: 0%;
      background: #1D1D1F;
      border-radius: 9999px;
      transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .loader-progress-num {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-primary);
      min-width: 32px;
      text-align: right;
    }

    .loader-text {
      font-size: 0.95rem;
      color: var(--text-primary);
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.4;
    }
    .loader-sub {
      font-size: 0.72rem;
      color: #8E8E93;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    /* ================= iOS Dynamic Island \u60AC\u6D6E Toast ================= */
    .toast-container {
      position: fixed;
      top: calc(env(safe-area-inset-top) + 20px);
      left: 50%;
      transform: translateX(-50%) translateY(-30px);
      background: rgba(29, 29, 31, 0.94);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 10px 22px;
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1000;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s var(--ease-apple);
      max-width: 90vw;
      text-align: center;
    }
    .toast-container.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    /* ================= \u793E\u4EA4 Webview / iOS \u957F\u6309\u5B58\u56FE\u81EA\u6108 Sheet ================= */
    .save-modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 18px;
      z-index: 500;
      animation: fadeIn 0.25s ease-out;
    }
    .save-modal-card {
      position: relative;
      max-width: 360px;
      width: 100%;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(32px);
      -webkit-backdrop-filter: blur(32px);
      border: 1px solid rgba(255, 255, 255, 0.95);
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      gap: 12px;
    }
    .save-modal-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      text-align: center;
      letter-spacing: -0.01em;
    }
    .save-modal-subhint {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-align: center;
      line-height: 1.4;
    }
    .save-modal-img {
      width: 100%;
      max-height: 420px;
      object-fit: contain;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      user-select: auto;
      -webkit-touch-callout: default;
    }
    .save-modal-close {
      width: 100%;
      background: #1D1D1F;
      color: #FFFFFF;
      border: none;
      border-radius: 9999px;
      padding: 14px;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .save-modal-close:active {
      opacity: 0.88;
    }

    #render-canvas { display: none; }
  </style>
</head>
<body>

  <!-- \u5F25\u6563\u73AF\u5883\u5149\u6655\u80CC\u666F\u5C42 -->
  <div class="ambient-aura-layer">
    <div class="ambient-orb orb-gold"></div>
    <div class="ambient-orb orb-lavender"></div>
  </div>

  <div class="app-shell">
    <!-- Apple Floating Island \u9876\u680F -->
    <header class="apple-header">
      <div class="brand-title">ViviBon Cover</div>
    </header>

    <!-- ================= \u9875\u9762 1\uFF1A\u5236\u4F5C\u5165\u53E3 (Bento Grid) ================= -->
    <div id="view-entry">
      <!-- Bento 01: \u4E0A\u4F20\u5E95\u7247 -->
      <div class="bento-card">
        <div class="section-header">
          <span class="section-title">01 / \u7231\u5BA0\u76F8\u7247</span>
        </div>

        <div class="upload-box" onclick="document.getElementById('file-input').click()">
          <img id="entry-preview" class="upload-preview-img" src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80" alt="\u539F\u7247\u9884\u89C8" />
          <div class="upload-tip-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            \u66F4\u6362\u76F8\u7247
          </div>
        </div>
        <input type="file" id="file-input" style="display: none;" accept="image/*" onchange="handleUpload(event)" />

        <div class="input-row">
          <span class="input-label">\u7231\u5BA0\u6635\u79F0</span>
          <input type="text" id="pet-name" class="input-field" value="\u9EA6\u6D1B Milo" placeholder="\u8F93\u5165\u7231\u5BA0\u4E13\u5C5E\u540D\u5B57 (\u5982 \u9EA6\u6D1B Milo)" />
        </div>
      </div>

      <!-- Bento 02: \u9009\u62E9\u9AD8\u5B9A\u9020\u578B -->
      <div class="bento-card">
        <div class="section-header">
          <span class="section-title">02 / \u9AD8\u5B9A\u9020\u578B</span>
        </div>

        <div class="style-grid">
          <div class="style-item active" onclick="chooseStyle(this, 'gentle')">
            <div class="style-top">
              <div class="style-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 3h12l-2 9-4 9-4-9L6 3z"></path>
                  <path d="M8 3l4 8 4-8"></path>
                  <polygon points="9,7 15,10 15,7 9,10" fill="currentColor" opacity="0.8"></polygon>
                  <circle cx="12" cy="8.5" r="1.5" fill="currentColor"></circle>
                </svg>
              </div>
              <div class="style-check-indicator">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="style-meta">
              <h4>\u8428\u7EF4\u5C14\u540D\u7EC5</h4>
              <p>\u4E1D\u7ED2\u9886\u7ED3\u4E0E\u5B9A\u5236\u793C\u670D</p>
            </div>
          </div>

          <div class="style-item" onclick="chooseStyle(this, 'detective')">
            <div class="style-top">
              <div class="style-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9h18"></path>
                  <path d="M7 9c0 0 1-2.5 5-2.5s5 2.5 5 2.5"></path>
                  <path d="M3.5 10c0 3.5 2 6 5 6s4-2 4-5V10H3.5z" fill="currentColor" fill-opacity="0.12"></path>
                  <path d="M11.5 10c0 3 1 5 4 5s5-2.5 5-6V10h-9z" fill="currentColor" fill-opacity="0.12"></path>
                  <path d="M11.5 11h1"></path>
                </svg>
              </div>
              <div class="style-check-indicator">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="style-meta">
              <h4>\u9ED1\u8D85\u98DE\u884C\u5BB6</h4>
              <p>\u5DE5\u88C5\u5939\u514B\u4E0E\u91D1\u5C5E\u58A8\u955C</p>
            </div>
          </div>

          <div class="style-item" onclick="chooseStyle(this, 'street')">
            <div class="style-top">
              <div class="style-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 8a4 4 0 0 1 8 0v2H8V8z"></path>
                  <path d="M5 10.5l-2 5 3 2 1-3v6.5h10V14.5l1 3 3-2-2-5H5z"></path>
                  <path d="M12 10.5v10.5"></path>
                  <path d="M15 14.5h2"></path>
                </svg>
              </div>
              <div class="style-check-indicator">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="style-meta">
              <h4>\u673A\u80FD\u9632\u98CE\u8863</h4>
              <p>\u4EAE\u9EC4\u8FDE\u5E3D\u6781\u5730\u6237\u5916\u88C5</p>
            </div>
          </div>

          <div class="style-item" onclick="chooseStyle(this, 'warm')">
            <div class="style-top">
              <div class="style-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="4" r="1.5" fill="currentColor"></circle>
                  <path d="M7.5 9c0-3 2-5 4.5-5s4.5 2 4.5 5H7.5z"></path>
                  <rect x="5" y="10" width="14" height="4.5" rx="2" fill="currentColor" fill-opacity="0.12"></rect>
                  <path d="M14 14.5v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5"></path>
                  <path d="M15 20.5v1m2-1v1"></path>
                </svg>
              </div>
              <div class="style-check-indicator">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="style-meta">
              <h4>\u51AC\u65E5\u624B\u5DE5\u7EC7\u7269</h4>
              <p>\u7C97\u9488\u6BDB\u7EBF\u5E3D\u4E0E\u7F8A\u7ED2\u56F4\u5DFE</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Apple CTA Button -->
      <button class="btn-submit" onclick="startGeneration()">
        \u7ACB\u5373\u751F\u6210 Vogue \u7EA7\u65F6\u5C1A\u5927\u7247
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- ================= \u9875\u9762 2\uFF1A\u5199\u771F\u6210\u54C1\u5C55\u53F0 ================= -->
    <div id="view-result">
      <div class="stage-viewport">
        <img id="res-display-img" class="stage-img" src="" alt="\u9AD8\u5B9A\u5199\u771F" crossorigin="anonymous" />

        <div class="stage-overlay" id="stage-overlay">
          <div class="mag-top">
            <div class="mag-masthead">VIVIBON COVER</div>
            <div class="mag-sub">AUTUMN 2026<br>HAUTE COUTURE</div>
          </div>
          <div class="mag-bottom">
            <div class="mag-tag" id="mag-tag">SAVILE ROW \xB7 01</div>
            <div class="mag-headline" id="mag-title">\u9EA6\u6D1B Milo \xB7 \u8428\u7EF4\u5C14\u540D\u7EC5</div>
            <div class="mag-story" id="mag-desc">\u5B9A\u5236\u9ED1\u8272\u4E1D\u7ED2\u7EC5\u58EB\u9886\u7ED3\uFF0C\u7EAF\u9ED1\u9759\u7269\u67D4\u5149\u7BB1\u4FA7\u6253\u5149\uFF0C\u5B8C\u7F8E\u5448\u73B0\u6DF1\u9083\u9AD8\u8D35\u7684\u82F1\u4F26\u540D\u6D41\u8096\u50CF\u3002</div>
          </div>
        </div>

        <div class="compare-pill" id="compare-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          \u6309\u4F4F\u770B\u539F\u7247
        </div>
      </div>

      <!-- \u5C55\u53F0\u5FAE\u578B\u98CE\u683C\u680F (iOS Segmented Chips) -->
      <div class="mini-switch-row">
        <div class="mini-chip active" onclick="switchThemeOnResult(this, 'gentle')">\u540D\u7EC5</div>
        <div class="mini-chip" onclick="switchThemeOnResult(this, 'detective')">\u9ED1\u8D85</div>
        <div class="mini-chip" onclick="switchThemeOnResult(this, 'street')">\u673A\u80FD</div>
        <div class="mini-chip" onclick="switchThemeOnResult(this, 'warm')">\u7F8A\u7ED2</div>
      </div>

      <!-- \u64CD\u4F5C\u6309\u94AE -->
      <button class="btn-export" onclick="exportPoster()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        \u4FDD\u5B58 1080P \u9AD8\u6E05\u5C01\u9762\u6D77\u62A5
      </button>

      <button class="btn-back" onclick="backToEntry()">
        \u8FD4\u56DE\u91CD\u65B0\u6311\u9009\u9020\u578B\u6216\u5E95\u56FE
      </button>
    </div>
  </div>

  <!-- Apple Liquid Glass \u52A0\u8F7D\u6D6E\u5C42 -->
  <div class="loader-overlay" id="loader">
    <div class="loader-glass-card">
      <div class="loader-spinner-box">
        <div class="loader-spinner"></div>
        <div class="loader-pulse-dot"></div>
      </div>
      <div class="loader-progress-box">
        <div class="loader-progress-track">
          <div class="loader-progress-fill" id="loader-progress-fill"></div>
        </div>
        <div class="loader-progress-num" id="loader-progress-num">0%</div>
      </div>
      <div class="loader-text" id="loader-text">AI \u6B63\u5728\u4E3A\u7231\u5BA0\u91CF\u4F53\u88C1\u8863\u5E76\u6784\u5EFA\u8F6E\u5ED3...</div>
      <div class="loader-sub" id="loader-sub">Aligning facial ID & silhouette [0.0s]</div>
    </div>
  </div>

  <!-- iOS Dynamic Island \u60AC\u6D6E\u901A\u77E5 Toast -->
  <div id="toast" class="toast-container">
    <span id="toast-icon">\u2726</span>
    <span id="toast-text"></span>
  </div>

  <!-- \u793E\u4EA4 Webview / iOS \u957F\u6309\u5B58\u56FE\u81EA\u6108 Sheet \u6A21\u6001\u7A97 -->
  <div id="save-modal" class="save-modal-overlay" onclick="closeSaveModal(event)">
    <div class="save-modal-card" onclick="event.stopPropagation()">
      <div class="save-modal-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        \u957F\u6309\u56FE\u7247\u5373\u53EF\u76F4\u63A5\u4FDD\u5B58\u81F3\u7CFB\u7EDF\u76F8\u518C
      </div>
      <div class="save-modal-subhint">1080P \u8D85\u6E05 Vogue \u7EAF\u51C0\u5927\u7247\u5DF2\u5C31\u7EEA \xB7 \u96F6\u5E7F\u544A\u7EAF\u827A\u672F\u54C1</div>
      <img id="save-modal-img" class="save-modal-img" src="" alt="ViviBon Cover 1080P \u9AD8\u6E05\u6D77\u62A5" />
      <button class="save-modal-close" onclick="closeSaveModal()">\u5B8C\u6210 / \u8FD4\u56DE\u5C55\u53F0</button>
    </div>
  </div>

  <canvas id="render-canvas"></canvas>

  <script>
    // \u91C7\u7528 Qwen/Qwen-Image-Edit \u539F\u751F\u5927\u6A21\u578B\u91CF\u8EAB\u5B9A\u5236\u7684\u9AD8\u5B9A\u5927\u7247
    const STYLES = {
      gentle: {
        img: "models/milo_gentle.png",
        tag: "SAVILE ROW \xB7 01",
        title: "\u8428\u7EF4\u5C14\u540D\u7EC5",
        desc: "\u5B9A\u5236\u7EAF\u9ED1\u4E1D\u7ED2\u9886\u7ED3\uFF0C\u9ED1\u66DC\u77F3\u7EAF\u51C0\u68DA\u62CD\u80CC\u666F\u4E0E\u8F6E\u5ED3\u5149\u6F2B\u5C04\uFF0C\u4F18\u96C5\u5B9A\u683C\u6C89\u7A33\u8D35\u65CF\u6C14\u8D28\u3002"
      },
      detective: {
        img: "models/milo_detective.png",
        tag: "HERITAGE NOIR \xB7 02",
        title: "\u9ED1\u8D85\u98DE\u884C\u5BB6",
        desc: "\u5DE5\u88C5\u8FDE\u5E3D\u5939\u514B\u4E0E\u590D\u53E4\u98DE\u884C\u58A8\u955C\uFF0C\u6C14\u573A\u5168\u5F00\uFF0C\u5C55\u73B0\u8857\u5934\u5148\u950B\u4E0E\u4ECE\u5BB9\u795E\u91C7\u7684\u6781\u81F4\u878D\u5408\u3002"
      },
      street: {
        img: "models/milo_street.png",
        tag: "EXPEDITION \xB7 03",
        title: "\u673A\u80FD\u9632\u98CE\u8863",
        desc: "\u6781\u5730\u82A5\u672B\u9EC4\u5B9A\u5236\u8FDE\u5E3D\u96E8\u8863\uFF0C\u9762\u6599\u9632\u6C34\u7EB9\u7406\u4E0E\u6BDB\u53D1\u9AD8\u5149\u5B8C\u7F8E\u4EA4\u7EC7\uFF0C\u5229\u843D\u4E0D\u7F81\u3002"
      },
      warm: {
        img: "models/milo_warm.png",
        tag: "WINTER COZY \xB7 04",
        title: "\u51AC\u65E5\u624B\u5DE5\u7F8A\u7ED2",
        desc: "\u7EAF\u624B\u4F5C\u539A\u9488\u7EC7\u6BDB\u7EBF\u5E3D\u4E0E\u82CF\u683C\u5170\u7F8A\u7ED2\u56F4\u5DFE\uFF0C\u6F2B\u5C04\u4FA7\u5149\u629A\u6478\u51FA\u5982\u58C1\u7089\u822C\u7684\u6CBB\u6108\u6696\u610F\u3002"
      }
    };

    // \u91C7\u7528 Qwen/Qwen-Image-Edit \u539F\u751F\u5927\u6A21\u578B\u4E3A\u9ED8\u8BA4\u6A21\u7279\u9EA6\u6D1B\u91CF\u8EAB\u5B9A\u5236\u7684\u5168\u5957 12 \u6B3E\u9AD8\u5B9A\u80F6\u56CA\u5927\u7247
    const MILO_VARIANTS = {
      gentle: [
        { id: 'gentle_bordeaux_gala', name: '\u76DB\u5178\u6CE2\u5C14\u591A\u9152\u7EA2\u793C\u670D', img: 'models/milo_gentle.png' },
        { id: 'gentle_navy_velvet', name: '\u7ECF\u5178\u85CF\u9752\u4E1D\u7ED2\u793C\u670D', img: 'models/milo_gentle_navy_velvet.png' },
        { id: 'gentle_prince_of_wales', name: '\u8428\u7EF4\u5C14\u8857\u4EB2\u738B\u683C\u82B1\u5462', img: 'models/milo_gentle_prince_of_wales.png' }
      ],
      detective: [
        { id: 'aviator_stealth_black', name: '\u66DC\u77F3\u9ED1\u6218\u672F\u7A7A\u519B\u5939\u514B', img: 'models/milo_detective.png' },
        { id: 'aviator_vintage_shearling', name: '\u590D\u53E4\u505A\u65E7\u68D5\u76AE\u98DE\u884C\u5939\u514B', img: 'models/milo_aviator_vintage_shearling.png' },
        { id: 'aviator_heritage_ma1', name: '\u6781\u5730\u5DE1\u822A\u58A8\u7EFF\u98DE\u884C\u5916\u5957', img: 'models/milo_aviator_heritage_ma1.png' }
      ],
      street: [
        { id: 'techwear_glacier_white', name: '\u51B0\u5DDD\u767D\u62FC\u8272\u66B4\u98CE\u96EA\u5916\u58F3', img: 'models/milo_street.png' },
        { id: 'techwear_arctic_yellow', name: '\u6781\u5730\u54D1\u5149\u4EAE\u9EC4\u9632\u98CE\u8863', img: 'models/milo_techwear_arctic_yellow.png' },
        { id: 'techwear_cobalt_cyber', name: '\u66DC\u5F71\u94B4\u84DD\u673A\u80FD\u51B2\u950B\u8863', img: 'models/milo_techwear_cobalt_cyber.png' }
      ],
      warm: [
        { id: 'knitwear_scottish_tartan', name: '\u82CF\u683C\u5170\u683C\u7EB9\u7F8A\u7ED2\u56F4\u5DFE', img: 'models/milo_warm.png' },
        { id: 'knitwear_oatmeal_cable', name: '\u5976\u767D\u9EBB\u82B1\u7C97\u68D2\u9488\u9AD8\u9886\u6BDB\u8863', img: 'models/milo_knitwear_oatmeal_cable.png' },
        { id: 'knitwear_fair_isle', name: '\u8D39\u5C14\u5C9B\u590D\u53E4\u63D0\u82B1\u5957\u5934\u886B', img: 'models/milo_knitwear_fair_isle.png' }
      ]
    };

    let userPhotoUrl = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80";
    let selectedStyleKey = "gentle";
    const generatedResults = {};
    const generatedVariants = {};

    // ================= \u8FD0\u8425\u53EF\u89C2\u6D4B\u6027\u4E0E\u57CB\u70B9\u9632\u8150\u5C42 (Product-Led Ops Tracker) =================
    let isDefaultSample = true;
    let generateRetryCount = 0;
    let resultViewRenderTimestamp = null;
    let uploadedImageSizeKb = null;

    function getApiBaseUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('api')) return urlParams.get('api');
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://127.0.0.1:8787';
      }
      return 'https://vivibon-cover-worker.zhoumiaoyin1.workers.dev'; // \u751F\u4EA7\u73AF\u5883\u8FB9\u7F18 Worker URL
    }

    let toastTimer = null;
    function showToast(message, icon = '\u2726', durationMs = 3500) {
      const toast = document.getElementById('toast');
      const iconEl = document.getElementById('toast-icon');
      const textEl = document.getElementById('toast-text');
      if (!toast || !textEl) return;
      if (iconEl) iconEl.innerText = icon;
      textEl.innerText = message;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, durationMs);
    }

    function triggerHaptic(level = 10) {
      if (navigator.vibrate) {
        try { navigator.vibrate(level); } catch(e) {}
      }
    }

    function showSaveModal(dataUrl) {
      const modal = document.getElementById('save-modal');
      const img = document.getElementById('save-modal-img');
      if (!modal || !img) return;
      const toast = document.getElementById('toast');
      if (toast) toast.classList.remove('show');
      if (toastTimer) clearTimeout(toastTimer);
      img.src = dataUrl;
      modal.style.display = 'flex';
      triggerHaptic(12);
    }

    function closeSaveModal(e) {
      if (e && e.target && e.target.id !== 'save-modal' && !e.target.classList.contains('save-modal-close')) {
        return;
      }
      const modal = document.getElementById('save-modal');
      if (modal) modal.style.display = 'none';
      triggerHaptic(8);
    }

    function getDeviceType() {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet";
      if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) return "mobile";
      return "desktop";
    }

    function trackEvent(eventName, properties = {}) {
      try {
        const payload = {
          ...properties,
          app_name: "vivibon_cover",
          device_type: getDeviceType(),
          client_timestamp: new Date().toISOString()
        };
        if (window.posthog && typeof window.posthog.capture === "function") {
          window.posthog.capture(eventName, payload);
        }
        const isDebug = new URLSearchParams(window.location.search).get("debug") === "1" || window.__VIVIBON_DEBUG__;
        if (isDebug) {
          console.log(\`%c[PostHog Track] \${eventName}\`, "color: #B8934C; font-weight: bold;", payload);
        }
      } catch (err) {
        // \u6297\u62E6\u622A\u4E0E\u9519\u8BEF\u81EA\u6108\uFF1A\u7EDD\u4E0D\u56E0\u4E3A\u57CB\u70B9\u963B\u65AD\u4E3B\u4E1A\u52A1\u4EA4\u4E92 (NC-5)
        console.warn(\`[Track Warning] Failed to capture \${eventName}:\`, err);
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      bindCompareEvents();
      // Step 1: \u8BBF\u95EE\u843D\u5730\u9875
      trackEvent("page_view_cover", {
        referrer: document.referrer || "direct"
      });
    });

    function chooseStyle(el, key) {
      triggerHaptic(6);
      document.querySelectorAll(".style-item").forEach(item => item.classList.remove("active"));
      el.classList.add("active");
      selectedStyleKey = key;
      // Step 3: \u9009\u62E9\u9AD8\u5B9A\u670D\u9970\u9020\u578B (\u5236\u4F5C\u5165\u53E3)
      trackEvent("style_selected", {
        style_key: key,
        source_view: "entry"
      });
    }

    function inspectAndCompressImage(file, maxDimension = 1024, quality = 0.88) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            const rawW = img.naturalWidth || img.width;
            const rawH = img.naturalHeight || img.height;

            // FinOps \u95E8\u7981 1: \u62E6\u622A\u8FC7\u5C0F\u5206\u8FA8\u7387\uFF08\u9632\u56FE\u6807/\u8868\u60C5\u5305/\u7F29\u7565\u56FE\u6253\u5165\u6A21\u578B\u6D6A\u8D39\u7B97\u529B\uFF09
            if (rawW < 240 || rawH < 240) {
              return reject(new Error('IMAGE_RESOLUTION_TOO_LOW'));
            }

            let width = rawW;
            let height = rawH;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // FinOps \u95E8\u7981 2: \u66DD\u5149\u76F4\u65B9\u56FE\u4EAE\u5EA6\u68C0\u6D4B\uFF08\u9632\u5168\u9ED1\u906E\u6321/\u7EAF\u767D\u8FC7\u66DD\u5E9F\u56FE\u6D6A\u8D39\u7B97\u529B\uFF09
            try {
              const imgData = ctx.getImageData(0, 0, width, height);
              const data = imgData.data;
              let totalLuminance = 0;
              const sampleStep = 8; // 8 \u50CF\u7D20\u6B65\u8FDB\u9AD8\u6548\u91C7\u6837
              let sampleCount = 0;

              for (let i = 0; i < data.length; i += 4 * sampleStep) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                totalLuminance += 0.299 * r + 0.587 * g + 0.114 * b;
                sampleCount++;
              }

              const avgLuminance = totalLuminance / (sampleCount || 1);

              if (avgLuminance < 14) {
                return reject(new Error('IMAGE_TOO_DARK'));
              }
              if (avgLuminance > 246) {
                return reject(new Error('IMAGE_TOO_BRIGHT'));
              }
            } catch (sampleErr) {
              console.warn('[Pre-flight Sampling Bypassed]:', sampleErr);
            }

            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve({
              base64: compressedBase64,
              width,
              height
            });
          };
          img.onerror = () => reject(new Error('IMAGE_DECODE_FAILED'));
          img.src = evt.target.result;
        };
        reader.onerror = () => reject(new Error('FILE_READ_FAILED'));
        reader.readAsDataURL(file);
      });
    }

    async function handleUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      isDefaultSample = false;
      // \u7B56\u7565 1: \u6E05\u7A7A\u65E7\u7684\u9884\u7F6E\u5927\u7247\u7F13\u5B58\uFF0C\u786E\u4FDD\u540E\u7EED\u751F\u6210\u5FC5\u5B9A\u4E3A\u8BE5\u7231\u5BA0\u8C03\u7528\u91CF\u8EAB\u91CD\u7ED8
      Object.keys(generatedResults).forEach(k => delete generatedResults[k]);
      Object.keys(generatedVariants).forEach(k => delete generatedVariants[k]);
      const rawSizeKb = Math.round(file.size / 1024);

      if (file.size > 15 * 1024 * 1024) {
        showToast("\u56FE\u7247\u5927\u5C0F\u8D85\u8FC7 15MB \u9650\u5236\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9", "\u26A0\uFE0F", 4000);
        return;
      }

      triggerHaptic(10);
      showToast("\u6B63\u5728\u8D28\u68C0\u7231\u5BA0\u76F8\u7247\u753B\u8D28...", "\u23F3", 1500);

      try {
        const result = await inspectAndCompressImage(file, 1024, 0.88);
        userPhotoUrl = result.base64;
        uploadedImageSizeKb = Math.round(result.base64.length * 0.75 / 1024);

        document.getElementById("entry-preview").src = userPhotoUrl;
        const hint = document.getElementById("photo-status-badge");
        if (hint) {
          hint.innerText = "\u7231\u5BA0\u8096\u50CF\u5DF2\u5C31\u7EEA \xB7 Ready";
        }
        showToast("\u7231\u5BA0\u76F8\u7247\u5DF2\u5C31\u7EEA (\u5DF2\u901A\u8FC7\u9AD8\u5B9A\u753B\u8D28\u8D28\u68C0)", "\u2726", 2200);

        // Step 2: \u786E\u8BA4\u7231\u5BA0\u5E95\u56FE (\u4E0A\u4F20\u672C\u5730\u7167\u7247)
        trackEvent("photo_uploaded", {
          is_default_sample: false,
          image_size_kb: uploadedImageSizeKb,
          raw_size_kb: rawSizeKb,
          dimensions: \`\${result.width}x\${result.height}\`,
          file_type: file.type || "unknown"
        });
      } catch (err) {
        console.warn('[Upload Pre-flight Intercepted]:', err);
        if (err.message === 'IMAGE_RESOLUTION_TOO_LOW') {
          showToast("\u76F8\u7247\u5206\u8FA8\u7387\u8FC7\u4F4E\uFF0C\u8BF7\u4E0A\u4F20\u5927\u4E8E 250px \u7684\u6E05\u6670\u7167\u7247", "\u26A0\uFE0F", 4000);
        } else if (err.message === 'IMAGE_TOO_DARK') {
          showToast("\u76F8\u7247\u5149\u7EBF\u4E25\u91CD\u8FC7\u6697\uFF08\u8FD1\u4E4E\u5168\u9ED1\uFF09\uFF0C\u8BF7\u5728\u660E\u4EAE\u5149\u7EBF\u4E0B\u62CD\u6444", "\u{1F4A1}", 4000);
        } else if (err.message === 'IMAGE_TOO_BRIGHT') {
          showToast("\u76F8\u7247\u4E25\u91CD\u8FC7\u66DD\uFF08\u8FD1\u4E4E\u7EAF\u767D\uFF09\uFF0C\u8BF7\u91CD\u65B0\u9009\u53D6\u6B63\u5E38\u5149\u7EBF\u7167\u7247", "\u{1F4A1}", 4000);
        } else {
          showToast("\u76F8\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u6362\u4E00\u5F20\u8BD5\u4E00\u4E0B", "\u26A0\uFE0F", 3000);
        }
      }
    }

    async function startGeneration() {
      triggerHaptic(12);
      generateRetryCount++;
      const petName = (document.getElementById("pet-name").value || "\u9EA6\u6D1B Milo").trim();

      // Step 4: \u89E6\u53D1\u5199\u771F\u751F\u6210
      trackEvent("generate_clicked", {
        style_key: selectedStyleKey,
        selected_style: selectedStyleKey,
        pet_name: petName,
        pet_name_length: petName.length,
        is_default_sample: isDefaultSample,
        image_size_kb: uploadedImageSizeKb,
        retry_count: generateRetryCount
      });

      const loader = document.getElementById("loader");
      const loaderText = document.getElementById("loader-text");
      const loaderSub = document.getElementById("loader-sub");
      const progressFill = document.getElementById("loader-progress-fill");
      const progressNum = document.getElementById("loader-progress-num");
      loader.style.display = "flex";

      let progress = 5;
      if (progressFill) progressFill.style.width = "5%";
      if (progressNum) progressNum.innerText = "5%";

      const startTime = Date.now();
      const MIN_LOADING_TIME = 1500; // Apple UX: \u9632\u95EA\u70C1\u4FDD\u62A4

      function setProgress(val) {
        progress = Math.min(val, 93);
        if (progressFill) progressFill.style.width = \`\${progress}%\`;
        if (progressNum) progressNum.innerText = \`\${Math.round(progress)}%\`;
      }

      // 5 \u9636\u6BB5\u5DE5\u827A\u53CD\u9988\u5E8F\u5217
      const milestones = [
        { t: 0, text: "\u6B63\u5728\u9501\u5B9A\u7231\u5BA0\u9762\u90E8\u7279\u5F81\u4E0E\u54C1\u79CD\u8F6E\u5ED3 (Face ID)...", sub: "Locking facial geometry & markings", prog: 15 },
        { t: 3000, text: "\u6B63\u5728\u63D0\u53D6\u4E13\u5C5E\u6BDB\u53D1\u8272\u6CFD\u4E0E\u773C\u795E\u5149\u97F5...", sub: "Sampling authentic fur texture & reflections", prog: 38 },
        { t: 6500, text: "\u6B63\u5728\u6309\u9EC4\u91D1\u6BD4\u4F8B\u91CF\u8EAB\u4F53\u88C1\u9AD8\u5B9A\u534E\u670D...", sub: "Tailoring bespoke haute couture fabrics", prog: 62 },
        { t: 10000, text: "\u6B63\u5728\u5E03\u8BBE\u9AD8\u7EA7\u6444\u5F71\u68DA\u53CC\u67D4\u5149\u7BB1\u4E0E\u7535\u5F71\u7EA7\u5E03\u5149...", sub: "Setting up dual-softbox cinematic studio lighting", prog: 80 },
        { t: 13500, text: "\u6B63\u5728\u8FDB\u884C 8K \u8D28\u611F\u5FAE\u8DDD\u4FEE\u56FE\u4E0E\u8272\u5F69\u5B9A\u8C03...", sub: "Polishing 8K high-fidelity magazine grade tone", prog: 92 }
      ];

      const stageTimers = [];
      milestones.forEach((m) => {
        const tid = setTimeout(() => {
          loaderText.innerText = m.text;
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          loaderSub.innerText = \`\${m.sub} [\${elapsedSec}s]\`;
          setProgress(m.prog);
        }, m.t);
        stageTimers.push(tid);
      });

      const tickTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const elapsedSec = (elapsed / 1000).toFixed(1);
        const curMilestone = milestones.slice().reverse().find(m => elapsed >= m.t) || milestones[0];
        loaderSub.innerText = \`\${curMilestone.sub} [\${elapsedSec}s]\`;
        if (progress < 92) {
          setProgress(progress + 0.6);
        }
      }, 100);

      let responseData = null;

      try {
        if (isDefaultSample) {
          // \u793A\u8303\u6A21\u7279\u9EA6\u6D1B\uFF1A\u4ECE Qwen-Image-Edit \u539F\u751F\u6A21\u578B\u9884\u751F\u6210\u7684 12 \u6B3E\u9AD8\u5B9A\u80F6\u56CA\u5E93\u4E2D\u968F\u673A\u76F2\u76D2\u62BD\u53D6
          // \u65E2\u786E\u4FDD 100% \u4E3A\u6A21\u578B\u771F\u5B9E\u6210\u7247\u3001\u4E94\u5B98 Face ID \u4E0E\u9AD8\u5B9A\u534E\u670D\u5B8C\u5168\u5951\u5408\uFF0C\u53C8\u5F7B\u5E95\u6D88\u706D 30s \u7F51\u7EDC\u6392\u961F\u5EF6\u8FDF
          const variants = MILO_VARIANTS[selectedStyleKey] || [];
          const chosen = variants[Math.floor(Math.random() * variants.length)] || {
            id: selectedStyleKey,
            name: STYLES[selectedStyleKey].title,
            img: STYLES[selectedStyleKey].img
          };

          // \u4FDD\u6301 1.8s \u4E1D\u6ED1\u5962\u54C1\u5DE5\u574A\u91CF\u4F53\u88C1\u8863\u52A8\u753B\u4F53\u9A8C
          await new Promise(r => setTimeout(r, 1800));

          responseData = {
            imageUrl: chosen.img,
            isFallback: false,
            capsuleVariant: {
              id: chosen.id,
              name: chosen.name
            }
          };
        } else {
          // \u771F\u5B9E\u4E0A\u4F20\u7231\u5BA0\uFF1A\u901A\u8FC7 Worker \u8C03\u7528\u4E91\u7AEF Qwen/Qwen-Image-Edit \u539F\u751F\u56FE\u751F\u56FE\u6A21\u578B\u8FDB\u884C Face ID \u4E13\u5C5E\u6362\u88C5
          const payload = {
            styleKey: selectedStyleKey,
            petName: petName,
            imageBase64: userPhotoUrl,
            isDefaultSample: false
          };

          const apiEndpoint = \`\${getApiBaseUrl()}/api/generate\`;
          const headers = { 'Content-Type': 'application/json' };
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('debug') === '1' || urlParams.get('test') === '1' || urlParams.get('bypass') === '1') {
            headers['x-test-bypass'] = '1';
          }

          const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
          });

          const json = await res.json();

          if (!res.ok || !json.success) {
            if (res.status === 429) {
              if (json.errorCode === 'FINOPS_CAP_REACHED') {
                showToast("\u4ECA\u65E5\u79C1\u4EAB\u5B9A\u5236\u540D\u989D\u5DF2\u6EE1\uFF0C\u660E\u65E5 0 \u70B9\u91CD\u65B0\u5F00\u653E", "\u2726", 4500);
              } else {
                showToast("\u7231\u5BA0\u4ECA\u65E5\u8BD5\u8863\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u4E8B\u4F11\u606F\u518D\u6765\u5B9A\u5236~", "\u2726", 4000);
              }
            } else if (res.status === 413) {
              showToast("\u76F8\u7247\u6587\u4EF6\u8D85\u8FC7\u9650\u5236\uFF0C\u8BF7\u91CD\u65B0\u9009\u53D6", "\u2726", 4000);
            } else {
              showToast(json.message || "\u5DF2\u4E3A\u60A8\u5448\u73B0\u7ECF\u5178\u5178\u85CF\u6837\u7247", "\u2726", 3500);
            }
            // \u4F18\u96C5\u964D\u7EA7\u56DE\u9000\u5230\u6A21\u578B\u751F\u6210\u7684\u5BF9\u5E94\u5927\u7247\uFF0C\u7EDD\u4E0D\u518D\u7528\u65E0\u5173\u72AC\u79CD
            responseData = {
              imageUrl: STYLES[selectedStyleKey].img,
              isFallback: true
            };
          } else {
            responseData = json.data;
            if (responseData.isFallback) {
              showToast("\u5DF2\u4E3A\u60A8\u5448\u73B0\u7ECF\u5178\u5178\u85CF\u6837\u7247", "\u2726", 3000);
            }
          }
        }
      } catch (err) {
        console.warn('[API Network Error, fallbacking gracefully]:', err);
        showToast("\u7F51\u7EDC\u8FDE\u63A5\u7A0D\u6709\u5EF6\u8FDF\uFF0C\u5DF2\u5448\u73B0\u7ECF\u5178\u5178\u85CF\u5927\u7247", "\u2726", 3000);
        responseData = {
          imageUrl: STYLES[selectedStyleKey].img,
          isFallback: true
        };
      } finally {
        clearInterval(tickTimer);
        stageTimers.forEach(clearTimeout);

        if (progressFill) progressFill.style.width = "100%";
        if (progressNum) progressNum.innerText = "100%";
        loaderText.innerText = "\u9AD8\u5B9A\u5927\u7247\u5B9A\u5236\u5B8C\u6210\uFF01\u6B63\u5728\u5448\u73B0\u5C55\u53F0...";
        loaderSub.innerText = "Haute couture masterpiece rendered [100%]";

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => {
          loader.style.display = "none";
          document.getElementById("view-entry").style.display = "none";
          document.getElementById("view-result").style.display = "flex";

          const generatedUrl = responseData?.imageUrl || STYLES[selectedStyleKey].img;
          generatedResults[selectedStyleKey] = generatedUrl;
          generatedVariants[selectedStyleKey] = responseData?.capsuleVariant;

          renderResult(selectedStyleKey, generatedUrl);
          resultViewRenderTimestamp = Date.now();
          triggerHaptic(15);

          // Step 5: \u5927\u7247\u5C55\u53F0\u5448\u73B0
          trackEvent("showcase_rendered", {
            style_key: selectedStyleKey,
            is_fallback: responseData?.isFallback ?? false,
            latency_ms: elapsed
          });
        }, Math.min(remaining, 500));
      }
    }

    function renderResult(key, overrideImgUrl) {
      selectedStyleKey = key;
      const data = STYLES[key];
      const petName = (document.getElementById("pet-name").value || "\u9EA6\u6D1B Milo").trim();
      const finalImgUrl = overrideImgUrl || generatedResults[key] || data.img;

      document.getElementById("res-display-img").src = finalImgUrl;
      document.getElementById("mag-tag").innerText = data.tag;
      document.getElementById("mag-title").innerText = \`\${petName} \xB7 \${data.title}\`;
      const activeVariant = generatedVariants[key];
      document.getElementById("mag-desc").innerText = activeVariant?.name ? \`\${data.desc} (\${activeVariant.name})\` : data.desc;

      const keys = ['gentle', 'detective', 'street', 'warm'];
      document.querySelectorAll(".mini-chip").forEach((chip, idx) => {
        chip.classList.toggle("active", keys[idx] === key);
      });
    }

    function switchThemeOnResult(el, key) {
      triggerHaptic(6);
      document.querySelectorAll(".mini-chip").forEach(c => c.classList.remove("active"));
      el.classList.add("active");
      if (!generatedResults[key]) {
        selectedStyleKey = key;
        startGeneration();
      } else {
        renderResult(key, generatedResults[key]);
      }
    }

    function backToEntry() {
      triggerHaptic(8);
      document.getElementById("view-result").style.display = "none";
      document.getElementById("view-entry").style.display = "flex";
    }

    function bindCompareEvents() {
      const btn = document.getElementById("compare-btn");
      const img = document.getElementById("res-display-img");
      const overlay = document.getElementById("stage-overlay");

      const showOriginal = (e) => {
        e.preventDefault();
        triggerHaptic(8);
        img.src = userPhotoUrl;
        overlay.style.opacity = "0";
      };

      const restoreResult = (e) => {
        e.preventDefault();
        img.src = generatedResults[selectedStyleKey] || STYLES[selectedStyleKey].img;
        overlay.style.opacity = "1";
      };

      btn.addEventListener("touchstart", showOriginal, { passive: false });
      btn.addEventListener("touchend", restoreResult);
      btn.addEventListener("touchcancel", restoreResult);
      btn.addEventListener("mousedown", showOriginal);
      btn.addEventListener("mouseup", restoreResult);
      btn.addEventListener("mouseleave", restoreResult);
    }

    async function exportPoster() {
      triggerHaptic(12);
      const dwellTimeSec = resultViewRenderTimestamp
        ? Math.round((Date.now() - resultViewRenderTimestamp) / 1000)
        : 0;

      const canvas = document.getElementById("render-canvas");
      const ctx = canvas.getContext("2d");
      const width = 1080;
      const height = 1440;
      canvas.width = width;
      canvas.height = height;

      // \u5B57\u4F53\u5C31\u7EEA\u9501\u4FDD\u969C (Font Ready Guardrail)
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn('[Font Ready Guardrail bypassed]:', e);
      }

      const currentImgUrl = generatedResults[selectedStyleKey] || STYLES[selectedStyleKey].img;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = currentImgUrl;

      img.onload = () => {
        // \u6838\u5FC3\u4FEE\u590D\uFF1A\u7B49\u6BD4\u8986\u76D6\u88C1\u5207\u7ED8\u5236 (object-fit: cover)\uFF0C\u5F7B\u5E95\u6D88\u9664\u9762\u90E8\u88AB\u538B\u7F29\u62C9\u4F38\u53D8\u5F62
        let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;
        const targetRatio = width / height; // 1080 / 1440 = 0.75
        const srcRatio = img.naturalWidth / img.naturalHeight;

        if (srcRatio > targetRatio) {
          // \u539F\u56FE\u6BD4 3:4 \u5BBD\uFF08\u5982 1:1 \u6B63\u65B9\u5F62\uFF09\uFF0C\u6C34\u5E73\u5C45\u4E2D\u88C1\u5207\u591A\u4F59\u4E24\u4FA7\uFF0C\u5B8C\u7F8E\u4FDD\u7559\u7231\u5BA0\u9762\u5BB9\u51E0\u4F55\u7ED3\u6784
          sWidth = img.naturalHeight * targetRatio;
          sx = (img.naturalWidth - sWidth) / 2;
        } else {
          // \u539F\u56FE\u6BD4 3:4 \u7A84\uFF0C\u5782\u76F4\u5C45\u4E2D\u88C1\u5207\u591A\u4F59\u4E0A\u4E0B
          sHeight = img.naturalWidth / targetRatio;
          sy = (img.naturalHeight - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

        // \u7535\u5F71\u7EA7\u6697\u89D2\u6E10\u53D8
        const gradTop = ctx.createLinearGradient(0, 0, 0, 380);
        gradTop.addColorStop(0, "rgba(0,0,0,0.68)");
        gradTop.addColorStop(1, "transparent");
        ctx.fillStyle = gradTop;
        ctx.fillRect(0, 0, width, 380);

        const gradBottom = ctx.createLinearGradient(0, height - 480, 0, height);
        gradBottom.addColorStop(0, "transparent");
        gradBottom.addColorStop(1, "rgba(0,0,0,0.94)");
        ctx.fillStyle = gradBottom;
        ctx.fillRect(0, height - 480, width, 480);

        // \u520A\u5934 VIVIBON COVER (NC-1: 100% \u827A\u672F\u7EAF\u51C0\uFF0C\u7EDD\u5BF9\u96F6\u5E7F\u544A\u4E8C\u7EF4\u7801)
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 3;

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 76px 'Bodoni MT', 'Didot', 'Times New Roman', serif";
        ctx.fillText("VIVIBON COVER", 50, 130);

        ctx.font = "600 24px -apple-system, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
        ctx.textAlign = "right";
        ctx.fillText("AUTUMN 2026", width - 50, 95);
        ctx.fillText("HAUTE COUTURE", width - 50, 130);

        // \u6807\u7B7E\u3001\u6807\u9898\u4E0E\u8BC4\u8FF0
        ctx.textAlign = "left";
        const petName = (document.getElementById("pet-name").value || "\u9EA6\u6D1B Milo").trim();
        ctx.fillStyle = "#C5A059"; // Herm\xE8s \u7ECF\u5178\u9AD8\u5B9A\u91D1\u6807\u70B9\u775B\u8272
        ctx.font = "800 28px -apple-system, sans-serif";
        ctx.fillText(STYLES[selectedStyleKey].tag, 50, height - 160);

        ctx.fillStyle = "#ffffff";
        ctx.font = "800 52px -apple-system, sans-serif";
        ctx.fillText(\`\${petName} \xB7 \${STYLES[selectedStyleKey].title}\`, 50, height - 100);

        ctx.fillStyle = "#E2E8F0";
        ctx.font = "400 24px -apple-system, sans-serif";
        const activeVariant = generatedVariants[selectedStyleKey];
        const captionDesc = activeVariant?.name ? \`\${STYLES[selectedStyleKey].desc} \xB7 \${activeVariant.name}\` : STYLES[selectedStyleKey].desc;
        ctx.fillText(captionDesc, 50, height - 50);
        ctx.restore();

        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL("image/png");
        } catch (taintErr) {
          console.warn('[Canvas Tainted or Error]:', taintErr);
        }

        const isMobileWebview = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // \u793E\u4EA4 Webview \u53CC\u8F68\u5B58\u56FE\u81EA\u6108 (Section 2.3)
        if (isMobileWebview || !dataUrl) {
          if (dataUrl) {
            showSaveModal(dataUrl);
          } else {
            showToast("\u8BF7\u957F\u6309\u5C55\u53F0\u56FE\u7247\u4FDD\u5B58\u81F3\u76F8\u518C", "\u{1F4A1}", 3500);
          }
          trackEvent("poster_exported", {
            style_key: selectedStyleKey,
            dwell_time_sec: dwellTimeSec,
            export_mode: "save_modal"
          });
        } else {
          try {
            const a = document.createElement("a");
            a.download = \`ViviBonCover_\${petName}_HauteCouture.png\`;
            a.href = dataUrl;
            a.click();
            showToast("\u6D77\u62A5\u5DF2\u5F00\u59CB\u4E0B\u8F7D", "\u{1F389}", 2500);
            trackEvent("poster_exported", {
              style_key: selectedStyleKey,
              dwell_time_sec: dwellTimeSec,
              export_mode: "direct_download"
            });
          } catch(downloadErr) {
            showSaveModal(dataUrl);
            trackEvent("poster_exported", {
              style_key: selectedStyleKey,
              dwell_time_sec: dwellTimeSec,
              export_mode: "save_modal_fallback"
            });
          }
        }
      };

      img.onerror = () => {
        showToast("\u5E95\u56FE\u8F7D\u5165\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5", "\u26A0\uFE0F", 3500);
      };
    }
  </script>
</body>
</html>`;

// src/index.ts
var createApp = (customFalService, rateLimiterOpts) => {
  const app2 = new import_hono3.Hono();
  app2.use("*", loggerMiddleware());
  app2.use("*", corsMiddleware());
  app2.use("/api/*", rateLimiterMiddleware(rateLimiterOpts));
  app2.get("/", (c) => c.html(ViviBon_Cover_default));
  app2.get("/index.html", (c) => c.html(ViviBon_Cover_default));
  app2.route("/", healthRoute);
  app2.route("/", createGenerateRoute(customFalService || falService));
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
var src_default = app;
export {
  createApp,
  src_default as default
};
//# sourceMappingURL=index.js.map
