import find from 'lodash/find';

export default {
  computed: {
    hasAxes() {
      const { axisX = [], axisY = [] } = this.discountMatrix;
      return axisY.length || axisX.length;
    },
    values() {
      const { values, axisX, axisY } = this.discountMatrix;
      return axisX.map(x => axisY.map(y => {
        const value = find(values, {
          x: x.id,
          y: y.id,
        });
        return value && value.discountOwn;
      }));
    },
    matrixStyle() {
      const { axisX } = this.discountMatrix;
      const auto = axis => axis.map(() => 'auto')
        .join(' ');
      return {
        'grid-template-columns': auto(['header', ...axisX]),
        // 'grid-template-rows': auto(axisX),
      };
    },
  },
};
