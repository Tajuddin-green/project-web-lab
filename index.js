const loadLesson = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await response.json();
  displayBtn(data.data);
};

const displayBtn = (categories) => {
  const btnContainer = document.getElementById("btn-container");

  for (const cat of categories) {
    let div = document.createElement("div");
    div.innerHTML = `<button onclick="loadDataByLevel(${
      cat?.level_no
    }), colorBtn(${cat.level_no})" id="button-${
      cat.level_no
    }" class="btn learn-btn border-blue-700 border-2 text-blue-800 hover:bg-blue-200  text-[0.7rem] font-[poppins]" > <img class="bg-white p-1 rounded" src="./assets/fa-book-open.png" alt="">${
      cat?.lessonName + "-" + cat?.level_no
    }</button>`;
    btnContainer.appendChild(div);
  }
};

const colorBtn = (btnNum) => {
  const allBtns = document.getElementsByClassName("learn-btn");

  for (let btn of allBtns) {
    btn.classList.remove("bg-blue-700", "text-white");
  }
  document
    .getElementById(`button-${btnNum}`)
    .classList.add("bg-blue-700", "text-white");
};
loadLesson();

const loadDataByLevel = async (level) => {
  const loader = document.getElementById("loader");
  const cardContainer = document.getElementById("card-container");

  loader.classList.remove("hidden");
  cardContainer.classList.add("opacity-0");

  try {
    cardContainer.classList.remove("grid");
    cardContainer.classList.add("hidden");

    const response = await fetch(
      `https://openapi.programming-hero.com/api/level/${level}`
    );
    const data = await response.json();

    cardContainer.innerHTML = "";
    document.getElementById("default-message").classList.add("hidden");

    if (data.data.length === 0) {
      setTimeout(() => {
        document.getElementById("error-message").style.display = "block";
      }, 500);
    } else {
      document.getElementById("error-message").style.display = "none";
    }

    setTimeout(() => {
      for (const element of data.data) {
        const card = document.createElement("div");

        card.innerHTML = `  
              <div class="bg-white text-center hover:bg-cyan-50 flex flex-col rounded-lg gap-5 p-8 h-[35vh] cursor-pointer justify-center transition-opacity duration-500 ease-in-out opacity-0">
                  <h3 id="main-word" class="text-3xl font-semibold font-[poppins]">${
                    element?.word
                  }</h3>
                  <p class="font-[poppins]">Meaning / Pronunciation</p>
                  <h3 id="meaning-pronounciation" class="text-2xl font-[Hind_Siliguri]">
                      "${
                        (element?.meaning ?? "অর্থ নেই") +
                        " / " +
                        (element?.pronunciation ?? "অর্থ নেই")
                      }"
                  </h3>
                  <div class="flex justify-around">
                   <button class="btn rounded-lg hover:bg-red-100" onclick="loadModalData(${
                     element.level
                   }, '${element.id}')">
                          <img src="./assets/exclaIcon.svg" alt="">
                       </button>
                      <button class="btn rounded-lg hover:bg-red-100" onclick="pronounceWord('${
                        element.word
                      }')">
                          <img src="./assets/mike.svg" alt="">
                          </button>
                          </div>
                          </div>                        
                          `;

        cardContainer.appendChild(card);
        setTimeout(
          () => card.querySelector("div").classList.remove("opacity-0"),
          50
        );
      }

      cardContainer.classList.remove("hidden");
      cardContainer.classList.add("grid");

      setTimeout(() => {
        cardContainer.classList.remove("opacity-0");
      }, 100);
    }, 500);
  } catch (error) {
    console.error("Error faced", error);
  } finally {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }
};
