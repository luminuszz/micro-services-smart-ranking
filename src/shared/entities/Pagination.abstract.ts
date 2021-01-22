type queryMethod<T> = () => T

export abstract class PaginationQuery {
  protected abstract getQueryFetch<T>(method: queryMethod<T>): queryMethod<T>
}
