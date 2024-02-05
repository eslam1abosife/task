let err = document.getElementById("errors");
let form = document.getElementById("form");

let inname = document.getElementById("name").value;
let inmail = document.getElementById("mail").value;
let creditcard = document.getElementById("credit").value;

let namemsg = document.querySelector(".namemsg");
let mailmsg = document.querySelector(".mailmsg");
let creditmsg = document.querySelector(".creditmsg");

let tabltitle = document.querySelector(".tabltitle");
let tablnum = document.querySelector(".tablnum");
let tablval = document.querySelector(".tablval");
let tabltotal = document.querySelector(".tabltotal");
let taps = document.querySelector(".taps");

form.addEventListener("submit", function (e) {
  let error = [];
  let numof = [];
  let creditCardNumberRegex = /\d{4}-\d{4}-\d{4}-\d{4}/gi;
  let arr = document.querySelectorAll(".arr");
  let task = document.querySelector(".task");
  let msg = document.querySelector(".msg");

  if (inname === "" || inname == null) {
    error.push("Please enter name");
  }
  if (inmail === "" || inmail == null) {
    error.push("Please enter email");
  }
  if (creditCardNumberRegex.test(creditcard) === false) {
    error.push("Type the number in the format xxxx-xxxx-xxxx-xxxx");
  }
  arr.forEach((ele) => {
    if (ele.value !== "") {
      numof.push(ele);
    }
  });
  if (numof.length == 0) {
    error.push("You must choose at least one product");
  }
  if (error.length > 0) {
    e.preventDefault();
    err.innerHTML = error.join("<br />");
  }
  if (error.length == 0) {
    e.preventDefault();
    task.style.display = "none";
    msg.style.display = "block";
    namemsg.innerHTML = "";
    namemsg.innerHTML = inname;

    mailmsg.innerHTML = "";
    mailmsg.innerHTML = inmail;

    creditmsg.innerHTML = "";
    creditmsg.innerHTML = `xxxx-xxxx-xxxx-${creditcard.split("-")[3]}`;

    taps.innerHTML += `
  <tr>
    <th>item</th>
    <th>Quantity</th>
    <th>Unit Price</th>
    <th>Total Price</th>
  </tr>`;
    let tot = [];

    numof.forEach((ele) => {
      taps.innerHTML += `
    <tr>
      <td class="tabltitle">${ele.title}</td>
      <td class="tablnum">$${ele.value}.00</td>
      <td class="tablval">${ele.name}</td>
      <td class="tabltotal">${ele.value * ele.name}</td>
    </tr>
   `;
      tot.push(ele.value * ele.name);
    });
    console.log(tot);

    taps.innerHTML += ` <tr>
    <td>Donation</td>
    <td colspan="2" style="text-align: end">Minimum</td>
    <td>$10.00</td>
  </tr>
  <tr>
    <th colspan="3" style="text-align: end">Total</th>
    <th>$${tot.reduce((ele, cru) => ele + cru) - 10}</th>
  </tr>`;

    console.log(numof);
  }
});
