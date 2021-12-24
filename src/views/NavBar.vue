<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          QVRMS QUE
        </vs-navbar-title>
      </div>

    </vs-navbar>
  </div>
</template>
<script>
export default {
name: 'navbar',
  data:()=>({
    activeItem: 0
  })
}
</script>