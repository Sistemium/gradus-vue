import Model from 'sistemium-vue/jsdata/Model';
import './PossibleOutletPhoto';

export default new Model({

  name: 'PossibleOutlet',

  relations: {
    belongsTo: {
      // Salesman: {
      //   localField: 'salesman',
      //   foreignKey: 'salesmanId',
      // },
    },
    hasMany: {
      PossibleOutletPhoto: {
        localField: 'photos',
        foreignKey: 'possibleOutletId',
      },
    },
  },

  methods: {
    statusIcon() {
      const hasLocation = this.locationId;
      const hasPhotos = this.photos.length;
      if (hasPhotos && hasLocation) {
        return 'el-icon-circle-check';
      }
      if (hasLocation) {
        return 'el-icon-location-outline';
      }
      if (hasPhotos) {
        return 'el-icon-camera';
      }
    },
  },

});
