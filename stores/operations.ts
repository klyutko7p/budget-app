import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useAccountsStore } from "./accounts";

const toast = useToast();

export const useOperationsStore = defineStore("operations", () => {
  let operations = ref<Array<Operation>>([]);
  let storeAccounts = useAccountsStore();

  function addOperation(userOperation: Operation) {
    if (userOperation.amount === 0) {
      toast.error("Amount must be greater than zero");
      return false;
    }

    if (!userOperation.category._id) {
      toast.error("Choose a category");
      return false;
    }

    if (!userOperation.account.id) {
      toast.error("Choose a account");
      return false;
    }

    operations.value.push(userOperation);
    return true;
  }

  function editOperation(userOperation: Operation) {
    if (userOperation.amount === 0) {
      toast.error("Amount must be greater than zero");
      return false;
    }

    if (!userOperation.category._id) {
      toast.error("Choose a category");
      return false;
    }

    if (!userOperation.account.id) {
      toast.error("Choose a account");
      return false;
    }

    operations.value.forEach((operation) => {
      if (operation.id === userOperation.id) {
        operation.account = userOperation.account;
        operation.amount = userOperation.amount;
        operation.category = userOperation.category;
        operation.commentary = userOperation.commentary;
        operation.date = userOperation.date;
        operation.id = userOperation.id;
        operation.type = userOperation.type;
      }
    });
    return true;
  }

  function deleteOperation(id: number) {
    let operation = operations.value.find((item: Operation) => item.id === id);
    if (operation !== undefined) {
      let index = operations.value.indexOf(operation);
      operations.value.splice(index, 1);
      toast.error("You delete operation");
      return true;
    }
  }

  const getOperations = computed(() => operations.value);

  return { getOperations, addOperation, editOperation, deleteOperation };
});
