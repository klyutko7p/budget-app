import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useAccountsStore = defineStore("accounts", () => {
  let accounts = ref<Array<Account>>([
    {
      id: 1,
      title: "Main",
      amount: 0,
      background_color: "#0096FF",
      icon: "ic:baseline-home",
    } as Account,
  ]);
  let accountCustomer = ref(accounts.value[0]);

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
      toast.warning(`You edit ${account.title}`);
      return true;
    }
  }

  function deleteAccount(id: number) {
    if (id === 1) {
      toast.error("You can't delete Main account");
    }

    if (id !== 1) {
      let account = accounts.value.find((item: Account) => item.id === id);
      if (account !== undefined) {
        let index = accounts.value.indexOf(account);
        accounts.value.splice(index, 1);
        toast.error(`You delete ${account?.title}`);
        return true;
      }
    }
  }

  function updateAccountCustomer(account: Account) {
    accountCustomer.value = account;
    console.log(accountCustomer);
  }

  const getFullSum = computed(() =>
    accounts.value.reduce((acc, value) => acc + +value.amount, 0)
  );
  const getAccounts = computed(() => accounts.value);
  const getAccountCustomer = computed(() => accountCustomer.value);

  return {
    getAccounts,
    getFullSum,
    getAccountCustomer,
    addAccount,
    editAccount,
    deleteAccount,
    updateAccountCustomer,
  };
});
