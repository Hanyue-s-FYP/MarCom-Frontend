import { ToastType, type Toast } from "@/types/Toasts";
import { ref, type Ref } from "vue";

let currentToastID = 0; // very simple id system jiu can d
const toasts: Ref<Toast[]> = ref([]);
export function useToasts() {
  const makeToast = (msg: string, type: ToastType = ToastType.OK) => {
    toasts.value.unshift({
      id: currentToastID,
      message: msg,
      type,
    });
    currentToastID++;
  };

  const removeToast = (t: Toast) => {
    toasts.value = toasts.value.filter((el) => el.id !== t.id);
    if (toasts.value.length) currentToastID = 0; // can reset le no more toast there
  };

  return { toasts, makeToast, removeToast };
}
