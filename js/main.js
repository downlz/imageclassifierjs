// Main js file to allow user to upload an image and show image classification prediction
let net;

// Upload a image selected by user
async function uploadImage() {
    const input = document.getElementById('imageUpload');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img_url = e.target.result;
            document.getElementById("img").src = img_url;
        }
        reader.readAsDataURL(input.files[0]);
        document.getElementById("img-sec").style.display = "block";
    }
}

async function predictImage() {
    console.log("Prediction Started");
    document.getElementById('loading').style.display = "block";
    document.getElementById('btn-predict').style.display = "none";
    net = await mobilenet.load();
    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);
    document.getElementById('loading').style.display = "none";

    document.getElementById('bestpreddata').innerHTML = `<table>
   <thead>
              <tr>
                <th>Prediction</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
   <tr>
   <td> ${result[0].className} </td> <td> ${result[0].probability}</td></tr>
   <tr>
   <td> ${result[1].className} </td> <td> ${result[1].probability}</td></tr>
   <tr>
   <td> ${result[2].className} </td> <td> ${result[2].probability}</td></tr>
   </tbody></table>
   `
    document.getElementById('result').style.display = "block";
    //    document.getElementById('tablePrint').innerHTML =  createTable(result).innerHTML;         To show data in tabular format
}

function createTable(array) {
    var table = document.createElement('table');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        cell1.textContent = array[i].className;
        cell2.textContent = array[i].probability;
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    return table;
}

function message(){
    alert('This is a sample app using Tensorflow javascript module to classify a image');
}

async function app() {
    console.log('Loading mobilenet..'); // Logging Mobilenet load
    console.log('Sucessfully loaded model');
}

app();