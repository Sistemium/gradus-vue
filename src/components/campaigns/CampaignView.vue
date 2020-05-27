<template lang="pug">

.campaign-view

  .buttons
    slot(name="buttons")
      button-edit.edit(@click="editCampaignClick()")
      // confirm-button.del(type="text" @confirm="delCampaign()" text="Удалить" size="mini")

  .fields
    .name(v-text="campaign.name")
    .period
      .date-b {{ campaign.dateB | ruDate }}
      .date-e {{ campaign.dateE | ruDate }}
    .comment-text(v-text="campaign.commentText" v-if="campaign.commentText")

  resize(:padding="50")

    .actions
      campaign-action(v-for="action in actions" :action="action" :key="action.id")

    .pictures()
      .thumbnail(
        v-for="picture in pictures"
        :key="picture.id"
      )
        img(:src="picture.thumbnailSrc" @click="campaignThumbnailClick(picture)")

    slot(name="footer")

</template>
<script>

import Action from '@/models/Action';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';

const NAME = 'CampaignView';

export default {

  props: {
    campaign: Object,
    pictures: Array,
  },

  data() {
    return { actions: [] };
  },

  methods: {
    delCampaign() {
      this.$emit('removeCampaign', this.campaign);
    },
    editCampaignClick() {
      this.$emit('editCampaign', this.campaign);
    },
    campaignThumbnailClick(picture) {
      this.$emit('campaignPictureClick', picture);
    },
  },

  created() {
    this.$watch('campaign.actionIds', actionIds => {
      this.$bindToModelFilter(Action, { where: { id: { in: actionIds || [] } } }, 'actions');
    }, { immediate: true });
  },

  name: NAME,
  components: {
    CampaignAction,
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.pictures {
  margin-top: $margin-top;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.thumbnail {
  margin: $padding;
  border-radius: $border-radius;
  border: solid 1px $gray-border-color;

  &:hover {
    border-color: $blue;
  }

  img {
    max-width: 170px;
    margin: $margin-top;
    cursor: zoom-in;
  }
}

.name {
  font-size: large;
  font-weight: bold;
  white-space: pre-line;
}

.period {
  display: flex;

  .date-b:before {
    content: "с";
    margin-right: $padding;
  }

  .date-e:before {
    content: "по";
    margin: 0 $padding;
  }
}

.fields {
  > * + * {
    margin-top: $margin-top;
  }

  .comment-text:before {
    content: "ℹ️";
    margin-right: $padding;
  }
}

.buttons {
  float: right;
}

</style>
