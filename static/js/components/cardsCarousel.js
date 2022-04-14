
/**
 * creates horizontally placed cards carousel
 * @param {Array} cardsData json array
 */
function createCardsCarousel(cardsData) {
    let cards = "";
    const colors = {
        red: "81, 212, 229",
        green: "81, 212, 229",
        blue: "81, 212, 229"
    }
    const keys = Object.keys(colors);
    cardsData.map((card_item) => {
        const item = `
        <div class="carousel_cards in-left">
            
            <div class="cardFooter"> 
                <p class="cardTitle" style="background-color: rgba(${colors[keys[keys.length * Math.random() << 0]]}, .9)" title="abc">${card_item.title}</p>
                <div class="cardDescription">
                    <p class="cardDescription__item">${card_item.description.date}</p>
                    <p class="cardDescription__item">${card_item.description.time}</p>
                    <p class="cardDescription__item">${card_item.description.title}</p>
                    <p class="cardDescription__item">${card_item.description.room}</p>
                    <p class="cardDescription__item">${card_item.description.lecturer}</p>
                    <p class="cardDescription__item">${card_item.description.building}</p>
                </div>
            </div>
        </div>`;
        cards += item;
    });
    const cardContents = `<div id="paginated_cards" class="cards"> <div class="cards_scroller">${cards} <span class="arrow prev fa fa-chevron-circle-left hidden "></span> <span class="arrow next fa fa-chevron-circle-right" ></span> </div> </div>`;
    return cardContents;
}

/**
 * appends cards carousel on to the chat screen
 * @param {Array} cardsToAdd json array
 */
function showCardsCarousel(cardsToAdd) {
    const cards = createCardsCarousel(cardsToAdd);

    $(cards).appendTo(".chats").show();

    if (cardsToAdd.length <= 2) {
        $(`.cards_scroller>div.carousel_cards:nth-of-type(2)`).fadeIn(3000);
    } else {
        for (let i = 0; i < cardsToAdd.length; i += 1) {
            $(`.cards_scroller>div.carousel_cards:nth-of-type(${i})`).fadeIn(3000);
        }
        $(".cards .arrow.prev").fadeIn("3000");
        $(".cards .arrow.next").fadeIn("3000");
    }

    scrollToBottomOfResults();

    const card = document.querySelector("#paginated_cards");
    const card_scroller = card.querySelector(".cards_scroller");
    const card_item_size = 225;

    /**
     * For paginated scrolling, simply scroll the card one item in the given
     * direction and let css scroll snaping handle the specific alignment.
     */
    function scrollToNextPage() {
        card_scroller.scrollBy(card_item_size, 0);
    }

    function scrollToPrevPage() {
        card_scroller.scrollBy(-card_item_size, 0);
    }

    function toggleArrow(arrow) {
        if (arrow.classList.contains('hidden'))
        arrow.classList.remove('hidden');
    }

    function scrolled() {
        const scroller = document.querySelector('.cards_scroller');
        const leftArrow = document.querySelector('.arrow.prev')
        const rightArrow = document.querySelector('.arrow.next')
        if (scroller.scrollLeft < 5) {
            leftArrow.classList.add('hidden');
        } else {
            leftArrow.classList.remove('hidden');
        }

        if (scroller.scrollWidth - scroller.scrollLeft == scroller.clientWidth) {
            rightArrow.classList.add('hidden');
        } else {
            rightArrow.classList.remove('hidden');
        }
    }

    card.querySelector(".arrow.next").addEventListener("click", scrollToNextPage);
    card.querySelector(".arrow.prev").addEventListener("click", scrollToPrevPage);
    document.querySelector('.cards_scroller').addEventListener('scroll', scrolled);
    $(".usrInput").focus();
}