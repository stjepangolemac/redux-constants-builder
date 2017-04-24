"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./utils/errors");
var ConstantsBuilder = (function () {
    function ConstantsBuilder() {
    }
    /**
     * Builds constants from passed arguments and returns them as deep object.
     * @param entity
     * @param verbs
     * @param suffixes
     */
    ConstantsBuilder.buildDeep = function (entity, verbs, suffixes, prefix) {
        var _constants = this._build(entity, verbs, suffixes);
        var _prefix = _constants[0].split('-')[0].toUpperCase();
        var constants = {};
        _constants.forEach(function (entry) {
            var parts = entry.split('-');
            if (parts.length === 2) {
                constants[parts[1].toUpperCase()] = entry;
            }
            else if (parts.length === 3) {
                if (constants[parts[1].toUpperCase()]) {
                    constants[parts[1].toUpperCase()][parts[2].toUpperCase()] =
                        entry;
                }
                else {
                    constants[parts[1].toUpperCase()] = {};
                    constants[parts[1].toUpperCase()][parts[2].toUpperCase()] =
                        entry;
                }
            }
            else {
                throw new errors_1.ArgumentError(errors_1.ArgumentError.DASH_ARG);
            }
        });
        if (prefix) {
            return _a = {}, _a[_prefix] = constants, _a;
        }
        else {
            return constants;
        }
        var _a;
    };
    /**
     * Builds constants from passed arguments and returns them as flat object.
     * @param entity
     * @param verbs
     * @param suffixes
     */
    ConstantsBuilder.buildFlat = function (entity, verbs, suffixes, prefix) {
        var _this = this;
        var _constants = this._build(entity, verbs, suffixes);
        var constants = {};
        _constants.forEach(function (entry) {
            constants[_this._makePropName(entry, !prefix)] = entry.toLowerCase();
        });
        return constants;
    };
    /**
     * Builds constants from passed arguments and returns them as array.
     * @param entity
     * @param verbs
     * @param suffixes
     */
    ConstantsBuilder._build = function (entity, verbs, suffixes) {
        var _this = this;
        if (entity === undefined || verbs === undefined) {
            throw new errors_1.ArgumentError(errors_1.ArgumentError.UNDEFINED_ARG);
        }
        if (Array.isArray(entity)) {
            throw new errors_1.ArgumentError(errors_1.ArgumentError.ARRAY_ARG);
        }
        Array.isArray(verbs) ? null : verbs = [verbs];
        var _constants = [];
        if (suffixes) {
            suffixes.forEach(function (suffix) {
                if (suffix) {
                    _constants.push(suffix);
                }
                else {
                    _constants.push(null);
                }
            });
        }
        verbs.forEach(function (entry, index) {
            if (_constants[index]) {
                _constants[index] = _this._combine(entry, _constants[index]);
            }
            else {
                _constants[index] = [entry];
            }
        });
        var list = this._combine(entity, this._flatten(_constants));
        return list;
    };
    /**
     * Transforms a constant value to constant name.
     * @param propValue
     */
    ConstantsBuilder._makePropName = function (propValue, cutPrefix) {
        var result = propValue.split('-');
        if (cutPrefix) {
            result = result.slice(1).join('_');
        }
        else {
            result = result.join('_');
        }
        return result.toUpperCase();
    };
    /**
     * Flattens the matrix of strings to a string array.
     * @param matrix
     */
    ConstantsBuilder._flatten = function (matrix) {
        var result = [];
        matrix.forEach(function (row) {
            row.forEach(function (entry) { return result.push(entry); });
        });
        return result;
    };
    /**
     * Appends a string to every string in the array and inserts
     * a dash in between.
     * @param word
     * @param wordArray
     * @param noline
     */
    ConstantsBuilder._combine = function (word, wordArray, noDash) {
        return wordArray.map(function (entry) {
            return "" + word + (noDash ? '' : '-') + entry;
        });
    };
    return ConstantsBuilder;
}());
exports.ConstantsBuilder = ConstantsBuilder;
