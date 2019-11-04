import Model from 'sistemium-vue/jsdata/Model';

export default new Model({

  name: 'PossibleOutletPhoto',

  relations: {
    belongsTo: {
      PossibleOutlet: {
        localField: 'possibleOutlet',
        localKey: 'possibleOutletId',
      },
    },
  },

});
