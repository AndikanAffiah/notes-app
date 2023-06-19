<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useNotesStore} from "@/stores/notes.store";


const notes = ref<{title: string, description: string}[]>([])
onMounted(()=>{
  notes.value = useNotesStore().notes
})

const emits = defineEmits(["editNote"])

</script>

<template>
  <div class="grid grid-cols-3 gap-5">
    <div v-for="note in notes.reverse()" class="rounded w-56">
      <div class="w-full h-64 flex flex-col justify-between bg-green-200 rounded-lg border border-green-300 mb-6 py-5 px-4">
        <div>
          <h4 class="text-gray-800 font-bold mb-3">{{ note.title }}</h4>
          <p class="text-gray-800 text-sm">{{
              note.description
            }}</p>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p class="text-sm">March 28, 2020</p>
            <button
                @click="emits('editNote', note)"
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