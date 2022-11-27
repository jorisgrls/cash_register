import React from 'react';
import CheckCards from '../components/CheckCards/CheckCards';
import Modal from '../components/Modal/Modal';
import InputNoLabel from '../components/InputNoLabel/InputNoLabel';
import { Input } from '../components/Input';
import {useState} from 'react';
import { createForm } from '../utils/form';
import axios from 'axios';
import "./style.scss";

const Registration = () => {

    let script_py = {"lastName" : "Elwood", "firstName" : "Drystan", "urlPhoto" : "https://i.ibb.co/qM9BcRh/photo.jpg", "birthday" : "1990-01-10"};
    
    const [lastName, setLastName] = useState(script_py.lastName);
    const [firstName, setFirstName] = useState(script_py.firstName);
    const [urlPhoto, setUrlPhoto] = useState(script_py.urlPhoto);
    const [birthday, setBirthday] = useState(script_py.birthday);
    const [cardNumber, setCardNumber] = useState("aucune carte attribuée");


    const addUser = () => {
        axios.post('http://localhost:8888/addUser.php', createForm({
            last_name: lastName,
            first_name: firstName,
            picture: urlPhoto,
            birthday: birthday,
            card: cardNumber,
        }))
        .then((response) => {
            setLastName("");
            setFirstName("");
            setUrlPhoto("");
            setBirthday("");
            setCardNumber("");
            if(response.data === false){
                console.log(response.data); //A MODIFIER POUR AFFICHER L'ERREUR SUR LE SITE
            }
        });
    }

    const [isOpen , setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
        setCardNumber("");
    }

    const setCardUser = (card) => {
        axios.post('http://localhost:8888/cardExist.php', createForm({
            card: cardNumber,
        }))
        .then((response) => {
            if(response.data.length > 0 && response.data[0].used !== "1"){
                setCardNumber(card);
                closeModal();  
            }
            else{
                console.log("la carte n'est pas enregistré en bdd ou est déjà attribuée");
            }
            
        });
    }

    return (
        <>
            <div className="home">
                <div className="flex justify-center items-center w-full h-full"> 
                    <CheckCards name="Enregistrer un nouvel utilisateur" className="w-6/12">
                        <div className="flex">
                            <div>
                                <img className="img2" src={urlPhoto} alt="photo"/>
                            </div>
                            <div className="flex flex-col ml-5 justify-center w-full gap-y-3">
                                <Input id="lastName" type="text" labelName="Nom" onChange={(lastName) => setLastName(lastName)} value={lastName} placeholder="Dupond"/>
                                <Input id="firstName" type="text" labelName="Prénom" onChange={(firstName) => setFirstName(firstName)} value={firstName} placeholder="Henry"/>
                                <Input id="birthday" type="date" labelName="Date de naissance" onChange={(birthday) => setBirthday(birthday)} value={birthday} placeholder="25/05/2000"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 mt-5">
                            <button onClick={openModal} type="button" class="w-full flex justify-center inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
                                ATTRIBUER UNE CARTE ({cardNumber})
                            </button>
                            <button onClick={addUser} type="button" class="w-full flex justify-center inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">VALIDER</button>
                        </div>
                    </CheckCards>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-6">Scanner la carte à attribuer</h1>
                        <InputNoLabel id="input_card" type="text" value={cardNumber} onChange={(cardNumber) => setCardNumber(cardNumber)} labelName="Numéro de carte" placeholder="65687956009" />
                        <button onClick={() => setCardUser(cardNumber)} className="justify-center mr-3 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="ml-1">ATTRIBUER</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Registration;