<template>
  <div class="dashboard--container">
    <div class="dashboard-view">
      <h4 class="font-bold text-xl">Exchange</h4>
      <div class="stack--container mb-6">
        <div class="main--stack">
          <div class="exchange--inputs">
            <div class="relative custom-input">
              <vs-input
                v-model="send"
                label="Send"
                type="number"
                placeholder="0.00"
              />
              <vs-dropdown vs-trigger-click vs-custom-content>
                <a class="a-icon flex items-center" href="#">
                  <img
                    class="mr-1"
                    :src="`/cryptocoins/${currentCoin.icon}.svg`"
                    alt=""
                  />
                  {{ currentCoin.name }}
                  <vs-icon class="" icon="expand_more"></vs-icon>
                </a>

                <vs-dropdown-menu>
                  <vs-dropdown-item
                    v-for="(coin, i) in coins"
                    :key="i"
                    class="coin--select"
                    @click.prevent="activeCoin($event, coin)"
                  >
                    <span class="flex items-center mr-5">
                      <img
                        class="mr-2"
                        :src="`/cryptocoins/${coin.icon}.svg`"
                        alt=""
                      />
                      {{ coin.name }}
                    </span>
                    <span>{{ coin.coin }}</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <img class="mt-5 mx-3" src="/exchange.svg" alt="" />
            <CustomDropdown :drop-data="options1" />
            <vs-button
              class="mt-4 ml-5"
              type="filled"
              icon="iconly-Search"
              icon-pack="icli"
              >Search</vs-button
            >
          </div>
          <div class="rates-text flex text-sm">
            <span class="bold mr-1 text-gray-400">Official rate:</span>
            <span class="font-bold">1 BTC = 433.72 NGN</span>
          </div>
        </div>
      </div>
      <div class="table">
        <vs-table
          v-model="selected"
          :data="payments"
          @selected="handleSelected"
        >
          <template slot="header">
            <h3>Users</h3>
          </template>
          <template slot="thead">
            <vs-th> Price </vs-th>
            <vs-th> Sender </vs-th>
            <vs-th> Rate </vs-th>
            <vs-th />
          </template>

          <template slot-scope="{ data }">
            <vs-tr v-for="(tr, indextr) in data" :key="indextr" :data="tr">
              <vs-td :data="data[indextr].amount">
                <div class="flex rate--country">
                  <span class="fi fi-ng text-2xl rounded-circle fis"></span>
                  <div class="flex ml-2 font-medium flex-col">
                    <span>{{ data[indextr].country }}</span>
                    <span> {{ data[indextr].amount }}</span>
                  </div>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].name">
                {{ data[indextr].name }}
              </vs-td>

              <vs-td :data="data[indextr].rate">
                {{ data[indextr].rate }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                <div class="flex justify-end">
                  <vs-button
                    v-if="data[indextr].payState.trim() === 'Waiting...'"
                    color="primary"
                    type="border"
                    >{{ data[indextr].payState }}</vs-button
                  >
                  <vs-button
                    v-if="data[indextr].payState.trim() === 'Request'"
                    color="primary"
                    @click="dialog = true"
                    >{{ data[indextr].payState }}</vs-button
                  >
                  <vs-button
                    v-if="data[indextr].payState.trim() === 'Paid'"
                    color="rgb(5 168 84 / 40%)"
                    text-color="#0a0a0a"
                    >{{ data[indextr].payState }}</vs-button
                  >
                </div>

                <!--                <div class="flex justify-end">
                  <vs-button v-if="data[indextr].payState.trim() === 'Request'">
                    {{ data[indextr].payState }}
                  </vs-button>
                  <vs-button
                    v-if="data[indextr].payState.trim() === 'Waiting...'"
                    type="border"
                  >
                    {{ data[indextr].payState }}
                  </vs-button>
                  <vs-button
                    v-if="data[indextr].payState.trim() === 'Paid'"
                    color="success"
                  >
                    {{ data[indextr].payState }}
                  </vs-button>
                </div>-->
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="my-card">
        <a href="#" class="close-icon">
          <vs-icon color="primary" size="medium" icon="close"></vs-icon>
        </a>
        <v-card-text>
          <div class="top--sect bg-secondary p-3">
            <div class="flex justify-between w-full">
              <span class="text-gray-500">
                <i class="iconly-Upload icli"></i>
                Sell
              </span>
              <span class="text-gray-500">
                <i class="iconly-Download icli"></i>
                Buy
              </span>
            </div>
            <div class="px-3 flex items-center justify-between w-full">
              <div class="flex flex-none items-center">
                <span
                  class="block mr-1 rounded-circle bg-primary text-white text-center w-5 h-5"
                  >$</span
                ><span class="font-medium">USD</span>
              </div>
              <div>
                <img src="/transfer--arrows.png" alt="" />
              </div>
              <div class="flex flex-none items-center">
                <span
                  class="block mr-1 rounded-circle bg-success text-white text-center w-5 h-5"
                  >₦</span
                ><span class="font-medium">NGN</span>
              </div>
            </div>
            <div class="flex justify-between w-full">
              <span class="text-primary">$230.00</span>
              <span class="text-success">₦63,634.92.00</span>
            </div>
            <hr />
            <div class="flex text-gray-500 justify-between w-full">
              <span>Official rate</span>
              <span class="font-medium">$1 = ₦433.72</span>
            </div>
          </div>
          <span class="text-center w-full"
            >Input the amount you would like to buy</span
          >
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Continue
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardView',
  data() {
    return {
      send: '',
      receive: '',
      dialog: false,
      selected: [],
      currentCoin: {
        id: 1,
        coin: 'Bitcoin',
        name: 'BTC',
        icon: 'btc',
        selected: false
      },
      select1: 3,
      options1: [
        { text: 'NGN', value: 0 },
        { text: 'USD', value: 2 },
        { text: 'GBP', value: 3 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      coins: 'coins',
      users: 'users',
      payments: 'payments'
    })
  },
  mounted() {},
  methods: {
    activeCoin(_, coin) {
      this.currentCoin = coin
    },
    handleSelected() {
      this.users.forEach((user) => (user.active = false))
    },
    resetActiveState() {
      this.users.forEach((user) => (user.active = false))
    },
    async getUsers() {
      await this.$store
        .dispatch('getUsers', {
          createdAtDateStart: '2022-10-19'
        })
        .then((resp) => console.log('resp is', resp))
        .catch((err) => console.log('error', err))
    }
  }
}
</script>
<style lang="scss">
.dashboard--container {
  min-height: calc(100vh - 71.008px);
  width: 100%;
  padding: 15px 30px;
  .stack--container {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(180deg, #4b48dc 0%, #d048dc 100%);
      border-radius: 15px;
      transform: scale(0.95) translateY(8px);
    }
    .main--stack {
      position: relative;
      background: #e8e8f3;
      padding: 20px;
      width: 100%;
      border-radius: 15px;
      margin-top: 15px;
      .rates-text {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
  .vs-select--label {
    font-weight: bold;
  }
  .vs-component {
    label {
      font-weight: bold;
    }
    .vs-inputx {
      border: none !important;
      background: #eeeeee;
    }
  }
  .vs-select--input {
    border: none !important;
    background: #eeeeee;
  }
  .custom-input {
    .vs-input--input.normal {
      padding-left: 92px;
    }
    .con-select {
      width: 100px;
    }
    .input-span-placeholder {
      left: 92px;
      //height: 32.17px;
      bottom: 0;
      top: 0;
      font-size: 1rem;
      padding-left: 0;
    }
    .vs-con-dropdown {
      position: absolute;
      bottom: calc(32.17px / 2);
      transform: translateY(50%);
      left: 5px;
    }
    .vs-select--input {
    }
    .vs-select--input {
      padding-left: 25px;
    }
    .flag {
      position: absolute;
      bottom: calc(36.17px / 2);
      transform: translateY(50%);
      left: 5px;
    }
  }
  .table {
    width: 100%;
    .rate--country {
      .fi {
        height: 35px;
        width: 35px;
      }
    }
  }
}
.cf-btc {
  color: #f39321;
}
a.vs-dropdown--item-link {
  display: flex !important;
  align-items: center;
}
.con-vs-dropdown--menu {
  z-index: 400000 !important;
}
.exchange--inputs {
  display: flex;
  align-items: center;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.my-card {
  .v-card__text {
    padding-top: 50px !important;
    display: grid;
    grid-gap: 15px;
    .top--sect {
      border-radius: 10px;
      width: 100%;
      display: grid;
      grid-gap: 7px;
      .flex {
        flex: none !important;
      }
      img {
        height: 10px;
      }
      hr {
        border-top: solid 1px #2936ac;
      }
    }
  }
}
</style>
