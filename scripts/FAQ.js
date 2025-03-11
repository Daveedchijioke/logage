//nav bar responsiveness
document.addEventListener("DOMContentLoaded", function () {
   
    document.querySelector('.hamburger').addEventListener('click', function() {
        
        document.querySelector('.nav-list ul').classList.toggle('ulShow');
        console.log("clicked")
      });
});
//accordion effect
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector(".faq-answer");
        const icon = this.querySelector(".toggle-icon");
        
        if (faqItem.classList.contains("active")) {
            answer.style.maxHeight = "0";
            answer.style.padding = "0 15px";
            icon.textContent = "+";
        } else {
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = "0";
                item.querySelector(".faq-answer").style.padding = "0 15px";
                item.querySelector(".toggle-icon").textContent = "+";
            });
            answer.style.maxHeight = "200px";
            answer.style.padding = "15px";
            icon.textContent = "×";
        }
        
        faqItem.classList.toggle("active");
    });
});