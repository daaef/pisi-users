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
    <RequestOffer @closeModal="dialog = false" :dialog="dialog" />
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
      sell: '',
      buy: '',
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
    .bottom--sect {
      border-radius: 10px;
      width: 100%;
      display: grid;
      grid-gap: 7px;

      .flex {
        flex: none !important;
      }
    }
  }
}
.custom-curr-input {
  position: relative;
  width: 100%;
  .vs-con-input-label {
    width: 100%;
  }
  .vs-input--input {
    padding-left: 62px;
  }
  .vs-input--placeholder {
    left: 57px;
  }
  .input--addon {
    background: #e8e8f3;
    position: absolute;
    padding-left: 5px;
    padding-right: 5px;
    bottom: calc(32.4375px / 2);
    height: 32.4375px;
    display: flex;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    align-items: center;
    transform: translateY(50%);
  }
}
.exchange-footer {
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  grid-gap: 10px;
}
</style>
