const loadModalData = async (level, id) => {
  try {
    // Fetch word details using the correct API
    const response = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
    );
    const data = await response.json();
    const wordDetails = data.data;

    // If no data found, exit
    if (!wordDetails) {
      console.error("Word data not found!");
      return;
    }

    // Clear previous modal content
    const modalSection = document.getElementById("modal-section");
    modalSection.innerHTML = "";

    // Create modal structure
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
        <dialog id="modal_box" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box flex text-start gap-6 flex-col">
                <h3 class="text-3xl font-bold flex items-center gap-1">
                    ${wordDetails.word ?? "Not Found"}
                    (<span>
                        <img  src="./assets/microphone.svg" alt="">
                    </span>
                    ${wordDetails.pronunciation ?? "অর্থ নেই"} )
                </h3>
                <div>
                    <h5 class="text-xl">Meaning</h5>
                    <p>${wordDetails.meaning ?? "অর্থ নেই"}</p>
                </div>
                <div>
                    <h5 class="text-xl">Example</h5>
                    <p>${wordDetails.sentence ?? ""}</p>
                </div>
                <div id="synonyms-section">
                    <h5 class="font-[Hind_Siliguri] text-xl">সমার্থক শব্দ গুলো</h5>
                    <div id="modalBtns" class="flex gap-2 flex-wrap"></div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn bg-blue-700 text-white">Complete Learning</button>
                    </form>
                </div>
            </div>
        </dialog>`;

    // Append modal to the section
    modalSection.appendChild(modalDiv);

    // Get the synonyms container
    const modalBtns = modalDiv.querySelector("#modalBtns");

    // Check if synonyms exist
    if (wordDetails.synonyms && wordDetails.synonyms.length > 0) {
      wordDetails.synonyms.forEach((synonym) => {
        const btn = document.createElement("button");
        btn.className = "btn bg-gray-200 rounded-lg px-4 py-2";
        btn.innerText = synonym;
        modalBtns.appendChild(btn);
      });
    } else {
      modalBtns.style.display = "none";
    }

    // Open the modal
    const modal = modalDiv.querySelector("#modal_box");
    modal.showModal();
  } catch (error) {
    console.error("Error loading word data:", error);
  }
};
