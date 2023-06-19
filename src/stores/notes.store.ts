import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotesStore = defineStore("notes-store", {
  state: () => {
    return {
      notes: [
        {
          title: "Note 1",
          description: "this is a note"
        },
        {
          title: "Note 2",
          description: "this is a note"
        },
        {
          title: "Note 3",
          description: "Our interior design experts work with you to create the space that you have been dreaming about. Our interior design experts work with you to create the space that you have been dreaming about."
        }
      ]
    }
  },
  actions: {},
  // persist: true,
});