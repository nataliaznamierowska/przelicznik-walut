document.getElementById("convertBtn").addEventListener("click", convertCurrency);

function convertCurrency() {
  var amount = document.getElementById("amount").value;
  var currency = document.getElementById("currency").value;

  var url = "https://api.nbp.pl/api/exchangerates/rates/A/" + currency + "/?format=json";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var exchangeRate = data.rates[0].mid;
      var result = amount * exchangeRate;
      document.getElementById("result").textContent = result.toFixed(2) + " PLN";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("result").textContent = "Error fetching exchange rate.";
    });
}
