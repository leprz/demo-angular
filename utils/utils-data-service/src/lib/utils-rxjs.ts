import {filter, OperatorFunction} from "rxjs";

export function filterNill<T>(): OperatorFunction<T | null | undefined, T> {
  return (input$) => input$.pipe(filter((x): x is T => x !== null && x !== undefined));
}
