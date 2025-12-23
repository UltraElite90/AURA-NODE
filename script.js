// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Select Plan Buttons
    const selectButtons = document.querySelectorAll('.select-plan-btn');
    const modal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    const selectedPlanDetails = document.getElementById('selectedPlanDetails');
    
    // Select Plan Event
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan');
            const planCard = this.closest('.plan-card');
            
            // Get plan details
            const planTitle = planCard.querySelector('.plan-name').textContent;
            const priceMain = planCard.querySelector('.price-main').textContent;
            const pricePeriod = planCard.querySelector('.price-period').textContent;
            const specs = Array.from(planCard.querySelectorAll('.spec-item')).map(item => item.textContent.trim());
            const currencies = Array.from(planCard.querySelectorAll('.currency')).map(curr => curr.textContent);
            
            // Create HTML for selected plan
            let detailsHTML = `
                <div class="selected-plan">
                    <h3>${planTitle}</h3>
                    <div class="selected-price">
                        <span class="main-price">${priceMain}</span>${pricePeriod}
                    </div>
                    <div class="selected-specs">
                        <h4>Specifications:</h4>
                        <ul>
                            ${specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="selected-currencies">
                        <h4>Prices:</h4>
                        <div class="currency-list">
                            ${currencies.map(currency => `<span class="currency-tag">${currency}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            selectedPlanDetails.innerHTML = detailsHTML;
            modal.style.display = 'block';
            
            // Store in localStorage
            localStorage.setItem('selectedPlan', JSON.stringify({
                name: planName,
                title: planTitle,
                price: priceMain + pricePeriod,
                specs: specs,
                currencies: currencies
            }));
        });
    });
    
    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Discord button tracking
    document.querySelectorAll('.btn-discord, .btn-discord-modal, .discord-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const planData = localStorage.getItem('selectedPlan');
            if(planData) {
                const plan = JSON.parse(planData);
                console.log('User selected plan:', plan.name);
                // You can add analytics here
            }
        });
    });
});

// Netlify Form Handling (if using forms)
if(window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if(!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}