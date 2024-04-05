# DRB = DJANGO REACT BOILERPLATE

### UNDER DEVELOPMENT!!

### Used Techs
- [x] Django
- [x] Django Rest Framework
- [x] Unfold Django Admin Theme
- [x] React
- [x] Typescript
- [x] Webpack
- [x] Tailwindcss
- [x] Zustand
- [x] React Toastify
- [x] React Hook Form
- [x] Yup

### Features
- [x] Authentication System
- [x] React frontend integrated to django system.
- [x] Ready to Use

#### Protected Pages
Add the pages you want to be protected to the "AuthContainer" in the routes.jsx page.
```js
<Route element={<AuthContainer />}>
    <Route element={<About />} path="/about" exact />
</Route>
```