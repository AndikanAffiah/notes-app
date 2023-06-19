<script setup lang="ts">
import ListNotes from "@/components/ListNotes.vue";
import CreateNote from "@/components/CreateNote.vue";
const showForm = (note) => {
  console.log(note)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="flex gap-4">
      <CreateNote msg="heehehe"/>
      <ListNotes @edit-note="showForm"/>

    </div>
  </div>
</template>

<style scoped>

</style>
