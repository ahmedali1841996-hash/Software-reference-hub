const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");
const dataTable = document.querySelector("#dataTable tbody");

// جمع البيانات من الجدول مع الرابط
let staticData = [];
document.querySelectorAll("#dataTable tbody tr").forEach(row => {
    const cells = row.querySelectorAll("td");
    const link = cells[0].querySelector("a");
    staticData.push({
        modelName: link ? link.innerText.trim() : cells[0].innerText.trim(),
        link: link ? link.href : null,
        openCell: cells[1].innerText.trim(),
        tcon: cells[2].innerText.trim(),
        swVersion: cells[3].innerText.trim()
    });
});

// عرض الجدول كامل
function renderTable(list) {
    dataTable.innerHTML = "";
    list.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="${item.link}" target="_blank">${item.modelName}</a></td>
            <td>${item.openCell}</td>
            <td>${item.tcon}</td>
            <td>${item.swVersion}</td>
        `;
        dataTable.appendChild(row);
    });
}

// فلترة الجدول حسب اسم الموديل
function filterTableByModel(modelName) {
    const filteredList = staticData.filter(item =>
        item.modelName.toLowerCase().includes(modelName.toLowerCase())
    );
    renderTable(filteredList);
}

// تحديث الاقتراحات أثناء الكتابة
searchBox.addEventListener("input", () => {
    const value = searchBox.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (!value) {
        renderTable(staticData);
        return;
    }

    const filtered = staticData.filter(item =>
        item.modelName.toLowerCase().includes(value)
    );

    filtered.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.modelName; // نص فقط
        li.style.padding = "5px";
        li.style.cursor = "pointer";
        li.onmouseover = () => li.style.background = "#eee";
        li.onmouseout = () => li.style.background = "#fff";
        li.onclick = () => {
            searchBox.value = item.modelName;
            suggestions.innerHTML = "";
            filterTableByModel(item.modelName);
        };
        suggestions.appendChild(li);
    });
});

// عرض الجدول كامل عند بداية التحميل
renderTable(staticData);
