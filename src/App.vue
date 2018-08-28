<template>
  <div id="app">
    <div class="row">
      <div class="input">
        <h3>Stringified JSON</h3>
        <textarea name="" id="" v-model="text" placeholder="Paste JSON String here"></textarea>
      </div>
      <div class="output">
        <h3>JSON PrettyPrint</h3>
        <pre v-highlightjs="sourcecode"><code class="json"></code></pre>
        <button v-clipboard="() => sourcecode"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 1024">
  <path fill="currentColor" d="M128 768h256v64H128v-64z m320-384H128v64h320v-64z m128 192V448L384 640l192 192V704h320V576H576z m-288-64H128v64h160v-64zM128 704h160v-64H128v64z m576 64h64v128c-1 18-7 33-19 45s-27 18-45 19H64c-35 0-64-29-64-64V192c0-35 29-64 64-64h192C256 57 313 0 384 0s128 57 128 128h192c35 0 64 29 64 64v320h-64V320H64v576h640V768zM128 256h512c0-35-29-64-64-64h-64c-35 0-64-29-64-64s-29-64-64-64-64 29-64 64-29 64-64 64h-64c-35 0-64 29-64 64z"/>
</svg></button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => {
    return {
      text : '',
    }
  },
  computed: {
    json: function() {
      let text = this.text.trim();
      if(!text) return;
      //parse twice if source is string string
      else if (text[0] === '"' && text[text.length-1] === '"'){
        // text = text.slice(1,-2);
        text = JSON.parse(text)
      }
      try{
        return JSON.parse(text)
      }
      catch (e) {
        return "Parse Error"
      }
    },
    sourcecode: function() { return this.json ? JSON.stringify(this.json, null, 2) : ''}
  },
}
</script>

<style lang="scss">
body, html{
  padding: 0;
  margin:0;
}
h3 {
  margin-top: 0;
  margin-bottom: .5em;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  background: #fafafa;
  min-height: 100vh;
  position: relative;
}
.row {
  display: flex;
  flex-direction: row;
  height: 500px;
  padding:10px;
  > .input, > .output{
    margin: 10px;
    padding: 10px;
    background: #eee;
    border-radius: 10px;
    flex:1;
    display: flex;
    flex-direction: column;
    max-width: 50%;
  }
  > .output {
    position: relative;
    button {
      position: absolute;
      top: 10px;
      right: 10px;
      border:none;
      background: transparent;
      &:hover{
        cursor: pointer;
        color: black;
      }
      &, &:active {
        color: grey
      }
      &:focus{
        outline: none
      }
    }
  }
}
pre{
  width: 100%;
  height: 100%;
  margin: 0;
  flex:1;
  overflow: scroll
}
textarea{
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  flex:1;
  overflow-y: scroll;
}
svg {
  width: 20px;
}
</style>
