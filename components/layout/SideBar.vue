<template>
  <vs-sidebar
    v-model="active"
    static-position
    hidden-background
    default-index="1"
    color="primary"
    class="sidebarx"
    spacer
  >
    <div slot="header" class="header-sidebar">
      <img src="/auth-logo.png" alt="" />
    </div>

    <vs-collapse accordion>
      <vs-collapse-item>
        <div slot="header">
          <div class="flex items-center">
            <vs-avatar
              src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
            />
            <div class="flex ml-2 flex-col text-sm">
              <span>Matthew Ero</span>
              <div class="text-gray-400 font-medium">
                <i class="iconly-Location icli"></i> <span>Nigeria</span>
              </div>
            </div>
          </div>
        </div>
        hey there
      </vs-collapse-item>
    </vs-collapse>

    <vs-sidebar-item index="1" icon-pack="icli" icon="iconly-Activity">
      <!--      <i class="iconly-Activity icli"></i>-->
      <span class="pl-2 block">Transactions</span>
    </vs-sidebar-item>

    <vs-divider icon="person" position="left"> User </vs-divider>

    <vs-sidebar-item index="2" icon-pack="icli" icon="iconly-Swap">
      <span class="pl-2 block">Exchange</span>
    </vs-sidebar-item>
    <vs-sidebar-item index="3" icon-pack="icli" icon="iconly-Time-Circle">
      <span class="pl-2 block">History</span>
    </vs-sidebar-item>

    <div slot="footer" class="footer-sidebar">
      <vs-sidebar-item index="4" icon="help_outline">
        <span class="block">Help Center</span>
      </vs-sidebar-item>
      <vs-sidebar-item index="5" icon-pack="icli" icon="iconly-Logout">
        <span class="pl-2 block">Logout</span>
      </vs-sidebar-item>
    </div>
  </vs-sidebar>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
.vs-content-sidebar.sidebarx {
  height: 100%;
  max-width: 260px;
  overflow-x: hidden;
  width: 100%;
}

.vs-sidebar {
  box-shadow: none;
}

.vs-sidebar--item a {
  padding-left: 30px !important;
}
.vs-sidebar {
  .vs-sidebar--header {
    padding-top: 20px;
    padding-left: 20px;
    border: none;
  }
  .vs-sidebar--items {
    max-width: 260px;
    overflow-x: hidden;
  }
}
.vs-sidebar.vs-sidebar-staticPosition {
  background: #e8e8f3;
}
.vs-sidebar--item {
  transition: 0.3s ease-in-out;
  position: relative;
  border-right: none !important;
  &:before {
    transition: 0.3s ease-in-out;
    content: '';
    background: rgba(var(--vs-primary), 1);
    position: absolute;
    top: 0;
    left: 20px;
    width: calc(100% - 20px);
    transform: translateX(100%);
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > a {
    transition: 0.3s ease-in-out;
    position: relative;
    i {
      font-size: 1.45rem !important;
    }
  }
  &:hover {
    &:before {
      transform: none;
    }
    & > a {
      color: #fafafa !important;
    }
  }
}
.vuesax-app-is-ltr .vs-sidebar-primary .vs-sidebar-item-active {
  border-right: none !important;
  &:before {
    transform: none;
  }
  & > a {
    color: #fafafa !important;
    font-weight: 400;
  }
}
</style>
