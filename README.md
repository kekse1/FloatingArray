<img src="without.svg" /><br>
<img src="https://kekse.biz/github.php?draw&override=github:FloatingArray" />

# **`FloatingArray`**
Now \(**2026-10-18**\) it's done and working.

But still missing some more documentation here.

<br>

> [!TIP]
> **This** includes **my most efficient implementation** of **radix conversion.**
> The first time I've used a **lookup table** (`Uint8Array`). I will
> do it the same thing everywhere else in my codes.. will take some time,
> even if it's really just a tiny thing.

<br><br>

# Idea and Description
Short explaination: Extends a regular (JavaScript) Array, using a Proxy for own
`get()` (Proxy Trap) access to the array values via:

* Floating Point Index: calculates the middle between both numeric values.
* Negative indices counted from the arrays ends (and calculating backwards).
* Also optional Modulo for the indices, to repeat counting after ends/beginnings.
* "Radix cast" (my invention), so access via e.g. `array['(16)-ff.ff']` or
* `(2)10101.10101` is possible.

For sure, JavaScript supports a higher radix. But only for integer values - you
can't use smth. like `parseFloat('ff.ff', 16)`.

.. because, of course: The **main idea** was to access numeric array values
"**in between**"! Used formula/function is this one:

```
static getValue(_curr, _next, _float)
{
    return ((_curr + (_next - _curr) * _float) || 0);
}
```

<br><br>

## Settings / Options
See the `const` **defaults** on top of [the script](./src/floating.mjs), and look
at the `constructor(... _args)` to see how they're applied.

<br><br>

# Download
* [**`floating.mjs`**](./src/floating.mjs), v**0.2.8** (updated **2026-10-18**);

**Test cases** [**here**](./src/test/)

<br><br>

# TODO
...

<br><br>

# By the way. ..

[PropJockey](https://propjockey.io/) had exactly the same idea as me.
I really didn't steal this idea from her - when it came up to my mind,
I had never seen it somewhere else before! :-)

So, please also look at her [`analog-array`](https://github.com/propjockey/analog-array/)!

<br><br><br>

# Contact
<img src="https://kekse.biz/github.php?override=github:FloatingArray&draw&text=FloatingArray@kekse.biz&angle=6&size=38pt&fg=150,20,90&font=OpenSans&ro&readonly&h=64&v=16" />

<br>

# Copyright and License
The Copyright is [(c) Sebastian Kucharczyk](COPYRIGHT.txt),
and it's licensed under the [MIT](LICENSE.txt) (also known as 'X' or 'X11' license).

<a href="https://kekse.biz/">
<img src="favicon.png" alt="Favicon" />
</a>

