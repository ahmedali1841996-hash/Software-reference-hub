

const addBtn = document.getElementById("add");
const formModal = document.getElementById("formModal");
const detailsModal = document.getElementById("detailsModal");
const closeBtns = document.querySelectorAll(".close");
const dataForm = document.getElementById("dataForm");
const dataTable = document.getElementById("dataTable").querySelector("tbody");
const detailsContent = document.getElementById("detailsContent");
const editBtn = document.getElementById("editBtn");

let currentEditIndex = null;
let dataList = JSON.parse(localStorage.getItem("tvData")) || [];

// فتح فورم إضافة
addBtn.onclick = () => {
    formModal.style.display = "block";
    dataForm.reset();
    currentEditIndex = null;
};

// إغلاق المودال
closeBtns.forEach(btn => {
    btn.onclick = () => {
        formModal.style.display = "none";
        detailsModal.style.display = "none";
    };
});

// حفظ البيانات
dataForm.onsubmit = function (e) {
    e.preventDefault();
    const newData = {
        modelName: document.getElementById("modelName").value,
        openCell: document.getElementById("openCell").value,
        tcon: document.getElementById("tcon").value,
        swVersion: document.getElementById("swVersion").value,
        os: document.getElementById("os").value,
        refresh: document.getElementById("refresh").value,
        vrr: document.getElementById("vrr").value,
        ota: document.getElementById("ota").value,
        dd: document.getElementById("dd").value,
        ddp: document.getElementById("ddp").value,
        atmos: document.getElementById("atmos").value,
        vision: document.getElementById("vision").value,
        hdr: document.getElementById("hdr").value,
        hdrr: document.getElementById("hdr+").value,
        screen: document.getElementById("screen").value,
        cast: document.getElementById("cast").value,
        air: document.getElementById("air").value,
        voice: document.getElementById("voice").value,
        pvr: document.getElementById("pvr").value,
        time: document.getElementById("time").value,
        far: document.getElementById("far").value,

    };

    if (currentEditIndex !== null) {
        dataList[currentEditIndex] = newData;
    } else {
        dataList.push(newData);
    }

    localStorage.setItem("tvData", JSON.stringify(dataList));
    renderTable();
    formModal.style.display = "none";
};

// عرض الجدول
function renderTable() {
    dataTable.innerHTML = "";
    dataList.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="model-link" data-index="${index}">${item.modelName}</td>
      <td>${item.openCell}</td>
      <td>${item.tcon}</td>
      <td>${item.swVersion}</td>
    `;
        dataTable.appendChild(row);
    });

    document.querySelectorAll(".model-link").forEach(cell => {
        cell.onclick = () => {
            const index = cell.getAttribute("data-index");
            showDetails(index);
        };
    });
}

// عرض التفاصيل
// عرض التفاصيل بشكل جدول
function showDetails(index) {
    const item = dataList[index];
    currentEditIndex = index;

    detailsContent.innerHTML = `
    <table class="details-table">
      <tr><th>Item</th><th>Result</th></tr>
      <tr><td>Model Name</td><td>${item.modelName}</td></tr>
      <tr><td>Open Cell</td><td>${item.openCell}</td></tr>
      <tr><td>T.CON</td><td>${item.tcon}</td></tr>
      <tr><td>SW Version</td><td>${item.swVersion}</td></tr>
      <tr><td>O.S</td><td>${item.os}</td></tr>
      <tr><td> Refresh Rate </td><td> ${item.refresh}</td></tr>
      <tr><td> VRR </td><td> ${item.vrr}</td></tr>
      <tr><td>Support OTA</td><td>${item.ota}</td></tr>
      <tr><td> Dolby Digital </td><td> ${item.dd}</td></tr>
      <tr><td> Dolby Digital Plus </td><td> ${item.ddp}</td></tr>
      <tr><td> Dolby Atmos </td><td> ${item.atmos}</td></tr>
      <tr><td> Dolby Vision </td><td> ${item.vision}</td></tr>
      <tr><td> HDR/HDR10 </td><td> ${item.hdr}</td></tr>
      <tr><td> HDR10+ </td><td> ${item.hdrr}</td></tr>
      <tr><td> Screen Mirroring </td><td> ${item.screen}</td></tr>
      <tr><td> Chromecast </td><td> ${item.cast}</td></tr>
      <tr><td> AirPlay </td><td> ${item.air}</td></tr>
      <tr><td> Voice Search </td><td> ${item.voice}</td></tr>
      <tr><td> PVR </td><td> ${item.pvr}</td></tr>
      <tr><td> Time Shift </td><td> ${item.time}</td></tr>
      <tr><td> Far Field </td><td> ${item.far}</td></tr>
    </table>
  `;

    detailsModal.style.display = "block";
}


// زر Edit
editBtn.onclick = () => {
    const item = dataList[currentEditIndex];
    document.getElementById("modelName").value = item.modelName;
    document.getElementById("openCell").value = item.openCell;
    document.getElementById("tcon").value = item.tcon;
    document.getElementById("swVersion").value = item.swVersion;
    document.getElementById("os").value = item.os;
    document.getElementById("ota").value = item.ota;

    detailsModal.style.display = "none";
    formModal.style.display = "block";
};

// تحميل البيانات أول مرة
renderTable();


const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");

// تحديث الاقتراحات أثناء الكتابة
searchBox.addEventListener("input", () => {
    const value = searchBox.value.toLowerCase();
    suggestions.innerHTML = "";

    if (value === "") {
        renderTable();
        return;
    }

    const filtered = dataList.filter(item =>
        item.modelName.toLowerCase().includes(value)
    );

    filtered.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.modelName;
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

// عند الضغط على Enter
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const modelName = searchBox.value.trim();
        if (modelName) {
            filterTableByModel(modelName);
            suggestions.innerHTML = "";
        }
    }
});

// عرض صف واحد بناءً على الموديل
function filterTableByModel(modelName) {
    const item = dataList.find(item => item.modelName.toLowerCase() === modelName.toLowerCase());
    dataTable.innerHTML = "";

    if (item) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="model-link" data-index="${dataList.indexOf(item)}">${item.modelName}</td>
            <td>${item.openCell}</td>
            <td>${item.tcon}</td>
            <td>${item.swVersion}</td>
        `;
        dataTable.appendChild(row);

        document.querySelector(".model-link").onclick = () => {
            showDetails(dataList.indexOf(item));
        };
    } else {
        dataTable.innerHTML = `<tr><td colspan="4" style="text-align:center">No model found</td></tr>`;
    }
}
