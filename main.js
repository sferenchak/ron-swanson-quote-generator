const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quoteEl = document.querySelector("#quote");

const view = {
  displayQuote: function(quote) {
    quoteEl.innerHTML = `"${quote}"`;
  },
  setupEventListeners: function() {
    const buttonContainer = document.querySelector(".container");

    buttonContainer.addEventListener("click", event => {
      let ElementClicked = event.target.id;
      switch (ElementClicked) {
        case "xhr":
          requests.xhrRequest();
          break;
        case "fetch":
          requests.fetchRequest();
          break;
        case "jquery":
          requests.jqueryRequest();
          break;
        case "axios":
          requests.axiosRequest();
          break;
      }
    });
  }
};

const requests = {
  xhrRequest: function() {
    let XHR = new XMLHttpRequest();

    XHR.onreadystatechange = () => {
      if (XHR.readyState == 4 && XHR.status == 200) {
        let quote = JSON.parse(XHR.responseText);
        view.displayQuote(quote[0]);
      }
    };

    XHR.open("GET", url);
    XHR.send();
  },
  fetchRequest: function() {
    fetch(url)
      .then(res => {
        res.json().then(data => {
          view.displayQuote(data[0]);
        });
      })
      .catch(err => {
        console.log("There was an error", err);
      });
  },
  jqueryRequest: function() {
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
      .done(data => {
        view.displayQuote(data[0]);
      })
      .fail(() => {
        console.log("jQuery AJAX Request Failed!");
      });
  },
  axiosRequest: function() {
    axios
      .get(url)
      .then(res => {
        view.displayQuote(res.data[0]);
      })
      .catch(() => {
        console.log("Axios Request Failed!");
      });
  }
};

view.setupEventListeners();
