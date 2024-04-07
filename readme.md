# DRB = DJANGO REACT BOILERPLATE

## DRB Terminal Info
Drb terminal is only support text input at the moment.

### UNDER DEVELOPMENT!!

### features to be Developed
- [ ] Shacdn UI Integration
- [ ] Social Authentication


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
- [x] Object Based Code Generation (Create object for your models and drb will code django and frontend side.)
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