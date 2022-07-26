import React, { useState, useEffect} from 'react';
import {Cards, CardsBg} from './Cards'
import Header from './Header';
import Footer from './Footer'
import SingleCard from './SingleCard'

export default function Homepage(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [matched, setMatched] = useState(0)

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...Cards, ...Cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    //handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    //compare choices
    useEffect(() => {
        if(choiceOne && choiceTwo) {
            setDisabled(true)
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
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    },[choiceOne, choiceTwo])

    //start game onLoad
    useEffect(() => {
        shuffleCards()
    },[])

    //reset choices
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prev => prev + 1)
        setDisabled(false)
    }

    useEffect(() => {
        const filtered = cards.filter((card) => card.matched)
        setMatched(filtered)
    },[turns])
    console.log(matched)
    console.log(cards)
    console.log(Cards)
    return (
        <>
            <Header props={shuffleCards}/>
            <section className="cards">
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                        />
                ))}
            </section>
            {(cards.length === matched.length) && <h1 className="success">Congratulations!! You finished in {turns} turns :)</h1>}
            <Footer turns={turns}/>
        </>
    )
}