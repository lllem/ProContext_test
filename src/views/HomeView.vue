<!-- eslint-disable -->
<template>
  <SidebarLayout class="home">

    <!-- sidebar -->
    <template v-slot:sidebar>
      <details
      v-for="list in lists"
      :key='list.title'
      class="mb"
      >
        <summary><p>{{ list.title }}</p></summary>

        <div
        v-for="item in list.uniqueItems"
        :key="item.color"
        class="mb"
        >
          <input type="checkbox" v-model="item.checked">
          <input type="color" v-model="item.color">
          <!-- <small>{{ item }}</small> -->
        </div>

        <!-- <small><pre>{{ list }}</pre></small> -->
      </details>
    </template>
    <!-- / sidebar -->

    <template v-slot:header>
      <MainNav/>
    </template>

    <!-- main -->
    <section class="p bg-light-3">
      <PlateEl
      v-for="(list, i) in lists"
      :key='list.title'
      class="mb"
      >
        <h2 class="mb">{{ list.title }}</h2>

        <div class="items-grid">

          <ItemEl
          class="item"
          v-for="(item, l) in list.items"
          :key="item"
          :color="item.color"
          v-model="item.checked"
          />

        </div>

      </PlateEl>
    </section>
    <!-- / main -->

  </SidebarLayout>
</template>

<!-- eslint-disable max-len -->
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      lists: [],
      colors: [
        '#cccc00', // hue-60
        '#52cc00', // hue-96
        '#00cc29', // hue-132
        '#00cca3', // hue-168
        '#007acc', // hue-204
        '#0000cc', // hue-240
        '#7a00cc', // hue-276
        '#cc00a3', // hue-312
        '#cc0029', // hue-348
        '#cc5200', // hue-384
      ],
    };
  },

  methods: {
    createLists() {
      // Создаём списки (чтобы не создавать их вручную)
      for (let listNumber = 0; listNumber < 5; listNumber += 1) {
        const title = `List ${listNumber + 1}`; // Название списка
        const items = []; // элементы списка
        const uniqueItems = this.createUniqueItemsList(); // список уникальных элементов

        const anotherList = {
          title,
          uniqueItems,
          items,
        };

        this.fillItemsList(anotherList);

        this.lists.push(anotherList);
      }
    },

    createUniqueItemsList() {
      const uniqueItemsList = [];

      // Заполняем массив с уникальными цветами
      for (let i = 0; i < this.colors.length; i += 1) {
        uniqueItemsList.push({
          color: this.colors[i],
          checked: false,
        });
      }

      // Оставляем 4-10 уникальных цветов
      for (let i = 0; i < 6; i += 1) {
        const colorIndex = Math.round(Math.random() * (uniqueItemsList.length - 1));
        if (Math.round(Math.random())) uniqueItemsList.splice(colorIndex, 1);
      }

      return uniqueItemsList;
    },

    fillItemsList(list) {
      // Заполняем список элементов
      for (let i = 0; i < list.uniqueItems.length; i += 1) {
        // list.items.push(list.uniqueItems[i]);
        for (let l = 0; l < 30; l += 1) {
          const randomIndex = Math.round(Math.random() * (list.items.length - 1)); // случайное место в массиве, куда будет добавлен элемент
          list.items.splice(randomIndex, 0, list.uniqueItems[i]);
        }
      }
    },
  },

  mounted() {
    this.createLists();
  },
};
</script>

<style lang="scss">
.items-grid {
  width: 100%;

  .item {
    margin: 0 0.25rem 0.25rem 0;
    float: left;
    transition: all 0.33s;
    position: relative;

    &:hover {
      transform: scale(1.1);
      z-index: 999;
    }
  }
}

details {
  padding: 0.5em 0;
  border-bottom: 1px solid #aaa;

  summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
    cursor: pointer;
    & > * {
      display: inline;
    }
  }

  &[open] {
    summary {
      margin-bottom: 0.5em;
    }
  }
}

input[type="color"] {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &::-webkit-color-swatch,
  &::-moz-color-swatch {
    border-radius: 0.25rem;
  }
}
</style>
