const getCurrency = async () => {
  /*---async await for asychronous operation---*/
  const response = await fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Tyuk26cJ2zl9Mg0izbGpy6LM1XAbAloSCsMufYoD&base_currency=INR&currencies"
  );

  /*---converting the data in json format and obtaining targeting the data element---*/
  const data = await response.json();
  const currencies = data.data;

  /*---Creating new element named currency_group and select and appending the select into the currency group---*/
  const currencyGroup = document.querySelector(".currency_group");
  const select = document.createElement("select");

  /*---can you any forloop---*/
  
  for (let [key, value] of Object.entries(currencies)) {
    const option = document.createElement("option");
    option.textContent = key;
    select.appendChild(option);
  }
  currencyGroup.appendChild(select);

  const getInrInput = document.querySelector(
    ".currency_value >input:first-of-type"
  );
  const targetcurrencyChange = document.querySelector(
    ".currency_value >input:last-of-type"
  );
  const targetCurrencySelect = document.querySelector(
    ".currency_group> select:last-of-type"
  );

  /*---Function Exchange runs when input inr changes---*/

  getInrInput.addEventListener("input", (e) => {
    const inrvalue = e.target.value;
    const targetCurrency = targetCurrencySelect.value;
    exchange(inrvalue, targetCurrency);
  });

  /*---Function Exchange runs when foreign currency selection changes---*/

  targetCurrencySelect.addEventListener("change", (e) => {
    const inrvalue = getInrInput.value;
    const targetCurrency = e.target.value;
    exchange(inrvalue, targetCurrency);
  });

  /*---Function Exchange takes in INR and foreign currency---*/

  const exchange = (inrvalue, targetCurrency) => {
    const targetValue = inrvalue * currencies[targetCurrency];
    targetcurrencyChange.value = targetValue;
  };
};

getCurrency();
