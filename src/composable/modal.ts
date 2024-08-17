import { ref } from "vue";

export function useModal(initialState: boolean = false) {
  const isOpen = ref(initialState);
  const openModal = () => (isOpen.value = true);
  const closeModal = () => (isOpen.value = false);

  return { isOpen, openModal, closeModal };
}
