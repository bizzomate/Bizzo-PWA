(function() {
  var pageElements = null;
  var elementsDisplayState = [];
  var offlineHandler = window.addEventListener("offline", function(event) {
    var offlineTag = document.createElement("div");
    offlineTag.id = "offline-tag";
    offlineTag.style =
      "width:100%;background-color: #2E387F; color:#fff; display: flex;justify-content: center; flex-direction: column;align-items: center;min-height: 100vh;";
    var offlineMessage = document.createElement("h1");
    offlineMessage.innerHTML =
      "You're offline, please check your internet connection.";
    var bizzoLink = document.createElement("a");
    bizzoLink.href = "https://www.bizzomate.com/en/";
    bizzoLink.innerHTML = "Bizzomate Team";

    offlineTag.appendChild(offlineMessage);
    offlineTag.appendChild(bizzoLink);

    pageElements = document.body.children;
    for (var i = 0; i < pageElements.length; i += 1) {
      elementsDisplayState[i] = pageElements[i].style.display;
      pageElements[i].style.display = "none";
    }
    document.body.appendChild(offlineTag);
  });
  var onlineHandler = window.addEventListener("online", function(event) {
    if (document.getElementById("offline-tag")) {
      for (var i = 0; i < pageElements.length; i += 1) {
        pageElements[i].style.display = elementsDisplayState[i];
      }
      document.getElementById("offline-tag").remove();
    }
  });
})();
