<script setup lang="ts">
import ListNotes from "@/components/ListNotes.vue";
import CreateNote from "@/components/CreateNote.vue";
import {ref} from "vue";

const noteData = ref({})
const showForm = (note) => {
  noteData.value = note;
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="flex gap-4">
      <CreateNote :note-data="noteData"/>
      <ListNotes @edit-note="showForm"/>
    </div>
  </div>
</template>

<style scoped>

</style>
