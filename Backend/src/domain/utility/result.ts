export class Result<T = void> {
    success: boolean
    error?: string
    data?: T

    private constructor(success: boolean, error?: string, data?: T) {
        this.success = success
        this.error = error
        this.data = data
    }

    static success<U>(data?: U): Result<U> {
        return new Result<U>(true, undefined, data)
    }

    static failure<U>(error: string): Result<U> {
        return new Result<U>(false, error)
    }
}
