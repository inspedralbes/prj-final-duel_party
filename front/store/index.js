
export const state = () => ({
    username: '',
    roomKey: '',
    playerNumber: ''
  })
  
  
export const prueba = 0;

export const mutations = {
    setUsername(state, username) {
      state.username = username;
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
    }
  }
  
export const actions = {
    updatePlayer({ commit }, playerData) {
      commit('setUsername', playerData.socket.username);
      commit('setRoomKey', playerData.claveSala);
      commit('setPlayerNumber', playerData.socket.player);
     
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