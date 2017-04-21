import { expect, should } from 'chai'
should()

import ConstantBuilder from '../'

describe('constantBuilder\'s', function () {

  describe('incorrect calls', function () {

    it('should throw if no arguments', function () {

      const badCall = function () {
        ConstantBuilder.buildFlat(undefined, undefined)
      }

      expect(badCall)
        .to
        .throw()
    })

    it('should throw if no verb', function () {

      const badCall = function () {
        ConstantBuilder.buildFlat('raggabomb', undefined)
      }

      expect(badCall)
        .to
        .throw()
    })
  })

  describe('returned constants', function () {

    it('should create one flat constant', function () {

      const constants = {
        ['FROGS_JUMP']: 'frogs-jump'
      }

      ConstantBuilder
        .buildFlat(
          'frogs',
          'jump'
        )
        .should
        .be
        .deep
        .equal(constants)
    })

    it('should create multiple flat constants', function () {

      const constants = {
        ['FROGS_JUMP']: 'frogs-jump',
        ['FROGS_EAT']: 'frogs-eat',
        ['FROGS_DIE']: 'frogs-die'
      }

      ConstantBuilder
        .buildFlat(
          'frogs',
          ['jump', 'eat', 'die']
        )
        .should
        .be
        .deep
        .equal(constants)
    })

    it('should create suffixed flat constants', function () {

      const constants = {
        ['FROGS_JUMP']: 'frogs-jump',
        ['FROGS_EAT']: 'frogs-eat',
        ['FROGS_DIE_HARD']: 'frogs-die-hard',
        ['FROGS_DIE_MYGAWD']: 'frogs-die-mygawd',
        ['FROGS_DIE_WHILEHIGH']: 'frogs-die-whilehigh'
      }

      const suffixes = ['hard', 'mygawd', 'whilehigh']

      ConstantBuilder
        .buildFlat(
          'frogs',
          ['jump', 'eat', 'die'],
          [null, null, suffixes]
        )
        .should
        .be
        .deep
        .equal(constants)
    })

    it('should create one deep constant', function () {

      const constants = {
        ['JUMP']: 'frogs-jump'
      }

      ConstantBuilder
        .buildDeep(
          'frogs',
          'jump'
        )
        .should
        .be
        .deep
        .equal(constants)
    })

    it('should create multiple deep constants', function () {

      const constants = {
        ['JUMP']: 'frogs-jump',
        ['EAT']: 'frogs-eat',
        ['DIE']: 'frogs-die'
      }

      ConstantBuilder
        .buildDeep(
          'frogs',
          ['jump', 'eat', 'die']
        )
        .should
        .be
        .deep
        .equal(constants)
    })

    it('should create suffixed deep constants', function () {

      const constants = {
        ['JUMP']: 'frogs-jump',
        ['EAT']: 'frogs-eat',
        ['DIE']: {
          ['HARD']: 'frogs-die-hard',
          ['MYGAWD']: 'frogs-die-mygawd',
          ['WHILEHIGH']: 'frogs-die-whilehigh'
        }
      }

      const suffixes = ['hard', 'mygawd', 'whilehigh']

      ConstantBuilder
        .buildDeep(
          'frogs',
          ['jump', 'eat', 'die'],
          [null, null, suffixes]
        )
        .should
        .be
        .deep
        .equal(constants)
    })
  })
})
