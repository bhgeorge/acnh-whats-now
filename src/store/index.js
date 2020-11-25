import Vue from 'vue';
import Vuex from 'vuex';
import { add, setSeconds, differenceInSeconds } from 'date-fns';
import idb from '@/utils/idb.util';

Vue.use(Vuex);

export const MUTATION_TYPES = {
  SET_CAUGHT_STATUS: 'setCaughtStatus',
  SET_IS_TIME_MANUAL: 'setIsTimeManual',
  SET_NOW: 'setNow',
  INIT_CAUGHT_STATUS: 'initCaughtStatus',
};

export const ACTION_TYPES = {
  SET_CAUGHT_STATUS: 'setCaughtStatus',
  SET_TIME_OVERRIDE: 'setTimeOverride',
  START_TIME: 'startTime',
  UPDATE_TIME: 'updateTime',
  INIT_CAUGHT_STATUS: 'initCaughtStatus',
};

export const GETTER_TYPES = {
  GET_CAUGHT_STATUS: 'getCaughtStatus',
};

export default new Vuex.Store({
  state: {
    isNorthernHemisphere: true,
    now: new Date(),
    isTimeManual: false,
    db: null,
    caught: {},
  },

  mutations: {
    [MUTATION_TYPES.SET_NOW](state, date) {
      if (date) {
        state.now = date;
      } else {
        state.now = new Date();
      }
    },

    [MUTATION_TYPES.SET_IS_TIME_MANUAL](state, bool) {
      state.isTimeManual = bool;
    },

    [MUTATION_TYPES.SET_CAUGHT_STATUS](state, caughtStatus) {
      Vue.set(state.caught, caughtStatus.id, caughtStatus.val);
    },

    [MUTATION_TYPES.INIT_CAUGHT_STATUS](state, caught) {
      state.caught = caught;
    },
  },

  actions: {
    [ACTION_TYPES.UPDATE_TIME]({ commit, state }) {
      const date = state.isTimeManual ? add(state.now, { minutes: 1 }) : null;
      commit(MUTATION_TYPES.SET_NOW, date);
    },

    [ACTION_TYPES.START_TIME]({ dispatch }) {
      const now = new Date();
      const nextMin = setSeconds(add(now, { minutes: 1 }), 1);
      const difference = differenceInSeconds(nextMin, now);

      setTimeout(() => {
        // Run once now, and the interval will take care of the rest
        dispatch(ACTION_TYPES.UPDATE_TIME);
        setInterval(() => {
          dispatch(ACTION_TYPES.UPDATE_TIME);
        }, 1000 * 60);
      }, difference);
    },

    [ACTION_TYPES.SET_TIME_OVERRIDE]({ commit }, date) {
      commit(MUTATION_TYPES.SET_NOW, date);
      commit(MUTATION_TYPES.SET_IS_TIME_MANUAL, true);
    },

    [ACTION_TYPES.SET_CAUGHT_STATUS]({ commit }, caughtStatus) {
      commit(MUTATION_TYPES.SET_CAUGHT_STATUS, caughtStatus);
      // Pulling all keys in the table is easy, so we are just storing positive
      // results. If an animal becomes "uncaught" then we delete the db entry
      if (caughtStatus.val) {
        idb.set(caughtStatus.id, caughtStatus.val);
      } else {
        idb.delete(caughtStatus.id);
      }
    },

    [ACTION_TYPES.INIT_CAUGHT_STATUS]({ commit }) {
      // Get all saved catch info
      async function getAllDBInfo() {
        const allCatchInfo = await idb.allKeys();
        const caught = allCatchInfo.reduce((acc, key) => ({ ...acc, [key]: true }), {});
        commit(MUTATION_TYPES.INIT_CAUGHT_STATUS, caught);
      }
      getAllDBInfo();
    },
  },

  getters: {
    [GETTER_TYPES.GET_CAUGHT_STATUS]: (state) => (id) => !!state.caught[id],
  },
});
