# Questions for NextJS

## What is NextJS?
## What is the difference between the pages router and the app router?
## What are server components?
## How do you mark client components? Server components?
## Can server components be nested under client components?
## How does NextJS handle caching?

There are three levels of caching, explained by the [NextJS docs](https://nextjs.org/docs/app/building-your-application/caching):

* Router Cache: this is client side caching. The browser/client stores the payload of the RSC locally.

* Full Route Cache: this caches the contents of the HTML / RSC on the server

* Request Memoization: this cache works by checking the *value* of the function/RSC payload and returns the cache if it is the same. For example, if some function that requests some JSON is used across your app, NextJS will cache the results of the function, ensuring that the actual request only gets run the first time and returns cached values every subsequent call within your application.

* Data Cache: 


The Full Route Cache only caches statically rendered routes. The Router Cache applies both to static and dynamic routes.

The `revalidatePath` function revalidates data (data cache) and re-renders the route segment (full route cache).



```js
export const dyanmic = "force-dynamic";     // opt out of route cache
export const revalidate = 0;                // opt out of data cache
```


## What does `revalidate` and `dynamic` do?
## Describe how `page.tsx`, `layout.tsx`, and `route.tsx` work
## When would it make sense to use NextJS? When would it not make sense?

