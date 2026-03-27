
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Assistant
 * 
 */
export type Assistant = $Result.DefaultSelection<Prisma.$AssistantPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model AssistantRelation
 * 
 */
export type AssistantRelation = $Result.DefaultSelection<Prisma.$AssistantRelationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.assistant`: Exposes CRUD operations for the **Assistant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assistants
    * const assistants = await prisma.assistant.findMany()
    * ```
    */
  get assistant(): Prisma.AssistantDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.assistantRelation`: Exposes CRUD operations for the **AssistantRelation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssistantRelations
    * const assistantRelations = await prisma.assistantRelation.findMany()
    * ```
    */
  get assistantRelation(): Prisma.AssistantRelationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.0.0
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Assistant: 'Assistant',
    Document: 'Document',
    Message: 'Message',
    AssistantRelation: 'AssistantRelation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "assistant" | "document" | "message" | "assistantRelation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Assistant: {
        payload: Prisma.$AssistantPayload<ExtArgs>
        fields: Prisma.AssistantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssistantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssistantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          findFirst: {
            args: Prisma.AssistantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssistantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          findMany: {
            args: Prisma.AssistantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>[]
          }
          create: {
            args: Prisma.AssistantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          createMany: {
            args: Prisma.AssistantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssistantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>[]
          }
          delete: {
            args: Prisma.AssistantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          update: {
            args: Prisma.AssistantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          deleteMany: {
            args: Prisma.AssistantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssistantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssistantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantPayload>
          }
          aggregate: {
            args: Prisma.AssistantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssistant>
          }
          groupBy: {
            args: Prisma.AssistantGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssistantGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssistantCountArgs<ExtArgs>
            result: $Utils.Optional<AssistantCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      AssistantRelation: {
        payload: Prisma.$AssistantRelationPayload<ExtArgs>
        fields: Prisma.AssistantRelationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssistantRelationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssistantRelationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          findFirst: {
            args: Prisma.AssistantRelationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssistantRelationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          findMany: {
            args: Prisma.AssistantRelationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>[]
          }
          create: {
            args: Prisma.AssistantRelationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          createMany: {
            args: Prisma.AssistantRelationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssistantRelationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>[]
          }
          delete: {
            args: Prisma.AssistantRelationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          update: {
            args: Prisma.AssistantRelationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          deleteMany: {
            args: Prisma.AssistantRelationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssistantRelationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssistantRelationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantRelationPayload>
          }
          aggregate: {
            args: Prisma.AssistantRelationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssistantRelation>
          }
          groupBy: {
            args: Prisma.AssistantRelationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssistantRelationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssistantRelationCountArgs<ExtArgs>
            result: $Utils.Optional<AssistantRelationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assistants: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistants?: boolean | UserCountOutputTypeCountAssistantsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssistantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantWhereInput
  }


  /**
   * Count Type AssistantCountOutputType
   */

  export type AssistantCountOutputType = {
    documents: number
    messages: number
    outgoingRelations: number
    incomingRelations: number
  }

  export type AssistantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | AssistantCountOutputTypeCountDocumentsArgs
    messages?: boolean | AssistantCountOutputTypeCountMessagesArgs
    outgoingRelations?: boolean | AssistantCountOutputTypeCountOutgoingRelationsArgs
    incomingRelations?: boolean | AssistantCountOutputTypeCountIncomingRelationsArgs
  }

  // Custom InputTypes
  /**
   * AssistantCountOutputType without action
   */
  export type AssistantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantCountOutputType
     */
    select?: AssistantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssistantCountOutputType without action
   */
  export type AssistantCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * AssistantCountOutputType without action
   */
  export type AssistantCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * AssistantCountOutputType without action
   */
  export type AssistantCountOutputTypeCountOutgoingRelationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantRelationWhereInput
  }

  /**
   * AssistantCountOutputType without action
   */
  export type AssistantCountOutputTypeCountIncomingRelationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantRelationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assistants?: boolean | User$assistantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistants?: boolean | User$assistantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assistants: Prisma.$AssistantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assistants<T extends User$assistantsArgs<ExtArgs> = {}>(args?: Subset<T, User$assistantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.assistants
   */
  export type User$assistantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    where?: AssistantWhereInput
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    cursor?: AssistantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Assistant
   */

  export type AggregateAssistant = {
    _count: AssistantCountAggregateOutputType | null
    _min: AssistantMinAggregateOutputType | null
    _max: AssistantMaxAggregateOutputType | null
  }

  export type AssistantMinAggregateOutputType = {
    id: string | null
    name: string | null
    accessKey: string | null
    category: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssistantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    accessKey: string | null
    category: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssistantCountAggregateOutputType = {
    id: number
    name: number
    accessKey: number
    category: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssistantMinAggregateInputType = {
    id?: true
    name?: true
    accessKey?: true
    category?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssistantMaxAggregateInputType = {
    id?: true
    name?: true
    accessKey?: true
    category?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssistantCountAggregateInputType = {
    id?: true
    name?: true
    accessKey?: true
    category?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssistantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistant to aggregate.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assistants
    **/
    _count?: true | AssistantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssistantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssistantMaxAggregateInputType
  }

  export type GetAssistantAggregateType<T extends AssistantAggregateArgs> = {
        [P in keyof T & keyof AggregateAssistant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssistant[P]>
      : GetScalarType<T[P], AggregateAssistant[P]>
  }




  export type AssistantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantWhereInput
    orderBy?: AssistantOrderByWithAggregationInput | AssistantOrderByWithAggregationInput[]
    by: AssistantScalarFieldEnum[] | AssistantScalarFieldEnum
    having?: AssistantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssistantCountAggregateInputType | true
    _min?: AssistantMinAggregateInputType
    _max?: AssistantMaxAggregateInputType
  }

  export type AssistantGroupByOutputType = {
    id: string
    name: string
    accessKey: string
    category: string | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: AssistantCountAggregateOutputType | null
    _min: AssistantMinAggregateOutputType | null
    _max: AssistantMaxAggregateOutputType | null
  }

  type GetAssistantGroupByPayload<T extends AssistantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssistantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssistantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssistantGroupByOutputType[P]>
            : GetScalarType<T[P], AssistantGroupByOutputType[P]>
        }
      >
    >


  export type AssistantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    accessKey?: boolean
    category?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | Assistant$documentsArgs<ExtArgs>
    messages?: boolean | Assistant$messagesArgs<ExtArgs>
    outgoingRelations?: boolean | Assistant$outgoingRelationsArgs<ExtArgs>
    incomingRelations?: boolean | Assistant$incomingRelationsArgs<ExtArgs>
    _count?: boolean | AssistantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assistant"]>

  export type AssistantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    accessKey?: boolean
    category?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assistant"]>

  export type AssistantSelectScalar = {
    id?: boolean
    name?: boolean
    accessKey?: boolean
    category?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssistantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | Assistant$documentsArgs<ExtArgs>
    messages?: boolean | Assistant$messagesArgs<ExtArgs>
    outgoingRelations?: boolean | Assistant$outgoingRelationsArgs<ExtArgs>
    incomingRelations?: boolean | Assistant$incomingRelationsArgs<ExtArgs>
    _count?: boolean | AssistantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssistantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AssistantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assistant"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      outgoingRelations: Prisma.$AssistantRelationPayload<ExtArgs>[]
      incomingRelations: Prisma.$AssistantRelationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      accessKey: string
      category: string | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assistant"]>
    composites: {}
  }

  type AssistantGetPayload<S extends boolean | null | undefined | AssistantDefaultArgs> = $Result.GetResult<Prisma.$AssistantPayload, S>

  type AssistantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssistantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssistantCountAggregateInputType | true
    }

  export interface AssistantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assistant'], meta: { name: 'Assistant' } }
    /**
     * Find zero or one Assistant that matches the filter.
     * @param {AssistantFindUniqueArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssistantFindUniqueArgs>(args: SelectSubset<T, AssistantFindUniqueArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Assistant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssistantFindUniqueOrThrowArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssistantFindUniqueOrThrowArgs>(args: SelectSubset<T, AssistantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Assistant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindFirstArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssistantFindFirstArgs>(args?: SelectSubset<T, AssistantFindFirstArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Assistant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindFirstOrThrowArgs} args - Arguments to find a Assistant
     * @example
     * // Get one Assistant
     * const assistant = await prisma.assistant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssistantFindFirstOrThrowArgs>(args?: SelectSubset<T, AssistantFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Assistants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assistants
     * const assistants = await prisma.assistant.findMany()
     * 
     * // Get first 10 Assistants
     * const assistants = await prisma.assistant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assistantWithIdOnly = await prisma.assistant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssistantFindManyArgs>(args?: SelectSubset<T, AssistantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Assistant.
     * @param {AssistantCreateArgs} args - Arguments to create a Assistant.
     * @example
     * // Create one Assistant
     * const Assistant = await prisma.assistant.create({
     *   data: {
     *     // ... data to create a Assistant
     *   }
     * })
     * 
     */
    create<T extends AssistantCreateArgs>(args: SelectSubset<T, AssistantCreateArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Assistants.
     * @param {AssistantCreateManyArgs} args - Arguments to create many Assistants.
     * @example
     * // Create many Assistants
     * const assistant = await prisma.assistant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssistantCreateManyArgs>(args?: SelectSubset<T, AssistantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assistants and returns the data saved in the database.
     * @param {AssistantCreateManyAndReturnArgs} args - Arguments to create many Assistants.
     * @example
     * // Create many Assistants
     * const assistant = await prisma.assistant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assistants and only return the `id`
     * const assistantWithIdOnly = await prisma.assistant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssistantCreateManyAndReturnArgs>(args?: SelectSubset<T, AssistantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Assistant.
     * @param {AssistantDeleteArgs} args - Arguments to delete one Assistant.
     * @example
     * // Delete one Assistant
     * const Assistant = await prisma.assistant.delete({
     *   where: {
     *     // ... filter to delete one Assistant
     *   }
     * })
     * 
     */
    delete<T extends AssistantDeleteArgs>(args: SelectSubset<T, AssistantDeleteArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Assistant.
     * @param {AssistantUpdateArgs} args - Arguments to update one Assistant.
     * @example
     * // Update one Assistant
     * const assistant = await prisma.assistant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssistantUpdateArgs>(args: SelectSubset<T, AssistantUpdateArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Assistants.
     * @param {AssistantDeleteManyArgs} args - Arguments to filter Assistants to delete.
     * @example
     * // Delete a few Assistants
     * const { count } = await prisma.assistant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssistantDeleteManyArgs>(args?: SelectSubset<T, AssistantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assistants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assistants
     * const assistant = await prisma.assistant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssistantUpdateManyArgs>(args: SelectSubset<T, AssistantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assistant.
     * @param {AssistantUpsertArgs} args - Arguments to update or create a Assistant.
     * @example
     * // Update or create a Assistant
     * const assistant = await prisma.assistant.upsert({
     *   create: {
     *     // ... data to create a Assistant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assistant we want to update
     *   }
     * })
     */
    upsert<T extends AssistantUpsertArgs>(args: SelectSubset<T, AssistantUpsertArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Assistants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantCountArgs} args - Arguments to filter Assistants to count.
     * @example
     * // Count the number of Assistants
     * const count = await prisma.assistant.count({
     *   where: {
     *     // ... the filter for the Assistants we want to count
     *   }
     * })
    **/
    count<T extends AssistantCountArgs>(
      args?: Subset<T, AssistantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssistantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assistant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssistantAggregateArgs>(args: Subset<T, AssistantAggregateArgs>): Prisma.PrismaPromise<GetAssistantAggregateType<T>>

    /**
     * Group by Assistant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssistantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssistantGroupByArgs['orderBy'] }
        : { orderBy?: AssistantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssistantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssistantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assistant model
   */
  readonly fields: AssistantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assistant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssistantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    documents<T extends Assistant$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Assistant$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
    messages<T extends Assistant$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Assistant$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    outgoingRelations<T extends Assistant$outgoingRelationsArgs<ExtArgs> = {}>(args?: Subset<T, Assistant$outgoingRelationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findMany"> | Null>
    incomingRelations<T extends Assistant$incomingRelationsArgs<ExtArgs> = {}>(args?: Subset<T, Assistant$incomingRelationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assistant model
   */ 
  interface AssistantFieldRefs {
    readonly id: FieldRef<"Assistant", 'String'>
    readonly name: FieldRef<"Assistant", 'String'>
    readonly accessKey: FieldRef<"Assistant", 'String'>
    readonly category: FieldRef<"Assistant", 'String'>
    readonly userId: FieldRef<"Assistant", 'String'>
    readonly createdAt: FieldRef<"Assistant", 'DateTime'>
    readonly updatedAt: FieldRef<"Assistant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assistant findUnique
   */
  export type AssistantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant findUniqueOrThrow
   */
  export type AssistantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant findFirst
   */
  export type AssistantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistants.
     */
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant findFirstOrThrow
   */
  export type AssistantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistant to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistants.
     */
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant findMany
   */
  export type AssistantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter, which Assistants to fetch.
     */
    where?: AssistantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistants to fetch.
     */
    orderBy?: AssistantOrderByWithRelationInput | AssistantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assistants.
     */
    cursor?: AssistantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistants.
     */
    skip?: number
    distinct?: AssistantScalarFieldEnum | AssistantScalarFieldEnum[]
  }

  /**
   * Assistant create
   */
  export type AssistantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The data needed to create a Assistant.
     */
    data: XOR<AssistantCreateInput, AssistantUncheckedCreateInput>
  }

  /**
   * Assistant createMany
   */
  export type AssistantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assistants.
     */
    data: AssistantCreateManyInput | AssistantCreateManyInput[]
  }

  /**
   * Assistant createManyAndReturn
   */
  export type AssistantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Assistants.
     */
    data: AssistantCreateManyInput | AssistantCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assistant update
   */
  export type AssistantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The data needed to update a Assistant.
     */
    data: XOR<AssistantUpdateInput, AssistantUncheckedUpdateInput>
    /**
     * Choose, which Assistant to update.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant updateMany
   */
  export type AssistantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assistants.
     */
    data: XOR<AssistantUpdateManyMutationInput, AssistantUncheckedUpdateManyInput>
    /**
     * Filter which Assistants to update
     */
    where?: AssistantWhereInput
  }

  /**
   * Assistant upsert
   */
  export type AssistantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * The filter to search for the Assistant to update in case it exists.
     */
    where: AssistantWhereUniqueInput
    /**
     * In case the Assistant found by the `where` argument doesn't exist, create a new Assistant with this data.
     */
    create: XOR<AssistantCreateInput, AssistantUncheckedCreateInput>
    /**
     * In case the Assistant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssistantUpdateInput, AssistantUncheckedUpdateInput>
  }

  /**
   * Assistant delete
   */
  export type AssistantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
    /**
     * Filter which Assistant to delete.
     */
    where: AssistantWhereUniqueInput
  }

  /**
   * Assistant deleteMany
   */
  export type AssistantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistants to delete
     */
    where?: AssistantWhereInput
  }

  /**
   * Assistant.documents
   */
  export type Assistant$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Assistant.messages
   */
  export type Assistant$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Assistant.outgoingRelations
   */
  export type Assistant$outgoingRelationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    where?: AssistantRelationWhereInput
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    cursor?: AssistantRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistantRelationScalarFieldEnum | AssistantRelationScalarFieldEnum[]
  }

  /**
   * Assistant.incomingRelations
   */
  export type Assistant$incomingRelationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    where?: AssistantRelationWhereInput
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    cursor?: AssistantRelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistantRelationScalarFieldEnum | AssistantRelationScalarFieldEnum[]
  }

  /**
   * Assistant without action
   */
  export type AssistantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistant
     */
    select?: AssistantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    storageUrl: string | null
    status: string | null
    errorMessage: string | null
    assistantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    storageUrl: string | null
    status: string | null
    errorMessage: string | null
    assistantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    fileName: number
    storageUrl: number
    status: number
    errorMessage: number
    assistantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    fileName?: true
    storageUrl?: true
    status?: true
    errorMessage?: true
    assistantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    fileName?: true
    storageUrl?: true
    status?: true
    errorMessage?: true
    assistantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    fileName?: true
    storageUrl?: true
    status?: true
    errorMessage?: true
    assistantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage: string | null
    assistantId: string
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    storageUrl?: boolean
    status?: boolean
    errorMessage?: boolean
    assistantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    storageUrl?: boolean
    status?: boolean
    errorMessage?: boolean
    assistantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    fileName?: boolean
    storageUrl?: boolean
    status?: boolean
    errorMessage?: boolean
    assistantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      assistant: Prisma.$AssistantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      storageUrl: string
      status: string
      errorMessage: string | null
      assistantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assistant<T extends AssistantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssistantDefaultArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly fileName: FieldRef<"Document", 'String'>
    readonly storageUrl: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'String'>
    readonly errorMessage: FieldRef<"Document", 'String'>
    readonly assistantId: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    role: string | null
    content: string | null
    timestamp: string | null
    assistantId: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    role: string | null
    content: string | null
    timestamp: string | null
    assistantId: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    role: number
    content: number
    timestamp: number
    assistantId: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    role?: true
    content?: true
    timestamp?: true
    assistantId?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    role?: true
    content?: true
    timestamp?: true
    assistantId?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    role?: true
    content?: true
    timestamp?: true
    assistantId?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    role: string
    content: string
    timestamp: string
    assistantId: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    assistantId?: boolean
    createdAt?: boolean
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    assistantId?: boolean
    createdAt?: boolean
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    assistantId?: boolean
    createdAt?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistant?: boolean | AssistantDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      assistant: Prisma.$AssistantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: string
      content: string
      timestamp: string
      assistantId: string
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assistant<T extends AssistantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssistantDefaultArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'String'>
    readonly assistantId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model AssistantRelation
   */

  export type AggregateAssistantRelation = {
    _count: AssistantRelationCountAggregateOutputType | null
    _min: AssistantRelationMinAggregateOutputType | null
    _max: AssistantRelationMaxAggregateOutputType | null
  }

  export type AssistantRelationMinAggregateOutputType = {
    id: string | null
    sourceId: string | null
    targetId: string | null
    permission: string | null
    createdAt: Date | null
  }

  export type AssistantRelationMaxAggregateOutputType = {
    id: string | null
    sourceId: string | null
    targetId: string | null
    permission: string | null
    createdAt: Date | null
  }

  export type AssistantRelationCountAggregateOutputType = {
    id: number
    sourceId: number
    targetId: number
    permission: number
    createdAt: number
    _all: number
  }


  export type AssistantRelationMinAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    permission?: true
    createdAt?: true
  }

  export type AssistantRelationMaxAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    permission?: true
    createdAt?: true
  }

  export type AssistantRelationCountAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    permission?: true
    createdAt?: true
    _all?: true
  }

  export type AssistantRelationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssistantRelation to aggregate.
     */
    where?: AssistantRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantRelations to fetch.
     */
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssistantRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssistantRelations
    **/
    _count?: true | AssistantRelationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssistantRelationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssistantRelationMaxAggregateInputType
  }

  export type GetAssistantRelationAggregateType<T extends AssistantRelationAggregateArgs> = {
        [P in keyof T & keyof AggregateAssistantRelation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssistantRelation[P]>
      : GetScalarType<T[P], AggregateAssistantRelation[P]>
  }




  export type AssistantRelationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantRelationWhereInput
    orderBy?: AssistantRelationOrderByWithAggregationInput | AssistantRelationOrderByWithAggregationInput[]
    by: AssistantRelationScalarFieldEnum[] | AssistantRelationScalarFieldEnum
    having?: AssistantRelationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssistantRelationCountAggregateInputType | true
    _min?: AssistantRelationMinAggregateInputType
    _max?: AssistantRelationMaxAggregateInputType
  }

  export type AssistantRelationGroupByOutputType = {
    id: string
    sourceId: string
    targetId: string
    permission: string
    createdAt: Date
    _count: AssistantRelationCountAggregateOutputType | null
    _min: AssistantRelationMinAggregateOutputType | null
    _max: AssistantRelationMaxAggregateOutputType | null
  }

  type GetAssistantRelationGroupByPayload<T extends AssistantRelationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssistantRelationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssistantRelationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssistantRelationGroupByOutputType[P]>
            : GetScalarType<T[P], AssistantRelationGroupByOutputType[P]>
        }
      >
    >


  export type AssistantRelationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    permission?: boolean
    createdAt?: boolean
    source?: boolean | AssistantDefaultArgs<ExtArgs>
    target?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assistantRelation"]>

  export type AssistantRelationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    permission?: boolean
    createdAt?: boolean
    source?: boolean | AssistantDefaultArgs<ExtArgs>
    target?: boolean | AssistantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assistantRelation"]>

  export type AssistantRelationSelectScalar = {
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    permission?: boolean
    createdAt?: boolean
  }

  export type AssistantRelationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | AssistantDefaultArgs<ExtArgs>
    target?: boolean | AssistantDefaultArgs<ExtArgs>
  }
  export type AssistantRelationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | AssistantDefaultArgs<ExtArgs>
    target?: boolean | AssistantDefaultArgs<ExtArgs>
  }

  export type $AssistantRelationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssistantRelation"
    objects: {
      source: Prisma.$AssistantPayload<ExtArgs>
      target: Prisma.$AssistantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sourceId: string
      targetId: string
      permission: string
      createdAt: Date
    }, ExtArgs["result"]["assistantRelation"]>
    composites: {}
  }

  type AssistantRelationGetPayload<S extends boolean | null | undefined | AssistantRelationDefaultArgs> = $Result.GetResult<Prisma.$AssistantRelationPayload, S>

  type AssistantRelationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssistantRelationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssistantRelationCountAggregateInputType | true
    }

  export interface AssistantRelationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssistantRelation'], meta: { name: 'AssistantRelation' } }
    /**
     * Find zero or one AssistantRelation that matches the filter.
     * @param {AssistantRelationFindUniqueArgs} args - Arguments to find a AssistantRelation
     * @example
     * // Get one AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssistantRelationFindUniqueArgs>(args: SelectSubset<T, AssistantRelationFindUniqueArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AssistantRelation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssistantRelationFindUniqueOrThrowArgs} args - Arguments to find a AssistantRelation
     * @example
     * // Get one AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssistantRelationFindUniqueOrThrowArgs>(args: SelectSubset<T, AssistantRelationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AssistantRelation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationFindFirstArgs} args - Arguments to find a AssistantRelation
     * @example
     * // Get one AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssistantRelationFindFirstArgs>(args?: SelectSubset<T, AssistantRelationFindFirstArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AssistantRelation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationFindFirstOrThrowArgs} args - Arguments to find a AssistantRelation
     * @example
     * // Get one AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssistantRelationFindFirstOrThrowArgs>(args?: SelectSubset<T, AssistantRelationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AssistantRelations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssistantRelations
     * const assistantRelations = await prisma.assistantRelation.findMany()
     * 
     * // Get first 10 AssistantRelations
     * const assistantRelations = await prisma.assistantRelation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assistantRelationWithIdOnly = await prisma.assistantRelation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssistantRelationFindManyArgs>(args?: SelectSubset<T, AssistantRelationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AssistantRelation.
     * @param {AssistantRelationCreateArgs} args - Arguments to create a AssistantRelation.
     * @example
     * // Create one AssistantRelation
     * const AssistantRelation = await prisma.assistantRelation.create({
     *   data: {
     *     // ... data to create a AssistantRelation
     *   }
     * })
     * 
     */
    create<T extends AssistantRelationCreateArgs>(args: SelectSubset<T, AssistantRelationCreateArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AssistantRelations.
     * @param {AssistantRelationCreateManyArgs} args - Arguments to create many AssistantRelations.
     * @example
     * // Create many AssistantRelations
     * const assistantRelation = await prisma.assistantRelation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssistantRelationCreateManyArgs>(args?: SelectSubset<T, AssistantRelationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssistantRelations and returns the data saved in the database.
     * @param {AssistantRelationCreateManyAndReturnArgs} args - Arguments to create many AssistantRelations.
     * @example
     * // Create many AssistantRelations
     * const assistantRelation = await prisma.assistantRelation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssistantRelations and only return the `id`
     * const assistantRelationWithIdOnly = await prisma.assistantRelation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssistantRelationCreateManyAndReturnArgs>(args?: SelectSubset<T, AssistantRelationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AssistantRelation.
     * @param {AssistantRelationDeleteArgs} args - Arguments to delete one AssistantRelation.
     * @example
     * // Delete one AssistantRelation
     * const AssistantRelation = await prisma.assistantRelation.delete({
     *   where: {
     *     // ... filter to delete one AssistantRelation
     *   }
     * })
     * 
     */
    delete<T extends AssistantRelationDeleteArgs>(args: SelectSubset<T, AssistantRelationDeleteArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AssistantRelation.
     * @param {AssistantRelationUpdateArgs} args - Arguments to update one AssistantRelation.
     * @example
     * // Update one AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssistantRelationUpdateArgs>(args: SelectSubset<T, AssistantRelationUpdateArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AssistantRelations.
     * @param {AssistantRelationDeleteManyArgs} args - Arguments to filter AssistantRelations to delete.
     * @example
     * // Delete a few AssistantRelations
     * const { count } = await prisma.assistantRelation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssistantRelationDeleteManyArgs>(args?: SelectSubset<T, AssistantRelationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssistantRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssistantRelations
     * const assistantRelation = await prisma.assistantRelation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssistantRelationUpdateManyArgs>(args: SelectSubset<T, AssistantRelationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssistantRelation.
     * @param {AssistantRelationUpsertArgs} args - Arguments to update or create a AssistantRelation.
     * @example
     * // Update or create a AssistantRelation
     * const assistantRelation = await prisma.assistantRelation.upsert({
     *   create: {
     *     // ... data to create a AssistantRelation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssistantRelation we want to update
     *   }
     * })
     */
    upsert<T extends AssistantRelationUpsertArgs>(args: SelectSubset<T, AssistantRelationUpsertArgs<ExtArgs>>): Prisma__AssistantRelationClient<$Result.GetResult<Prisma.$AssistantRelationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AssistantRelations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationCountArgs} args - Arguments to filter AssistantRelations to count.
     * @example
     * // Count the number of AssistantRelations
     * const count = await prisma.assistantRelation.count({
     *   where: {
     *     // ... the filter for the AssistantRelations we want to count
     *   }
     * })
    **/
    count<T extends AssistantRelationCountArgs>(
      args?: Subset<T, AssistantRelationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssistantRelationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssistantRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssistantRelationAggregateArgs>(args: Subset<T, AssistantRelationAggregateArgs>): Prisma.PrismaPromise<GetAssistantRelationAggregateType<T>>

    /**
     * Group by AssistantRelation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantRelationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssistantRelationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssistantRelationGroupByArgs['orderBy'] }
        : { orderBy?: AssistantRelationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssistantRelationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssistantRelationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssistantRelation model
   */
  readonly fields: AssistantRelationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssistantRelation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssistantRelationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends AssistantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssistantDefaultArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    target<T extends AssistantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssistantDefaultArgs<ExtArgs>>): Prisma__AssistantClient<$Result.GetResult<Prisma.$AssistantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssistantRelation model
   */ 
  interface AssistantRelationFieldRefs {
    readonly id: FieldRef<"AssistantRelation", 'String'>
    readonly sourceId: FieldRef<"AssistantRelation", 'String'>
    readonly targetId: FieldRef<"AssistantRelation", 'String'>
    readonly permission: FieldRef<"AssistantRelation", 'String'>
    readonly createdAt: FieldRef<"AssistantRelation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssistantRelation findUnique
   */
  export type AssistantRelationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter, which AssistantRelation to fetch.
     */
    where: AssistantRelationWhereUniqueInput
  }

  /**
   * AssistantRelation findUniqueOrThrow
   */
  export type AssistantRelationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter, which AssistantRelation to fetch.
     */
    where: AssistantRelationWhereUniqueInput
  }

  /**
   * AssistantRelation findFirst
   */
  export type AssistantRelationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter, which AssistantRelation to fetch.
     */
    where?: AssistantRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantRelations to fetch.
     */
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssistantRelations.
     */
    cursor?: AssistantRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssistantRelations.
     */
    distinct?: AssistantRelationScalarFieldEnum | AssistantRelationScalarFieldEnum[]
  }

  /**
   * AssistantRelation findFirstOrThrow
   */
  export type AssistantRelationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter, which AssistantRelation to fetch.
     */
    where?: AssistantRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantRelations to fetch.
     */
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssistantRelations.
     */
    cursor?: AssistantRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantRelations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssistantRelations.
     */
    distinct?: AssistantRelationScalarFieldEnum | AssistantRelationScalarFieldEnum[]
  }

  /**
   * AssistantRelation findMany
   */
  export type AssistantRelationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter, which AssistantRelations to fetch.
     */
    where?: AssistantRelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantRelations to fetch.
     */
    orderBy?: AssistantRelationOrderByWithRelationInput | AssistantRelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssistantRelations.
     */
    cursor?: AssistantRelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantRelations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantRelations.
     */
    skip?: number
    distinct?: AssistantRelationScalarFieldEnum | AssistantRelationScalarFieldEnum[]
  }

  /**
   * AssistantRelation create
   */
  export type AssistantRelationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * The data needed to create a AssistantRelation.
     */
    data: XOR<AssistantRelationCreateInput, AssistantRelationUncheckedCreateInput>
  }

  /**
   * AssistantRelation createMany
   */
  export type AssistantRelationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssistantRelations.
     */
    data: AssistantRelationCreateManyInput | AssistantRelationCreateManyInput[]
  }

  /**
   * AssistantRelation createManyAndReturn
   */
  export type AssistantRelationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AssistantRelations.
     */
    data: AssistantRelationCreateManyInput | AssistantRelationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssistantRelation update
   */
  export type AssistantRelationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * The data needed to update a AssistantRelation.
     */
    data: XOR<AssistantRelationUpdateInput, AssistantRelationUncheckedUpdateInput>
    /**
     * Choose, which AssistantRelation to update.
     */
    where: AssistantRelationWhereUniqueInput
  }

  /**
   * AssistantRelation updateMany
   */
  export type AssistantRelationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssistantRelations.
     */
    data: XOR<AssistantRelationUpdateManyMutationInput, AssistantRelationUncheckedUpdateManyInput>
    /**
     * Filter which AssistantRelations to update
     */
    where?: AssistantRelationWhereInput
  }

  /**
   * AssistantRelation upsert
   */
  export type AssistantRelationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * The filter to search for the AssistantRelation to update in case it exists.
     */
    where: AssistantRelationWhereUniqueInput
    /**
     * In case the AssistantRelation found by the `where` argument doesn't exist, create a new AssistantRelation with this data.
     */
    create: XOR<AssistantRelationCreateInput, AssistantRelationUncheckedCreateInput>
    /**
     * In case the AssistantRelation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssistantRelationUpdateInput, AssistantRelationUncheckedUpdateInput>
  }

  /**
   * AssistantRelation delete
   */
  export type AssistantRelationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
    /**
     * Filter which AssistantRelation to delete.
     */
    where: AssistantRelationWhereUniqueInput
  }

  /**
   * AssistantRelation deleteMany
   */
  export type AssistantRelationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssistantRelations to delete
     */
    where?: AssistantRelationWhereInput
  }

  /**
   * AssistantRelation without action
   */
  export type AssistantRelationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantRelation
     */
    select?: AssistantRelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistantRelationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AssistantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    accessKey: 'accessKey',
    category: 'category',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssistantScalarFieldEnum = (typeof AssistantScalarFieldEnum)[keyof typeof AssistantScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    storageUrl: 'storageUrl',
    status: 'status',
    errorMessage: 'errorMessage',
    assistantId: 'assistantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    role: 'role',
    content: 'content',
    timestamp: 'timestamp',
    assistantId: 'assistantId',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AssistantRelationScalarFieldEnum: {
    id: 'id',
    sourceId: 'sourceId',
    targetId: 'targetId',
    permission: 'permission',
    createdAt: 'createdAt'
  };

  export type AssistantRelationScalarFieldEnum = (typeof AssistantRelationScalarFieldEnum)[keyof typeof AssistantRelationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assistants?: AssistantListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assistants?: AssistantOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assistants?: AssistantListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AssistantWhereInput = {
    AND?: AssistantWhereInput | AssistantWhereInput[]
    OR?: AssistantWhereInput[]
    NOT?: AssistantWhereInput | AssistantWhereInput[]
    id?: StringFilter<"Assistant"> | string
    name?: StringFilter<"Assistant"> | string
    accessKey?: StringFilter<"Assistant"> | string
    category?: StringNullableFilter<"Assistant"> | string | null
    userId?: StringFilter<"Assistant"> | string
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: DocumentListRelationFilter
    messages?: MessageListRelationFilter
    outgoingRelations?: AssistantRelationListRelationFilter
    incomingRelations?: AssistantRelationListRelationFilter
  }

  export type AssistantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    accessKey?: SortOrder
    category?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    documents?: DocumentOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    outgoingRelations?: AssistantRelationOrderByRelationAggregateInput
    incomingRelations?: AssistantRelationOrderByRelationAggregateInput
  }

  export type AssistantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessKey?: string
    AND?: AssistantWhereInput | AssistantWhereInput[]
    OR?: AssistantWhereInput[]
    NOT?: AssistantWhereInput | AssistantWhereInput[]
    name?: StringFilter<"Assistant"> | string
    category?: StringNullableFilter<"Assistant"> | string | null
    userId?: StringFilter<"Assistant"> | string
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: DocumentListRelationFilter
    messages?: MessageListRelationFilter
    outgoingRelations?: AssistantRelationListRelationFilter
    incomingRelations?: AssistantRelationListRelationFilter
  }, "id" | "accessKey">

  export type AssistantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    accessKey?: SortOrder
    category?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssistantCountOrderByAggregateInput
    _max?: AssistantMaxOrderByAggregateInput
    _min?: AssistantMinOrderByAggregateInput
  }

  export type AssistantScalarWhereWithAggregatesInput = {
    AND?: AssistantScalarWhereWithAggregatesInput | AssistantScalarWhereWithAggregatesInput[]
    OR?: AssistantScalarWhereWithAggregatesInput[]
    NOT?: AssistantScalarWhereWithAggregatesInput | AssistantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assistant"> | string
    name?: StringWithAggregatesFilter<"Assistant"> | string
    accessKey?: StringWithAggregatesFilter<"Assistant"> | string
    category?: StringNullableWithAggregatesFilter<"Assistant"> | string | null
    userId?: StringWithAggregatesFilter<"Assistant"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assistant"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    storageUrl?: StringFilter<"Document"> | string
    status?: StringFilter<"Document"> | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    assistantId?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    assistant?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    storageUrl?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assistant?: AssistantOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storageUrl?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    fileName?: StringFilter<"Document"> | string
    status?: StringFilter<"Document"> | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    assistantId?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    assistant?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }, "id" | "storageUrl">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    storageUrl?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    fileName?: StringWithAggregatesFilter<"Document"> | string
    storageUrl?: StringWithAggregatesFilter<"Document"> | string
    status?: StringWithAggregatesFilter<"Document"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"Document"> | string | null
    assistantId?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    timestamp?: StringFilter<"Message"> | string
    assistantId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    assistant?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    assistant?: AssistantOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    timestamp?: StringFilter<"Message"> | string
    assistantId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    assistant?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    timestamp?: StringWithAggregatesFilter<"Message"> | string
    assistantId?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type AssistantRelationWhereInput = {
    AND?: AssistantRelationWhereInput | AssistantRelationWhereInput[]
    OR?: AssistantRelationWhereInput[]
    NOT?: AssistantRelationWhereInput | AssistantRelationWhereInput[]
    id?: StringFilter<"AssistantRelation"> | string
    sourceId?: StringFilter<"AssistantRelation"> | string
    targetId?: StringFilter<"AssistantRelation"> | string
    permission?: StringFilter<"AssistantRelation"> | string
    createdAt?: DateTimeFilter<"AssistantRelation"> | Date | string
    source?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
    target?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }

  export type AssistantRelationOrderByWithRelationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
    source?: AssistantOrderByWithRelationInput
    target?: AssistantOrderByWithRelationInput
  }

  export type AssistantRelationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sourceId_targetId?: AssistantRelationSourceIdTargetIdCompoundUniqueInput
    AND?: AssistantRelationWhereInput | AssistantRelationWhereInput[]
    OR?: AssistantRelationWhereInput[]
    NOT?: AssistantRelationWhereInput | AssistantRelationWhereInput[]
    sourceId?: StringFilter<"AssistantRelation"> | string
    targetId?: StringFilter<"AssistantRelation"> | string
    permission?: StringFilter<"AssistantRelation"> | string
    createdAt?: DateTimeFilter<"AssistantRelation"> | Date | string
    source?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
    target?: XOR<AssistantScalarRelationFilter, AssistantWhereInput>
  }, "id" | "sourceId_targetId">

  export type AssistantRelationOrderByWithAggregationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
    _count?: AssistantRelationCountOrderByAggregateInput
    _max?: AssistantRelationMaxOrderByAggregateInput
    _min?: AssistantRelationMinOrderByAggregateInput
  }

  export type AssistantRelationScalarWhereWithAggregatesInput = {
    AND?: AssistantRelationScalarWhereWithAggregatesInput | AssistantRelationScalarWhereWithAggregatesInput[]
    OR?: AssistantRelationScalarWhereWithAggregatesInput[]
    NOT?: AssistantRelationScalarWhereWithAggregatesInput | AssistantRelationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssistantRelation"> | string
    sourceId?: StringWithAggregatesFilter<"AssistantRelation"> | string
    targetId?: StringWithAggregatesFilter<"AssistantRelation"> | string
    permission?: StringWithAggregatesFilter<"AssistantRelation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AssistantRelation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assistants?: AssistantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assistants?: AssistantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistants?: AssistantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistants?: AssistantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantCreateInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
    documents?: DocumentCreateNestedManyWithoutAssistantInput
    messages?: MessageCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationCreateNestedManyWithoutTargetInput
  }

  export type AssistantUncheckedCreateInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutAssistantInput
    messages?: MessageUncheckedCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutTargetInput
  }

  export type AssistantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
    documents?: DocumentUpdateManyWithoutAssistantNestedInput
    messages?: MessageUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutAssistantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type AssistantCreateManyInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssistantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assistant: AssistantCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    assistantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistant?: AssistantUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assistantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    assistantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assistantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    createdAt?: Date | string
    assistant: AssistantCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    assistantId: string
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assistant?: AssistantUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    assistantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    assistantId: string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    assistantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationCreateInput = {
    id?: string
    permission: string
    createdAt?: Date | string
    source: AssistantCreateNestedOneWithoutOutgoingRelationsInput
    target: AssistantCreateNestedOneWithoutIncomingRelationsInput
  }

  export type AssistantRelationUncheckedCreateInput = {
    id?: string
    sourceId: string
    targetId: string
    permission: string
    createdAt?: Date | string
  }

  export type AssistantRelationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: AssistantUpdateOneRequiredWithoutOutgoingRelationsNestedInput
    target?: AssistantUpdateOneRequiredWithoutIncomingRelationsNestedInput
  }

  export type AssistantRelationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationCreateManyInput = {
    id?: string
    sourceId: string
    targetId: string
    permission: string
    createdAt?: Date | string
  }

  export type AssistantRelationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AssistantListRelationFilter = {
    every?: AssistantWhereInput
    some?: AssistantWhereInput
    none?: AssistantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssistantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type AssistantRelationListRelationFilter = {
    every?: AssistantRelationWhereInput
    some?: AssistantRelationWhereInput
    none?: AssistantRelationWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssistantRelationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssistantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    accessKey?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssistantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    accessKey?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssistantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    accessKey?: SortOrder
    category?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssistantScalarRelationFilter = {
    is?: AssistantWhereInput
    isNot?: AssistantWhereInput
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    storageUrl?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    storageUrl?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    storageUrl?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    assistantId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantRelationSourceIdTargetIdCompoundUniqueInput = {
    sourceId: string
    targetId: string
  }

  export type AssistantRelationCountOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantRelationMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantRelationMinOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantCreateNestedManyWithoutUserInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
  }

  export type AssistantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AssistantUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    upsert?: AssistantUpsertWithWhereUniqueWithoutUserInput | AssistantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    set?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    disconnect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    delete?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    update?: AssistantUpdateWithWhereUniqueWithoutUserInput | AssistantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssistantUpdateManyWithWhereWithoutUserInput | AssistantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
  }

  export type AssistantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput> | AssistantCreateWithoutUserInput[] | AssistantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssistantCreateOrConnectWithoutUserInput | AssistantCreateOrConnectWithoutUserInput[]
    upsert?: AssistantUpsertWithWhereUniqueWithoutUserInput | AssistantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssistantCreateManyUserInputEnvelope
    set?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    disconnect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    delete?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    connect?: AssistantWhereUniqueInput | AssistantWhereUniqueInput[]
    update?: AssistantUpdateWithWhereUniqueWithoutUserInput | AssistantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssistantUpdateManyWithWhereWithoutUserInput | AssistantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAssistantsInput = {
    create?: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistantsInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentCreateNestedManyWithoutAssistantInput = {
    create?: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput> | DocumentCreateWithoutAssistantInput[] | DocumentUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutAssistantInput | DocumentCreateOrConnectWithoutAssistantInput[]
    createMany?: DocumentCreateManyAssistantInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutAssistantInput = {
    create?: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput> | MessageCreateWithoutAssistantInput[] | MessageUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAssistantInput | MessageCreateOrConnectWithoutAssistantInput[]
    createMany?: MessageCreateManyAssistantInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AssistantRelationCreateNestedManyWithoutSourceInput = {
    create?: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput> | AssistantRelationCreateWithoutSourceInput[] | AssistantRelationUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutSourceInput | AssistantRelationCreateOrConnectWithoutSourceInput[]
    createMany?: AssistantRelationCreateManySourceInputEnvelope
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
  }

  export type AssistantRelationCreateNestedManyWithoutTargetInput = {
    create?: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput> | AssistantRelationCreateWithoutTargetInput[] | AssistantRelationUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutTargetInput | AssistantRelationCreateOrConnectWithoutTargetInput[]
    createMany?: AssistantRelationCreateManyTargetInputEnvelope
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutAssistantInput = {
    create?: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput> | DocumentCreateWithoutAssistantInput[] | DocumentUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutAssistantInput | DocumentCreateOrConnectWithoutAssistantInput[]
    createMany?: DocumentCreateManyAssistantInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutAssistantInput = {
    create?: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput> | MessageCreateWithoutAssistantInput[] | MessageUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAssistantInput | MessageCreateOrConnectWithoutAssistantInput[]
    createMany?: MessageCreateManyAssistantInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AssistantRelationUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput> | AssistantRelationCreateWithoutSourceInput[] | AssistantRelationUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutSourceInput | AssistantRelationCreateOrConnectWithoutSourceInput[]
    createMany?: AssistantRelationCreateManySourceInputEnvelope
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
  }

  export type AssistantRelationUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput> | AssistantRelationCreateWithoutTargetInput[] | AssistantRelationUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutTargetInput | AssistantRelationCreateOrConnectWithoutTargetInput[]
    createMany?: AssistantRelationCreateManyTargetInputEnvelope
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAssistantsNestedInput = {
    create?: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistantsInput
    upsert?: UserUpsertWithoutAssistantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssistantsInput, UserUpdateWithoutAssistantsInput>, UserUncheckedUpdateWithoutAssistantsInput>
  }

  export type DocumentUpdateManyWithoutAssistantNestedInput = {
    create?: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput> | DocumentCreateWithoutAssistantInput[] | DocumentUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutAssistantInput | DocumentCreateOrConnectWithoutAssistantInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutAssistantInput | DocumentUpsertWithWhereUniqueWithoutAssistantInput[]
    createMany?: DocumentCreateManyAssistantInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutAssistantInput | DocumentUpdateWithWhereUniqueWithoutAssistantInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutAssistantInput | DocumentUpdateManyWithWhereWithoutAssistantInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutAssistantNestedInput = {
    create?: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput> | MessageCreateWithoutAssistantInput[] | MessageUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAssistantInput | MessageCreateOrConnectWithoutAssistantInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAssistantInput | MessageUpsertWithWhereUniqueWithoutAssistantInput[]
    createMany?: MessageCreateManyAssistantInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAssistantInput | MessageUpdateWithWhereUniqueWithoutAssistantInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAssistantInput | MessageUpdateManyWithWhereWithoutAssistantInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AssistantRelationUpdateManyWithoutSourceNestedInput = {
    create?: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput> | AssistantRelationCreateWithoutSourceInput[] | AssistantRelationUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutSourceInput | AssistantRelationCreateOrConnectWithoutSourceInput[]
    upsert?: AssistantRelationUpsertWithWhereUniqueWithoutSourceInput | AssistantRelationUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: AssistantRelationCreateManySourceInputEnvelope
    set?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    disconnect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    delete?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    update?: AssistantRelationUpdateWithWhereUniqueWithoutSourceInput | AssistantRelationUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: AssistantRelationUpdateManyWithWhereWithoutSourceInput | AssistantRelationUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
  }

  export type AssistantRelationUpdateManyWithoutTargetNestedInput = {
    create?: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput> | AssistantRelationCreateWithoutTargetInput[] | AssistantRelationUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutTargetInput | AssistantRelationCreateOrConnectWithoutTargetInput[]
    upsert?: AssistantRelationUpsertWithWhereUniqueWithoutTargetInput | AssistantRelationUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: AssistantRelationCreateManyTargetInputEnvelope
    set?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    disconnect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    delete?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    update?: AssistantRelationUpdateWithWhereUniqueWithoutTargetInput | AssistantRelationUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: AssistantRelationUpdateManyWithWhereWithoutTargetInput | AssistantRelationUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutAssistantNestedInput = {
    create?: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput> | DocumentCreateWithoutAssistantInput[] | DocumentUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutAssistantInput | DocumentCreateOrConnectWithoutAssistantInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutAssistantInput | DocumentUpsertWithWhereUniqueWithoutAssistantInput[]
    createMany?: DocumentCreateManyAssistantInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutAssistantInput | DocumentUpdateWithWhereUniqueWithoutAssistantInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutAssistantInput | DocumentUpdateManyWithWhereWithoutAssistantInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutAssistantNestedInput = {
    create?: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput> | MessageCreateWithoutAssistantInput[] | MessageUncheckedCreateWithoutAssistantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAssistantInput | MessageCreateOrConnectWithoutAssistantInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAssistantInput | MessageUpsertWithWhereUniqueWithoutAssistantInput[]
    createMany?: MessageCreateManyAssistantInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAssistantInput | MessageUpdateWithWhereUniqueWithoutAssistantInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAssistantInput | MessageUpdateManyWithWhereWithoutAssistantInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput> | AssistantRelationCreateWithoutSourceInput[] | AssistantRelationUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutSourceInput | AssistantRelationCreateOrConnectWithoutSourceInput[]
    upsert?: AssistantRelationUpsertWithWhereUniqueWithoutSourceInput | AssistantRelationUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: AssistantRelationCreateManySourceInputEnvelope
    set?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    disconnect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    delete?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    update?: AssistantRelationUpdateWithWhereUniqueWithoutSourceInput | AssistantRelationUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: AssistantRelationUpdateManyWithWhereWithoutSourceInput | AssistantRelationUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
  }

  export type AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput> | AssistantRelationCreateWithoutTargetInput[] | AssistantRelationUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: AssistantRelationCreateOrConnectWithoutTargetInput | AssistantRelationCreateOrConnectWithoutTargetInput[]
    upsert?: AssistantRelationUpsertWithWhereUniqueWithoutTargetInput | AssistantRelationUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: AssistantRelationCreateManyTargetInputEnvelope
    set?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    disconnect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    delete?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    connect?: AssistantRelationWhereUniqueInput | AssistantRelationWhereUniqueInput[]
    update?: AssistantRelationUpdateWithWhereUniqueWithoutTargetInput | AssistantRelationUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: AssistantRelationUpdateManyWithWhereWithoutTargetInput | AssistantRelationUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
  }

  export type AssistantCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<AssistantCreateWithoutDocumentsInput, AssistantUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutDocumentsInput
    connect?: AssistantWhereUniqueInput
  }

  export type AssistantUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<AssistantCreateWithoutDocumentsInput, AssistantUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutDocumentsInput
    upsert?: AssistantUpsertWithoutDocumentsInput
    connect?: AssistantWhereUniqueInput
    update?: XOR<XOR<AssistantUpdateToOneWithWhereWithoutDocumentsInput, AssistantUpdateWithoutDocumentsInput>, AssistantUncheckedUpdateWithoutDocumentsInput>
  }

  export type AssistantCreateNestedOneWithoutMessagesInput = {
    create?: XOR<AssistantCreateWithoutMessagesInput, AssistantUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutMessagesInput
    connect?: AssistantWhereUniqueInput
  }

  export type AssistantUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<AssistantCreateWithoutMessagesInput, AssistantUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutMessagesInput
    upsert?: AssistantUpsertWithoutMessagesInput
    connect?: AssistantWhereUniqueInput
    update?: XOR<XOR<AssistantUpdateToOneWithWhereWithoutMessagesInput, AssistantUpdateWithoutMessagesInput>, AssistantUncheckedUpdateWithoutMessagesInput>
  }

  export type AssistantCreateNestedOneWithoutOutgoingRelationsInput = {
    create?: XOR<AssistantCreateWithoutOutgoingRelationsInput, AssistantUncheckedCreateWithoutOutgoingRelationsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutOutgoingRelationsInput
    connect?: AssistantWhereUniqueInput
  }

  export type AssistantCreateNestedOneWithoutIncomingRelationsInput = {
    create?: XOR<AssistantCreateWithoutIncomingRelationsInput, AssistantUncheckedCreateWithoutIncomingRelationsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutIncomingRelationsInput
    connect?: AssistantWhereUniqueInput
  }

  export type AssistantUpdateOneRequiredWithoutOutgoingRelationsNestedInput = {
    create?: XOR<AssistantCreateWithoutOutgoingRelationsInput, AssistantUncheckedCreateWithoutOutgoingRelationsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutOutgoingRelationsInput
    upsert?: AssistantUpsertWithoutOutgoingRelationsInput
    connect?: AssistantWhereUniqueInput
    update?: XOR<XOR<AssistantUpdateToOneWithWhereWithoutOutgoingRelationsInput, AssistantUpdateWithoutOutgoingRelationsInput>, AssistantUncheckedUpdateWithoutOutgoingRelationsInput>
  }

  export type AssistantUpdateOneRequiredWithoutIncomingRelationsNestedInput = {
    create?: XOR<AssistantCreateWithoutIncomingRelationsInput, AssistantUncheckedCreateWithoutIncomingRelationsInput>
    connectOrCreate?: AssistantCreateOrConnectWithoutIncomingRelationsInput
    upsert?: AssistantUpsertWithoutIncomingRelationsInput
    connect?: AssistantWhereUniqueInput
    update?: XOR<XOR<AssistantUpdateToOneWithWhereWithoutIncomingRelationsInput, AssistantUpdateWithoutIncomingRelationsInput>, AssistantUncheckedUpdateWithoutIncomingRelationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AssistantCreateWithoutUserInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutAssistantInput
    messages?: MessageCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationCreateNestedManyWithoutTargetInput
  }

  export type AssistantUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutAssistantInput
    messages?: MessageUncheckedCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutTargetInput
  }

  export type AssistantCreateOrConnectWithoutUserInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput>
  }

  export type AssistantCreateManyUserInputEnvelope = {
    data: AssistantCreateManyUserInput | AssistantCreateManyUserInput[]
  }

  export type AssistantUpsertWithWhereUniqueWithoutUserInput = {
    where: AssistantWhereUniqueInput
    update: XOR<AssistantUpdateWithoutUserInput, AssistantUncheckedUpdateWithoutUserInput>
    create: XOR<AssistantCreateWithoutUserInput, AssistantUncheckedCreateWithoutUserInput>
  }

  export type AssistantUpdateWithWhereUniqueWithoutUserInput = {
    where: AssistantWhereUniqueInput
    data: XOR<AssistantUpdateWithoutUserInput, AssistantUncheckedUpdateWithoutUserInput>
  }

  export type AssistantUpdateManyWithWhereWithoutUserInput = {
    where: AssistantScalarWhereInput
    data: XOR<AssistantUpdateManyMutationInput, AssistantUncheckedUpdateManyWithoutUserInput>
  }

  export type AssistantScalarWhereInput = {
    AND?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
    OR?: AssistantScalarWhereInput[]
    NOT?: AssistantScalarWhereInput | AssistantScalarWhereInput[]
    id?: StringFilter<"Assistant"> | string
    name?: StringFilter<"Assistant"> | string
    accessKey?: StringFilter<"Assistant"> | string
    category?: StringNullableFilter<"Assistant"> | string | null
    userId?: StringFilter<"Assistant"> | string
    createdAt?: DateTimeFilter<"Assistant"> | Date | string
    updatedAt?: DateTimeFilter<"Assistant"> | Date | string
  }

  export type UserCreateWithoutAssistantsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAssistantsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAssistantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
  }

  export type DocumentCreateWithoutAssistantInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUncheckedCreateWithoutAssistantInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutAssistantInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput>
  }

  export type DocumentCreateManyAssistantInputEnvelope = {
    data: DocumentCreateManyAssistantInput | DocumentCreateManyAssistantInput[]
  }

  export type MessageCreateWithoutAssistantInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutAssistantInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutAssistantInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput>
  }

  export type MessageCreateManyAssistantInputEnvelope = {
    data: MessageCreateManyAssistantInput | MessageCreateManyAssistantInput[]
  }

  export type AssistantRelationCreateWithoutSourceInput = {
    id?: string
    permission: string
    createdAt?: Date | string
    target: AssistantCreateNestedOneWithoutIncomingRelationsInput
  }

  export type AssistantRelationUncheckedCreateWithoutSourceInput = {
    id?: string
    targetId: string
    permission: string
    createdAt?: Date | string
  }

  export type AssistantRelationCreateOrConnectWithoutSourceInput = {
    where: AssistantRelationWhereUniqueInput
    create: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput>
  }

  export type AssistantRelationCreateManySourceInputEnvelope = {
    data: AssistantRelationCreateManySourceInput | AssistantRelationCreateManySourceInput[]
  }

  export type AssistantRelationCreateWithoutTargetInput = {
    id?: string
    permission: string
    createdAt?: Date | string
    source: AssistantCreateNestedOneWithoutOutgoingRelationsInput
  }

  export type AssistantRelationUncheckedCreateWithoutTargetInput = {
    id?: string
    sourceId: string
    permission: string
    createdAt?: Date | string
  }

  export type AssistantRelationCreateOrConnectWithoutTargetInput = {
    where: AssistantRelationWhereUniqueInput
    create: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput>
  }

  export type AssistantRelationCreateManyTargetInputEnvelope = {
    data: AssistantRelationCreateManyTargetInput | AssistantRelationCreateManyTargetInput[]
  }

  export type UserUpsertWithoutAssistantsInput = {
    update: XOR<UserUpdateWithoutAssistantsInput, UserUncheckedUpdateWithoutAssistantsInput>
    create: XOR<UserCreateWithoutAssistantsInput, UserUncheckedCreateWithoutAssistantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssistantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssistantsInput, UserUncheckedUpdateWithoutAssistantsInput>
  }

  export type UserUpdateWithoutAssistantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAssistantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutAssistantInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutAssistantInput, DocumentUncheckedUpdateWithoutAssistantInput>
    create: XOR<DocumentCreateWithoutAssistantInput, DocumentUncheckedCreateWithoutAssistantInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutAssistantInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutAssistantInput, DocumentUncheckedUpdateWithoutAssistantInput>
  }

  export type DocumentUpdateManyWithWhereWithoutAssistantInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutAssistantInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    storageUrl?: StringFilter<"Document"> | string
    status?: StringFilter<"Document"> | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    assistantId?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutAssistantInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutAssistantInput, MessageUncheckedUpdateWithoutAssistantInput>
    create: XOR<MessageCreateWithoutAssistantInput, MessageUncheckedCreateWithoutAssistantInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutAssistantInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutAssistantInput, MessageUncheckedUpdateWithoutAssistantInput>
  }

  export type MessageUpdateManyWithWhereWithoutAssistantInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutAssistantInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    timestamp?: StringFilter<"Message"> | string
    assistantId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type AssistantRelationUpsertWithWhereUniqueWithoutSourceInput = {
    where: AssistantRelationWhereUniqueInput
    update: XOR<AssistantRelationUpdateWithoutSourceInput, AssistantRelationUncheckedUpdateWithoutSourceInput>
    create: XOR<AssistantRelationCreateWithoutSourceInput, AssistantRelationUncheckedCreateWithoutSourceInput>
  }

  export type AssistantRelationUpdateWithWhereUniqueWithoutSourceInput = {
    where: AssistantRelationWhereUniqueInput
    data: XOR<AssistantRelationUpdateWithoutSourceInput, AssistantRelationUncheckedUpdateWithoutSourceInput>
  }

  export type AssistantRelationUpdateManyWithWhereWithoutSourceInput = {
    where: AssistantRelationScalarWhereInput
    data: XOR<AssistantRelationUpdateManyMutationInput, AssistantRelationUncheckedUpdateManyWithoutSourceInput>
  }

  export type AssistantRelationScalarWhereInput = {
    AND?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
    OR?: AssistantRelationScalarWhereInput[]
    NOT?: AssistantRelationScalarWhereInput | AssistantRelationScalarWhereInput[]
    id?: StringFilter<"AssistantRelation"> | string
    sourceId?: StringFilter<"AssistantRelation"> | string
    targetId?: StringFilter<"AssistantRelation"> | string
    permission?: StringFilter<"AssistantRelation"> | string
    createdAt?: DateTimeFilter<"AssistantRelation"> | Date | string
  }

  export type AssistantRelationUpsertWithWhereUniqueWithoutTargetInput = {
    where: AssistantRelationWhereUniqueInput
    update: XOR<AssistantRelationUpdateWithoutTargetInput, AssistantRelationUncheckedUpdateWithoutTargetInput>
    create: XOR<AssistantRelationCreateWithoutTargetInput, AssistantRelationUncheckedCreateWithoutTargetInput>
  }

  export type AssistantRelationUpdateWithWhereUniqueWithoutTargetInput = {
    where: AssistantRelationWhereUniqueInput
    data: XOR<AssistantRelationUpdateWithoutTargetInput, AssistantRelationUncheckedUpdateWithoutTargetInput>
  }

  export type AssistantRelationUpdateManyWithWhereWithoutTargetInput = {
    where: AssistantRelationScalarWhereInput
    data: XOR<AssistantRelationUpdateManyMutationInput, AssistantRelationUncheckedUpdateManyWithoutTargetInput>
  }

  export type AssistantCreateWithoutDocumentsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
    messages?: MessageCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationCreateNestedManyWithoutTargetInput
  }

  export type AssistantUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutTargetInput
  }

  export type AssistantCreateOrConnectWithoutDocumentsInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutDocumentsInput, AssistantUncheckedCreateWithoutDocumentsInput>
  }

  export type AssistantUpsertWithoutDocumentsInput = {
    update: XOR<AssistantUpdateWithoutDocumentsInput, AssistantUncheckedUpdateWithoutDocumentsInput>
    create: XOR<AssistantCreateWithoutDocumentsInput, AssistantUncheckedCreateWithoutDocumentsInput>
    where?: AssistantWhereInput
  }

  export type AssistantUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: AssistantWhereInput
    data: XOR<AssistantUpdateWithoutDocumentsInput, AssistantUncheckedUpdateWithoutDocumentsInput>
  }

  export type AssistantUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
    messages?: MessageUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type AssistantCreateWithoutMessagesInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
    documents?: DocumentCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationCreateNestedManyWithoutTargetInput
  }

  export type AssistantUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutSourceInput
    incomingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutTargetInput
  }

  export type AssistantCreateOrConnectWithoutMessagesInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutMessagesInput, AssistantUncheckedCreateWithoutMessagesInput>
  }

  export type AssistantUpsertWithoutMessagesInput = {
    update: XOR<AssistantUpdateWithoutMessagesInput, AssistantUncheckedUpdateWithoutMessagesInput>
    create: XOR<AssistantCreateWithoutMessagesInput, AssistantUncheckedCreateWithoutMessagesInput>
    where?: AssistantWhereInput
  }

  export type AssistantUpdateToOneWithWhereWithoutMessagesInput = {
    where?: AssistantWhereInput
    data: XOR<AssistantUpdateWithoutMessagesInput, AssistantUncheckedUpdateWithoutMessagesInput>
  }

  export type AssistantUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
    documents?: DocumentUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type AssistantCreateWithoutOutgoingRelationsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
    documents?: DocumentCreateNestedManyWithoutAssistantInput
    messages?: MessageCreateNestedManyWithoutAssistantInput
    incomingRelations?: AssistantRelationCreateNestedManyWithoutTargetInput
  }

  export type AssistantUncheckedCreateWithoutOutgoingRelationsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutAssistantInput
    messages?: MessageUncheckedCreateNestedManyWithoutAssistantInput
    incomingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutTargetInput
  }

  export type AssistantCreateOrConnectWithoutOutgoingRelationsInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutOutgoingRelationsInput, AssistantUncheckedCreateWithoutOutgoingRelationsInput>
  }

  export type AssistantCreateWithoutIncomingRelationsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAssistantsInput
    documents?: DocumentCreateNestedManyWithoutAssistantInput
    messages?: MessageCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationCreateNestedManyWithoutSourceInput
  }

  export type AssistantUncheckedCreateWithoutIncomingRelationsInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutAssistantInput
    messages?: MessageUncheckedCreateNestedManyWithoutAssistantInput
    outgoingRelations?: AssistantRelationUncheckedCreateNestedManyWithoutSourceInput
  }

  export type AssistantCreateOrConnectWithoutIncomingRelationsInput = {
    where: AssistantWhereUniqueInput
    create: XOR<AssistantCreateWithoutIncomingRelationsInput, AssistantUncheckedCreateWithoutIncomingRelationsInput>
  }

  export type AssistantUpsertWithoutOutgoingRelationsInput = {
    update: XOR<AssistantUpdateWithoutOutgoingRelationsInput, AssistantUncheckedUpdateWithoutOutgoingRelationsInput>
    create: XOR<AssistantCreateWithoutOutgoingRelationsInput, AssistantUncheckedCreateWithoutOutgoingRelationsInput>
    where?: AssistantWhereInput
  }

  export type AssistantUpdateToOneWithWhereWithoutOutgoingRelationsInput = {
    where?: AssistantWhereInput
    data: XOR<AssistantUpdateWithoutOutgoingRelationsInput, AssistantUncheckedUpdateWithoutOutgoingRelationsInput>
  }

  export type AssistantUpdateWithoutOutgoingRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
    documents?: DocumentUpdateManyWithoutAssistantNestedInput
    messages?: MessageUpdateManyWithoutAssistantNestedInput
    incomingRelations?: AssistantRelationUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateWithoutOutgoingRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutAssistantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAssistantNestedInput
    incomingRelations?: AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUpsertWithoutIncomingRelationsInput = {
    update: XOR<AssistantUpdateWithoutIncomingRelationsInput, AssistantUncheckedUpdateWithoutIncomingRelationsInput>
    create: XOR<AssistantCreateWithoutIncomingRelationsInput, AssistantUncheckedCreateWithoutIncomingRelationsInput>
    where?: AssistantWhereInput
  }

  export type AssistantUpdateToOneWithWhereWithoutIncomingRelationsInput = {
    where?: AssistantWhereInput
    data: XOR<AssistantUpdateWithoutIncomingRelationsInput, AssistantUncheckedUpdateWithoutIncomingRelationsInput>
  }

  export type AssistantUpdateWithoutIncomingRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssistantsNestedInput
    documents?: DocumentUpdateManyWithoutAssistantNestedInput
    messages?: MessageUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUpdateManyWithoutSourceNestedInput
  }

  export type AssistantUncheckedUpdateWithoutIncomingRelationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutAssistantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type AssistantCreateManyUserInput = {
    id?: string
    name: string
    accessKey: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssistantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutAssistantNestedInput
    messages?: MessageUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutAssistantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAssistantNestedInput
    outgoingRelations?: AssistantRelationUncheckedUpdateManyWithoutSourceNestedInput
    incomingRelations?: AssistantRelationUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type AssistantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessKey?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyAssistantInput = {
    id?: string
    fileName: string
    storageUrl: string
    status: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyAssistantInput = {
    id?: string
    role: string
    content: string
    timestamp: string
    createdAt?: Date | string
  }

  export type AssistantRelationCreateManySourceInput = {
    id?: string
    targetId: string
    permission: string
    createdAt?: Date | string
  }

  export type AssistantRelationCreateManyTargetInput = {
    id?: string
    sourceId: string
    permission: string
    createdAt?: Date | string
  }

  export type DocumentUpdateWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storageUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutAssistantInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: AssistantUpdateOneRequiredWithoutIncomingRelationsNestedInput
  }

  export type AssistantRelationUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: AssistantUpdateOneRequiredWithoutOutgoingRelationsNestedInput
  }

  export type AssistantRelationUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantRelationUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}