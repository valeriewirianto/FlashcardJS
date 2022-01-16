"use strict";

const body = document.querySelector('body')

const singleSidedTitle = document.createElement('h2')
singleSidedTitle.style=`font-size: 180%;
                        font-weight: 100;
                        color: #13349E;
                        margin-left: 3%;`
singleSidedTitle.innerText = "Single sided flashcard deck"

const pSingle= document.createElement('p')
pSingle.style = 'margin-left: 3%;'
pSingle.innerText = 'A deck with single sided flashcards. Ability to shuffle the deck, reset the deck to start at the beginning, and favorite cards. Favorited cards viewed under Favorited Cards. Original deck viewed under Original Deck. Side preview on the left to view all cards in deck.'
body.append(singleSidedTitle)
body.append(pSingle)

const f = new FlashcardsSingleSided("Quotes")

f.addSingleSidedCard("“You only live once, but if you do it right, once is enough.” — Mae West")
f.addSingleSidedCard("“Never let the fear of striking out keep you from playing the game.”– Babe Ruth")
f.addSingleSidedCard("“Not how long, but how well you have lived is the main thing.” — Seneca")
f.addSingleSidedCard("“In order to write about life first you must live it.”– Ernest Hemingway")
f.addSingleSidedCard("“Turn your wounds into wisdom.” — Oprah Winfrey")
f.addSingleSidedCard("“Don’t settle for what life gives you; make life better and build something.” — Ashton Kutcher")
f.addSingleSidedCard("“You never really learn much from hearing yourself speak.” ― George Clooney")
f.addSingleSidedCard("“Live for each second without hesitation.” — Elton John")


const singleJs= document.createElement('p')
singleJs.innerText = `const f = new FlashcardsSingleSided("Quotes")

f.addSingleSidedCard("“You only live once, but if you do it right, once is enough.” — Mae West")
f.addSingleSidedCard("“Never let the fear of striking out keep you from playing the game.”– Babe Ruth")
f.addSingleSidedCard("“Not how long, but how well you have lived is the main thing.” — Seneca")
f.addSingleSidedCard("“In order to write about life first you must live it.”– Ernest Hemingway")
f.addSingleSidedCard("“Turn your wounds into wisdom.” — Oprah Winfrey")
f.addSingleSidedCard("“Don’t settle for what life gives you; make life better and build something.” — Ashton Kutcher")
f.addSingleSidedCard("“You never really learn much from hearing yourself speak.” ― George Clooney")
f.addSingleSidedCard("“Live for each second without hesitation.” — Elton John")
`

singleJs.style = `font-family: 	Courier New; background-color: #EFFDFF; align-self: center; padding: 40px 20px; margin-left: 3%; width: 90%;`

body.append(singleJs)

body.append(document.createElement('hr'))
body.append(document.createElement('br'))
const doubleSidedTitle = document.createElement('h2')
doubleSidedTitle.style=`font-size: 180%;
                        font-weight: 100;
                        color: #13349E;
                        margin-left: 3%;`
doubleSidedTitle.innerText = "Double sided flashcard deck"

const pDouble = document.createElement('p')
pDouble.style ='margin-left: 3%;'
pDouble.innerText = 'A deck with double sided cards, each worth a number of points. Leaderboard on the right of top 10 scores ranked by points on this PC. A few cards added immediately into the Favorited Cards by the developer.'
body.append(doubleSidedTitle)
body.append(pDouble)


const f2 = new FlashcardsDoubleSided("French Words")

f2.addDoubleSidedCard("Bienvenue", "Welcome", 10)
f2.addDoubleSidedCard("Bonjour", "Hello", 10)
f2.addDoubleSidedCard("Je", "I", 10)
f2.addDoubleSidedCard("Son", "His", 10)
f2.addDoubleSidedCard("Pour", "For", 10)
f2.addDoubleSidedCard("Car", "Because", 10)
f2.addDoubleSidedCard("Comment", "How", 10)
f2.addDoubleSidedCard("Mais", "But", 10)

f2.addFavorite("Mais", "But", 10)
f2.addFavorite("Pour", "For", 10)
f2.addFavorite("Je", "I", 10)



const doubleJs= document.createElement('p')
doubleJs.innerText = `const f2 = new FlashcardsDoubleSided("French Words")

f2.addDoubleSidedCard("Bienvenue", "Welcome", 10)
f2.addDoubleSidedCard("Bonjour", "Hello", 10)
f2.addDoubleSidedCard("Je", "I", 10)
f2.addDoubleSidedCard("Son", "His", 10)
f2.addDoubleSidedCard("Pour", "For", 10)
f2.addDoubleSidedCard("Car", "Because", 10)
f2.addDoubleSidedCard("Comment", "How", 10)
f2.addDoubleSidedCard("Mais", "But", 10)

f2.addFavorite("Mais", "But", 10)
f2.addFavorite("Pour", "For", 10)
f2.addFavorite("Je", "I", 10)
`
doubleJs.style = `font-family: 	Courier New; background-color: #EFFDFF; align-self: center; padding: 40px 20px;
margin-left: 3%; width: 90%;`

body.append(doubleJs)


body.append(document.createElement('hr'))
body.append(document.createElement('br'))

const animationTitle = document.createElement('h2')
animationTitle.style=`font-size: 180%;
                        font-weight: 100;
                        color: #13349E;
                        margin-left: 3%;`
animationTitle.innerText = "Animations"

const pAnimation = document.createElement('p')
pAnimation.style ='margin-left: 3%;'
pAnimation.innerText = 'A deck with a roll and blur animation.'
const pAnimation2 = document.createElement('p')
pAnimation2.style ='margin-left: 3%;'
pAnimation2.innerText = 'A deck with a growing/enlargening animation.'
body.append(animationTitle)
body.append(pAnimation)

const a1= document.createElement('p')
a1.innerText = `const f3 = new FlashcardsSingleSided("A walk through CSC309")
f3.addSingleSidedCard("New Beginnings")
f3.addSingleSidedCard("HTML and CSS")
f3.addSingleSidedCard("Triggering events")
f3.addSingleSidedCard("Reacting to React")
f3.addSingleSidedCard("I Promise")
f3.addSingleSidedCard("I like Mongooses")
f3.addSingleSidedCard("A long journey home")
f3.disablePreview()
f3.selectAnimation('roll-blur')
`
a1.style = `font-family: Courier New; background-color: #EFFDFF; align-self: center; float: left; padding: 110px 30px; margin-right: 2%; margin-left: 5%;`

body.append(a1)

const f3 = new FlashcardsSingleSided("A walk through CSC309")
f3.addSingleSidedCard("New Beginnings")
f3.addSingleSidedCard("HTML and CSS")
f3.addSingleSidedCard("Triggering events")
f3.addSingleSidedCard("Reacting to React")
f3.addSingleSidedCard("I Promise")
f3.addSingleSidedCard("I like Mongooses")
f3.addSingleSidedCard("A long journey home")
f3.disablePreview()
f3.selectAnimation('roll-blur')



body.append(pAnimation2)
const a2= document.createElement('p')
a2.innerText = `const f4 = new FlashcardsSingleSided("  A walk through CSC309  ")
f4.addSingleSidedCard("New Beginnings")
f4.addSingleSidedCard("HTML and CSS")
f4.addSingleSidedCard("Triggering events")
f4.addSingleSidedCard("Reacting to React")
f4.addSingleSidedCard("I Promise")
f4.addSingleSidedCard("I like Mongooses")
f4.addSingleSidedCard("A long journey home")
f4.disablePreview()
f4.selectAnimation('grow')
`
a2.style = `font-family: Courier New; background-color: #EFFDFF; align-self: center; float: left; padding: 110px 30px; margin-right: 2%; margin-left: 5%;`
body.append(a2)

const f4 = new FlashcardsSingleSided("  A walk through CSC309  ")
f4.addSingleSidedCard("New Beginnings")
f4.addSingleSidedCard("HTML and CSS")
f4.addSingleSidedCard("Triggering events")
f4.addSingleSidedCard("Reacting to React")
f4.addSingleSidedCard("I Promise")
f4.addSingleSidedCard("I like Mongooses")
f4.addSingleSidedCard("A long journey home")
f4.disablePreview()
f4.selectAnimation('grow')

body.append(document.createElement('hr'))
body.append(document.createElement('br'))



const inputFormTitle = document.createElement('h2')
inputFormTitle.style=`font-size: 180%;
                        font-weight: 100;
                        color: #13349E;
                        margin-left: 3%;`
inputFormTitle.innerText = "Input form"

const pForm= document.createElement('p')
pForm.style = 'margin-left: 3%;'
pForm.innerText = 'An input form for developers to allow users to create their own flashcard decks.'
body.append(inputFormTitle)
body.append(pForm)

const i= document.createElement('p')
i.innerText = `const form = new InputForm("Create your own deck here!")`
i.style = `font-family: Courier New; background-color: #EFFDFF; padding: 30px 30px; margin-left: 3%; width: 40%;`
body.append(i)
const form = new InputForm("Create your own deck here!")