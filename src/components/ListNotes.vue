<script setup lang="ts">
import {onMounted, onUpdated, ref, watch} from 'vue'
import {useNotesStore} from "@/stores/notes.store";


const notes = ref<{title: string, description: string}[]>([])
onMounted(()=>{
  notes.value = [...useNotesStore().notes]
})
watch(useNotesStore().notes, ()=>{
  notes.value = [...useNotesStore().notes]
})

const emits = defineEmits(["editNote"])
const deleteNote = (key)=>{
  useNotesStore().deleteNote(key)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-5 h-96 overflow-y-scroll shadow-inner p-4 border">
    <div v-for="(note,key) in notes.reverse()" class="rounded w-56">
      <div class="w-full h-64 flex flex-col justify-between bg-green-200 rounded-lg border border-green-300 mb-6 py-5 px-4">
        <div>
          <h4 class="text-gray-800 font-bold mb-3">{{ note.title }}</h4>
          <p class="text-gray-800 text-sm">{{
              note.description
            }}</p>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p class="text-sm">
              <button @click="deleteNote(key)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19 5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"/></svg>
              </button>
            </p>
            <button
                @click="emits('editNote', {note:note,key:key})"
                class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black"
                    aria-label="edit note" role="button"
            >
              <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
