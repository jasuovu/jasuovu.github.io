'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function() { 
    elementToggleFunc(sidebar);
    elementToggleFunc(sidebarBtn); 
});

// typewriter effect
document.addEventListener("DOMContentLoaded", function() {
    // Get the current date
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    // calculate days since programming started (February 21, 2021)
    const startDate = new Date('2021-02-21'); 
    const timeDifference = currentDate - startDate; 
    const daysSinceProgramming = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const text = 
    `Hi, I’ve just graduated from UTS studying a Bachelor of Computer Science majoring in Enterprise Systems Development and achieving First-Class Honours. I have experience working on several CS projects, from building an AI-powered web app to conducting original academic research for my honours. Starting a career in tech has always been a dream since I was little because it represents the perfect opportunity to combine my passion for learning and of course tech.

    Growing up and experiencing technological boom first hand, I have a deep sentiment for all sorts of tech from the older 2000s internet days to the new cyber, software, and artificial intelligence era and I want to continue pursuing these interests as my very life goal. So, working in tech will grant me this chance to grow and apply my skill set by potentially contributing to impactful projects and modern technologies.
  
    I started off programming in Java during the first year of my degree and then moved on to learning C# for .NET applications and Python for general scripting and AI related activities. There was a short period where I learnt data structures and algorithms exclusively through C++. Throughout my time at university I've gained the experience and skills in web, mobile, game and AI development.
  
    Currently, I'm developing a web application as a learning project to understand the backend side of microservice architecture and cloud computing using Docker and Kubernetes. This project involves building a real-time bidding platform for rare collectibles (anime figurines, gacha items, and TCG cards) in .NET using C#, Next.JS and TypeScript with a combination of Postgres and MongoDB for different services. By working with microservices, I'm also able to learn how to use industry backend tools like RabbitMQ, gRPC, and SignalR for event-driven messaging, efficient communication, and real-time updates.
  
    Days since I started programming: ${daysSinceProgramming}.

    (Last updated: ${month} ${year})`;
  
    const typingTextElement = document.getElementById("typing-text");
    let index = 0;
    const speed = 5; // adjust typing speed (in milliseconds)

    function typeWriter() {
        if (index < text.length) {
            // check if the current character is a newline
            if (text.charAt(index) === '\n') {
                // close the current paragraph and start a new one
                typingTextElement.innerHTML += '</p><p>';
            } else {
                // add the current character
                typingTextElement.innerHTML += text.charAt(index);
            }
            // add the cursor after the current character
            typingTextElement.innerHTML += '<span class="cursor">&#8203;</span>';
            // remove the cursor from the previous character
            const previousCursor = typingTextElement.querySelector('.cursor:not(:last-child)');
            if (previousCursor) {
                previousCursor.remove();
            }
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // add blinking animation to the final cursor
            const finalCursor = typingTextElement.querySelector('.cursor');
            if (finalCursor) {
                finalCursor.classList.add('blinking');
            }
        }
    }

    // start with an opening <p> tag (no initial cursor)
    typingTextElement.innerHTML = '<p>';
    typeWriter();
  });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function() { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter function
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue){
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue == "all"){
            filterItems[i].classList.add("active");
        }
        else if (selectedValue == filterItems[i].dataset.category){
            filterItems[i].classList.add("active");
        }
        else {
            filterItems[i].classList.remove("active");
        }
    }
}

// add event in all filter buttons items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active"); 
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// project modal: select all project items, modal container, close button, and overlay
const projectsItem = document.querySelectorAll("[data-filter-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable: select elements within the modal to display project details
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function: function to toggle the modal visibility
const projectsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < projectsItem.length; i++) {
    projectsItem[i].addEventListener("click", function() {
        event.preventDefault();  // bug fix: prevent anchor tag from scrolling to top
        // populate the modal with the clicked project's details
        modalImg.src = this.querySelector("[data-project-img]").src;
        modalImg.alt = this.querySelector("[data-project-img]").alt;
        modalTitle.innerHTML = this.querySelector("[data-project-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-project-text]").innerHTML;

        // show the modal
        projectsModalFunc();
    });
}

// add click event to close modal button
modalCloseBtn.addEventListener("click", projectsModalFunc);
overlay.addEventListener("click", projectsModalFunc);


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// enable submit button when inputs are valid
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// form submission handler
form.addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent default form submission

    formBtn.innerHTML = "Sending..."; // show loading state
    formBtn.setAttribute("disabled", "");

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert("Message sent successfully!");
            form.reset();
            formBtn.innerHTML = "Send Message";
        } else {
            alert("Failed to send message. Try again.");
            formBtn.innerHTML = "Send Message";
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
        formBtn.innerHTML = "Send Message";
    }

    formBtn.removeAttribute("disabled");
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() == pages[i].dataset.page){
                pages[i].classList.add("active");
                window.scrollTo(0, 0);
            }
            else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    });
}
