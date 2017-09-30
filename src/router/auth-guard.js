import { store } from '../store'

// NOTE: redirect if user is not authenticated
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}
