import React from 'react';
import {Menu} from '../../../components/Menu';
import "./Cards.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';


const Cards = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [playOnce, setPlayOnce] = useState(true);
    const [cards, setCards] = useState([]);


    const addCard = () => {
        setCardNumber("");
        axios.post('http://localhost:8888/addCard.php', createForm({
            card_number: cardNumber,
        }))
        .then((response) => {
            if(response.data === false){
                console.log(response.data); //A MODIFIER POUR AFFICHER L'ERREUR SUR LE SITE
            }
            setPlayOnce(true);
        });
    }

    const deleteButton = (id) => {
        axios.get('http://localhost:8888/removeCard.php?id_card='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getCards.php')
            .then((response) => {
                setCards(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Liste des cartes">
                <div className="cards-layout__content">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <Input id="cardNumber" type="text" labelName="Numéro de carte" value={cardNumber} onChange={(cardNumber) => setCardNumber(cardNumber)} placeholder="786645457670099" required/>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none self-end">
                                <Button value="AJOUTER" onClick={addCard}></Button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="text-center py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">NUMERO DE CARTE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {cards.map((card) => (
                                                    <tr key={card.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{card.id}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.number}</td>
                                                        <td><button onClick={() => deleteButton(card.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Cards;