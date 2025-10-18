const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("siteUrl");
const submitBtn = document.getElementById("submitBtn");
const resultsDiv = document.getElementById("results");

let bookmarks = JSON.parse(localStorage.getItem("bookmarksList")) || [];
renderBookmarks();

submitBtn.addEventListener("click", function () {
  const name = siteNameInput.value.trim();
  const url = siteUrlInput.value.trim();

if (!name || !url) {
  const modal = document.getElementById("validationModal");
  const closeBtn = document.querySelector(".close-btn");

  modal.style.display = "block";

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  return;
}




  const validUrl = checkUrl(url);
  if (!validUrl) {
    alert("Please enter a valid URL (e.g. https://example.com)");
    return;
  }

  bookmarks.push({ name, url: validUrl });
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  renderBookmarks();

  siteNameInput.value = "";
  siteUrlInput.value = "";
});

function checkUrl(url) {
  try {
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    new URL(fullUrl);
    return fullUrl;
  } catch {
    return false;
  }
}

function renderBookmarks() {
  resultsDiv.innerHTML = "";
  if (bookmarks.length === 0) {
    resultsDiv.innerHTML = "<p>No bookmarks yet.</p>";
    return;
  }

  bookmarks.forEach((bookmark, index) => {
    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
      <h3>${bookmark.name}</h3>
      <div class="actions">
        <button class="visit" onclick="window.open('${bookmark.url}', '_blank')">Visit</button>
        <button class="delete" onclick="deleteBookmark(${index})">Delete</button>
      </div>
    `;
    resultsDiv.appendChild(div);
  });
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  renderBookmarks();
}
