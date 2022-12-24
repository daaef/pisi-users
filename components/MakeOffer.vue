<template>
  <div class="">
    <v-dialog v-model="mainDialog" max-width="290">
      <v-card class="my-card">
        <a href="#" class="close-icon" @click.prevent="mainDialog = false">
          <vs-icon color="primary" size="medium" icon="close"></vs-icon>
        </a>
        <v-card-text>
          <div class="relative custom-input custom-colored">
            <vs-input
              v-model="sell"
              label="Sell"
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
          <div class="relative custom-input custom-colored">
            <vs-input
              v-model="buy"
              label="Buy"
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
          <div class="relative input--rate">
            <vs-input
              class="absolute"
              v-model="buy"
              label="Rate"
              type="number"
              placeholder="0.00"
            />
            <div class="input-styled">
              <span class="text-gray-400">$1</span>
              <span class="text-primary large-text">=</span>
              <span>₦700.00</span>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="exchange-footer">
          <vs-button color="#3063E9" @click="openDialog($event, 'offer')"
            >Continue</vs-button
          >
          <vs-button
            color="#E8E8F3"
            text-color="black"
            @click="mainDialog = false"
            >Close</vs-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="offerDialog" max-width="290">
      <v-card class="my-card">
        <a href="#" class="close-icon" @click.prevent="offerDialog = false">
          <vs-icon color="primary" size="medium" icon="close"></vs-icon>
        </a>
        <v-card-text>
          <div class="top--sect bg-secondary p-3">
            <div class="flex justify-between w-full">
              <span class="text-black"> Amount payable </span>
              <span class="text-primary text-lg"> $200 </span>
            </div>
          </div>

          <div class="bottom--sect bg-secondary p-3">
            <div class="flex justify-between w-full">
              <span class="text-gray-500"> Account name: </span>
              <span class="text-black font-medium text-lg"> John Joe </span>
            </div>
            <div class="flex justify-between w-full">
              <span class="text-gray-500"> Account number: </span>
              <span class="text-primary font-medium text-lg"> 123456789 </span>
            </div>
            <div class="flex justify-between w-full">
              <span class="text-gray-500"> Bank: </span>
              <span class="text-black font-medium text-lg">
                First Bank of Nigeria
              </span>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="exchange-footer">
          <vs-button color="#3063E9" @click="openDialog($event, 'finish')"
            >Continue</vs-button
          >
          <vs-button
            color="#E8E8F3"
            text-color="black"
            @click="offerDialog = false"
            >Close</vs-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="finDialog" max-width="290">
      <v-card class="my-card">
        <a href="#" class="close-icon" @click.prevent="finDialog = false">
          <vs-icon color="primary" size="medium" icon="close"></vs-icon>
        </a>
        <v-card-text class="success-dialog">
          <div
            class="pb-4 flex flex-col items-center justify-center text-center"
          >
            <img src="/check.svg" alt="success check mark" />
            <div class="message">
              <h3 class="text-primary text-lg my-2">Payment successful</h3>
              <p>
                You will recieve your token once your payment has been confirmed
                by the 2nd party.
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MakeOffer',
  props: {
    dialog: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      offerDialog: false,
      mainDialog: false,
      finDialog: false,
      sell: '',
      buy: '',
      currentCoin: {
        id: 1,
        coin: 'Bitcoin',
        name: 'BTC',
        icon: 'btc',
        selected: false
      }
    }
  },
  computed: {
    ...mapGetters({
      coins: 'coins',
      users: 'users',
      payments: 'payments'
    })
  },
  watch: {
    dialog(val) {
      this.mainDialog = this.dialog
    },
    mainDialog(val) {
      if (val === false) {
        this.$emit('closeModal')
      }
    }
  },
  methods: {
    openDialog(_, type) {
      if (type === 'offer') {
        this.mainDialog = false
        this.offerDialog = true
      } else {
        this.offerDialog = false
        this.finDialog = true
      }
    }
  }
}
</script>

<style lang="scss">
.success-dialog {
  img {
    height: 60px;
    width: 60px;
  }
}
.input-styled {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e8e8f3;
  padding: 5px;
  height: 32.475px;
  border-radius: 5px;
  span {
    font-size: 1.1rem;
    font-weight: 500;
    &:not(.text-primary, .text-gray-400) {
      color: #202020;
    }
    &.large-text {
      font-size: 1.6rem;
    }
  }
}
.input--rate {
  .vs-con-input-label {
    width: 100%;
    position: absolute;
  }
}
</style>
