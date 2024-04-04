# DRB = DJANGO REACT BOILERPLATE

### UNDER DEVELOPMENT!!

#### Protected Pages
Add the pages you want to be protected to the "AuthContainer" in the routes.jsx page.
```js
<Route element={<AuthContainer />}>
    <Route element={<About />} path="/about" exact />
</Route>
```