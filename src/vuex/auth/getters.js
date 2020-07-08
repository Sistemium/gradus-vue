export const HAS_ROLE = 'HAS_ROLE';

export default {

  [HAS_ROLE](state) {
    return role => (state.roles && state.roles[role]) || false;
  },

};
