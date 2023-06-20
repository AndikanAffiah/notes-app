<script setup lang="ts">
import {onMounted, onUpdated, ref, watch} from 'vue'
import {useNotesStore} from "@/stores/notes.store";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
const isOpen = ref(false)

const itemKey = ref<number>(0);
function closeModal() {
  isOpen.value = false
}
function openModal(key:number) {
  isOpen.value = true
  itemKey.value = key
}

const notes = ref<{title: string, description: string}[]>([])
onMounted(()=>{
  notes.value = [...useNotesStore().notes].reverse()
})
watch(useNotesStore(), ()=>{
  notes.value = [...useNotesStore().notes].reverse()
})

const emits = defineEmits(["editNote"])
const handleConfirmDelete = () => {
  useNotesStore().deleteNote(itemKey.value)
  closeModal();
}

</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 h-[530px] overflow-y-scroll shadow-inner p-4 border">
    <div v-for="(note,key) in notes" class="rounded sm:w-56 card">
      <div class="w-full h-64 flex flex-col justify-between bg-green-200 rounded-lg border border-green-300 mb-6 py-5 px-4">
        <div>
          <h4 class="text-gray-800 font-bold mb-3">{{ note.title }}</h4>
          <p class="text-gray-800 text-sm h-40 overflow-y-hidden overflow-ellipsis">{{
              note.description
            }}</p>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p class="text-sm">
              <button @click="openModal(key)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19 5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"/></svg>
              </button>
              <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                  <TransitionChild
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                  >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                  </TransitionChild>

                  <div class="fixed inset-0 overflow-y-auto">
                    <div
                        class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                      <TransitionChild
                          as="template"
                          enter="duration-300 ease-out"
                          enter-from="opacity-0 scale-95"
                          enter-to="opacity-100 scale-100"
                          leave="duration-200 ease-in"
                          leave-from="opacity-100 scale-100"
                          leave-to="opacity-0 scale-95"
                      >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <DialogTitle
                              as="h3"
                              class="text-lg font-medium leading-6 text-gray-900"
                          >
                            Delete Note
                          </DialogTitle>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                              Are you sure you wan to delete this note?
                            </p>
                          </div>

                          <div class="mt-4 flex justify-between">
                            <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                @click="closeModal()"
                            >
                              Cancel
                            </button>
                            <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                @click="handleConfirmDelete(key)"
                            >
                              Confirm
                            </button>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
            </p>
            <button
                @click="emits('editNote', {note:note,key:key})"
                class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300 focus:ring-black cardHover"
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
.card:hover .cardHover{
  display: flex;
}
.card .cardHover{
  display: none;
}
</style>
