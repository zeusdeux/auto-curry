export default function cu(...args) {
  const [fn, ...rest] = args
  const typeOfFn = typeof fn

  if ('function' !== typeOfFn) {
    throw new Error(
      `auto-curry: Invalid parameter. Expected function, received ${typeOfFn}`
    )
  }

  if (fn.length <= 1) {
    return fn
  }

  if (rest.length >= fn.length) {
    return fn.apply(this, rest)
  }

  return function(...restArgs) {
    return cu.apply(this, [...args, ...restArgs])
  }
}
