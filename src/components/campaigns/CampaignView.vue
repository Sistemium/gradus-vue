<template lang="pug">

.campaign-view

  .buttons
    // confirm-button.del(type="text" @confirm="delCampaign()" text="Удалить" size="mini")
    el-button.edit(@click="editCampaignClick()" size="mini" icon="el-icon-edit" circle)

  .fields
    .name(v-text="campaign.name")
    .period
      .date-b {{ campaign.dateB | ruDate }}
      .date-e {{ campaign.dateE | ruDate }}
    .comment-text(v-text="campaign.commentText" v-if="campaign.commentText")

  resize(:padding="30")
    .pictures()
      .thumbnail(
        v-for="picture in pictures"
        :key="picture.id"
      )
        img(:src="picture.thumbnailSrc" @click="campaignThumbnailClick(picture)")

</template>
<script>

const NAME = 'CampaignView';

export default {

  props: {
    campaign: Object,
    pictures: Array,
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

  name: NAME,
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
