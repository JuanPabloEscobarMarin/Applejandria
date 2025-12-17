console.log("Applejandria");

fetch("http://localhost:8000/content", {
  headers: {
    "Content-Type": "text/html",
  },
}).then((res) => {
  console.log(res);
}).catch((err) => console.log(err));
