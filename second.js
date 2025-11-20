
const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");
const cards = document.querySelectorAll(".cards > div");

const data = Array.from(cards).map(card => ({
    title: card.querySelector("h3").textContent.trim(),
    element: card
}));

// إنشاء المقترحات أثناء الكتابة
searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    suggestions.innerHTML = "";
    if (!query) {
        cards.forEach(c => c.style.display = "block");
        return;
    }

    const filtered = data.filter(d => d.title.toLowerCase().includes(query));

    if (filtered.length > 0) {
        filtered.forEach(d => {
            const div = document.createElement("div");
            div.textContent = d.title;
            div.classList.add("suggestion-item");
            div.onclick = () => {
                searchBox.value = d.title;
                suggestions.innerHTML = "";
                showSelectedCard(d.title);
            };
            suggestions.appendChild(div);
        });
    } else {
        const noResult = document.createElement("div");
        noResult.textContent = "No matches found";
        noResult.classList.add("suggestion-item");
        suggestions.appendChild(noResult);
    }
});

// إظهار الكارد المختار فقط
function showSelectedCard(title) {
    cards.forEach(card => {
        const cardTitle = card.querySelector("h3").textContent.trim();
        card.style.display = (cardTitle === title) ? "block" : "none";
    });
}



