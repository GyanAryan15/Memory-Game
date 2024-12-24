document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const icons = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍉", "🍍", "🥝"];
    let cards = [...icons, ...icons];
    let flippedCards = [];
    let matchedPairs = 0;
    cards.sort(() => 0.5 - Math.random());
    cards.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    function flipCard() {
        if (this.classList.contains("flipped") || flippedCards.length === 2) return;
        
        this.classList.add("flipped");
        this.textContent = this.dataset.icon;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.icon === card2.dataset.icon) {
            matchedPairs++;
            flippedCards = [];
            
            card1.classList.add("hidden");
            card2.classList.add("hidden");

            if (matchedPairs === icons.length) {
                setTimeout(() => alert("You won!"), 300);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.textContent = "";
                card2.textContent = "";
                flippedCards = [];
            }, 1000);
        }
    }
});
