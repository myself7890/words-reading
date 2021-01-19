<template>
  <div class="home">
    <div v-if="!selectedList">
      <h1 v-for="list in lists">
        <button @click="selectList(list)" class="btn btn-default">{{ list.name }}</button>
      </h1>
    </div>
    <div v-else>
      <h1 v-if="seeAnswer">{{ currentWord.word }}</h1>
      <button v-if="!currentWord" class="btn" @click="start">Commencer</button>
      <div v-else>
        <button class="btn" v-if="!seeAnswer" @click="see">Voir le mot</button>
        <button class="btn" v-else @click="unsee">Cacher le mot</button>
        <br />
        <button class="btn" @click="replay">Rejouer</button>
        <br />
        <button class="btn" @click="next">Suivant</button>
      </div>
    </div>

  </div>
</template>

<style>
  .btn {
    width: 50%;
    height: 100px;
    background-color: #3A9A71;
    color: #2d3748;
    font-weight: bold;
    font-size: 24px;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { List } from '../models/List';
import axios    from "axios";
import * as _   from "lodash";
import {Word} from "@/models/Word";

@Component({
})

export default class WordsReader extends Vue {
  private   lists:  Array<List>     = [];
  private   selectedList: List|null = null;
  private   playlist: Array<Word>   = [];
  private   currentWord: Word|null  = null;
  private   seeAnswer:  boolean     = false;

  beforeMount() {
    axios.get('https://listes-mots.s3.amazonaws.com/lists.json').then(response => {
      _.forEach(response.data.lists, (list) => {
        axios.get("https://listes-mots.s3.amazonaws.com/"+list.path).then(listResponse => {
          let words = Array<Word>();

          _.forEach(listResponse.data.words, (soundPath: string, word: string) => {
            words.push(new Word(word, soundPath));
          })

          this.lists.push(new List(list.name, words));
        })
      })
    })
  }

  selectList(list: List) {
    this.selectedList = list;

    _.forEach(list.words, (word) => {
      this.playlist.push(word)
    })
  }

  start() {
    this.currentWord = this.playlist.pop() as Word;
    this.currentWord.play();
  }

  replay() {
    this.currentWord.play();
  }

  next() {
    this.seeAnswer = false;
    this.currentWord = this.playlist.pop() as Word;
    this.currentWord.play();
  }

  see() {
    this.seeAnswer = true;
  }

  unsee() {
    this.seeAnswer = false;
  }
}

</script>
