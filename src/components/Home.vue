<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>

    <StackLayout>
      <TextField v-model="input.desc" />
      <Button class="btn btn-primary" @tap="save">Add</Button>
      <Button class="btn btn-danger" @tap="clearDb">CLean</Button>
      <ListView for="item in $store.state.data">
        <v-template>
          <Label :text="item.desc" />
        </v-template>
      </ListView>
    </StackLayout>

  </Page>
</template>
<script>
export default {
  data() {
      return {
          input: {
              desc: ""
          }
      }
  },
  created(){
    
  },
  methods: {
      save() {
          this.$store.dispatch("insert", this.input);
          this.$router.push('/home')
          this.load()
          this.clear()
      },
      load() {
          this.$store.dispatch("query");
      },
      clear() {
          this.input.desc = "";
      },
      clearDb(){
        this.$store.dispatch("delete");
      }
  }
}
</script>
