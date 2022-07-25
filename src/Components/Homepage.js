import React, { useState, useEffect} from 'react';
import {Cards} from './Cards'
import Header from './Header';
import Footer from './Footer'

const cardImages = [
    {url: "/assets/card-images/1.jpg",},
    {url: "/assets/card-images/2.jpg",},
    {url: "/assets/card-images/3.jpg",},
    {url: "/assets/card-images/4.jpg",},
    {url: "/assets/card-images/5.jpg",},
    {url: "/assets/card-images/6.jpg",},
    {url: "/assets/card-images/7.jpg",},
    {url: "/assets/card-images/8.jpg",},
    {url: "/assets/card-images/9.jpg",},
    {url: "/assets/card-images/10.jpg",},
    {url: "/assets/card-images/11.jpg",},
    {url: "/assets/card-images/12.jpg",},
    {url: "/assets/card-images/13.jpg",},
]

export default function Homepage(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...Cards, ...Cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setCards(shuffledCards)
        setTurns(0)
    }

    console.log(cards, turns)

    return (
        <>
            <Header props={shuffleCards}/>
            <section className="card_container">
                {cards.map(card => (
                    <div className="card_photo" key={card.id}>
                        <img className="card_front" src={card.url} alt="card_front"/>
                        <img src="/assets/card-images/card-bg.jpeg" alt="card_back"/>
                    </div>
                ))}
            {/*{Cards.map((photo) => {*/}
            {/*    return (*/}
            {/*        <div className="card_photo"*/}
            {/*             key={photo.id}*/}
            {/*             style={{backgroundImage: `url(/${photo.url})`}}/>*/}
            {/*    )*/}
            {/*})}*/}
        </section>
            <Footer/>
        </>
    )
}