"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
chai_1.should();
var _1 = require("../");
describe('constantBuilder\'s', function () {
    describe('incorrect calls', function () {
        it('should throw if no arguments', function () {
            var badCall = function () {
                _1.ConstantBuilder.buildFlat(undefined, undefined);
            };
            chai_1.expect(badCall)
                .to
                .throw();
        });
        it('should throw if no verb', function () {
            var badCall = function () {
                _1.ConstantBuilder.buildFlat('raggabomb', undefined);
            };
            chai_1.expect(badCall)
                .to
                .throw();
        });
    });
    describe('returned constants', function () {
        it('should create one flat constant', function () {
            var constants = (_a = {},
                _a['FROGS_JUMP'] = 'frogs-jump',
                _a);
            _1.ConstantBuilder
                .buildFlat('frogs', 'jump')
                .should
                .be
                .deep
                .equal(constants);
            var _a;
        });
        it('should create multiple flat constants', function () {
            var constants = (_a = {},
                _a['FROGS_JUMP'] = 'frogs-jump',
                _a['FROGS_EAT'] = 'frogs-eat',
                _a['FROGS_DIE'] = 'frogs-die',
                _a);
            _1.ConstantBuilder
                .buildFlat('frogs', ['jump', 'eat', 'die'])
                .should
                .be
                .deep
                .equal(constants);
            var _a;
        });
        it('should create suffixed flat constants', function () {
            var constants = (_a = {},
                _a['FROGS_JUMP'] = 'frogs-jump',
                _a['FROGS_EAT'] = 'frogs-eat',
                _a['FROGS_DIE_HARD'] = 'frogs-die-hard',
                _a['FROGS_DIE_MYGAWD'] = 'frogs-die-mygawd',
                _a['FROGS_DIE_WHILEHIGH'] = 'frogs-die-whilehigh',
                _a);
            var suffixes = ['hard', 'mygawd', 'whilehigh'];
            _1.ConstantBuilder
                .buildFlat('frogs', ['jump', 'eat', 'die'], [null, null, suffixes])
                .should
                .be
                .deep
                .equal(constants);
            var _a;
        });
        it('should create one deep constant', function () {
            var constants = (_a = {},
                _a['JUMP'] = 'frogs-jump',
                _a);
            _1.ConstantBuilder
                .buildDeep('frogs', 'jump')
                .should
                .be
                .deep
                .equal(constants);
            var _a;
        });
        it('should create multiple deep constants', function () {
            var constants = (_a = {},
                _a['JUMP'] = 'frogs-jump',
                _a['EAT'] = 'frogs-eat',
                _a['DIE'] = 'frogs-die',
                _a);
            _1.ConstantBuilder
                .buildDeep('frogs', ['jump', 'eat', 'die'])
                .should
                .be
                .deep
                .equal(constants);
            var _a;
        });
        it('should create suffixed deep constants', function () {
            var constants = (_a = {},
                _a['JUMP'] = 'frogs-jump',
                _a['EAT'] = 'frogs-eat',
                _a['DIE'] = (_b = {},
                    _b['HARD'] = 'frogs-die-hard',
                    _b['MYGAWD'] = 'frogs-die-mygawd',
                    _b['WHILEHIGH'] = 'frogs-die-whilehigh',
                    _b),
                _a);
            var suffixes = ['hard', 'mygawd', 'whilehigh'];
            _1.ConstantBuilder
                .buildDeep('frogs', ['jump', 'eat', 'die'], [null, null, suffixes])
                .should
                .be
                .deep
                .equal(constants);
            var _a, _b;
        });
    });
});
