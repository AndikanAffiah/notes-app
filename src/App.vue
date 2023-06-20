<script setup lang="ts">
import ListNotes from "@/components/ListNotes.vue";
import CreateNote from "@/components/CreateNote.vue";
import {ref} from "vue";

const noteData = ref<{ title: string, description: string}>({ title: "", description: ""})
const locationKey = ref<Number>(0)
const showForm = (note) => {
  noteData.value = note.note;
  locationKey.value = note.key
}
const handleClearProps = () => {
  noteData.value = { title: "", description: ""};
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div>
      <CreateNote :note-data="noteData" :location-key="locationKey" @clear-props="handleClearProps"/>
      <ListNotes @edit-note="showForm"/>
    </div>
  </div>
</template>

<style scoped>

</style>
