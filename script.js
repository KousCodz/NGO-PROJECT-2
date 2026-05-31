let donations = JSON.parse(localStorage.getItem("donations")) || [];

function addDonation(){

    const item = document.getElementById("item").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const donor = document.getElementById("donor").value.trim();
    const date = document.getElementById("date").value;

    if(item === "" || quantity === "" || donor === "" || date === ""){
        alert("Please fill all fields");
        return;
    }

    donations.push({
        item,
        quantity,
        donor,
        date
    });

    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );

    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("donor").value = "";
    document.getElementById("date").value = "";

    displayDonations();
}

function deleteDonation(index){

    if(confirm("Delete this donation?")){

        donations.splice(index, 1);

        localStorage.setItem(
            "donations",
            JSON.stringify(donations)
        );

        displayDonations();
    }
}

function displayDonations(){

    const table = document.getElementById("donationTable");

    table.innerHTML = "";

    donations.forEach((donation,index)=>{
table.innerHTML += `
<tr>
    <td>${index + 1}</td>
    <td>${donation.item}</td>
    <td>${donation.quantity}</td>
    <td>${donation.donor}</td>
    <td>${donation.date}</td>
    <td>
        <button onclick="deleteDonation(${index})" class="delete-btn">
            Delete
        </button>
    </td>
</tr>
`;
    });

    updateStats();
    displaySummary();
}

function updateStats(){

    document.getElementById("totalDonations").innerText =
        donations.length;

    const donors = [
        ...new Set(
            donations.map(d => d.donor.toLowerCase())
        )
    ];

    document.getElementById("uniqueDonors").innerText =
        donors.length;

    const items = [
        ...new Set(
            donations.map(d => d.item.toLowerCase())
        )
    ];

    document.getElementById("inventoryItems").innerText =
        items.length;
}

function displaySummary(){

    const summaryTable =
        document.getElementById("summaryTable");

    summaryTable.innerHTML = "";

    let totals = {};

    donations.forEach(donation => {

        const item =
            donation.item.toLowerCase();

        const parts =
            donation.quantity.split(" ");

        const qty =
            parseFloat(parts[0]);

        const unit =
            parts.slice(1).join(" ");

        if(!totals[item]){
            totals[item] = {
                total:0,
                unit:unit
            };
        }

        totals[item].total += qty;
    });

    for(let item in totals){

        summaryTable.innerHTML += `
        <tr>
            <td>
                ${item.charAt(0).toUpperCase() + item.slice(1)}
            </td>
            <td>
                ${totals[item].total} ${totals[item].unit}
            </td>
        </tr>
        `;
    }
}

function printDonations(){

    let printRows = "";

    donations.forEach((donation,index)=>{

        printRows += `
        <tr>
            <td>${index + 1}</td>
            <td>${donation.item}</td>
            <td>${donation.quantity}</td>
            <td>${donation.donor}</td>
            <td>${donation.date}</td>
        </tr>
        `;
    });

    const win = window.open("");

    win.document.write(`
    <html>
    <head>
        <title>Donation Records</title>

        <style>

            body{
                font-family:Arial;
                padding:20px;
            }

            table{
                width:100%;
                border-collapse:collapse;
            }

            th,td{
                border:1px solid black;
                padding:10px;
                text-align:center;
            }

            h2,h3{
                text-align:center;
            }

        </style>

    </head>

    <body>

    <h2>
        Manavta Hitay Seva Chatra Old Age Home
    </h2>

    <h3>
        Donation Records
    </h3>

    <table>

        <thead>
            <tr>
                <th>Sr No</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Donor</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody>
            ${printRows}
        </tbody>

    </table>

    </body>
    </html>
    `);

    win.document.close();
    win.print();
}

function printSummary(){

    const win = window.open("");

    win.document.write(`
    <html>
    <head>
        <title>Inventory Summary</title>
        <style>
            body{
                font-family:Arial;
                padding:20px;
            }

            table{
                width:100%;
                border-collapse:collapse;
            }

            th,td{
                border:1px solid black;
                padding:10px;
                text-align:center;
            }

            h2{
                text-align:center;
            }
        </style>
    </head>
    <body>

    <h2>
    Manavta Hitay Seva Chatra Old Age Home
    </h2>

    <h3 style="text-align:center;">
    Inventory Summary
    </h3>

    <table>
        <thead>
            <tr>
                <th>Item Name</th>
                <th>Total Quantity Available</th>
            </tr>
        </thead>

        <tbody>
            ${document.getElementById("summaryTable").innerHTML}
        </tbody>
    </table>

    </body>
    </html>
    `);

    win.document.close();
    win.print();
}
// Enter key navigation
const fields = ["item", "quantity", "donor", "date"];

fields.forEach((id, index) => {
    document.getElementById(id).addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            if (index < fields.length - 1) {
                document.getElementById(fields[index + 1]).focus();
            } else {
                addDonation();
            }
        }
    });
});

displayDonations();

displayDonations();
