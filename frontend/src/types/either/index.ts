import ApiException from "@/errors/apiException";

export class Left<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  //   isLeft and isRight can be removed if not necessary
  isLeft(): this is Left<T> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  static create<U>(error: U): Left<U> {
    return new Left(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fold<U>(onLeft: (error: T) => U, onRight: (value: never) => U): U {
    return onLeft(this.error);
  }
}

export class Right<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<T> {
    return true;
  }

  static create<U>(value: U): Right<U> {
    return new Right(value);
  }

  static createVoid(): Right<void> {
    return new Right(undefined as void);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fold<U>(onLeft: (error: never) => U, onRight: (value: T) => U): U {
    return onRight(this.value);
  }
}

export type Either<T, U> = Left<T> | Right<U>;

// results
export type ResultAsync<T, E = ApiException> = Promise<Either<E, T>>;

export type Result<T, E = Error> = Either<E, T>;

export type ResultVoid<E = Error> = Either<E, void>;
