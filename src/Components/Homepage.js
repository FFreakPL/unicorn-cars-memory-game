import React, { useState, useEffect} from 'react';
import {Cards, CardsBg} from './Cards'
import Header from './Header';
import Footer from './Footer'
import SingleCard from './SingleCard'

// const cardImages = [
//     {url: "/assets/card-images/1.jpg",},
//     {url: "/assets/card-images/2.jpg",},
//     {url: "/assets/card-images/3.jpg",},
//     {url: "/assets/card-images/4.jpg",},
//     {url: "/assets/card-images/5.jpg",},
//     {url: "/assets/card-images/6.jpg",},
//     {url: "/assets/card-images/7.jpg",},
//     {url: "/assets/card-images/8.jpg",},
//     {url: "/assets/card-images/9.jpg",},
//     {url: "/assets/card-images/10.jpg",},
//     {url: "/assets/card-images/11.jpg",},
//     {url: "/assets/card-images/12.jpg",},
//     {url: "/assets/card-images/13.jpg",},
// ]

export default function Homepage(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)


    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...Cards, ...Cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setCards(shuffledCards)
        setTurns(0)
    }

    //handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        console.log(choiceOne)
        console.log(choiceTwo)
    }

    //compare choices
    useEffect(() => {
        if(choiceOne && choiceTwo) {
            if (choiceOne.url === choiceTwo.url) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.url === choiceOne.url) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                console.log("Brawo!!")
                resetTurn();
            } else {
            console.log("Ni chuja!!")
                resetTurn();
            }
        }
    },[choiceOne, choiceTwo])
    console.log(cards)

    //reset choices
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prev => prev + 1)
    }

    return (
        <>
            <Header props={shuffleCards}/>
            <section className="cards">
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        />
                ))}
        </section>
            <Footer/>
        </>
    )
}