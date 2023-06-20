import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotesStore = defineStore("notes-store", {
  state: () => {
    return {
      notes: <{title: string, description: string}[]>[]
    }
  },
  actions: {
    addNote(note: {title: string, description: string}){
      this.notes.push(note)
    }
  },
  persist: true,
});