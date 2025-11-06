

const testCases = document.querySelectorAll("table td.test-link");

// عناصر المودال
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modal-title");
const modaltools = document.getElementById("modal-tools");
const modalSteps = document.getElementById("modal-steps");
const modalExpected = document.getElementById("modal-expected");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-btn");

testCases.forEach(cell => {
    cell.addEventListener("click", () => {
        modal.style.display = "flex";

        // العنوان باسم الـ Test Case
        modalTitle.textContent = "Test Case: " + cell.textContent;

        modaltools.innerHTML = cell.dataset.tools;

        // البيانات من الـ attributes
        modalSteps.innerHTML = cell.dataset.steps || "No steps available";
        modalExpected.innerHTML = cell.dataset.expected || "No expected result available";

        if (cell.dataset.img) {
            modalImg.src = cell.dataset.img;
            modalImg.style.display = "block";
        } else {
            modalImg.style.display = "none";
        }
    });
});

// إغلاق المودال
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});