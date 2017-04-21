export class ArgumentError extends Error {

  public static UNDEFINED_ARG: string =
    'Argument cannot be undefined'

  public static ARRAY_ARG: string =
    'Argument cannot be an array'

  public static DASH_ARG: string =
    'Argument cannot contain dash, use underscore instead'


  constructor(public message: string) {

    super(message)
    this.name = "BadArgument";
    this.stack = (<any> new Error()).stack;
  }
}
