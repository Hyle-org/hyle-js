var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod2, isNodeMode, target) => {
  target = mod2 != null ? __create(__getProtoOf(mod2)) : {};
  const to = isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod2))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod2[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod2) => () => (mod2 || cb((mod2 = { exports: {} }).exports, mod2), mod2.exports);

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS((exports, module) => {
  var asPromise = function(fn, ctx) {
    var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
    while (index < arguments.length)
      params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
      params[offset] = function callback(err) {
        if (pending) {
          pending = false;
          if (err)
            reject(err);
          else {
            var params2 = new Array(arguments.length - 1), offset2 = 0;
            while (offset2 < params2.length)
              params2[offset2++] = arguments[offset2];
            resolve.apply(null, params2);
          }
        }
      };
      try {
        fn.apply(ctx || null, params);
      } catch (err) {
        if (pending) {
          pending = false;
          reject(err);
        }
      }
    });
  };
  module.exports = asPromise;
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS((exports) => {
  var base64 = exports;
  base64.length = function length(string) {
    var p = string.length;
    if (!p)
      return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
      ++n;
    return Math.ceil(string.length * 3) / 4 - n;
  };
  var b64 = new Array(64);
  var s64 = new Array(123);
  for (i = 0;i < 64; )
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
  var i;
  base64.encode = function encode(buffer, start, end) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end) {
      var b = buffer[start++];
      switch (j) {
        case 0:
          chunk[i2++] = b64[b >> 2];
          t = (b & 3) << 4;
          j = 1;
          break;
        case 1:
          chunk[i2++] = b64[t | b >> 4];
          t = (b & 15) << 2;
          j = 2;
          break;
        case 2:
          chunk[i2++] = b64[t | b >> 6];
          chunk[i2++] = b64[b & 63];
          j = 0;
          break;
      }
      if (i2 > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i2 = 0;
      }
    }
    if (j) {
      chunk[i2++] = b64[t];
      chunk[i2++] = 61;
      if (j === 1)
        chunk[i2++] = 61;
    }
    if (parts) {
      if (i2)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i2));
  };
  var invalidEncoding = "invalid encoding";
  base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, t;
    for (var i2 = 0;i2 < string.length; ) {
      var c = string.charCodeAt(i2++);
      if (c === 61 && j > 1)
        break;
      if ((c = s64[c]) === undefined)
        throw Error(invalidEncoding);
      switch (j) {
        case 0:
          t = c;
          j = 1;
          break;
        case 1:
          buffer[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer[offset++] = (t & 3) << 6 | c;
          j = 0;
          break;
      }
    }
    if (j === 1)
      throw Error(invalidEncoding);
    return offset - start;
  };
  base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
  };
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS((exports, module) => {
  var EventEmitter = function() {
    this._listeners = {};
  };
  module.exports = EventEmitter;
  EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
      fn,
      ctx: ctx || this
    });
    return this;
  };
  EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
      this._listeners = {};
    else {
      if (fn === undefined)
        this._listeners[evt] = [];
      else {
        var listeners = this._listeners[evt];
        for (var i = 0;i < listeners.length; )
          if (listeners[i].fn === fn)
            listeners.splice(i, 1);
          else
            ++i;
      }
    }
    return this;
  };
  EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
      var args = [], i = 1;
      for (;i < arguments.length; )
        args.push(arguments[i++]);
      for (i = 0;i < listeners.length; )
        listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
  };
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS((exports, module) => {
  var factory = function(exports2) {
    if (typeof Float32Array !== "undefined")
      (function() {
        var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
        }
        function writeFloat_f32_rev(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[3];
          buf[pos + 1] = f8b[2];
          buf[pos + 2] = f8b[1];
          buf[pos + 3] = f8b[0];
        }
        exports2.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        exports2.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          return f32[0];
        }
        function readFloat_f32_rev(buf, pos) {
          f8b[3] = buf[pos];
          f8b[2] = buf[pos + 1];
          f8b[1] = buf[pos + 2];
          f8b[0] = buf[pos + 3];
          return f32[0];
        }
        exports2.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        exports2.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
      })();
    else
      (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0)
            writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
          else if (isNaN(val))
            writeUint(2143289344, buf, pos);
          else if (val > 340282346638528860000000000000000000000)
            writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
          else if (val < 0.000000000000000000000000000000000000011754943508222875)
            writeUint((sign << 31 | Math.round(val / 0.000000000000000000000000000000000000000000001401298464324817)) >>> 0, buf, pos);
          else {
            var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
            writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
          }
        }
        exports2.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports2.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
          var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
          return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 0.000000000000000000000000000000000000000000001401298464324817 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        exports2.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports2.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
      })();
    if (typeof Float64Array !== "undefined")
      (function() {
        var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
          buf[pos + 4] = f8b[4];
          buf[pos + 5] = f8b[5];
          buf[pos + 6] = f8b[6];
          buf[pos + 7] = f8b[7];
        }
        function writeDouble_f64_rev(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[7];
          buf[pos + 1] = f8b[6];
          buf[pos + 2] = f8b[5];
          buf[pos + 3] = f8b[4];
          buf[pos + 4] = f8b[3];
          buf[pos + 5] = f8b[2];
          buf[pos + 6] = f8b[1];
          buf[pos + 7] = f8b[0];
        }
        exports2.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        exports2.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          f8b[4] = buf[pos + 4];
          f8b[5] = buf[pos + 5];
          f8b[6] = buf[pos + 6];
          f8b[7] = buf[pos + 7];
          return f64[0];
        }
        function readDouble_f64_rev(buf, pos) {
          f8b[7] = buf[pos];
          f8b[6] = buf[pos + 1];
          f8b[5] = buf[pos + 2];
          f8b[4] = buf[pos + 3];
          f8b[3] = buf[pos + 4];
          f8b[2] = buf[pos + 5];
          f8b[1] = buf[pos + 6];
          f8b[0] = buf[pos + 7];
          return f64[0];
        }
        exports2.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        exports2.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
      })();
    else
      (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0) {
            writeUint(0, buf, pos + off0);
            writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
          } else if (isNaN(val)) {
            writeUint(0, buf, pos + off0);
            writeUint(2146959360, buf, pos + off1);
          } else if (val > 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
            writeUint(0, buf, pos + off0);
            writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
          } else {
            var mantissa;
            if (val < 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000022250738585072014) {
              mantissa = val / 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005;
              writeUint(mantissa >>> 0, buf, pos + off0);
              writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
            } else {
              var exponent = Math.floor(Math.log(val) / Math.LN2);
              if (exponent === 1024)
                exponent = 1023;
              mantissa = val * Math.pow(2, -exponent);
              writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
              writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
            }
          }
        }
        exports2.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports2.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
          var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
          var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
          return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        exports2.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports2.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
      })();
    return exports2;
  };
  var writeUintLE = function(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
  };
  var writeUintBE = function(val, buf, pos) {
    buf[pos] = val >>> 24;
    buf[pos + 1] = val >>> 16 & 255;
    buf[pos + 2] = val >>> 8 & 255;
    buf[pos + 3] = val & 255;
  };
  var readUintLE = function(buf, pos) {
    return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
  };
  var readUintBE = function(buf, pos) {
    return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
  };
  module.exports = factory(factory);
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS((exports, module) => {
  function inquire(moduleName) {
    try {
      var mod = eval("quire".replace(/^/, "re"))(moduleName);
      if (mod && (mod.length || Object.keys(mod).length))
        return mod;
    } catch (e) {
    }
    return null;
  }
  module.exports = inquire;
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS((exports) => {
  var utf8 = exports;
  utf8.length = function utf8_length(string) {
    var len = 0, c = 0;
    for (var i = 0;i < string.length; ++i) {
      c = string.charCodeAt(i);
      if (c < 128)
        len += 1;
      else if (c < 2048)
        len += 2;
      else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else
        len += 3;
    }
    return len;
  };
  utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end) {
      t = buffer[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
      if (i > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i = 0;
      }
    }
    if (parts) {
      if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
  };
  utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset, c1, c2;
    for (var i = 0;i < string.length; ++i) {
      c1 = string.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS((exports, module) => {
  var pool = function(alloc, slice, size2) {
    var SIZE = size2 || 8192;
    var MAX = SIZE >>> 1;
    var slab = null;
    var offset = SIZE;
    return function pool_alloc(size3) {
      if (size3 < 1 || size3 > MAX)
        return alloc(size3);
      if (offset + size3 > SIZE) {
        slab = alloc(SIZE);
        offset = 0;
      }
      var buf = slice.call(slab, offset, offset += size3);
      if (offset & 7)
        offset = (offset | 7) + 1;
      return buf;
    };
  };
  module.exports = pool;
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS((exports, module) => {
  var LongBits = function(lo, hi) {
    this.lo = lo >>> 0;
    this.hi = hi >>> 0;
  };
  module.exports = LongBits;
  var util = require_minimal();
  var zero = LongBits.zero = new LongBits(0, 0);
  zero.toNumber = function() {
    return 0;
  };
  zero.zzEncode = zero.zzDecode = function() {
    return this;
  };
  zero.length = function() {
    return 1;
  };
  var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
  LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
      return zero;
    var sign = value < 0;
    if (sign)
      value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295)
          hi = 0;
      }
    }
    return new LongBits(lo, hi);
  };
  LongBits.from = function from(value) {
    if (typeof value === "number")
      return LongBits.fromNumber(value);
    if (util.isString(value)) {
      if (util.Long)
        value = util.Long.fromString(value);
      else
        return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
  };
  LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
      var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
      if (!lo)
        hi = hi + 1 >>> 0;
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  };
  LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
  };
  var charCodeAt = String.prototype.charCodeAt;
  LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
      return zero;
    return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
  };
  LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
  };
  LongBits.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  };
  LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  };
  LongBits.prototype.length = function length() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  };
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS((exports) => {
  var merge = function(dst, src, ifNotSet) {
    for (var keys = Object.keys(src), i = 0;i < keys.length; ++i)
      if (dst[keys[i]] === undefined || !ifNotSet)
        dst[keys[i]] = src[keys[i]];
    return dst;
  };
  var newError = function(name) {
    function CustomError(message, properties) {
      if (!(this instanceof CustomError))
        return new CustomError(message, properties);
      Object.defineProperty(this, "message", { get: function() {
        return message;
      } });
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, CustomError);
      else
        Object.defineProperty(this, "stack", { value: new Error().stack || "" });
      if (properties)
        merge(this, properties);
    }
    CustomError.prototype = Object.create(Error.prototype, {
      constructor: {
        value: CustomError,
        writable: true,
        enumerable: false,
        configurable: true
      },
      name: {
        get: function get() {
          return name;
        },
        set: undefined,
        enumerable: false,
        configurable: true
      },
      toString: {
        value: function value() {
          return this.name + ": " + this.message;
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
    return CustomError;
  };
  var util = exports;
  util.asPromise = require_aspromise();
  util.base64 = require_base64();
  util.EventEmitter = require_eventemitter();
  util.float = require_float();
  util.inquire = require_inquire();
  util.utf8 = require_utf8();
  util.pool = require_pool();
  util.LongBits = require_longbits();
  util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
  util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports;
  util.emptyArray = Object.freeze ? Object.freeze([]) : [];
  util.emptyObject = Object.freeze ? Object.freeze({}) : {};
  util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  };
  util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
  };
  util.isObject = function isObject(value) {
    return value && typeof value === "object";
  };
  util.isset = util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop))
      return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
  };
  util.Buffer = function() {
    try {
      var Buffer2 = util.inquire("buffer").Buffer;
      return Buffer2.prototype.utf8Write ? Buffer2 : null;
    } catch (e) {
      return null;
    }
  }();
  util._Buffer_from = null;
  util._Buffer_allocUnsafe = null;
  util.newBuffer = function newBuffer(sizeOrArray) {
    return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
  };
  util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
  util.key2Re = /^true|false|0|1$/;
  util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
  util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
  util.longToHash = function longToHash(value) {
    return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
  };
  util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
      return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
  };
  util.merge = merge;
  util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
  };
  util.newError = newError;
  util.ProtocolError = newError("ProtocolError");
  util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0;i < fieldNames.length; ++i)
      fieldMap[fieldNames[i]] = 1;
    return function() {
      for (var keys = Object.keys(this), i2 = keys.length - 1;i2 > -1; --i2)
        if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== undefined && this[keys[i2]] !== null)
          return keys[i2];
    };
  };
  util.oneOfSetter = function setOneOf(fieldNames) {
    return function(name) {
      for (var i = 0;i < fieldNames.length; ++i)
        if (fieldNames[i] !== name)
          delete this[fieldNames[i]];
    };
  };
  util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
  };
  util._configure = function() {
    var Buffer2 = util.Buffer;
    if (!Buffer2) {
      util._Buffer_from = util._Buffer_allocUnsafe = null;
      return;
    }
    util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
      return new Buffer2(value, encoding);
    };
    util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size2) {
      return new Buffer2(size2);
    };
  };
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS((exports, module) => {
  var Op = function(fn, len, val) {
    this.fn = fn;
    this.len = len;
    this.next = undefined;
    this.val = val;
  };
  var noop = function() {
  };
  var State = function(writer) {
    this.head = writer.head;
    this.tail = writer.tail;
    this.len = writer.len;
    this.next = writer.states;
  };
  var Writer = function() {
    this.len = 0;
    this.head = new Op(noop, 0, 0);
    this.tail = this.head;
    this.states = null;
  };
  var writeByte = function(val, buf, pos) {
    buf[pos] = val & 255;
  };
  var writeVarint32 = function(val, buf, pos) {
    while (val > 127) {
      buf[pos++] = val & 127 | 128;
      val >>>= 7;
    }
    buf[pos] = val;
  };
  var VarintOp = function(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
  };
  var writeVarint64 = function(val, buf, pos) {
    while (val.hi) {
      buf[pos++] = val.lo & 127 | 128;
      val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
      val.hi >>>= 7;
    }
    while (val.lo > 127) {
      buf[pos++] = val.lo & 127 | 128;
      val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
  };
  var writeFixed32 = function(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
  };
  module.exports = Writer;
  var util = require_minimal();
  var BufferWriter;
  var LongBits = util.LongBits;
  var base64 = util.base64;
  var utf8 = util.utf8;
  var create = function create() {
    return util.Buffer ? function create_buffer_setup() {
      return (Writer.create = function create_buffer() {
        return new BufferWriter;
      })();
    } : function create_array() {
      return new Writer;
    };
  };
  Writer.create = create();
  Writer.alloc = function alloc(size2) {
    return new util.Array(size2);
  };
  if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
  Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
  };
  VarintOp.prototype = Object.create(Op.prototype);
  VarintOp.prototype.fn = writeVarint32;
  Writer.prototype.uint32 = function write_uint32(value) {
    this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
    return this;
  };
  Writer.prototype.int32 = function write_int32(value) {
    return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
  };
  Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
  };
  Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
  };
  Writer.prototype.int64 = Writer.prototype.uint64;
  Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
  };
  Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
  };
  Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
  };
  Writer.prototype.sfixed32 = Writer.prototype.fixed32;
  Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
  };
  Writer.prototype.sfixed64 = Writer.prototype.fixed64;
  Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
  };
  Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
  };
  var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
    buf.set(val, pos);
  } : function writeBytes_for(val, buf, pos) {
    for (var i = 0;i < val.length; ++i)
      buf[pos + i] = val[i];
  };
  Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
      return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
      var buf = Writer.alloc(len = base64.length(value));
      base64.decode(value, buf, 0);
      value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
  };
  Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
  };
  Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
  };
  Writer.prototype.reset = function reset() {
    if (this.states) {
      this.head = this.states.head;
      this.tail = this.states.tail;
      this.len = this.states.len;
      this.states = this.states.next;
    } else {
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
    }
    return this;
  };
  Writer.prototype.ldelim = function ldelim() {
    var head = this.head, tail = this.tail, len = this.len;
    this.reset().uint32(len);
    if (len) {
      this.tail.next = head.next;
      this.tail = tail;
      this.len += len;
    }
    return this;
  };
  Writer.prototype.finish = function finish() {
    var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
    while (head) {
      head.fn(head.val, buf, pos);
      pos += head.len;
      head = head.next;
    }
    return buf;
  };
  Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
  };
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS((exports, module) => {
  var BufferWriter = function() {
    Writer.call(this);
  };
  var writeStringBuffer = function(val, buf, pos) {
    if (val.length < 40)
      util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
      buf.utf8Write(val, pos);
    else
      buf.write(val, pos);
  };
  module.exports = BufferWriter;
  var Writer = require_writer();
  (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
  var util = require_minimal();
  BufferWriter._configure = function() {
    BufferWriter.alloc = util._Buffer_allocUnsafe;
    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytesBuffer_copy(val, buf, pos) {
      if (val.copy)
        val.copy(buf, pos, 0, val.length);
      else
        for (var i = 0;i < val.length; )
          buf[pos++] = val[i++];
    };
  };
  BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
      value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
      this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
  };
  BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
      this._push(writeStringBuffer, len, value);
    return this;
  };
  BufferWriter._configure();
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS((exports, module) => {
  var indexOutOfRange = function(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
  };
  var Reader = function(buffer) {
    this.buf = buffer;
    this.pos = 0;
    this.len = buffer.length;
  };
  var readLongVarint = function() {
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) {
      for (;i < 4; ++i) {
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
      }
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
      i = 0;
    } else {
      for (;i < 3; ++i) {
        if (this.pos >= this.len)
          throw indexOutOfRange(this);
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
      }
      bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
      return bits;
    }
    if (this.len - this.pos > 4) {
      for (;i < 5; ++i) {
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
      }
    } else {
      for (;i < 5; ++i) {
        if (this.pos >= this.len)
          throw indexOutOfRange(this);
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
      }
    }
    throw Error("invalid varint encoding");
  };
  var readFixed32_end = function(buf, end) {
    return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
  };
  var readFixed64 = function() {
    if (this.pos + 8 > this.len)
      throw indexOutOfRange(this, 8);
    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
  };
  module.exports = Reader;
  var util = require_minimal();
  var BufferReader;
  var LongBits = util.LongBits;
  var utf8 = util.utf8;
  var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
    if (buffer instanceof Uint8Array || Array.isArray(buffer))
      return new Reader(buffer);
    throw Error("illegal buffer");
  } : function create_array(buffer) {
    if (Array.isArray(buffer))
      return new Reader(buffer);
    throw Error("illegal buffer");
  };
  var create = function create() {
    return util.Buffer ? function create_buffer_setup(buffer) {
      return (Reader.create = function create_buffer(buffer2) {
        return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
      })(buffer);
    } : create_array;
  };
  Reader.create = create();
  Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
  Reader.prototype.uint32 = function read_uint32_setup() {
    var value = 4294967295;
    return function read_uint32() {
      value = (this.buf[this.pos] & 127) >>> 0;
      if (this.buf[this.pos++] < 128)
        return value;
      value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return value;
      value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
      if (this.buf[this.pos++] < 128)
        return value;
      value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
      if (this.buf[this.pos++] < 128)
        return value;
      value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
      if (this.buf[this.pos++] < 128)
        return value;
      if ((this.pos += 5) > this.len) {
        this.pos = this.len;
        throw indexOutOfRange(this, 10);
      }
      return value;
    };
  }();
  Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
  };
  Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
  };
  Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
  };
  Reader.prototype.fixed32 = function read_fixed32() {
    if (this.pos + 4 > this.len)
      throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4);
  };
  Reader.prototype.sfixed32 = function read_sfixed32() {
    if (this.pos + 4 > this.len)
      throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4) | 0;
  };
  Reader.prototype.float = function read_float() {
    if (this.pos + 4 > this.len)
      throw indexOutOfRange(this, 4);
    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
  };
  Reader.prototype.double = function read_double() {
    if (this.pos + 8 > this.len)
      throw indexOutOfRange(this, 4);
    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
  };
  Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(), start = this.pos, end = this.pos + length;
    if (end > this.len)
      throw indexOutOfRange(this, length);
    this.pos += length;
    if (Array.isArray(this.buf))
      return this.buf.slice(start, end);
    if (start === end) {
      var nativeBuffer = util.Buffer;
      return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
    }
    return this._slice.call(this.buf, start, end);
  };
  Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
  };
  Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
      if (this.pos + length > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
    } else {
      do {
        if (this.pos >= this.len)
          throw indexOutOfRange(this);
      } while (this.buf[this.pos++] & 128);
    }
    return this;
  };
  Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        while ((wireType = this.uint32() & 7) !== 4) {
          this.skipType(wireType);
        }
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
  };
  Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();
    var fn = util.Long ? "toLong" : "toNumber";
    util.merge(Reader.prototype, {
      int64: function read_int64() {
        return readLongVarint.call(this)[fn](false);
      },
      uint64: function read_uint64() {
        return readLongVarint.call(this)[fn](true);
      },
      sint64: function read_sint64() {
        return readLongVarint.call(this).zzDecode()[fn](false);
      },
      fixed64: function read_fixed64() {
        return readFixed64.call(this)[fn](true);
      },
      sfixed64: function read_sfixed64() {
        return readFixed64.call(this)[fn](false);
      }
    });
  };
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS((exports, module) => {
  var BufferReader = function(buffer) {
    Reader.call(this, buffer);
  };
  module.exports = BufferReader;
  var Reader = require_reader();
  (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
  var util = require_minimal();
  BufferReader._configure = function() {
    if (util.Buffer)
      BufferReader.prototype._slice = util.Buffer.prototype.slice;
  };
  BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32();
    return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
  };
  BufferReader._configure();
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS((exports, module) => {
  var Service = function(rpcImpl, requestDelimited, responseDelimited) {
    if (typeof rpcImpl !== "function")
      throw TypeError("rpcImpl must be a function");
    util.EventEmitter.call(this);
    this.rpcImpl = rpcImpl;
    this.requestDelimited = Boolean(requestDelimited);
    this.responseDelimited = Boolean(responseDelimited);
  };
  module.exports = Service;
  var util = require_minimal();
  (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
  Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
    if (!request)
      throw TypeError("request must be specified");
    var self2 = this;
    if (!callback)
      return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
    if (!self2.rpcImpl) {
      setTimeout(function() {
        callback(Error("already ended"));
      }, 0);
      return;
    }
    try {
      return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
        if (err) {
          self2.emit("error", err, method);
          return callback(err);
        }
        if (response === null) {
          self2.end(true);
          return;
        }
        if (!(response instanceof responseCtor)) {
          try {
            response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
          } catch (err2) {
            self2.emit("error", err2, method);
            return callback(err2);
          }
        }
        self2.emit("data", response, method);
        return callback(null, response);
      });
    } catch (err) {
      self2.emit("error", err, method);
      setTimeout(function() {
        callback(err);
      }, 0);
      return;
    }
  };
  Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
      if (!endedByRPC)
        this.rpcImpl(null, null, null);
      this.rpcImpl = null;
      this.emit("end").off();
    }
    return this;
  };
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS((exports) => {
  var rpc = exports;
  rpc.Service = require_service();
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS((exports, module) => {
  module.exports = {};
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS((exports) => {
  var configure = function() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
  };
  var protobuf = exports;
  protobuf.build = "minimal";
  protobuf.Writer = require_writer();
  protobuf.BufferWriter = require_writer_buffer();
  protobuf.Reader = require_reader();
  protobuf.BufferReader = require_reader_buffer();
  protobuf.util = require_minimal();
  protobuf.rpc = require_rpc();
  protobuf.roots = require_roots();
  protobuf.configure = configure;
  configure();
});

// node_modules/@vue/shared/dist/shared.esm-bundler.js
var makeMap = function(str) {
  const map = Object.create(null);
  for (const key of str.split(","))
    map[key] = 1;
  return (val) => (val in map);
};
/*! #__NO_SIDE_EFFECTS__ */
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var extend = Object.assign;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var warn = function(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
};
var batch = function(sub) {
  sub.flags |= 8;
  sub.next = batchedSub;
  batchedSub = sub;
};
var startBatch = function() {
  batchDepth++;
};
var endBatch = function() {
  if (--batchDepth > 0) {
    return;
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    let next;
    while (e) {
      if (!(e.flags & 1)) {
        e.flags &= ~8;
      }
      e = e.next;
    }
    e = batchedSub;
    batchedSub = undefined;
    while (e) {
      next = e.next;
      e.next = undefined;
      e.flags &= ~8;
      if (e.flags & 1) {
        try {
          e.trigger();
        } catch (err) {
          if (!error)
            error = err;
        }
      }
      e = next;
    }
  }
  if (error)
    throw error;
};
var prepareDeps = function(sub) {
  for (let link = sub.deps;link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
};
var cleanupDeps = function(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail)
        tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = undefined;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
};
var isDirty = function(sub) {
  for (let link = sub.deps;link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
};
var refreshComputed = function(computed) {
  if (computed.flags & 4 && !(computed.flags & 16)) {
    return;
  }
  computed.flags &= ~16;
  if (computed.globalVersion === globalVersion) {
    return;
  }
  computed.globalVersion = globalVersion;
  const dep = computed.dep;
  computed.flags |= 2;
  if (dep.version > 0 && !computed.isSSR && computed.deps && !isDirty(computed)) {
    computed.flags &= ~2;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed;
  shouldTrack = true;
  try {
    prepareDeps(computed);
    const value = computed.fn(computed._value);
    if (dep.version === 0 || hasChanged(value, computed._value)) {
      computed._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed);
    computed.flags &= ~2;
  }
};
var removeSub = function(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = undefined;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = undefined;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
  }
  if (dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (!dep.subs && dep.computed) {
    dep.computed.flags &= ~4;
    for (let l = dep.computed.deps;l; l = l.nextDep) {
      removeSub(l, true);
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
};
var removeDep = function(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = undefined;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = undefined;
  }
};
var effect = function(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const e = new ReactiveEffect(fn);
  if (options) {
    extend(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  const runner = e.run.bind(e);
  runner.effect = e;
  return runner;
};
var pauseTracking = function() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
};
var resetTracking = function() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
};
var cleanupEffect = function(e) {
  const { cleanup } = e;
  e.cleanup = undefined;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = undefined;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
};
var addSub = function(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed = link.dep.computed;
    if (computed && !link.dep.subs) {
      computed.flags |= 4 | 16;
      for (let l = computed.deps;l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail)
        currentTail.nextSub = link;
    }
    if (link.dep.subsHead === undefined) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
};
var track = function(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map);
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep);
      dep.target = target;
      dep.map = depsMap;
      dep.key = key;
    }
    if (true) {
      dep.track({
        target,
        type,
        key
      });
    } else {
    }
  }
};
var trigger = function(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (true) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== undefined) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
};
var reactiveReadArray = function(array) {
  const raw = toRaw(array);
  if (raw === array)
    return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
};
var shallowReadArray = function(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
};
var iterator = function(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
};
var apply = function(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
};
var reduce = function(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
};
var searchProxy = function(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
};
var noTracking = function(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
};
var hasOwnProperty2 = function(key) {
  if (!isSymbol(key))
    key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
};
var get = function(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
};
var has = function(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
};
var size = function(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
};
var add = function(value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
};
var set = function(key, value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
};
var deleteEntry = function(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : undefined;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var clear = function() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", undefined, undefined, oldTarget);
  }
  return result;
};
var createForEach = function(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
};
var createIterableMethod = function(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
};
var createReadonlyMethod = function(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : type === "clear" ? undefined : this;
  };
};
var createInstrumentations = function() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add(value) {
      return add.call(this, value, true);
    },
    set(key, value) {
      return set.call(this, key, value, true);
    },
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
};
var createInstrumentationGetter = function(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
};
var checkIdentityKeys = function(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
};
var targetTypeMap = function(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
};
var getTargetType = function(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
};
var reactive = function(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
};
var readonly = function(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
};
var createReactiveObject = function(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      warn(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
};
var isReadonly = function(value) {
  return !!(value && value["__v_isReadonly"]);
};
var isShallow = function(value) {
  return !!(value && value["__v_isShallow"]);
};
var isProxy = function(value) {
  return value ? !!value["__v_raw"] : false;
};
var toRaw = function(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
};
var isRef = function(r) {
  return r ? r["__v_isRef"] === true : false;
};
var ref = function(value) {
  return createRef(value, false);
};
var createRef = function(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
};
var activeEffectScope;
var activeSub;
var pausedQueueEffects = new WeakSet;

class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = undefined;
    this.depsTail = undefined;
    this.flags = 1 | 4;
    this.next = undefined;
    this.cleanup = undefined;
    this.scheduler = undefined;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= ~64;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn("Active effect was not restored correctly - this is likely a Vue internal bug.");
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= ~2;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps;link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = undefined;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= ~1;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
var batchDepth = 0;
var batchedSub;
var shouldTrack = true;
var trackStack = [];
var globalVersion = 0;

class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = undefined;
  }
}

class Dep {
  constructor(computed) {
    this.computed = computed;
    this.version = 0;
    this.activeLink = undefined;
    this.subs = undefined;
    this.target = undefined;
    this.map = undefined;
    this.key = undefined;
    this.sc = 0;
    if (true) {
      this.subsHead = undefined;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === undefined || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = undefined;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (activeSub.onTrack) {
      activeSub.onTrack(extend({
        effect: activeSub
      }, debugInfo));
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (true) {
        for (let head = this.subsHead;head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(extend({
              effect: head.sub
            }, debugInfo));
          }
        }
      }
      for (let link = this.subs;link; link = link.prevSub) {
        if (link.sub.notify()) {
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
var targetMap = new WeakMap;
var ITERATE_KEY = Symbol("Object iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map keys iterate");
var ARRAY_ITERATE_KEY = Symbol("Array iterate");
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, undefined, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, undefined, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, undefined, arguments);
  },
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, undefined, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, undefined, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, undefined, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
var arrayProto = Array.prototype;
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));

class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(target, key, isRef(target) ? target : receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}

class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
}

class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (true) {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
}
var mutableHandlers = new MutableReactiveHandler;
var readonlyHandlers = new ReadonlyReactiveHandler;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
var [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = createInstrumentations();
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var reactiveMap = new WeakMap;
var shallowReactiveMap = new WeakMap;
var readonlyMap = new WeakMap;
var shallowReadonlyMap = new WeakMap;
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;

class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep;
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    if (true) {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    } else {
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      if (true) {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      } else {
      }
    }
  }
}

// src/network.ts
function persistentRef(key, initialValue) {
  const storedValue = LocalStorageService.load(key);
  const dataRef = ref(storedValue ?? initialValue);
  effect(() => {
    LocalStorageService.save(key, dataRef.value);
  });
  return dataRef;
}

class LocalStorageService {
  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static load(key) {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue)
        return JSON.parse(jsonValue);
    } catch (_) {
      try {
        localStorage.removeItem(key);
      } catch (_2) {
      }
    }
    return null;
  }
}
var getNetworkApiUrl = (network) => {
  return {
    localhost: "http://localhost:4321",
    devnet: "https://api.devnet.hyle.eu"
  }[network];
};
var getNetworkWebsocketUrl = (network) => {
  return {
    localhost: "ws://localhost:4321",
    devnet: "wss://rpc.devnet.hyle.eu"
  }[network];
};

// src/indexer.ts
async function subscribeToTxSearch(network2, query, handler) {
  const client = await JSONRpcClient.connect(`${getNetworkWebsocketUrl(network2)}/websocket`);
  client.searchAndSubscribe("tx_search", query, handler);
}

class WebSocketConnection {
  ws;
  url;
  idCounter = 1;
  messageHandlers = {};
  reconnectAttempts = 0;
  opened;
  static async connect(url) {
    const client = new WebSocketConnection(url);
    await client.opened;
    return client;
  }
  constructor(url) {
    this.url = url;
    this.connectWebSocket();
  }
  async connectWebSocket() {
    this.opened = new Promise(async (resolve, reject) => {
      this.ws = new WebSocket(this.url);
      this.ws.onerror = () => {
        this.attemptReconnect().catch(reject);
      };
      this.ws.onclose = () => {
        this.attemptReconnect().catch(reject);
      };
      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        resolve();
      };
    });
    await this.opened;
    this.ws.onmessage = (event) => this.onMessage(event);
  }
  async attemptReconnect() {
    if (this.reconnectAttempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, this.reconnectAttempts) * 1000));
      this.reconnectAttempts++;
      await this.connectWebSocket();
    } else {
      throw new Error("Maximum reconnect attempts reached.");
    }
  }
  async call(method, params, handler) {
    const id = this.idCounter++;
    const payload = JSON.stringify({ jsonrpc: "2.0", method, params, id });
    this.messageHandlers[id] = handler;
    this.ws.send(payload);
  }
  onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.result) {
      this.messageHandlers[message.id]?.(message.result);
    }
  }
}

class JSONRpcClient extends WebSocketConnection {
  constructor() {
    super(...arguments);
  }
  MAX_PAGE_SIZE = 40;
  static async connect(url) {
    const client = new JSONRpcClient(url);
    await client.opened;
    return client;
  }
  async search(endpoint, query, handler) {
    const total_count = await new Promise((resolve) => {
      this.call(endpoint, { query, per_page: `${this.MAX_PAGE_SIZE}`, order_by: "desc" }, (result) => {
        handler(result);
        resolve(+result.total_count);
      });
    });
    for (let i = 1;i * this.MAX_PAGE_SIZE < total_count; i++) {
      this.call(endpoint, {
        query,
        page: `${i + 1}`,
        per_page: `${this.MAX_PAGE_SIZE}`,
        order_by: "desc"
      }, async (result) => {
        handler(result);
      });
    }
  }
  subscribe(query, handler) {
    return this.call("subscribe", { query }, (result) => {
      if (!result.data?.value?.TxResult) {
        return;
      }
      handler(result.data.value.TxResult);
    });
  }
  async searchAndSubscribe(endpoint, query, onNewResult) {
    this.subscribe(query, onNewResult);
    this.search(endpoint, query, (result) => {
      result.txs.forEach((tx) => onNewResult(tx));
    });
  }
}

// src/blocks.ts
class BlockStore {
  network;
  blockData;
  blocks;
  constructor(network3) {
    this.network = network3;
    this.blockData = {};
    this.blocks = [];
  }
  async loadBlockData(blockIdentifier) {
    if (this.blockData[blockIdentifier])
      return;
    const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/indexer/block/${blockIdentifier}`);
    const data = await response.json();
    console.log("block", blockIdentifier, data);
    let hashes = data.txs.map((x) => x.hash);
    this.blockData[blockIdentifier] = {
      ...data,
      timestamp: new Date(data.timestamp * 1000),
      txs: hashes
    };
  }
  async loadBlocks() {
    const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/indexer/blocks`);
    this.blocks = (await response.json()).reverse();
    const client = await WebSocketConnection.connect(`${getNetworkWebsocketUrl(this.network)}`);
    client.call("subscribe", { query: "tm.event='NewBlock'" }, (result) => {
      if (!result.data?.value?.block)
        return;
      this.blocks.push({
        height: result.header.height,
        num_txs: result.txs.len()
      });
    });
  }
}
// src/ByteArray.ts
var bigIntToAscii = function(value) {
  let asHex = value.toString(16);
  if (asHex.length % 2 !== 0)
    asHex = "0" + asHex;
  const asBytes = [];
  for (let i = 0;i < asHex.length; i += 2) {
    asBytes.push(String.fromCharCode(parseInt(asHex.slice(i, i + 2), 16)));
  }
  return asBytes.join("");
};
function deserByteArray(data) {
  const words = Number(data[0]);
  const remaining = +data.slice(-1);
  let result = "";
  for (let i = 1;i <= words; i++) {
    result += bigIntToAscii(BigInt(data[i]));
  }
  if (remaining > 0)
    result += bigIntToAscii(BigInt(data.slice(-2, -1)[0]));
  return result;
}
function serByteArray(arr) {
  const pending_word = arr.length / 31 >> 0;
  let words = [];
  for (let i = 0;i < pending_word; i += 1) {
    words.push(BigInt("0x" + arr.slice(0, 31).split("").map((x) => x.charCodeAt(0).toString(16)).join("")).toString());
    arr = arr.substring(31);
  }
  const pending_word_len = arr.length;
  words.push(BigInt("0x" + arr.split("").map((x) => x.charCodeAt(0).toString(16)).join("")).toString());
  return `${pending_word} ${words.join(" ")} ${pending_word_len}`;
}
// src/contracts.ts
class ContractsStore {
  network;
  contractData;
  constructor(network4, customData) {
    this.network = network4;
    this.contractData = customData ?? {};
  }
  async loadContractData(contract_name) {
    const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/indexer/contract/${contract_name}`);
    const contract = await response.json();
    console.log("contract", contract_name, contract);
    this.contractData[contract_name] = contract;
  }
  async loadContract() {
    const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/indexer/contracts`);
    const contracts = await response.json();
    for (const contract of contracts) {
      this.contractData[contract.contract_name] = contract;
    }
  }
}
// src/utils.ts
function hexToUint8Array(hex) {
  let evenHex = hex;
  if (hex.length % 2 !== 0)
    evenHex = "0" + hex;
  const len = evenHex.length / 2;
  const arr = new Uint8Array(len);
  for (let i = 0;i < len; i++) {
    arr[i] = parseInt(evenHex.slice(i * 2, (i + 1) * 2), 16);
  }
  return arr;
}
function uint8ArrayToBase64(array) {
  if (typeof Buffer !== "undefined")
    return Buffer.from(array).toString("base64");
  const CHUNK_SIZE = 32768;
  let index = 0;
  const length = array.length;
  let result = "";
  while (index < length) {
    const end = Math.min(length, index + CHUNK_SIZE);
    result += String.fromCharCode.apply(null, array.slice(index, end));
    index = end;
  }
  return btoa(result);
}
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0;i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToHex(tx_hash) {
  return tx_hash.map((x) => x.toString(16).padStart(2, "0")).join("");
}
function uint8ArrayToAscii(array) {
  return new TextDecoder().decode(array);
}

// src/hyle.ts
async function broadcastProofTx(network5, hash, blobIndex, contractName, proof) {
  const proofTx = {
    txHash: hash,
    blobs_references: [{
      contract_name: contractName,
      blob_tx_hash: hash,
      blob_index: blobIndex
    }],
    proof: uint8ArrayToBase64(proof)
  };
  const response = await fetch(`${getNetworkApiUrl(network5)}/v1/tx/send/proof`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(proofTx)
  });
  if (!response.ok) {
    throw new Error(`Failed to broadcast blob transaction: ${response.statusText}. ${await response.text()}`);
  }
  let proofTxHash = await response.json();
  return proofTxHash;
}
async function broadcastBlobTx(network5, blobTx) {
  const camelCasedBlobs = blobTx.blobs.map((blob) => ({
    contract_name: blob.contractName,
    data: blob.data
  }));
  const camelCasedBlobTx = {
    identity: blobTx.identity,
    blobs: camelCasedBlobs
  };
  const response = await fetch(`${getNetworkApiUrl(network5)}/v1/tx/send/blob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(camelCasedBlobTx)
  });
  if (!response.ok) {
    throw new Error(`Failed to broadcast blob transaction: ${response.statusText}. ${await response.text()}`);
  }
  const blobTxHash = await response.json();
  return String(blobTxHash);
}
async function checkTxesStatus(network5, hashes) {
  for (const hash of hashes) {
    const resp2 = await checkTxStatus(network5, hash);
    if (resp2.status == "failed") {
      return resp2;
    }
  }
  return {
    status: "success"
  };
}
async function checkTxStatus(network5, txHash) {
  const response = await fetch(`${getNetworkApiUrl(network5)}/v1/indexer/transaction/hash/${txHash}`, {
    method: "GET"
  });
  if (!response.ok) {
    return {
      status: "failed",
      error: "Tx not found"
    };
  }
  return {
    status: "success"
  };
}
async function checkContractExists(network5, contractName) {
  const checkExists = await fetch(`${getNetworkApiUrl(network5)}/v1/indexer/contract/${contractName}`);
  try {
    let data = await checkExists.json();
    return data.contract_name == contractName;
  } catch (e) {
    return false;
  }
}
async function registerContract(network5, verifier, contractName, programId, stateDigest) {
  var owner = "todo";
  let contractRegister = {
    owner,
    verifier,
    contract_name: contractName,
    program_id: Array.from(programId),
    state_digest: Array.from(stateDigest)
  };
  const response = await fetch(`${getNetworkApiUrl(network5)}/v1/contract/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contractRegister)
  });
  return await response.json();
}
// src/erc20.ts
class Erc20Parser {
  contractName = "erc20";
  balancesSettled = {};
  balancesPending = {};
  pendingTxs = {};
  constructor(contractName, initialState) {
    if (contractName)
      this.contractName = contractName;
    if (initialState)
      this.balancesSettled = initialState;
  }
  consumeTx(tx) {
    if (tx.transactionStatus === "Sequenced") {
      this.processBlobs(tx.blobs, "Sequenced");
      this.pendingTxs[tx.txHash] = tx;
    } else if (tx.transactionStatus === "Success") {
      this.processBlobs(tx.blobs, "Success");
      this.removePendingTx(tx.txHash);
    } else if (tx.transactionStatus === "Failure") {
      this.removePendingTx(tx.txHash);
    }
  }
  processBlobs(txBlobs, status) {
    const blobs = txBlobs.filter((x) => x.contractName === this.contractName);
    blobs.forEach((blob) => {
      const parsed = new TextDecoder().decode(new Uint8Array(blob.data));
      const felts = parsed.split(" ").slice(1);
      const fromSize = parseInt(felts[0]);
      const from = deserByteArray(felts.slice(0, fromSize + 3));
      const toSize = parseInt(felts[3 + fromSize]);
      const to = deserByteArray(felts.slice(3 + fromSize, 3 + fromSize + toSize + 3));
      const amount = parseInt(felts.slice(-1)[0]);
      if (status === "Success") {
        this.balancesSettled[from] = (this.balancesSettled[from] || 0) - amount;
        this.balancesSettled[to] = (this.balancesSettled[to] || 0) + amount;
      } else if (status === "Sequenced") {
        this.balancesPending[from] = (this.balancesPending[from] || this.balancesSettled[from] || 0) - amount;
        this.balancesPending[to] = (this.balancesPending[to] || this.balancesSettled[to] || 0) + amount;
      }
    });
  }
  settleTx(txHash, success) {
    const tx = this.pendingTxs[txHash];
    if (!tx)
      return;
    tx.blobs.forEach((blob) => {
      const parsed = new TextDecoder().decode(new Uint8Array(blob.data));
      const felts = parsed.split(" ").slice(1);
      const fromSize = parseInt(felts[0]);
      const from = deserByteArray(felts.slice(0, fromSize + 3));
      const toSize = parseInt(felts[3 + fromSize]);
      const to = deserByteArray(felts.slice(3 + fromSize, 3 + fromSize + toSize + 3));
      const amount = parseInt(felts.slice(-1)[0]);
      if (success) {
        this.balancesSettled[from] = (this.balancesSettled[from] || 0) - amount;
        this.balancesSettled[to] = (this.balancesSettled[to] || 0) + amount;
      }
      this.balancesPending[from] = (this.balancesPending[from] || 0) + amount;
      this.balancesPending[to] = (this.balancesPending[to] || 0) - amount;
      this.removePendingTx(txHash);
    });
  }
  removePendingTx(txHash) {
    delete this.pendingTxs[txHash];
  }
}
// src/transactions.ts
class TransactionsStore {
  network;
  blobTransactions;
  constructor(network6, customData) {
    this.network = network6;
    this.blobTransactions = customData ?? [];
  }
  async loadBlobTxsLinkedWithContract(contractName) {
    try {
      const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/indexer/blob_transactions/contract/${contractName}`);
      if (!response.ok) {
        return;
      }
      const resp = await response.json();
      const txs = resp.map((tx) => ({
        txHash: tx.tx_hash,
        identity: tx.identity,
        transactionStatus: tx.transaction_status,
        blobs: tx.blobs.map((blob) => ({
          contractName: blob.contract_name,
          data: blob.data
        }))
      }));
      this.blobTransactions = txs;
    } catch (error) {
      console.error(`Error fetching transactions: ${error}`);
    }
  }
  addListenerOnContract(contractName, callback) {
    const socket = new WebSocket(`${getNetworkApiUrl(this.network)}/v1/indexer/blob_transactions/contract/${contractName}/ws`);
    socket.addEventListener("message", (tx) => {
      const newTx = JSON.parse(tx.data);
      if (this.blobTransactions.some((tx2) => tx2.txHash === newTx.tx_hash)) {
        return;
      }
      if (callback) {
        callback({
          txHash: newTx.tx_hash,
          identity: newTx.identity,
          transactionStatus: newTx.transaction_status,
          blobs: newTx.blobs.map((blob) => ({
            contractName: blob.contract_name,
            data: blob.data
          }))
        });
      }
      this.blobTransactions.push({
        txHash: newTx.tx_hash,
        identity: newTx.identity,
        transactionStatus: newTx.transaction_status,
        blobs: newTx.blobs.map((blob) => ({
          contractName: blob.contract_name,
          data: blob.data
        }))
      });
    });
  }
}
// src/proto/tx.ts
var _m0 = __toESM(require_index_minimal(), 1);
var createBasePayload = function() {
  return { contractName: "", data: new Uint8Array(0) };
};
var createBaseMsgPublishPayloads = function() {
  return { identity: "", payloads: [] };
};
var createBaseMsgPublishPayloadProof = function() {
  return { txHash: new Uint8Array(0), payloadIndex: 0, contractName: "", proof: new Uint8Array(0) };
};
var createBaseMsgRegisterContract = function() {
  return { owner: "", verifier: "", programId: new Uint8Array(0), stateDigest: new Uint8Array(0), contractName: "" };
};
var bytesFromBase64 = function(b64) {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0;i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
};
var base64FromBytes = function(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
};
var isSet2 = function(value) {
  return value !== null && value !== undefined;
};
var Payload = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.contractName !== "") {
      writer.uint32(10).string(message.contractName);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.contractName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      contractName: isSet2(object.contractName) ? globalThis.String(object.contractName) : "",
      data: isSet2(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0)
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.contractName !== "") {
      obj.contractName = message.contractName;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },
  create(base) {
    return Payload.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePayload();
    message.contractName = object.contractName ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  }
};
var MsgPublishPayloads = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.identity !== "") {
      writer.uint32(10).string(message.identity);
    }
    for (const v of message.payloads) {
      Payload.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishPayloads();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.identity = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.payloads.push(Payload.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      identity: isSet2(object.identity) ? globalThis.String(object.identity) : "",
      payloads: globalThis.Array.isArray(object?.payloads) ? object.payloads.map((e) => Payload.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.identity !== "") {
      obj.identity = message.identity;
    }
    if (message.payloads?.length) {
      obj.payloads = message.payloads.map((e) => Payload.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return MsgPublishPayloads.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseMsgPublishPayloads();
    message.identity = object.identity ?? "";
    message.payloads = object.payloads?.map((e) => Payload.fromPartial(e)) || [];
    return message;
  }
};
var MsgPublishPayloadProof = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.txHash.length !== 0) {
      writer.uint32(10).bytes(message.txHash);
    }
    if (message.payloadIndex !== 0) {
      writer.uint32(16).uint32(message.payloadIndex);
    }
    if (message.contractName !== "") {
      writer.uint32(26).string(message.contractName);
    }
    if (message.proof.length !== 0) {
      writer.uint32(34).bytes(message.proof);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishPayloadProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.txHash = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.payloadIndex = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.contractName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.proof = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      txHash: isSet2(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(0),
      payloadIndex: isSet2(object.payloadIndex) ? globalThis.Number(object.payloadIndex) : 0,
      contractName: isSet2(object.contractName) ? globalThis.String(object.contractName) : "",
      proof: isSet2(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0)
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.txHash.length !== 0) {
      obj.txHash = base64FromBytes(message.txHash);
    }
    if (message.payloadIndex !== 0) {
      obj.payloadIndex = Math.round(message.payloadIndex);
    }
    if (message.contractName !== "") {
      obj.contractName = message.contractName;
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    return obj;
  },
  create(base) {
    return MsgPublishPayloadProof.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseMsgPublishPayloadProof();
    message.txHash = object.txHash ?? new Uint8Array(0);
    message.payloadIndex = object.payloadIndex ?? 0;
    message.contractName = object.contractName ?? "";
    message.proof = object.proof ?? new Uint8Array(0);
    return message;
  }
};
var MsgRegisterContract = {
  encode(message, writer = _m0.Writer.create()) {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.verifier !== "") {
      writer.uint32(18).string(message.verifier);
    }
    if (message.programId.length !== 0) {
      writer.uint32(26).bytes(message.programId);
    }
    if (message.stateDigest.length !== 0) {
      writer.uint32(34).bytes(message.stateDigest);
    }
    if (message.contractName !== "") {
      writer.uint32(42).string(message.contractName);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.verifier = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.programId = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.stateDigest = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.contractName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      owner: isSet2(object.owner) ? globalThis.String(object.owner) : "",
      verifier: isSet2(object.verifier) ? globalThis.String(object.verifier) : "",
      programId: isSet2(object.programId) ? bytesFromBase64(object.programId) : new Uint8Array(0),
      stateDigest: isSet2(object.stateDigest) ? bytesFromBase64(object.stateDigest) : new Uint8Array(0),
      contractName: isSet2(object.contractName) ? globalThis.String(object.contractName) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.verifier !== "") {
      obj.verifier = message.verifier;
    }
    if (message.programId.length !== 0) {
      obj.programId = base64FromBytes(message.programId);
    }
    if (message.stateDigest.length !== 0) {
      obj.stateDigest = base64FromBytes(message.stateDigest);
    }
    if (message.contractName !== "") {
      obj.contractName = message.contractName;
    }
    return obj;
  },
  create(base) {
    return MsgRegisterContract.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseMsgRegisterContract();
    message.owner = object.owner ?? "";
    message.verifier = object.verifier ?? "";
    message.programId = object.programId ?? new Uint8Array(0);
    message.stateDigest = object.stateDigest ?? new Uint8Array(0);
    message.contractName = object.contractName ?? "";
    return message;
  }
};
export {
  uint8ArrayToHex,
  uint8ArrayToBase64,
  uint8ArrayToAscii,
  subscribeToTxSearch,
  serByteArray,
  registerContract,
  persistentRef,
  hexToUint8Array,
  getNetworkWebsocketUrl,
  getNetworkApiUrl,
  deserByteArray,
  checkTxesStatus,
  checkTxStatus,
  checkContractExists,
  broadcastProofTx,
  broadcastBlobTx,
  base64ToUint8Array,
  WebSocketConnection,
  TransactionsStore,
  MsgRegisterContract,
  MsgPublishPayloads,
  MsgPublishPayloadProof,
  Erc20Parser,
  ContractsStore,
  BlockStore
};
