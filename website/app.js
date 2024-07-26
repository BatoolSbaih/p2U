const wBURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const wAKey = '&appid=c6163a433acfff5ededfa331b70a6006&units=imperial';

document.getElementById('generate').addEventListener('click', handleGenerateBC);

function handleGenerateBC(e) {
  const zip_Code = document.getElementById('zip').value;
  const uFeeling = document.getElementById('feelings').value;
  fetchTempreture(wBURL, zip_Code, wAKey)
    .then(function(TempretureData) {
      const formattedDate = new Date().toLocaleDateString('en-US');
      submitTemoretureData('http://localhost:8001/add', { temp: TempretureData.main.temp, date: formattedDate, feelings: uFeeling})
      .then(() => rUI());
    });
}

// Refresh UI
const rUI = async () => {
  const request = await fetch('http://localhost:8001/all');
  try {
    const aData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(aData.temp) + ' degrees';
    document.getElementById('content').innerHTML = aData.feelings;
    document.getElementById('date').innerHTML = aData.date;
  } catch (error) {
    console.log("This Error!!!!!!!!!!!!!!!!!!!!!", error);
  }
}

// Fetch Temperature
const fetchTempreture = async (bURL, z, key) => {
  const response = await fetch(bURL + z + key);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("This Error!!!!!!!!!", error);
  }
}

// Submit Temperature Data
const submitTemoretureData = async (bUrl = '', d = {}) => {
  const response = await fetch(bUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(d),
  });

  try {
    const nData = await response.json();
    return nData;
  } catch (error) {
    console.log("This Error!!!!!!!!!!!!!!!!!!!!!!!!!", error);
  }
}
