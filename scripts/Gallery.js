//nav bar responsiveness
document.addEventListener("DOMContentLoaded", function () {
   
    document.querySelector('.hamburger').addEventListener('click', function() {
        
        document.querySelector('.nav-list ul').classList.toggle('ulShow');
        console.log("clicked")
      });
});
