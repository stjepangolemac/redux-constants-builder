import {
  ArgumentError
} from './utils/errors'

export class ConstantsBuilder {

  /**
   * Builds constants from passed arguments and returns them as deep object.
   * @param entity
   * @param verbs
   * @param suffixes
   */
  public static buildDeep (
    entity: string,
    verbs: string | string[],
    suffixes?: string[][],
    prefix?: boolean) {

    const _constants = this._build(entity, verbs, suffixes)
    const _prefix = _constants[0].split('-')[0].toUpperCase()

    const constants = {}

    _constants.forEach(entry => {
      const parts = entry.split('-')

      if (parts.length === 2) {
        constants[parts[1].toUpperCase()] = entry
      } else if (parts.length === 3) {
        if (constants[parts[1].toUpperCase()]) {
          constants[parts[1].toUpperCase()][parts[2].toUpperCase()] =
            entry
        } else {
          constants[parts[1].toUpperCase()] = {}
          constants[parts[1].toUpperCase()][parts[2].toUpperCase()] =
            entry
        }
      } else {
        throw new ArgumentError(ArgumentError.DASH_ARG)
      }
    })
    
    if(prefix) {
      return { [_prefix]: constants }
    } else {
      return constants
    }
  }

  /**
   * Builds constants from passed arguments and returns them as flat object.
   * @param entity
   * @param verbs
   * @param suffixes
   */
  public static buildFlat (
    entity: string,
    verbs: string | string[],
    suffixes?: string[][],
    prefix?: boolean) {

    const _constants = this._build(entity, verbs, suffixes)

    const constants = {}

      _constants.forEach((entry: string) => {
      constants[this._makePropName(entry, !prefix)] = entry.toLowerCase()
    })

    return constants
  }

  /**
   * Builds constants from passed arguments and returns them as array.
   * @param entity
   * @param verbs
   * @param suffixes
   */
  public static _build (
    entity: string,
    verbs: string | string[],
    suffixes?: string[][]) {

    if (entity === undefined || verbs === undefined) {
      throw new ArgumentError(ArgumentError.UNDEFINED_ARG)
    }
    if (Array.isArray(entity)) {
      throw new ArgumentError(ArgumentError.ARRAY_ARG)
    }

    Array.isArray(verbs) ? null : verbs = [verbs]

    let _constants = []

    if (suffixes) {
      suffixes.forEach(suffix => {
        if (suffix) {
          _constants.push(suffix)
        } else {
          _constants.push(null)
        }
      })
    }

    verbs.forEach((entry, index) => {
      if (_constants[index]) {
        _constants[index] = this._combine(entry, _constants[index])
      } else {
        _constants[index] = [entry]
      }
    })

    const list = this._combine(entity, this._flatten(_constants))

    return list
  }

  /**
   * Transforms a constant value to constant name.
   * @param propValue
   */
  private static _makePropName (propValue: string, cutPrefix?: boolean) {

    let result: string | string[] = propValue.split('-')

    if(cutPrefix) {
      result = result.slice(1).join('_')
    } else {
      result = result.join('_')
    }

    return result.toUpperCase()
  }

  /**
   * Flattens the matrix of strings to a string array.
   * @param matrix
   */
  private static _flatten (matrix: string[][]) {

    const result: string[] = []

    matrix.forEach(row => {
      row.forEach(entry => result.push(entry))
    })

    return result
  }

  /**
   * Appends a string to every string in the array and inserts
   * a dash in between.
   * @param word
   * @param wordArray
   * @param noline
   */
  private static _combine (word: string, wordArray: string[], noDash?: boolean) {

    return wordArray.map(entry => {
      return `${word}${noDash ? '': '-'}${entry}`
    })
  }
}
