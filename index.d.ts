declare module 'auto-curry' {
    import {Increment} from '@detachhead/ts-helpers/dist/utilityTypes/Number'
    import {Take} from 'ts-toolbelt/out/List/Take'

    type Func = (...args: never[]) => unknown
    type AutoCurryTailRec<T extends Func,
        ParameterCount extends number,
        Result extends {},
        > = ParameterCount extends Increment<Parameters<T>['length']>
        ? Result
        : AutoCurryTailRec<T,
            Increment<ParameterCount>,
            Result &
            ((
                ...args: Take<Parameters<T>, ParameterCount>
            ) => ParameterCount extends Parameters<T>['length']
                ? ReturnType<T>
                : AutoCurry<((
                    ...args: Take<Parameters<T>, ParameterCount, '<-'>
                ) => ReturnType<T>) extends infer Narrowed
                    ? Narrowed extends Func
                        ? Narrowed
                        : never
                    : never>)>
    export type AutoCurry<T extends Func> = AutoCurryTailRec<T, 0, {}>
    // noinspection JSUnusedGlobalSymbols
    export default function <T extends Func>(fn: T): AutoCurry<T>
}
