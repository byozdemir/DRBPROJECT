# DRB = DJANGO REACT BOILERPLATE

### UNDER DEVELOPMENT!!

### Used Techs
- [ ] Django
- [ ] Django Rest Framework
- [ ] Unfold Django Admin Theme
- [ ] React
- [ ] Webpack
- [ ] Tailwindcss
- [ ] Zustand
- [ ] React Toastify
- [ ] React Hook Form
- [ ] Yup

### Features
- [ ] Authentication System
- [ ] React frontend integrated to django system.
- [ ] Ready to Use

#### Protected Pages
Add the pages you want to be protected to the "AuthContainer" in the routes.jsx page.
```js
<Route element={<AuthContainer />}>
    <Route element={<About />} path="/about" exact />
</Route>
```