import Vue from 'vue';
import Vuex from 'vuex';
import { add, setSeconds, differenceInSeconds } from 'date-fns';

Vue.use(Vuex);

export const MUTATION_TYPES = {
  SET_NOW: 'setNow',
  SET_IS_TIME_MANUAL: 'setIsTimeManual',
};

export const ACTION_TYPES = {
  UPDATE_TIME: 'updateTime',
  START_TIME: 'startTime',
  SET_TIME_OVERRIDE: 'setTimeOverride',
};

export default new Vuex.Store({
  state: {
    isNorthernHemisphere: true,
    now: new Date(),
    isTimeManual: false,
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
  },
});
