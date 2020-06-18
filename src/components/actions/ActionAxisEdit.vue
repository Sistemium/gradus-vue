<template lang="pug">

el-drawer.action-axis-edit(
  :title="title"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  :style="{top: '40px'}"
  ref="drawer"
  size="450px"
  @closed="$emit('closed')"
)

  .content
    transition-group(name="list-complete" tag="div")
      .item(v-for="(item, idx) in model" :key="item.id")
        .title
          .reorder
            a(@click="reorder(idx, -1)" v-if="idx > 0")
              i.el-icon-arrow-up
            a(@click="reorder(idx, 1)" v-if="model.length > idx + 1")
              i.el-icon-arrow-down
          el-button(@click="deleteItem(idx)" size="mini" icon="el-icon-delete" circle)
          span {{ itemTitle }} №{{ idx + 1 }}
        action-required-form(:required="item")

    .buttons
      button-add(@click="addClick")
      label {{ itemTitle }}

  form-buttons(
    :loading="loading"
    :changed="changed"
    @deleteClick="deleteClick"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

</template>
<script>

import { v4 } from 'uuid';
import DrawerEditor from '@/lib/DrawerEditor';
import FormButtons from '@/lib/FormButtons.vue';
import ActionRequiredForm from '@/components/actions/ActionRequiredForm.vue';

const NAME = 'ActionAxisEdit';

export default {
  name: NAME,
  computed: {
    itemTitle() {
      return this.name === 'axisY' ? 'Строка' : 'Столбец';
    },
    title() {
      const ofName = this.name === 'axisY' ? 'строкам' : 'столбцам';
      return `Условие по ${ofName}`;
    },
  },
  methods: {
    deleteItem(idx) {
      this.model.splice(idx, 1);
    },
    addClick() {
      this.model.push({ id: v4() });
    },
    saveClick() {
      this.performOperation(() => {
        this.$emit('save', this.model);
      });
    },
    deleteClick() {
    },
    reorder(idx, dir) {
      const options = this.model;
      const option = options[idx];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= options.length) {
        return;
      }
      const option2 = options[newIdx];
      this.$set(options, newIdx, option);
      this.$set(options, idx, option2);
    },
  },
  created() {
    this.model = this.cloneDeep(this.axis);
  },
  components: {
    ActionRequiredForm,
    FormButtons,
  },
  mixins: [DrawerEditor],
  props: {
    axis: Array,
    name: String,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.content {
  padding: 0 $margin-right 80px;
}

.action-axis-edit /deep/ .el-drawer__body {
  overflow-y: scroll;
}

.item {
  > .title {
    background: $gray-background;
    padding: $padding $padding;
    align-items: center;
    display: flex;

    span {
      margin-left: $margin-right;
    }

    .reorder {
      flex: 1;

      a {
        padding: $padding/2;
      }
    }
  }

  .action-required-form {
    margin-top: $margin-top;
  }

  /deep/ h3.title {
    display: none;
  }
}

.item {
  transition: all 0.7s;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateX(50px) translateY(-30px);
}

.list-complete-leave-active {
  position: absolute;
}

</style>
