<script setup lang="ts">
import {onMounted, PropType, ref, unref, watch} from 'vue'
import {useNotesStore} from "@/stores/notes.store";

const emits = defineEmits(["clearProps"])
const modalData = ref<{ title: string, description: string}>({
  title: "",
  description: ""
})
const props = defineProps({
  noteData: Object as unknown as PropType<{title: string, description: string}>,
  locationKey: {
    type: Number,
    default: 0
  }
})


watch(props, ()=>{
  modalData.value = ({...props.noteData}) as unknown as {title: string, description: string}
})

const handleSaveNote = () =>{
  if(props.noteData?.title === ""){
    if(modalData.value.title.length > 0 && modalData.value.description.length > 0){
      useNotesStore().addNote({...modalData.value})
      modalData.value = {
        title: "",
        description: ""
      }
      emits("clearProps")
    }
  }else{
    useNotesStore().updateNote({...modalData.value}, props.locationKey as Number)
    emits("clearProps")

  }

}

</script>

<template>
  <div class="flex justify-center mb-6">
    <div class="w-96">
      <div>
        <label for="title" class="block">
          Title
        </label>
        <input v-model="modalData.title" type="text" name="title" id="title" placeholder="Note Title" class="block border border-gray-300 p-2 w-96 rounded-lg"/>
      </div>

      <div class="mt-5">
        <label for="description" class="block">
          Description
        </label>
        <textarea v-model="modalData.description" type="text" name="description" id="description" placeholder="Describe your note" class="block border border-gray-300 p-2 w-96 rounded-lg"/>
      </div>

      <div class="mt-5 flex gap-2 items-center">
        <div>Counter: </div>
        <div>{{modalData.description.length}}</div>
      </div>

      <div class="mt-4 flex justify-end">
        <button class="bg-blue-500 rounded-md px-3 py-1 text-white" @click="handleSaveNote">
          <span v-if="props.noteData?.title === ''">Save</span>
          <span v-else>update</span>
        </button>
      </div>

    </div>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
