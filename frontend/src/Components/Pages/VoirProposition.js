/**
 * Render a view of the propositions into the #page div (formerly propositionView function )
 */
 




const VoirProposition = async () => {
  const pageDiv = document.querySelector("#page");

  pageDiv.innerHTML = "";
  try {
    // hide data to inform if the pizza menu is already printed
    const response = await fetch("/api/propositions"); // fetch return a promise => we wait for the response

    if (!response.ok) {
      // status code was not 200, error status code
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const propositions = await response.json();
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    const table = document.createElement("table");
    table.className = "table table-danger";
    tableWrapper.appendChild(table);
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Proposition";
    const header2 = document.createElement("th");
    header2.innerText = "Status";
    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(thead);
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    propositions.forEach((proposition) => {
     const line = document.createElement("tr");
      const titleCell = document.createElement("td");
      titleCell.innerText = proposition.proposal;
      line.appendChild(titleCell);
      const descriptionCell = document.createElement("td");
      descriptionCell.innerText = proposition.status;
      line.appendChild(descriptionCell);
      // hide info within each row, the pizza id
      line.dataset.propositionId = proposition.id;
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
    // add the HTMLTableElement to the main, within the #page div
    pageDiv.appendChild(tableWrapper);
  } catch (error) {
    console.error("propositionView::error: ", error);
  }
  
};

export default VoirProposition;
