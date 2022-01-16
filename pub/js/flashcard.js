"use strict"
class CardSingleSided {
    constructor(front){
        this.front = front
    }
}

class CardDoubleSided {
    constructor(front, back, points){
        this.front = front
        this.back = back
        this.points = points
    }
}

(function(global, document, $) { 
    function InputForm(title){
        this.data = []
        _createInputForm(title)
    }

    function FlashcardsSingleSided(title){
        this.title = title
        this.deck = []
        this.deckCopy = []
        this.favorites = []
        this.currCard = 0
        this.onOriginal = true
        this.animation

        const flashcardPanel = document.createElement('div')
        const flashcard = document.createElement('div')
        flashcard.className = 'flashcard'

        const panel = document.createElement('div')

        const paragraph = document.createElement('p')
        paragraph.className = 'paragraphCard'
        paragraph.innerText = "Start of the deck: " + this.title

        const originalDeckButton = document.createElement('button')
        originalDeckButton.innerText = 'Original Deck'
        originalDeckButton.addEventListener('click', () => {
            if(!this.onOriginal){
                this.onOriginal = true
                this.deck = JSON.parse(JSON.stringify(this.deckCopy))
                this.currCard = 0
                paragraph.innerText = "Start of the deck: " + this.title
                _removeElements([backButton, nextButton, resetButton, shuffleButton, favoriteButton])
                flashcard.append(startButton)
            }
        })

        const favoriteDeckButton = document.createElement('button')
        favoriteDeckButton.innerText = 'Favorited Cards'
        favoriteDeckButton.addEventListener('click', () => {
            if(this.onOriginal){
                this.onOriginal = false
                this.deckCopy = JSON.parse(JSON.stringify(this.deck))
                this.deck = this.favorites
                this.currCard = 0
                paragraph.innerText = "Start of the deck: " + this.title + " (favorited cards)"
                _removeElements([backButton, nextButton, resetButton, shuffleButton, favoriteButton])
                flashcard.append(startButton)
            }
        })

        const nextButton = document.createElement('button')
        nextButton.innerText = 'Next'
        nextButton.addEventListener('click', () =>{
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            if(this.currCard < this.deck.length - 1){
                this.currCard++
            }
            _showSingleSidedCard(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
        })

        const backButton = document.createElement('button')
        backButton.innerText = 'Back'
        backButton.addEventListener('click', () =>{
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            if(this.currCard > 0){
                this.currCard--
            }
            paragraph.innerText = this.deck[this.currCard].front
            _showSingleSidedCard(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)

        })

        const resetButton = document.createElement("button")
        resetButton.innerText = "Reset"
        resetButton.addEventListener('click', () => {
            this.currCard = 0
            paragraph.innerText = "Start of the deck: " + this.title
            flashcard.appendChild(startButton)
            _removeElements([backButton, nextButton, resetButton, shuffleButton, favoriteButton])
        })

        const startButton = document.createElement("button")
        startButton.innerText = "Start"
        startButton.addEventListener('click', () =>{
            if(this.deck.length <= 0){
                paragraph.innerText = "No cards in this deck!"
            }
            else{
                if(this.animation){
                    paragraph.style.animation = 'none'
                    paragraph.offsetHeight
                    paragraph.style.animation = this.animation + ' 2s'
                }
                startButton.remove()
                flashcardPanel.appendChild(backButton)
                flashcardPanel.appendChild(nextButton)
                flashcard.insertAdjacentElement('beforeBegin', shuffleButton)
                flashcard.insertAdjacentElement('beforeBegin', resetButton)
                flashcard.insertAdjacentElement('beforeBegin', favoriteButton)
                paragraph.innerText = this.deck[this.currCard].front
            }
        })

        const shuffleButton = document.createElement('button')
        shuffleButton.innerText = 'Shuffle Deck'
        shuffleButton.addEventListener('click', () =>{
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            this.deck = _shuffleList(this.deck)
            _showSingleSidedCard(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
        })

        const favoriteButton = document.createElement("button")
        favoriteButton.innerText = "Favorite"
        favoriteButton.addEventListener('click', () => {
            if(favoriteButton.innerText === "Favorite"){
                this.favorites.push(this.deck[this.currCard])
                favoriteButton.innerText = "Unfavorite"
            }
            else if (favoriteButton.innerText === "Unfavorite"){
                let count = 0
                let pos = 0
                this.favorites.forEach(card => {
                    if(card.front === this.deck[this.currCard].front){
                        pos = count
                    }
                    count = count + 1
                })
                this.favorites.splice(pos, 1)
                favoriteButton.innerText = "Favorite"
            }
        })

        const previewBar = document.createElement("div")
        previewBar.id = this.title + 'previewBar'
        const previewBarInner = document.createElement("div")

        const viewPreviewButton = document.createElement("button")
        viewPreviewButton.innerText = "View Preview"
        viewPreviewButton.addEventListener('click', () => {
            if (viewPreviewButton.innerText === "View Preview"){
                viewPreviewButton.innerText = "Hide Preview"
                this.deck.forEach(card =>{
                    const cardPreview = document.createElement("p")
                    cardPreview.innerText = card.front
                    previewBarInner.appendChild(cardPreview)
                })
                previewBar.appendChild(previewBarInner)
            }
            else{
                viewPreviewButton.innerText = "View Preview"
                previewBarInner.innerHTML = ''
                previewBarInner.remove()
            }
        })

        shuffleButton.className = 'shuffleButton'
        backButton.className = 'backButton'
        nextButton.className = 'nextbutton'                 
        flashcardPanel.className = 'flashcardPanel'                   
        previewBar.className = 'previewBar'
        panel.className = 'panel'

        previewBar.append(viewPreviewButton)
        flashcard.appendChild(paragraph)
        flashcard.appendChild(startButton)
        flashcardPanel.appendChild(originalDeckButton)
        flashcardPanel.appendChild(favoriteDeckButton)
        flashcardPanel.appendChild(flashcard)
        panel.appendChild(previewBar)
        panel.appendChild(flashcardPanel)

        const body = document.querySelector('body')
        body.append(panel)
    }


    function FlashcardsDoubleSided(title){
        this.title = title
        this.deck = []
        this.deckCopy = []
        this.currCard = 0
        this.front = true
        this.numCorrect = 0
        this.points = 0
        this.skipEnabled = true
        this.favorites = []
        this.onOriginal = true
        this.sortBy = 'points'
        this.leaderboardEnabled = true
        this.animation

        const flashcardPanel = document.createElement('div')

        const flashcard = document.createElement('div')
        flashcard.className = 'flashcard'

        const panel = document.createElement('div')
        panel.className = 'panel'

        const paragraph = document.createElement('p')
        paragraph.innerText = "Start of the deck: " + this.title
        paragraph.className = 'paragraphCard'
        const startButton = document.createElement("button")

        const originalDeckButton = document.createElement('button')
        originalDeckButton.innerText = 'Original Deck'
        originalDeckButton.addEventListener('click', () => {
            if(!this.onOriginal){
                this.onOriginal = true
                this.deck = JSON.parse(JSON.stringify(this.deckCopy))
                this.currCard = 0
                paragraph.innerText = "Start of the deck: " + this.title
                _removeElements([resetButton, shuffleButton, favoriteButton, skipButton, correctButton, incorrectButton, checkAnswerButton])
                flashcard.append(startButton)
            }
        })

        const favoriteDeckButton = document.createElement('button')
        favoriteDeckButton.innerText = 'Favorited Cards'
        favoriteDeckButton.addEventListener('click', () => {
            if(this.onOriginal){
                this.onOriginal = false
                this.deckCopy = JSON.parse(JSON.stringify(this.deck))
                this.deck = this.favorites
                this.currCard = 0
                this.numCorrect = 0
                this.points = 0
                paragraph.innerText = "Start of the deck: " + this.title + " (favorited cards)"
                _removeElements([resetButton, shuffleButton, favoriteButton, skipButton, correctButton, incorrectButton, checkAnswerButton])
                flashcard.append(startButton)
            }
        })

        startButton.innerText = "Start"
        startButton.addEventListener('click', () =>{
            if(this.deck.length <= 0){
                paragraph.innerText = "No cards in this deck!"
            }
            else{
                if(this.animation){
                    paragraph.style.animation = 'none'
                    paragraph.offsetHeight
                    paragraph.style.animation = this.animation + ' 2s'
                }
                startButton.remove()
                flashcardPanel.appendChild(resetButton)
                flashcardPanel.appendChild(shuffleButton)
                flashcard.insertAdjacentElement('beforeBegin', shuffleButton)
                flashcard.insertAdjacentElement('beforeBegin', resetButton)
                flashcard.insertAdjacentElement('beforeBegin', favoriteButton)

                _addCheckAnswerAndSkipButtons(flashcardPanel, checkAnswerButton, skipButton, this.skipEnabled)
                _showFront(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
            }
        })

        const checkAnswerButton = document.createElement('button')
        checkAnswerButton.innerText = 'Check Answer'
        checkAnswerButton.addEventListener('click', () =>{
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            this.front = false
            _showBack(paragraph, this.deck, this.currCard)
            _addCorrectAndIncorrectButtons(flashcardPanel, correctButton, incorrectButton)
            _removeElements([checkAnswerButton, skipButton])
            shuffleButton.remove()
        })

        const skipButton = document.createElement('button')
        skipButton.innerText = "Skip"
        skipButton.addEventListener('click', ()=> {
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            this.deck.push(this.deck[this.currCard])
            this.deck.splice(this.currCard, 1)
            _showFront(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
        })

        const shuffleButton = document.createElement('button')
        shuffleButton.innerText = 'Shuffle Deck'
        shuffleButton.addEventListener('click', () =>{
            if(this.animation){
                paragraph.style.animation = 'none'
                paragraph.offsetHeight
                paragraph.style.animation = this.animation + ' 2s'
            }
            const remainingDeck = _shuffleList(this.deck.slice(this.currCard, this.deck.length))
            this.deck = this.deck.slice(0, this.currCard).concat(remainingDeck)
            _showFront(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
        })


        const correctButton = document.createElement('button')
        correctButton.innerText = 'I answered correct!'
        correctButton.addEventListener('click', () =>{
            if(!this.front){
                this.points += this.deck[this.currCard].points
                this.numCorrect++
            }
            if(this.currCard >= this.deck.length - 1){
                paragraph.innerText = "You got " + this.numCorrect + "/" + this.deck.length +" correct! "+ "You scored " + this.points + " points!"
                _removeElements([correctButton, incorrectButton, favoriteButton, shuffleButton])
                if(this.leaderboardEnabled){
                    _leaderboard(panelLeaderboard, this.numCorrect, this.points, this.sortBy)
                }
                this.currCard = 0
                this.points = 0
                this.numCorrect = 0
                return
            }
            if(this.currCard < this.deck.length - 1 && !this.front){
                if(this.animation){
                    paragraph.style.animation = 'none'
                    paragraph.offsetHeight
                    paragraph.style.animation = this.animation + ' 2s'
                }
                this.currCard++
                this.front = true
                _showFront(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
                flashcard.insertAdjacentElement('beforeBegin', shuffleButton)
                _addCheckAnswerAndSkipButtons(flashcardPanel, checkAnswerButton, skipButton, this.skipEnabled)
                _removeElements([correctButton, incorrectButton])
            }
        })

        const incorrectButton = document.createElement('button')
        incorrectButton.innerText = 'I answered wrong!'

        incorrectButton.addEventListener('click', () => {
            if(this.currCard >= this.deck.length - 1){
                _removeElements([correctButton, incorrectButton, favoriteButton, shuffleButton])
                paragraph.innerText = "You got " + this.numCorrect + "/" + this.deck.length +" correct! " + "You scored " + this.points + " points!"
                if(this.leaderboardEnabled){
                    _leaderboard(panelLeaderboard, this.numCorrect, this.points, this.sortBy)
                }
                this.currCard = 0
                this.points = 0
                this.numCorrect = 0
                return
            }
            if(this.currCard < this.deck.length - 1){
                if(this.animation){
                    paragraph.style.animation = 'none'
                    paragraph.offsetHeight
                    paragraph.style.animation = this.animation + ' 2s'
                }
                this.currCard++
                this.front = true
                _showFront(paragraph, this.deck, this.currCard, favoriteButton, this.favorites)
                flashcard.insertAdjacentElement('beforeBegin', shuffleButton)
                _addCheckAnswerAndSkipButtons(flashcardPanel, checkAnswerButton, skipButton, this.skipEnabled)
                _removeElements([correctButton, incorrectButton])
            }
        })

        const resetButton = document.createElement("button")
        resetButton.innerText = "Reset"
        resetButton.addEventListener('click', () => {
            this.currCard = 0
            this.numCorrect = 0
            this.points = 0
            this.front = true
            paragraph.innerText = "Start of the deck: " + this.title
            flashcard.appendChild(startButton)
            _removeElements([resetButton, shuffleButton, favoriteButton, skipButton, correctButton, incorrectButton, checkAnswerButton])
        })

        const favoriteButton = document.createElement("button")
        favoriteButton.innerText = "Favorite"
        favoriteButton.addEventListener('click', () => {
            if(favoriteButton.innerText === "Favorite"){
                this.favorites.push(this.deck[this.currCard])
                favoriteButton.innerText = "Unfavorite"
            }
            else if (favoriteButton.innerText === "Unfavorite"){
                let count = 0
                let pos = 0
                this.favorites.forEach(card => {
                    if(card.front === this.deck[this.currCard].front && card.back === this.deck[this.currCard].back){
                        pos = count
                    }
                    count = count + 1
                })
                this.favorites.splice(pos, 1)
                favoriteButton.innerText = "Favorite"
            }
        })

        const previewBar = document.createElement("div")
        previewBar.id = this.title + 'previewBar'
        const previewBarInner = document.createElement("div")

        const viewPreviewButton = document.createElement("button")
        viewPreviewButton.innerText = "View Preview"
        viewPreviewButton.addEventListener('click', () => {
            if (viewPreviewButton.innerText === "View Preview"){
                viewPreviewButton.innerText = "Hide Preview"
                this.deck.forEach(card =>{
                    const cardPreview = document.createElement("p")
                    cardPreview.innerText = card.front
                    previewBarInner.appendChild(cardPreview)
                })
                previewBar.appendChild(previewBarInner)
            }
            else{
                viewPreviewButton.innerText = "View Preview"
                previewBarInner.innerHTML = ''
                previewBarInner.remove()
            }
        })

        flashcardPanel.className = 'flashcardPanel'               
        previewBar.className = 'previewBar'
        skipButton.className = 'skipButton'
        checkAnswerButton.className = 'checkAnswerButton'
        correctButton.className = 'correctButton'
        incorrectButton.className = 'incorrectButton'

        previewBar.append(viewPreviewButton)

        flashcard.appendChild(paragraph)
        flashcard.appendChild(startButton)
        flashcardPanel.appendChild(originalDeckButton)
        flashcardPanel.appendChild(favoriteDeckButton)
        flashcardPanel.appendChild(flashcard)
        panel.append(previewBar)
        panel.appendChild(flashcardPanel)

        const panelLeaderboard = document.createElement('div')
        panelLeaderboard.className = 'panelLeaderboard'

        const p = document.createElement('strong')
        p.innerText = 'Leaderboard'
        panelLeaderboard.appendChild(p)
        panelLeaderboard.id = this.title + "panelLeaderboard"
        let scores = JSON.parse(localStorage.getItem("scores") || "[]");    
        scores.forEach(s => {
            const p = document.createElement('p')
            p.innerText = s.dateAndTime + ' | ' + s.numCorrect + ' correct answers | ' + s.points + ' points'
            panelLeaderboard.appendChild(p)
        })
        panel.appendChild(panelLeaderboard)

        const body = document.querySelector('body')
        body.append(panel)
    }

    function _createInputForm(title){
        const panel = document.createElement('div')
        panel.style = 'font-family: Verdana; margin-left: 3%; background-color: #e6ffff; padding: 15px 15px; width: 50%;'
        const form = document.createElement('form')

        let titleHeader = document.createElement('h3')
        titleHeader.innerText = title

        const labelTitle = document.createElement('label')
        labelTitle.innerText = "Enter flashcard title:"

        let titleInput = document.createElement('input')
        titleInput.setAttribute("type", "text")

        let labelSingleDouble = document.createElement('label')
        labelSingleDouble.innerText = "Select type of flashcard:"

        let labelSingle = document.createElement('label')
        labelSingle.innerText = "Single-sided"
        let radioSingle = document.createElement('input')
        radioSingle.setAttribute("type", "radio")
        radioSingle.setAttribute("id", "single")
        radioSingle.setAttribute("value", "single")
        radioSingle.setAttribute("name", "radio")

        let divInput = document.createElement('div')
        divInput.id = 'divCardValueInput'
        const textArea = document.createElement('textarea')
        radioSingle.addEventListener("change", (e)=> {
            let t =document.querySelector('#divCardValueInput')
            if (t){
                t.innerHTML = ''
            }
            textArea.className = 'singleTextArea'
            const text = document.createElement('p')
            text.innerText = "Enter what will go on each flaschard, separated by a comma:"
            
            divInput.appendChild(text)
            divInput.appendChild(textArea)
            form.appendChild(divInput)
        })

        let labelDouble = document.createElement('label')
        labelDouble.innerText = "Double-sided"
        let radioDouble = document.createElement('input')
        radioDouble.setAttribute("type", "radio")
        radioDouble.setAttribute("id", "double")
        radioDouble.setAttribute("value", "double")
        radioDouble.setAttribute("name", "radio")
        radioDouble.addEventListener("change", (e)=> {
            let t =document.querySelector('#divCardValueInput')
            if (t){
                t.innerHTML = ''
            }
            const text = document.createElement('p')
            text.innerText = "Enter the question(front-side), answer(back-side) and number of points for each flashcard in the following format: question1, answer1, points1, question2, answer2, points2, etc..."
            
            divInput.appendChild(text)
            divInput.appendChild(textArea)
            form.appendChild(divInput)
        })

        const submitButton = document.createElement("button")
        submitButton.innerText = "Create flashcards"

        submitButton.addEventListener("click", ()=>{
            const titleUser = titleInput.value
            let cardValues = textArea.value.split(',');
            if(textArea.value === ''){
                alert("Field left blank. Please enter some values for your cards.")
                return
            }
            if (radioSingle.checked){
                const fs = new FlashcardsSingleSided(titleUser)
                for(let i = 0;i < cardValues.length;i++){
                    fs.addSingleSidedCard(cardValues[i])
                }
            }
            else if (radioDouble.checked){
                if(cardValues.length%3 != 0){
                    alert('Enter an answer and number of points for each question(there must be 3 values for each card).')
                    return
                }
                const fs = new FlashcardsDoubleSided(titleUser)
                for(let i = 0;i < cardValues.length;i+=3){
                    fs.addDoubleSidedCard(cardValues[i], cardValues[i+1], cardValues[i+2])
                }
                fs.disableLeaderboard()

            }

        })

        form.appendChild(titleHeader)

        form.appendChild(labelTitle)
        form.appendChild(titleInput)
        form.appendChild(document.createElement("br"))
        form.appendChild(document.createElement("br"))

        form.appendChild(labelSingleDouble)
        form.appendChild(radioSingle)
        form.appendChild(labelSingle)
        form.appendChild(radioDouble)
        form.appendChild(labelDouble)
        
        form.appendChild(document.createElement("br"))

        panel.appendChild(form)
        panel.appendChild(document.createElement('br'))
        panel.appendChild(submitButton)
        panel.appendChild(document.createElement('br'))
        panel.appendChild(document.createElement('br'))

        const body = document.querySelector('body')
        body.append(panel)
        }
    function _removeElements(array){
        array.forEach(a => {
            a.remove()
        })
    }

    function _showSingleSidedCard(paragraph, deck, currCard, favoriteButton, favorites){
        paragraph.innerText = deck[currCard].front
    
        let alreadyFavorited = false
        favorites.forEach(card => {
            if (deck[currCard].front === card.front && deck[currCard].back === card.back){
                alreadyFavorited = true
            }
        })
        if(!alreadyFavorited){
            favoriteButton.innerText = "Favorite"
        }
        else{
            favoriteButton.innerText = "Unfavorite"
        }
    }
        
    function _leaderboard(flashcard, numCorrect, points, sortBy){
        flashcard.innerHTML = ''
        
        let scores = JSON.parse(localStorage.getItem("scores") || "[]");

        const currentdate = new Date(); 
        let dateAndTime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " at "  
                    + currentdate.getHours() + ":"  
        const min = currentdate.getMinutes()
        if (min < 10){
            dateAndTime = dateAndTime + '0'
        }
        dateAndTime = dateAndTime + min
        
        scores.push({dateAndTime: dateAndTime, numCorrect: numCorrect, points: points})
        
        if(sortBy === 'points'){
            scores.sort((s1, s2) => {
                return s2.points - s1.points
            })
        }
        else {
            scores.sort((s1, s2) => {
                return s2.numCorrect - s1.numCorrect
            })
        }

        scores = scores.slice(0, 10)

        const p = document.createElement('strong')
        p.innerText = 'Leaderboard'
        flashcard.appendChild(p)

        scores.forEach(s => {
            const p = document.createElement('p')
            p.style = 'font-family: Verdana;'
            p.innerText = s.dateAndTime + ' | ' + s.numCorrect + ' correct answers | ' + s.points + ' points'
            flashcard.appendChild(p)
        })
        
        localStorage.setItem("scores", JSON.stringify(scores));
    }

    function _showFront(paragraph, deck, currCard, favoriteButton, favorites){
        paragraph.innerText = "Question:" + deck[currCard].front
        let alreadyFavorited = false
        favorites.forEach(card => {
            if (deck[currCard].front === card.front && deck[currCard].back === card.back){
                alreadyFavorited = true
            }
        })
        if(!alreadyFavorited){
            favoriteButton.innerText = "Favorite"
        }
        else{
            favoriteButton.innerText = "Unfavorite"
        }
    }

    function _showBack(paragraph, deck, currCard){
        paragraph.innerText = "Answer:" + deck[currCard].back
    }

    function _addCheckAnswerAndSkipButtons(flashcard, checkAnswerButton, skipButton, skipEnabled){
        flashcard.appendChild(checkAnswerButton)
        if(skipEnabled){
                flashcard.appendChild(skipButton)
        }
    }

    function _addCorrectAndIncorrectButtons(flashcard, correctButton, incorrectButton){
        flashcard.appendChild(incorrectButton)
        flashcard.appendChild(correctButton)
    }

    function _shuffleList(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    FlashcardsSingleSided.prototype = {
        getAllOriginalCards: function(){
            return this.deck
        },
        getAllFavoritedCards: function(){
            return this.favorites
        },
        addSingleSidedCard: function(front){
            this.deck.push(new CardSingleSided(front))
        },
        removeSingleSidedCard: function(front){
            this.deck = this.deck.filter(card => {
                if(card.front != front){
                    return card
                }
            })
            this.favorites = this.favorites.filter(card => {
                if(card.front != front){
                    return card
                }
            })
        },
        addFavorite: function(front){
            this.favorites.push(new CardSingleSided(front))
        },
        shuffleDeck: function(){
            _shuffleList(this.deck)
        },
        disablePreview: function(){
            document.getElementById(this.title + 'previewBar').remove()
        },
        selectAnimation: function(animation){
            if(animation === 'fade' || animation === 'move' || animation === 'move-and-fade' || animation === 'spin' || animation === 'roll-blur' || animation === 'grow'){
                this.animation = animation
            }
        }

    }

    FlashcardsDoubleSided.prototype = {
        getAllOriginalCards: function(){
            return this.deck
        },
        getAllFavoritedCards: function(){
            return this.favorites
        },
        addDoubleSidedCard: function(front, back, points){
            this.deck.push(new CardDoubleSided(front, back, points))
        },
        addFavorite: function(front, back, points){
            this.favorites.push(new CardDoubleSided(front, back, points))
        },
        removeDoubleSidedCard: function(front, back){
            this.deck = this.deck.filter(card => {
                if(card.front != front || card.back != back){
                    return card
                }
            })
            this.favorites = this.favorites.filter(card => {
                if(card.front != front || card.back != back){
                    return card
                }
            })
        },
        disableSkip: function(){
            this.skipEnabled = false
        },
        shuffleDeck: function(){
            _shuffleList(this.deck)
        },
        disablePreview: function(){
            document.getElementById(this.title + 'previewBar').remove()
        },
        disableLeaderboard: function(){
            this.leaderboardEnabled = false
            document.getElementById(this.title + "panelLeaderboard").remove()
        },
        sortLeaderboardBy: function(sortBy){
            this.sortBy = sortBy
            const panelLeaderboard = document.getElementById(this.title + "panelLeaderboard")

            let scores = JSON.parse(localStorage.getItem("scores") || "[]");  
            
            if(this.sortBy === 'points'){
                scores.sort((s1, s2) => {
                    return s2.points - s1.points
                })
            }
            else {
                scores.sort((s1, s2) => {
                    return s2.numCorrect - s1.numCorrect
                })
            }
        
            scores = scores.slice(0, 10)

            panelLeaderboard.innerHTML = ''
            const p = document.createElement('strong')
            p.innerText = 'Leaderboard'
            panelLeaderboard.appendChild(p)
        
            scores.forEach(s => {
                const p = document.createElement('p')
                p.innerText = s.dateAndTime + ' | ' + s.numCorrect + ' correct answers | ' + s.points + ' points'
                panelLeaderboard.appendChild(p)
            })
        },
        selectAnimation: function(animation){
            if(animation === 'fade' || animation === 'move' || animation === 'move-and-fade' || animation === 'spin' || animation === 'roll-blur' || animation === 'grow'){
                this.animation = animation
            }
        }
    }

    global.FlashcardsSingleSided = global.FlashcardsSingleSided|| FlashcardsSingleSided
    global.FlashcardsDoubleSided = global.FlashcardsDoubleSided|| FlashcardsDoubleSided
    global.InputForm= global.InputForm|| InputForm
})(window, window.document, $); 

