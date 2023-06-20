<script setup lang="ts">
import {onMounted, PropType, ref, unref, watch} from 'vue'
import {useNotesStore} from "@/stores/notes.store";

const modalData = ref<{ title: string, description: string }>({
  title: "",
  description: ""
})
const props = defineProps({
  noteData: Object as PropType<{ title: string, description: string }>,
})

// watch(props, ()=>{
//   console.log(props.noteData)
//   modalData.value.title modalData.value.description = ...props.noteData
// })


</script>

<template>
  <div>
    <div>
      <label for="title" class="block">
        Title
      </label>
      <input v-model="modalData.title" type="text" name="title" id="title" placeholder="Note Title" class="block border border-gray-300 p-2"/>
    </div>

    <div class="mt-5">
      <label for="description" class="block">
        Description
      </label>
      <input v-model="modalData.description" type="text" name="description" id="description" placeholder="Describe your note" class="block border border-gray-300 p-2"/>
    </div>

    <div class="mt-4 flex justify-end">
      <button class="bg-blue-500 rounded-md px-3 py-1 text-white" @click="useNotesStore().addNote(modalData)">Save</button>
    </div>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
