<template lang="pug">

.action-option(:class="{ grid: isGrid, 'no-ranges': !showRanges }")

  .self(v-if="hasSelfRow")
    .name(v-if="name") {{ name }}
    .range(v-for="range in ranges") {{ range.name }}

  template(v-if="showConditions")
    .action-required(
      v-for="req in ownRequirements"
      :class="req.cls"
      :style="requiredStyle"
      v-html="req.value || '-'"
      v-if="!hasOptionRequirements(req.cls)"
    )

    .discount(
      v-if="!showOptions"
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ discount && discount[discountHeader.cls] || '-' }}

  template(v-if="showOptions" v-for="(option, idx) in action.options")
    .option
      .name(v-if="option.name") {{ option.name }}
      template(v-if="option.ranges")
        .range(v-for="range in option.ranges") {{ range.name }}
      .comment(v-if="option.commentText")
        i.el-icon-info
        span {{ option.commentText }}
    .option-required(
      v-for="req in optionRequirements(option)" :key="`${req.cls}${idx}`"
      v-if="!ownRequirements.length || hasOptionRequirements(req.cls)"
      :class="req.cls"
      v-html="req.value || '-'"
    )
    .discount(
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ option[discountHeader.name] || action[discountHeader.name] || '-' }}

  .discount-matrix(v-if="action.discountMatrix")
    discount-matrix-info(:discount-matrix="action.discountMatrix")
    .optional(v-if="!showOptions && action.options.length")
      .option(v-for="option in action.options" :key="option.id")
        .name(v-if="option.name") {{ option.name }}
        template(v-if="option.ranges")
          .range(v-for="range in option.ranges") {{ range.name }}
        .comment(v-if="option.commentText")
          i.el-icon-info
          span {{ option.commentText }}

  .comment(v-if="action.commentText && showRanges")
    i.el-icon-info
    span {{ action.commentText }}


</template>
<script>

import DiscountMatrixInfo from '@/components/actions/DiscountMatrixInfo.vue';
import actionBase from './actionBase';
import ActionRequired from './ActionRequired.vue';
import ActionDiscount from './ActionDiscount.vue';

const NAME = 'ActionOption';

export default {

  name: NAME,
  components: {
    DiscountMatrixInfo,
    ActionDiscount,
    ActionRequired,
  },
  computed: {

    name() {
      const { action } = this;
      return action.name;
    },

    ranges() {
      const { parent, action } = this;
      return action.ranges && action.ranges.length ? action.ranges : (parent && parent.ranges);
    },

    showOptions() {
      return this.hasOptions && !(this.ranges && this.ranges.length);
    },

    requiredStyle() {
      return this.showOptions && {
        'grid-row-start': this.hasSelfRow ? 2 : 1,
        'grid-row-end': `span ${this.action.options.length}`,
      };
    },
    discountHeaders() {
      return [
        {
          title: '% комп.',
          name: 'discountComp',
          cls: 'comp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
          cls: 'own',
        },
      ];
    },
    hasSelfRow() {
      const { ranges, name, showRanges } = this;
      return (name || (ranges && ranges.length)) && showRanges;
    },
  },
  mixins: [actionBase],
  props: {
    showConditions: {
      type: Boolean,
      default: false,
    },
    showRanges: {
      type: Boolean,
      default: true,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

.range {
  text-align: left;
}

.action-option {
  text-align: left;
}

.action-option.grid {

  display: grid;
  gap: 1px;
  grid-template-columns: auto 89px 59px 89px 89px;
  background: $gray-border-color;

  @media print {
    grid-template-columns: auto 89px 39px 59px 59px;
    background: $table-border-color;
  }

  > .action-option {
    grid-column: 1 / span 5;
  }

  &.no-ranges {
    grid-template-columns: auto 88px 59px 89px 89px;
    @media print {
      grid-template-columns: auto 88px 39px 59px 59px;
    }
    .volume {
      grid-column: 1 / span 2;
    }
  }

}

.option {
  grid-column: 1;
}

.volume {
  grid-column: 2;
}

.sku {
  grid-column: 3;
}

.action-option > .action-required {
  grid-row-start: 1;
}

.comp {
  grid-column: 4;
}

.own {
  grid-column: 5;
}

.discount, .action-required, .option, .option-required {
  text-align: center;
  background: white;
  padding: $padding;
  @media print {
    padding: $padding-print;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  white-space: pre-line;
}

.option, .ranges {
  align-items: flex-start;

  > * + * {
    margin-top: $margin-top-small;
    @media print {
      margin-top: $margin-top-small-print;
    }
  }
}

.option {
  // align-items: stretch;
}

.self, .action-option > .comment {

  grid-column: 1;

  background: white;
  padding: $padding;

  @media print {
    padding: $padding-print;
  }

  > * + * {
    margin-top: $margin-top-small;
    @media print {
      margin-top: $margin-top-small-print;
    }
  }
}

.action-option > .comment {
  grid-column-end: 6;
}

.action-option, .option {
  > .comment {
    background: $light-green;
  }
}

.name {
  font-weight: bold;
  text-align: left;
}

.discount-matrix {
  padding: $margin-top;
  grid-column: 1 / span 5;
  background: white;
  display: flex;

  @media print {
    padding: $margin-top-print;
  }

  .discount-matrix-info {
    // margin: 0 auto 0 0;
    // min-width: 0;
    // width: auto;
  }

  > * + * {
    margin-left: $margin-top;
    @media print {
      margin-left: $margin-top-print;
    }
  }

  .optional > .option {
    padding: 0;
  }

}

.comment {
  text-align: left;
}

</style>
