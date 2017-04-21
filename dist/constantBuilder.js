"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./utils/errors");
var ConstantBuilder = (function () {
    function ConstantBuilder() {
    }
    /**
     * Builds constants from passed arguments and returns them as deep object.
     * @param entity
     * @param verb
     * @param suffixes
     */
    ConstantBuilder.buildDeep = function (entity, verb, suffixes) {
        var _constants = this._build(entity, verb, suffixes);
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
        return constants;
    };
    /**
     * Builds constants from passed arguments and returns them as flat object.
     * @param entity
     * @param verb
     * @param suffixes
     */
    ConstantBuilder.buildFlat = function (entity, verb, suffixes) {
        var _this = this;
        var _constants = this._build(entity, verb, suffixes);
        var constants = {};
        _constants.forEach(function (entry) {
            constants[_this._makePropName(entry)] = entry.toLowerCase();
        });
        return constants;
    };
    /**
     * Builds constants from passed arguments and returns them as array.
     * @param entity
     * @param verb
     * @param suffixes
     */
    ConstantBuilder._build = function (entity, verb, suffixes) {
        var _this = this;
        if (entity === undefined || verb === undefined) {
            throw new errors_1.ArgumentError(errors_1.ArgumentError.UNDEFINED_ARG);
        }
        if (Array.isArray(entity)) {
            throw new errors_1.ArgumentError(errors_1.ArgumentError.ARRAY_ARG);
        }
        Array.isArray(verb) ? null : verb = [verb];
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
        verb.forEach(function (entry, index) {
            if (_constants[index]) {
                _constants[index] = _this._combine(entry, _constants[index]);
            }
            else {
                _constants[index] = [entry];
            }
        });
        return this._combine(entity, this._flatten(_constants));
    };
    /**
     * Transforms a constant value to constant name.
     * @param propValue
     */
    ConstantBuilder._makePropName = function (propValue) {
        return propValue.split('-').join('_').toUpperCase();
    };
    /**
     * Flattens the matrix of strings to a string array.
     * @param matrix
     */
    ConstantBuilder._flatten = function (matrix) {
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
    ConstantBuilder._combine = function (word, wordArray, noDash) {
        return wordArray.map(function (entry) {
            return "" + word + (noDash ? '' : '-') + entry;
        });
    };
    return ConstantBuilder;
}());
exports.default = ConstantBuilder;
