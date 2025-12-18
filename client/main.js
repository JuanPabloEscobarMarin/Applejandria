const root = document.getElementById("root");

fetch("http://localhost:8000/content", {
  headers: {
    "Content-Type": "text/html",
  },
}).then(async (res) => {
  root.innerHTML = await res.text();
}).catch((err) => console.log(err));
