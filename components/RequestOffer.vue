<template>
  <div class="">
    <v-dialog v-model="mainDialog" max-width="290">
      <v-card class="my-card">
        <a href="#" class="close-icon" @click.prevent="mainDialog = false">
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

          <div class="relative custom-curr-input">
            <vs-input v-model="sell" label="Sell" placeholder="0.00" />
            <div class="input--addon">
              <div class="flex flex-none items-center">
                <span
                  class="block mr-1 rounded-circle bg-primary text-white text-center w-5 h-5"
                  >$</span
                ><span class="font-medium">USD</span>
              </div>
            </div>
          </div>
          <div class="relative custom-curr-input">
            <vs-input v-model="buy" label="Buy" placeholder="0.00" />
            <div class="input--addon">
              <div class="flex flex-none items-center">
                <span
                  class="block mr-1 rounded-circle bg-success text-white text-center w-5 h-5"
                  >₦</span
                ><span class="font-medium">NGN</span>
              </div>
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
          <vs-button color="#3063E9" @click="openDialog($event, 'offer')"
            >Continue <i class="iconly-Arrow-Right ml-2 icli"></i
          ></vs-button>
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
            >Continue <i class="iconly-Arrow-Right ml-2 icli"></i
          ></vs-button>
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
            <img src="/succcess.svg" alt="success check mark" />
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
export default {
  name: 'RequestOffer',
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
      buy: ''
    }
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
</style>
