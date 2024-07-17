import { ref } from "vue";

const isLoading = ref(false);
export function useLoading() {
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return { isLoading, setLoading };
}
