import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useAccountsStore = defineStore("accounts", () => {
  let accounts = ref<Array<Account>>([]);

  function addAccount(account: Account) {
    if (!account.title || !account.icon) {
      toast.error("Title/Icon can't be empty");
    } else if (!Number.isInteger(account.amount)) {
      toast.error("Amount must be a number!");
    } else {
      accounts.value.push(account);
      toast.success(`You add ${account.title}`);
      return true;
    }
  }

  function editAccount(account: Account) {
    if (!account.title || !account.icon) {
      toast.error("Title/Icon can't be empty");
    } else if (!Number.isInteger(+account.amount)) {
      toast.error("Amount must be a number!");
    } else {
      accounts.value.forEach((el) => {
        if (el.id === account.id) {
          el.id = account.id;
          el.title = account.title;
          el.amount = account.amount;
          el.background_color = account.background_color;
          el.icon = account.icon;
        }
      });
      toast.success(`You edit ${account.title}`);
      return true;
    }
  }

  function deleteAccount(id: number) {
    let account = accounts.value.find((item: Account) => item.id === id);
    if (account !== undefined) {
      let index = accounts.value.indexOf(account);
      accounts.value.splice(index, 1);
      toast.success(`You delete ${account?.title}`);
      return true;
    }
  }

  const getFullSum = computed(() =>
    accounts.value.reduce((acc, value) => acc + +value.amount, 0)
  );
  const getAccounts = computed(() => accounts.value);

  return { getAccounts, getFullSum, addAccount, editAccount, deleteAccount };
});
