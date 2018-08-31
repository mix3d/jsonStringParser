<template>
  <div id="app">
    <header>
      <h2>JSON String Parser / Prettifier</h2>
      <p>Paste your stringified JSON object and it gets parsed and displayed.</p>
    </header>
    <div class="row">
      <div class="input">
        <h3>Stringified JSON</h3>
        <textarea name="" id="" v-model="text" placeholder="Paste JSON String here"></textarea>
      </div>
      <div class="output">
        <h3>JSON PrettyPrint</h3>
        <pre v-highlightjs="sourcecode"><code class="json"></code></pre>
        <button v-clipboard="() => sourcecode" @click="$popup({message: 'Copied!'})"><save-icon></save-icon></button>
        <div class="center">
          <label for="spaces">Space Formatting:</label>
          <select v-model="spaces" id="spaces">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="tab">tabs</option>
          </select>
        </div>
      </div>
    </div>
    <vue-up></vue-up>
  </div>
</template>

<script>
import 'highlight.js/styles/googlecode.css'

import saveIcon from './components/SaveIcon';

// function SelectAll(id)
// {
//     document.getElementById(id).focus();
//     document.getElementById(id).select();
// }

export default {
  name: 'app',
  data: () => {
    return {
      text : '',
      spaces: 2,
    }
  },
  computed: {
    json: function() {
      let text = this.text.trim();
      if(!text) return;
      //parse twice if source is string string
      else if (text[0] === '"' && text[text.length-1] === '"'){
        // text = text.slice(1,-2);
        try{
          text = JSON.parse(text)
        }
        catch(e) {
          // just continue
        }
      }
      try{
        return JSON.parse(text)
      }
      catch (e) {
        return "Parse Error"
      }
    },
    sourcecode: function() {
      let space = this.spaces === "tab" ? "\t" : Number(this.spaces)
      return this.json ? JSON.stringify(this.json, null, space) : ''
    }
  },
  components: {
    saveIcon,
  }
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
  svg { width: 20px; }
  // flow-root creates a new block context, prevents H1 / P tag's margin collapse & messing up layout.
  // Only supported by Chrome and FF though...so overflow:auto is the hack for the other browsers!
  header { display: flow-root; padding: 0 20px; overflow:auto; }
  select { display: inline-block; }
  label { font-size: smaller; }

  // hide the background if applied from whatever code style is used
  .hljs{
    background: none;
  }
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
.center {
  text-align: center;
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
  resize: none;
}
</style>
