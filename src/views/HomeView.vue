<!-- eslint-disable -->
<template>
  <SidebarLayout class="home">

    <!-- sidebar -->
    <template v-slot:sidebar>
      <details
      v-for="list in lists"
      :key='list.title'
      class="sidebar-spoiler"
      open
      >
        <summary>
          <p>{{ list.title }} <small class="muted ms-1">{{ `${ list.uniqueItems.length } / ${ list.items.length }` }}</small></p>

          <button @click="countItems(list)">{{ list.title }}</button>
        </summary>

        <div
        v-for="item in list.uniqueItems"
        :key="item.color"
        class="sidebar-spoiler__item mb-2"
        >
          <div class="sidebar-spoiler__item-subtitle">
            <input type="checkbox" v-model="item.checked">
            <input type="color" v-model="item.color">
            <small>{{ item.color }}</small>
          </div>

          <div class="counter">
            <button @click="changeQty(list, item, 'remove')" class="muted">−</button>
            <span class="counter__qty">{{ item.qty }}</span>
            <button @click="changeQty(list, item, 'add')" class="muted">+</button>
          </div>
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
        <details class="main-spoiler" open>
          <summary class="main-spoiler__header">
            <h2 class="mb main-spoiler__title">{{ list.title }}</h2>

            <label :for="`toggler__${list.title}`" class="main-spoiler__toggler">
              {{ list.sorted ? 'Перемешать' : 'Сортировать' }}
            </label>
            <input :id="`toggler__${list.title}`" class="d-none" type="checkbox" v-model="list.sorted">

          </summary>

          <!-- Сортированный список -->
          <div class="items-grid" v-if="list.sorted">
            <div v-for="uniqueItem in list.uniqueItems" :key="uniqueItem.color" class="inline-block w-100">
              <template
              v-for="item in list.items"
              :key="item"
              >
                <ItemEl
                class="item"
                :color="item.color"
                v-model="item.checked"
                v-if="uniqueItem.color === item.color"
                />
              </template>
            </div>

          </div>

          <!-- Перемешанный список -->
          <div class="items-grid" v-else>
            <ItemEl
            class="item"
            v-for="item in list.items"
            :key="item"
            :color="item.color"
            v-model="item.checked"
            />
          </div>
        </details>

      </PlateEl>
    </section>
    <!-- / main -->

  </SidebarLayout>
</template>

<!-- eslint-disable max-len, no-param-reassign -->
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

  computed: {
    listsChange() {
      return false;
    },
  },

  methods: {
    createLists() {
      // Создаём списки (чтобы не создавать их вручную)
      for (let listNumber = 0; listNumber < 5; listNumber += 1) {
        const title = `List ${listNumber + 1}`; // Название списка
        const items = []; // элементы списка
        const uniqueItems = this.createUniqueItemsList(); // список уникальных элементов
        const sorted = false; // сортированный/перемешанный список

        const anotherList = {
          title,
          sorted,
          uniqueItems,
          items,
        };

        this.fillItemsList(anotherList);

        this.countItems(anotherList);

        this.lists.push(anotherList);
      }
    },

    createUniqueItemsList() {
      const uniqueItemsList = [];

      // Заполняем массив с уникальными цветами
      this.colors.forEach((color) => {
        uniqueItemsList.push({
          color,
          checked: false,
        });
      });

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
        list.items.push(list.uniqueItems[i]); // Сразу добавляем элемент, чтобы был как минимум один элемент нужного цвета

        for (let l = 0; l < 30; l += 1) {
          const randomIndex = Math.round(Math.random() * (list.items.length - 1)); // случайное место в массиве, куда будет добавлен элемент
          if (Math.round(Math.random())) list.items.splice(randomIndex, 0, list.uniqueItems[i]);
        }
      }
    },

    checkboxesHandler(list) {
      console.log(list);
    },

    countItems(list) {
      // Считаем количество элементов для каждого цвета в списке
      list.uniqueItems.forEach((uniqueItem) => {
        const uuuu = list.items.filter((item) => item.color === uniqueItem.color);
        uniqueItem.qty = uuuu.length;
      });
    },

    changeQty(list, item, change) {
      // Добавляем/Удаляем элементы списка
      // console.log(list, item, change);
      if (change === 'add') {
        // Добавляем элемент в случайное место
        list.items.splice(Math.round(Math.random() * (list.items.length - 1)), 0, item);
      } else if (change === 'remove' && item.qty > 1) {
        const delIndex = list.items.findIndex((currentItem) => currentItem.color === item.color);
        list.items.splice(delIndex, 1);
        console.log(delIndex);
      }
      this.countItems(list);
    },
  },

  mounted() {
    this.createLists();
  },
};
</script>

<style lang="scss">
$blue: #0070ff;

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

details.sidebar-spoiler {
  padding: 0.5em 0;
  border-bottom: 1px solid #bdd0e9;
  border-top: 1px solid #fff;

  summary {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.25rem;
    position: relative;

    &::before {
      content: '+';
      position: absolute;
      left: 0;
      color: $blue;
    }

    cursor: pointer;
    & > * {
      display: inline;
    }
  }

  &[open] {
    summary {
      margin-bottom: 0.5em;

      &::before {
        content: '−';
      }
    }
  }

  .sidebar-spoiler__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sidebar-spoiler__item-subtitle {
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }
}

.main-spoiler {
  .main-spoiler__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .main-spoiler__title {
      cursor: pointer;
      color: $blue;
      border-bottom: 1px dashed $blue;
    }

    .main-spoiler__toggler {
      display: inline-block;
      background-color: #9ccff3;
      color: $blue;
      height: 2rem;
      border-radius: 1rem;
      cursor: pointer;
      padding: 0 1rem;
      line-height: 2rem;
      user-select: none;
      font-weight: 700;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
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

.counter {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: #fff;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: 0.8rem;
  border: 1px solid #b5cbe1;
  overflow: hidden;
  border-radius: 1rem;
  font-weight: bold;

  &, & * {
    position: relative;
  }

  & button {
    border: none;
    background-color: transparent;
    padding: 0 0.75rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 700;
    z-index: 1;
  }

  .counter__qty {
    padding: 0;
    margin: 0 -0.25rem;
  }
}
</style>
