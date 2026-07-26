// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================
       1. BUTTON ROUTING
    ========================== */
    // Select all buttons on the page
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const buttonText = e.target.innerText.toLowerCase();

            // Route "Learn More" buttons to the Cybersecurity section
            if (buttonText.includes("learn more")) {
                document.getElementById("cybersecurity").scrollIntoView({ behavior: "smooth" });
            } 
            // Route "Explore Threats" button to the Threats section
            else if (buttonText.includes("explore threats")) {
                document.getElementById("threats").scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ==========================
       2. ACTIVE NAVIGATION HIGHLIGHT
    ========================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Subtracting 150px adjusts the trigger point for the sticky header
            if (pageYOffset >= sectionTop - 150) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Update the navigation links
        navLinks.forEach(link => {
            link.style.color = "#ffffff"; // Reset to default white
            
            // If the link's href matches the current section, turn it red
            if (link.getAttribute("href").includes(currentSectionId) && currentSectionId !== "") {
                link.style.color = "#ff0000"; 
            }
        });
    });

    /* ==========================
       3. FADE-IN ANIMATION FOR LISTS
    ========================== */
    // Select all list items in the Threats and Tips sections
    const listItems = document.querySelectorAll("ol li");

    // Initially hide them slightly
    listItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    // Use IntersectionObserver to reveal them when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    listItems.forEach(item => {
        observer.observe(item);
    });
});
