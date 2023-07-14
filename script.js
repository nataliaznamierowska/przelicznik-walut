// Pobieranie danych z NBP API
function fetchData(url) {
    return fetch(url).then(response => response.json());
  }
  
  // Pobieranie aktualnych kursów walut
  function fetchCurrencyRates() {
    const url = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
  
    return fetchData(url);
  }
  
  // Przeliczanie waluty na złotówki
  function convertCurrency(amount, rate) {
    return amount * rate;
  }
  
  // Aktualizowanie wyników na stronie
  function updateResults(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result.toFixed(2);
  }
  
  // Obsługa przeliczania walut
  function handleConversion() {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
  
    fetchCurrencyRates()
      .then(data => {
        let rate;
        switch (currency) {
          case 'EUR':
            rate = data[0].rates.find(rate => rate.code === 'EUR').mid;
            break;
          case 'USD':
            rate = data[0].rates.find(rate => rate.code === 'USD').mid;
            break;
          case 'CHF':
            rate = data[0].rates.find(rate => rate.code === 'CHF').mid;
            break;
        }
  
        const result = convertCurrency(amount, rate);
        updateResults(result);
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
      });
  }
  
  // Dodawanie nasłuchiwania na przycisk
  document.getElementById('convert').addEventListener('click', handleConversion);
  