<script setup>
import { ref, watch, onMounted } from "vue";
import { initFlowbite } from "flowbite";
// import { NavBar } from "./components/NavBar.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const language = ref("");
const level = ref("");
const tone = ref("");
const inputText = ref("");
const outputText = ref("");
const isDropdownLanguageOpen = ref(false);
const isDropdownLevelOpen = ref(false);
const isDropdownTonesOpen = ref(false);

const toggleDropdownLanguage = () => {
  isDropdownLanguageOpen.value = !isDropdownLanguageOpen.value;
};

const toggleDropdownLevel = () => {
  isDropdownLevelOpen.value = !isDropdownLevelOpen.value;
};

const toggleDropdownTones = () => {
  isDropdownTonesOpen.value = !isDropdownTonesOpen.value;
};

const selectLanguage = (languageSelected) => {
  language.value = languageSelected;
  isDropdownLanguageOpen.value = false;
};

const selectLevel = (levelSelected) => {
  level.value = levelSelected;
  isDropdownLevelOpen.value = false;
};

const selectTones = (tonesSelected) => {
  tone.value = tonesSelected;
  isDropdownTonesOpen.value = false;
};

const translate = () => {
  fetch("http://localhost:3001/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document: inputText.value,
      prompt: `Translate the provided text into ${language.value} in tone ${tone.value} and use vocabulary of level ${level.value}. Do it like you're an expert ${language.value} translator. Do not generate anything with misspellings and do not change what the provided text says.
      
      For the text that you are going to generate, use vocabulary according to the indicated level.
     
      For example:
     
      If the text in English is: "How are you?" you should answer "How are you?" if it is formal and "How are you?" if it is informal.
      
      
      In A1 levels you would use "text me" and in C1 you would use phrases like "hit me up", in A2 levels you would use "I will pay the bill", in more advanced levels "it's on me" instead. Another example, in basic levels you would use "Think about it" and in more native levels "Sleep on it". Basic levels "Yes, you can", and in native "Be my guest". Do not omit information or add information. Also pay close attention to the shades provided. For example, in Spanish, in an informal tone you could say "Que onda?" to greet and in formal "What has happened lately in your life?", this would apply in all languages.`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      outputText.value = data.data;
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
};

// watch([inputText], () => {
//   clearTimeout(timeoutId);
//   timeoutId = setTimeout(() => {
//     enviarDatos();
//   }, 500);
// });
</script>

<template>
  <!-- <NavBar></NavBar> -->

  <div class="h-screen flex justify-center items-center">
    <div class="main h-3/5 w-4/5 rounded-2xl">
      <div class="h-full rounded-2xl">
        <!-- OPTIONS -->
        <div class="h-1/6 flex justify-end">
          <div class="w-full"></div>

          <div class="w-full flex my-auto">
            <!-- Languajes -->
            <div class="ml-[10%] my-auto">
              <button
                @click="toggleDropdownLanguage"
                id="dropdownLeftButton"
                data-dropdown-toggle="dropdownLeft"
                data-dropdown-placement="left"
                class="md:my-auto mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {{ language == "" ? "Language" : language }}
              </button>
              <div
                id="dropdownLeft"
                :class="{ hidden: !isDropdownLanguageOpen }"
                class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownLeftButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLanguage('English')"
                      >English</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLanguage('Spanish')"
                      >Spanish</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLanguage('Chinese')"
                      >Chinese</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLanguage('German')"
                      >German</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Levels -->
            <div class="my-auto">
              <button
                @click="toggleDropdownLevel"
                id="dropdownBottomButton"
                data-dropdown-toggle="dropdownBottom"
                data-dropdown-placement="bottom"
                class="my-auto mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {{ level == "" ? "Level" : level }}
              </button>
              <div
                id="dropdownBottom"
                :class="{ hidden: !isDropdownLevelOpen }"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownBottomButton"
                >
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('A1')"
                      >A1</a
                    >
                  </li>
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('A2')"
                      >A2</a
                    >
                  </li>
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('B1')"
                      >B1</a
                    >
                  </li>
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('B2')"
                      >B2</a
                    >
                  </li>
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('C1')"
                      >C1</a
                    >
                  </li>
                  <li>
                    <a
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectLevel('C2')"
                      >C2</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Tones -->
            <div class="my-auto">
              <button
                @click="toggleDropdownTones"
                id="dropdownRightButton"
                data-dropdown-toggle="dropdownRight"
                data-dropdown-placement="right"
                class="my-auto mr-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {{ tone == "" ? "Tones" : tone }}
              </button>
              <div
                id="dropdownRight"
                :class="{ hiden: isDropdownTonesOpen }"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRightButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectTones('Formal')"
                      >Formal</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="selectTones('Informal')"
                      >Informal</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- PUTS -->
        <div class="puts flex flex-wrap h-3/6 gap-2 pointer-events-none">
          <div class="border-2 rounded-2xl flex-auto overflow-hidden">
            <textarea
              class="w-full max-w-full h-full rounded-xl border-none overflow-y-auto resize-none pointer-events-auto"
              v-model="inputText"
              placeholder="Ingresa texto"
            ></textarea>
          </div>

          <button
            type="button"
            title="Translate"
            @click="translate()"
            class="pointer-events-auto text-blue-700 h-1/2 my-auto border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Translate</span>
          </button>

          <div class="flex-auto">
            <textarea
              class="w-full h-full rounded-xl border-none overflow-y-auto resize-none bg-slate-100"
              v-model="outputText"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: left;
  vertical-align: top;
}
</style>
