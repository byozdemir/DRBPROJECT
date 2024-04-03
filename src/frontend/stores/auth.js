import { createStore } from 'zustand';

const authStore = createStore({
  user: null,
  token:null,

  login: (username, password) => {
    const user = { name: username };
    authStore.setState({ user });
  },

  logout: () => {
    authStore.setState({ user: null });
  },

  isAuthorized: () => authStore.getState().user !== null,
});

export default authStore;