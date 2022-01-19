import { Redirect } from "../Router/Router";


/**
 * Form to add a pizza :
 * Anonymous users shall be redirected to "/login" Page
 */
function AddProposition() {
 

  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  // create the "Add a pizza" form
  const form = document.createElement("form");
  form.className = "p-5";
  const proposal = document.createElement("input");
  proposal.type = "text";
  proposal.id = "proposal";
  proposal.placeholder = "Entrer votre proposition";
  proposal.required = true;
  proposal.className = "form-control mb-3";
  proposal.status="status"
  const submit = document.createElement("input");
  submit.value = "Add";
  submit.type = "submit";
  submit.className = "btn btn-danger";
  form.appendChild(proposal);
  form.appendChild(submit);
  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    e.preventDefault();
    const proposal = document.getElementById("proposal");
    proposal.status="submitted";
    
    
    
    console.log("forms values : ", proposal.value);
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          proposal:proposal.value,
          status:proposal.status,
     
          
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
         
        }, // body data type must match "Content-Type" header
       
      };

      const response = await fetch("/api/propositions", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const proposition = await response.json(); // json() returns a promise => we wait for the data
      console.log("proposition added : ");

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("AddPropositionPage::error: ", error);
    }
  }
}

export default AddProposition;
