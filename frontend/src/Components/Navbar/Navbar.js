import { Navbar as BootstrapNavbar } from "bootstrap";

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar = `  <div class="row mx-0">
  <div class="col-md-2 col-lg-4"></div>
  <div class="col-md-8 col-lg-4 text-center mt-2">
  <button type="button" class="btn btn-dark  mt-2 mb-3" data-uri="/">Voir propositions</button>
  <button type="button" class="btn btn-dark  mt-2 mb-3" data-uri="/proposition/add">ajouter proposition</button>
  </div>
  </div>`;
 navbarWrapper.innerHTML=navbar;
};

export default Navbar;
