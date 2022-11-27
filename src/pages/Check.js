import React from 'react';
import CheckCards from '../components/CheckCards/CheckCards';
import InputNoLabel from '../components/InputNoLabel/InputNoLabel';
import InputSelect from '../components/InputSelect/InputSelect';
import { Input } from '../components/Input';
import Modal from '../components/Modal/Modal';
import {useState, useEffect} from 'react';
import axios from 'axios';
import "./check.scss";
import "./style.scss";
import { createForm } from '../utils/form';

const Check = () => {


    const [playOnce, setPlayOnce] = useState(true);
    const [cardNumber, setCardNumber] = useState("");
    const [user,setUser] = useState([]);
    const [ageUser,setAgeUser] = useState(0);
    const [consos,setConsos] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [sousTotalPrice, setSousTotalPrice] = useState(0);

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getUser.php?card='+cardNumber)
            .then((response) => {
                setUser(response.data);
                setPlayOnce(false);
                setSousTotalPrice(response.data.totalPrice);
                setTotalPrice(response.data.totalPrice);
                const date = new Date();
                const year = date.getFullYear();
                setAgeUser(Math.abs(response.data.birthday.substring(0,4)-year));
                axios.get('http://localhost:8888/getConso.php?id='+response.data.id)
                .then((response) => {
                    setConsos(response.data);
                    setPlayOnce(false);
                });
                axios.get('http://localhost:8888/getPayments.php')
                .then((response) => {
                    setAvailablePayments(response.data);
                    setPlayOnce(false);
                });
                axios.get('http://localhost:8888/getPromotions.php')
                .then((response) => {
                    setPromotions(response.data);
                    setPlayOnce(false);
                });
                axios.get('http://localhost:8888/getAmountsGiftCard.php')
                .then((response) => {
                    setAmountGiftCard(response.data);
                    setPlayOnce(false);
                });
            });
        }

    }, [playOnce]);


    const removeConso = (id,userId,price) => {
        console.log(id);
        console.log(userId);
        console.log(price);
        axios.post('http://localhost:8888/updateTotalAmount.php', createForm({
            id_user : userId,
            type : "remove",
            amount : price,
        }))
        .then((response) => {
            axios.get('http://localhost:8888/removeConso.php?id='+id)
            .then((response) => {
                setPlayOnce(true);
            });
        });
    }

    const [isOpenModalUser , setIsOpenModalUser] = useState(false);

    const closeModalUser = () => {
        setIsOpenModalUser(false);
    }

    const openModalUser = () => {
        setIsOpenModalUser(true);
        setCardNumber("");
    }

    const setCardUser = (card) => {
        setCardNumber(card);
        closeModalUser();
        setPlayOnce(true);
    }

    //ENCAISSEMENT

    const [isOpenModalPayment , setIsOpenModalPayment] = useState(false);

    const closeModalPayment = () => {
        setIsOpenModalPayment(false);
    }

    const openModalPayment = () => {
        if(remainingAmount === ""){
            setRemainingAmount(totalPrice);
        }
        setIsOpenModalPayment(true);
    }

    const [remainingAmount, setRemainingAmount] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [availablePayments, setAvailablePayments] = useState([]);
    const [userPayments, setUserPayments] = useState([]);

    const addPayment = (namePayment, amount) => {
        setUserPayments(userPayments => [...userPayments, {name : namePayment, amount : amount}]);
        setRemainingAmount(remainingAmount-amount);
        setAmountInput("");
    }

    const removePayment = (namePayment, amount) => {
        setUserPayments(userPayments => userPayments.filter(payment => payment.name !== namePayment));
        setRemainingAmount(remainingAmount+parseFloat(amount));
        setAmountInput("");
    }

    //PROMOTIONS

    const [isOpenModalPromotions , setIsOpenModalPromotions] = useState(false);
    const [codePromo, setCodePromo] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [currentPromotion, setCurrentPromotion] = useState([]);
    const [typePromotion, setTypePromotion] = useState(0);
    const [amountPromo, setAmountPromo] = useState(0);

    const closeModalPromotions = () => {
        setIsOpenModalPromotions(false);
    }

    const openModalPromotions = () => {
        setIsOpenModalPromotions(true);
    }

    const submitReduction = (codePromo) => {
        axios.post('http://localhost:8888/checkPromotion.php?', createForm({
            code: codePromo,
        }))
        .then((response) => {
            if (response.data.length > 0) {
                setCurrentPromotion(response.data);
                applyPromotion(response.data[0].type, response.data[0].amount);
            }
        })
        closeModalPromotions();
        setCodePromo("");
    }

    const applyPromotion = (typePromotion, amountPromo) => {
        if (typePromotion === "1") { //euro
            if(sousTotalPrice-amountPromo < 0){
                setTotalPrice(0);
            }
            else{
                setTotalPrice(sousTotalPrice-amountPromo);
            }
            
        }
        if (typePromotion === "0") { //pourcentage
            setTotalPrice(sousTotalPrice-(amountPromo/100)*sousTotalPrice);
        }
    }

    const removePromo = () => {
        setTotalPrice(sousTotalPrice);
        setCurrentPromotion([]);
    }

    const submitPromotion = (typePromotion, amountPromo) => {
        setCurrentPromotion([{type : typePromotion, amount : amountPromo}]);
        applyPromotion(typePromotion, amountPromo);
        closeModalPromotions();
    }


    //VALIDATION

    const [isOpenModalValidate , setIsOpenModalValidate] = useState(false);
    const [mail,setMail] = useState("");

    const closeModalValidate = () => {
        setIsOpenModalValidate(false);
    }

    const openModalValidate = () => {
        setIsOpenModalValidate(true);
    }

    const sendBill = (mail) => {
        axios.post('http://localhost:8888/sendBill.php', createForm({
            mail: mail,
            user: user,
            sousTotalPrice: sousTotalPrice,
            totalPrice: totalPrice,
            consos: consos,
            cardNumber: cardNumber,
            currentPromotion: currentPromotion,
        }))
        .then((response) => {
            // on indique que la facture a été envoyée

        })
    }

    const saleValidate = () => {
        closeModalValidate();
        setCardNumber(0);
        setPlayOnce(true);
    }

     // CHEQUE CADEAU 

     const [isOpenModalGift , setIsOpenModalGift] = useState(false);
     const [amountGiftCard, setAmountGiftCard] = useState([]);
 
     const closeModalGift = () => {
         setIsOpenModalGift(false);
     }
 
     const openModalGift = () => {
         setIsOpenModalGift(true);
     }
 
     /*const createGiftCard = (amount) => {
         axios.post('http://localhost:8888/createGiftCard.php', createForm({
             amount : amount,
         })).then((response) => {
            setPlayOnce(true);
            setIsOpenModalGift(false);
         });
     }*/

    const addConso = (user_id, product_id) => {
        axios.post('http://localhost:8888/addConso.php', createForm({
            user_id : user_id,
            product_id : product_id,
        })).then((response) => {
            setPlayOnce(true);
            setIsOpenModalGift(false);
        });
    }

    const createGiftCard = (amount) => {
        axios.post('http://localhost:8888/createGiftCard.php', createForm({
            amount : amount,
        }),{responseType:'blob'}).then((response) => {
           const file = new Blob(
               [response.data], 
               {type: 'application/pdf'});
           const fileURL = URL.createObjectURL(file);
           window.open(fileURL);
           setPlayOnce(true);
           setIsOpenModalGift(false);
        });
    }

    return (
        <div>
            <div className="flex gap-x-3 mx-3 mt-3">
                <div className="flex flex-col w-4/12">
                    <button onClick={openModalUser} type="button" class="mb-2 w-full flex justify-center inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span className="ml-2">RECHERCHER UN UTILISATEUR</span>
                    </button>
                    {user !== false ? (
                        <CheckCards name="Informations" className="w-full">
                            <div className="flex items-center">
                                <div className="">
                                    <img className="img" src={user.picture_url} alt=""/>
                                </div>
                                <div className="ml-6 flex flex-col justify-center">
                                    <p>Nom : {user.last_name}</p>
                                    <p>Prénom : {user.first_name}</p>
                                    <p>Age : {ageUser} ans {ageUser >= 18? <span className="font-bold text-green-600">(MAJEUR)</span>: <span className="font-bold text-red-600">(MINEUR)</span>}</p>
                                    <p className="mt-6">{user.card_number}</p>
                                    <p className="text-xl font-medium">TABLE N°{user.table_number}</p>
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <h1>ENTREE LE {user.starting_date+" A "+user.starting_time}</h1>
                            </div>
                        </CheckCards>
                    ):null}
                </div>
                {user !== false ? (
                    <CheckCards name="Consommations" className="w-8/12">
                        <div className="flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-y-scroll h-table-check shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {consos.map((conso) => (
                                                        <tr key={conso.id}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                <div className="flex items-center ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d={conso.icon_category} />
                                                                    </svg>
                                                                    <span>{conso.product_name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{conso.product_price} €</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{conso.time.substring(0,5)}</td>
                                                            <td>
                                                                <button className="mr-3 ml-20 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                                <button onClick={() => removeConso(conso.id,user.id,conso.product_price)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col items-end">
                            <h2 className="font-medium text-lg">SOUS TOTAL : {sousTotalPrice}€</h2>
                            <div className="italic flex flex-col">
                                {currentPromotion.map((promo) => (
                                    <div className="flex justify-end">
                                        <p>Remise : {promo.code} ({promo.amount}{promo.type == "0" ? ("%"):("€")})</p>
                                        <button onClick={removePromo} type="button" class="ml-2 text-sm text-red-600 hover:text-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <h1 className="mt-4 text-3xl">TOTAL : {totalPrice}€</h1>
                        </div>
                        <div className="mt-6 flex">
                            <div className="flex flex-col items-start w-5/12 gap-3">
                                <button onClick={openModalPromotions} type="button" class="w-full flex justify-center inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">REDUCTION</button>
                                <button onClick={openModalPayment} type="button" class="w-full flex justify-center inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">ENCAISSER</button>
                                <button onClick={openModalGift} class="flex w-full flex justify-center inline-flex items-center px-4 py-2 border border-orange-500 shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-white mr-3 flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                                    </svg>
                                    <span>CHEQUE-CADEAU</span>
                                </button> 
                            </div>
                            <div className="w-full ml-4">
                                {remainingAmount <= 0 ? (
                                    <button onClick={openModalValidate} type="button" class="w-full h-full flex justify-center inline-flex items-center px-4 py-2 border border-transparent text-xl font-bold rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">VALIDER</button>
                                ):(
                                    <button onClick={openModalValidate} type="button" class="w-full h-full flex justify-center inline-flex items-center px-4 py-2 border border-transparent text-xl font-bold rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">VALIDER</button>
                                )}
                            </div>
                        </div>
                    </CheckCards>
                ):null}
            </div>
            
            <Modal isOpen={isOpenModalUser} onClose={closeModalUser}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-6">Scanner la carte de l'utilisateur</h1>
                        <InputNoLabel id="input_card" type="text" value={cardNumber} onChange={(cardNumber) => setCardNumber(cardNumber)} labelName="Numéro de carte" placeholder="65687956009" />
                        <button onClick={() => setCardUser(cardNumber)} className="justify-center mr-3 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="ml-1">RECHERCHER</span>
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenModalPayment} onClose={closeModalPayment}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-4">PAIEMENT</h1>
                        {remainingAmount > 0 ? (
                            <p className="text-red-600 font-medium">Montant restant : {remainingAmount} €</p>
                        ):<p className="text-green-600 font-medium">Montant restant : {remainingAmount} €</p>}
                        
                        <InputNoLabel id="amount" type="text" value={amountInput} onChange={(amountInput) => setAmountInput(amountInput)} placeholder="40.50" />
                        <div className="flex gap-x-2">
                            {availablePayments.map((payment) => (
                                <button onClick={() => addPayment(payment.name,amountInput)} className="justify-center w-full inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400">
                                    {payment.name}
                                </button>
                            ))}
                        </div>
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-y-scroll h-table-check shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {userPayments.map((payment) => (
                                                <tr key={payment.name}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{payment.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.amount} €</td>
                                                    <td>
                                                        <button onClick={() => removePayment(payment.name,payment.amount)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button onClick={closeModalPayment} className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenModalPromotions} onClose={closeModalPromotions}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-6">Ajouter une promotions</h1>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <Input id="input_code_promo" type="text" value={codePromo} onChange={(codePromo) => setCodePromo(codePromo)} labelName="Code réduction" placeholder="BIENVENUE10" />
                                <button onClick={() => submitReduction(codePromo)} className="mt-3 justify-center mr-3 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">APPLIQUER</button>
                            </div>
                            <div className="flex flex-col w-full mt-10 border-t-2 pt-6">
                                <div className="flex flex-col gap-y-3">
                                    <InputSelect options={
                                        [
                                            {key:"key_options_1", value: "1", label: "€"},
                                            {key:"key_options_2", value:"0", label: "%"}
                                        ]} 
                                    id="type_promotion" labelName="Type de promotion" value={typePromotion} onChange={(typePromotion) => setTypePromotion(typePromotion)}/>
                                    <Input className="w-full" id="input_montant_reduction" type="text" value={amountPromo} onChange={(amountPromo) => setAmountPromo(amountPromo)} labelName="Code réduction" placeholder="BIENVENUE10" />
                                </div>
                                <button onClick={() => submitPromotion(typePromotion, amountPromo)} className="mt-3 justify-center mr-3 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">AJOUTER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenModalValidate} onClose={closeModalValidate}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-6">Valider la vente</h1>
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-3 w-8/12 h-full">
                                <InputNoLabel id="mail" type="text" value={mail} onChange={(mail) => setMail(mail)} placeholder="doe.john@gmail.com" />
                                <button onClick={() => sendBill(mail)} className="justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">ENVOYER LA FACTURE</button>
                            </div>
                            <div className="w-4/12 h-full">
                                <button onClick={saleValidate} className="font-bold justify-center mr-3 h-full w-full inline-flex items-center px-4 py-8 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">VALIDER LA VENTE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenModalGift} onClose={closeModalGift}>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-2xl font-bold mb-6">Créer une carte cadeau</h1>
                        <div className="flex w-full gap-3 flex-wrap justify-center">
                            {amountGiftCard.map((amount) => (
                                <button onClick={() => createGiftCard(amount.amount)} className="justify-center w-3/12 inline-flex items-center px-4 py-6 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    {amount.amount}€
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default Check;