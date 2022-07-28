import React, { useState, useEffect} from 'react';
import {Cards} from './Cards'
import {Cards2} from './Cards2'
import Header from './Header';
import Footer from './Footer'
import SingleCard from './SingleCard'
import {doc, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore";
import {auth, db} from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Homepage(){
    const [user, loading] = useAuthState(auth);
    const [cards, setCards] = useState([])
    const [switchCards, setSwitchCards] = useState(false)
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [matched, setMatched] = useState(0)
    const [bestScore, setBestScore] = useState()

    //shuffle cards
    const shuffleCards = () => {
        if(switchCards === false) {
            const shuffledCards = [...Cards, ...Cards]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({...card, id: Math.random()}))
            setChoiceOne(null)
            setChoiceTwo(null)
            setCards(shuffledCards)
            setTurns(0)
        } else if (switchCards === true) {
            const shuffledCards = [...Cards2, ...Cards2]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
            setChoiceOne(null)
            setChoiceTwo(null)
            setCards(shuffledCards)
            setTurns(0)
        }
    }
    const handleSwitchCardsCars = () => {
        setSwitchCards(prevState => !prevState)
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
    },[switchCards])

    useEffect(() => {
        if(user){
            onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
                const bestScore = (doc.data().turns).sort((a, b) => a - b).filter((el) => el !== 0);
                setBestScore(bestScore[0])
            })}
    },[user])

    const sendNumberOfTurns = async () => {
        if(cards.length === matched.length) {
            try {
                const user = auth.currentUser;
                const userRef = doc(db, "users", `${user.email}`)
                await updateDoc(userRef, {
                    turns: arrayUnion(turns),
                });
            } catch (err) {
                console.error(err)
                alert(err.message);
            }
        }
    }

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


    if(cards.length === matched.length) {
        sendNumberOfTurns()
    }

    return (
        <>
            <Header props={shuffleCards} bestScore={bestScore} handleSwitchCardsCars={handleSwitchCardsCars} switchCards={switchCards}/>
            <section className={switchCards === false ? "cards" : "cards_cars"}>
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                        switchCards={switchCards}
                        />
                ))}
            </section>
            {(cards.length === matched.length) && <h1 className="success">Congratulations!! You finished in {turns} turns :)</h1>}
            <Footer turns={turns} switchCards={switchCards}/>
        </>
    )
}