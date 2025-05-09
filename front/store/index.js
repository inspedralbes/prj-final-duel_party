 

export const state = () => ({
    username: '',
    roomKey: '',
    jugadores: [
      { username: "", in: false },
      { username: "", in: false },
    ],
    juego:'',
    permisos:false,
  })


 

export const mutations = {
    setUsername(state, username) {
      state.username = username;
    },
    setJuego(state, juego) {
      state.juego = juego;
    },
    setRoomKey(state, roomKey) {
      state.roomKey = roomKey;
    },
    setPlayerNumber(state, playerNumber) {
      state.playerNumber = playerNumber;
    },
    resetPlayer(state) {
      state.username = '';
      state.roomKey = '';
      state.playerNumber = null;
    },
    setJugador(state, { index, jugador }) {
      if (state.jugadores[index]) {
        state.jugadores[index].username = jugador.username;
        state.jugadores[index].in = jugador.in;
      }
    },
    setPermisos(state, permisos) {
      state.permisos = permisos;}
  }
  



export const actions = {
    updatePlayer({ commit }, playerData) {
      commit('setUsername', playerData.username);
      commit('setRoomKey', playerData.claveSala);
      
     
    },
    updateJuego({ commit }, juego) {
      commit('setJuego', juego);
    },
    updateJugadores({ commit }, jugadores) {
      jugadores.forEach((jugador, index) => {
        commit('setJugador', { index, jugador });
      });
    },
    updateNamePlayer({ commit }, playerData) {
      commit('setUsername', playerData);
     
     
    },
    updateKeyData({ commit }, key) {
        commit('setRoomKey', key);
       
      },
      updateNPlayer({ commit }, num) {
        commit('setPlayerNumber', num);
       
      },
    resetPlayerData({ commit }) {
      commit('resetPlayer');
    },
    updatePermisos({ commit }, permisos) {
      commit('setPermisos', permisos);
    }
  }