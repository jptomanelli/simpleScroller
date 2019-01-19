# simpleScroller
A very lightweight Javascript library for scrollytelling using IntersectionObserver (heavily inspired by [scrollama](https://github.com/russellgoldenberg/scrollama))

## Usage

```
const scroller = new Scroller();
scroller
  .setup({
    query: '.box'
  })
  .onEnter((element, meta) => {
    console.log([element, meta]);
  })
  .onExit((element, meta) => {
    console.log([element, meta]);
  })
  .listen();
```
