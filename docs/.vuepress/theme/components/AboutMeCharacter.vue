<script setup>

</script>

<template>
<div class="about-me-card-bg vp-blog-post-item about-me-character">
  <p class="about-me-card-title-normal">性格</p>
  <div class="about-me-character-content">
    <div class="about-me-character-type">
      <p class="about-me-card-text-big about-me-card-text-color">建筑师</p>
      <p class="about-me-card-text-big">INTJ-A</p>
    </div>
    <div class="about-me-character-img">
    </div>
  </div>

</div>
</template>

<style scoped>
.about-me-character{
  padding: 20px;
  &:hover .about-me-character-img{
    transform: scale(1.1);
  }
}

.about-me-character-content{
  display: flex;
}

.about-me-character-type{
  width: fit-content;
}

.about-me-character-img{
  display: flex;
  align-items: end;
  position: relative;
  flex: 1;
  transition: transform 1s;
  width: fit-content;
  min-height: 110px;
  background-image: url("/INTJ-A.png");
  background-position: right bottom;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
