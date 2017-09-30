import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup'
import user from './user'
import shared from './shared'

// import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared
  }
})

// export const store = new Vuex.Store({
//   state: {
//     loadedMeetups: [
//       { imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200', id: 'gjergewogew', title: 'Meetup in New York', date: new Date(), location: 'Budapest', description: "It's awesome" },
//       { imageUrl: 'http://ecahe.eu/assets/uploads/2017/02/paris.jpg', id: 'wgwrgwgwghw', title: 'Meetup in Paris', date: new Date(), location: 'Budapest', description: "It's awesome" }
//     ],
//     user: null,
//     loading: false,
//     error: null
//   },
//   mutations: {
//     registerUserForMeetup (state, payload) {
//       const id = payload.id
//       // NOTE: already registered for that meetup
//       if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
//         return
//       }
//       state.user.registeredMeetups.push(id)
//       state.user.fbKeys[id] = payload.fbKey
//     },
//     unregisterUserFromMeetup (state, payload) {
//       const registeredMeetups = state.user.registeredMeetups
//       // NOTE: find meetup
//       registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
//
//       // NOTE: remove property (meetup)
//       Reflect.deleteProperty(state.user.fbKeys, payload)
//     },
//     setLoadedMeetups (state, payload) {
//       state.loadedMeetups = payload
//     },
//     updateMeetup (state, payload) {
//       const meetup = state.loadedMeetups.find(meetup => {
//         return meetup.id === payload.id
//       })
//       if (payload.title) {
//         meetup.title = payload.title
//       }
//       if (payload.description) {
//         meetup.description = payload.description
//       }
//       if (payload.date) {
//         meetup.date = payload.date
//       }
//     },
//     createMeetup (state, payload) {
//       state.loadedMeetups.push(payload)
//     },
//     setUser (state, payload) {
//       state.user = payload
//     },
//     setLoading (state, payload) {
//       state.loading = payload
//     },
//     setError (state, payload) {
//       state.error = payload
//     },
//     clearError (state) {
//       state.error = null
//     }
//   },
//   actions: {
//     registerUserForMeetup ({commit, getters}, payload) {
//       commit('setLoading', true)
//       const user = getters.user
//       firebase.database().ref('/users/' + user.id).child('/registrations/')
//         .push(payload)
//         .then(data => {
//           commit('setLoading', false)
//           commit('registerUserForMeetup', {id: payload, fbKey: data.key})
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     unregisterUserFromMeetup ({commit, getters}, payload) {
//       commit('setLoading', true)
//       const user = getters.user
//
//       // NOTE: user doesn't have firebase keys
//       if (!user.fbKeys) {
//         return
//       }
//       // NOTE: get firebase key with meetup (stored on user)
//       const fbKey = user.fbKeys[payload]
//       // firebase.database().ref('/users' + user.id).child()
//       firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
//         .remove()
//         .then(() => {
//           commit('setLoading', false)
//           // NOTE: meetup id
//           commit('unregisterUserFromMeetup', payload)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     loadMeetups ({commit}) {
//       commit('setLoading', true)
//       // NOTE: fetch data whenever any value changes (realtime)
//       // firebase.database().ref('meetups').on('value')
//       firebase.database().ref('meetups').once('value')
//         .then(
//           (data) => {
//             const meetups = []
//             // NOTE: get meetups as keys of an object
//             const obj = data.val()
//
//             for (let key in obj) {
//               meetups.push({
//                 id: key,
//                 title: obj[key].title,
//                 description: obj[key].description,
//                 imageUrl: obj[key].imageUrl,
//                 date: obj[key].date,
//                 location: obj[key].location,
//                 creatorId: obj[key].creatorId
//               })
//             }
//
//             commit('setLoadedMeetups', meetups)
//             commit('setLoading', false)
//           }
//         )
//         .catch(
//           (error) => {
//             console.log(error)
//             commit('setLoading', false)
//           }
//         )
//     },
//     createMeetup ({commit, getters}, payload) {
//       const meetup = {
//         title: payload.title,
//         location: payload.location,
//         description: payload.description,
//         date: payload.date.toISOString(),
//         creatorId: getters.user.id
//       }
//       // NOTE: store data in meetups node (promise)
//       let key
//       let imageUrl
//       firebase.database().ref('meetups').push(meetup)
//         .then(
//           (data) => {
//             key = data.key
//             return key
//           }
//         )
//         // NOTE: image upload
//         .then(key => {
//           const filename = payload.image.name
//           const ext = filename.slice(filename.lastIndexOf('.'))
//           return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
//         })
//         // NOTE: update existing meetup with imageurl
//         .then(fileData => {
//           imageUrl = fileData.metadata.downloadURLs[0]
//           return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
//         })
//         // NOTE: Firebase store it with ID
//         .then(() => {
//           commit('createMeetup', {
//             ...meetup,
//             imageUrl: imageUrl,
//             id: key
//           })
//         })
//         .catch(
//           (error) => {
//             console.log(error)
//           }
//         )
//     },
//     updateMeetupData ({commit}, payload) {
//       commit('setLoading', true)
//       const updateObj = {}
//       if (payload.title) {
//         updateObj.title = payload.title
//       }
//       if (payload.description) {
//         updateObj.description = payload.description
//       }
//       if (payload.date) {
//         updateObj.date = payload.date
//       }
//       firebase.database().ref('meetups').child(payload.id).update(updateObj)
//         .then(() => {
//           commit('setLoading', false)
//           commit('updateMeetup', payload)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     // NOTE: Firebase sign up with promise
//     signUserUp ({commit}, payload) {
//       commit('setLoading', true)
//       commit('clearError')
//       firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
//         .then(
//           user => {
//             commit('setLoading', false)
//             const newUser = {
//               id: user.uid,
//               registeredMeetups: [],
//               fbKeys: {}
//             }
//             commit('setUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('setLoading', false)
//             commit('setError', error)
//             console.log(error)
//           }
//         )
//     },
//     signUserIn ({commit}, payload) {
//       commit('setLoading', true)
//       commit('clearError')
//       firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
//         .then(
//           user => {
//             commit('setLoading', false)
//             const newUser = {
//               id: user.uid,
//               registeredMeetups: [],
//               fbKeys: {}
//             }
//             commit('setUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('setLoading', false)
//             commit('setError', error)
//             console.log(error)
//           }
//         )
//     },
//     clearError ({commit}) {
//       commit('clearError')
//     },
//     // NOTE: get user
//     autoSignIn ({commit}, payload) {
//       commit('setUser', {
//         id: payload.uid,
//         registeredMeetups: [],
//         fbKeys: {}
//       })
//     },
//     fetchUserData ({commit, getters}) {
//       commit('setLoading', true)
//       // NOTE: fetches data once for startup
//       firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
//         .then(data => {
//           const dataPairs = data.val()
//           let registeredMeetups = []
//           let swappedPairs = {}
//           // NOTE: get registered meetups
//           for (let key in dataPairs) {
//             registeredMeetups.push(dataPairs[key])
//             swappedPairs[dataPairs[key]] = key
//           }
//           const updatedUser = {
//             id: getters.user.id,
//             registeredMeetups: registeredMeetups,
//             fbKeys: swappedPairs
//           }
//           commit('setLoading', false)
//           commit('setUser', updatedUser)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     // NOTE: Logout user
//     logout ({commit}) {
//       // NOTE: remove token from local storage
//       firebase.auth().signOut()
//       commit('setUser', null)
//     }
//   },
//   getters: {
//     loadedMeetups (state) {
//       return state.loadedMeetups.sort((meetupA, meetupB) => {
//         return meetupA.date > meetupB.date
//       })
//     },
//     loadedMeetup (state) {
//       return (meetupId) => {
//         return state.loadedMeetups.find((meetup) => {
//           return meetup.id === meetupId
//         })
//       }
//     },
//     featuredMeetups (state, getters) {
//       return getters.loadedMeetups.slice(0, 5)
//     },
//     user (state) {
//       return state.user
//     },
//     error (state) {
//       return state.error
//     },
//     loading (state) {
//       return state.loading
//     }
//   }
// })
