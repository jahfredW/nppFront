<template>
  <div id="loading">
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <p hidden>Chargement</p>
  </div>
</template>

<style>



#loading {
  display: grid;
  place-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  }


  
</style>

<script>
export default{
  name: 'LoadingCard',

}

</script>

