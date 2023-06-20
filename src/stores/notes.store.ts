import {defineStore} from 'pinia'

export const useNotesStore = defineStore("notes-store", {
  state: () => {
    return {
      notes: <{ title: string, description: string}[]>[]
    }
  },
  actions: {
    addNote(note: { title: string, description: string}){
      if(note.title.length > 0 && note.description.length > 0){
        this.notes.push(note);
      }
    },
    updateNote(note:{ title: string, description: string}, key:number){
      this.notes = this.notes.reverse().map((noteitem:{ title: string, description: string}, index:number)=>{
        if(index === key){
          noteitem.title =  note.title
          noteitem.description = note.description
        }
        return noteitem
      }).reverse()
    },
    deleteNote(key: number){
      this.notes = this.notes.reverse().filter((noteItem, index) => index != key)
    }
  },
  persist: true,
});