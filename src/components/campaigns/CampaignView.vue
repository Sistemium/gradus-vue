<template lang="pug">

.campaign-view

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
        img(:src="picture.thumbnailSrc")

</template>
<script>

const NAME = 'CampaignView';

export default {

  props: {
    campaign: Object,
    pictures: Array,
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

.thumbnail img {
  max-width: 170px;
  margin: $margin-top;
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

</style>
