 

export const state = () => ({
    username: '',
    roomKey: '',
    playerNumber: '',
    jugadores: [
      { username: "", in: false },
      { username: "", in: false },
    ],
    juego:0,
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
    }
  }
  



export const actions = {
    updatePlayer({ commit }, playerData) {
      commit('setUsername', playerData.socket.username);
      commit('setRoomKey', playerData.claveSala);
      commit('setPlayerNumber', playerData.socket.player);
     
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
    }
  }