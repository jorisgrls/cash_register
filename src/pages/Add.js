import React from 'react';
import CheckCards from '../components/CheckCards/CheckCards';
import {useState, useEffect} from 'react';
import axios from 'axios';
import CardProduct from '../components/CardProduct/CardProduct';
import Modal from '../components/Modal/Modal';
import { createForm } from '../utils/form';
import InputNoLabel from '../components/InputNoLabel/InputNoLabel';
import {Input} from '../components/Input';

const Add = () => {


    const [playOnce, setPlayOnce] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [user,setUser] = useState([]);
    const [ageUser,setAgeUser] = useState(0);
    //const [cards, setCards] = useState([]);
    const [consos,setConsos] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [categories,setCategories] = useState([]);
    const [products,setProducts] = useState([]);
    const [currentIdCategory,setCurrentIdCategory] = useState(0);

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getUser.php?card='+cardNumber)
            .then((response) => {
                setUser(response.data);
                setPlayOnce(false);
                setTotalPrice(response.data.totalPrice);
                const date = new Date();
                const year = date.getFullYear();
                setAgeUser(Math.abs(response.data.birthday.substring(0,4)-year));
                axios.get('http://localhost:8888/getConso.php?id='+response.data.id)
                .then((response) => {
                    setConsos(response.data);
                    setPlayOnce(false);
                });
            });
            axios.get('http://localhost:8888/getProductsCategories.php')
            .then((response) => {
                setCategories(response.data);
                setPlayOnce(false);
            });
            axios.get('http://localhost:8888/getProducts.php')
            .then((response) => {
                setProducts(response.data);
                setPlayOnce(false);
            });
            axios.get('http://localhost:8888/getTables.php')
            .then((response) => {
                setTables(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);


    const shareConso = (id) => {
    }

    const getCurrentCategory = (id) => {
        setCurrentIdCategory(id);
    }

    const addConso = (id,userId) => {
        axios.post('http://localhost:8888/addConso.php', createForm({
            product_id: id,
            user_id: userId,
        }))
        .then((response) => {
            axios.post('http://localhost:8888/updateTotalAmount.php', createForm({
                id_user : userId,
                type : "add",
                amount : response.data.newPrice,
            }))
            .then((response) => {
                setPlayOnce(true);
            });

            if(response.data === false){
                console.log("erreur"); //A MODIFIER POUR AFFICHER L'ERREUR SUR LE SITE
            }
            setPlayOnce(true);
        });
    }

    const removeConso = (id,price,userId) => {
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

    const [isOpen , setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
        setCardNumber("");
    }

    const setCardUser = (card) => {
        setCardNumber(card);
        closeModal();
        setPlayOnce(true);
    }

    // AFFICHAGE TABLES
    const [isOpenModalTables , setIsOpenModalTables] = useState(false);
    const [tables,setTables] = useState([]);
    const [usersByTables,setUsersByTables] = useState([]);
    const [displayTables,setDisplayTables] = useState(false);
    const [currentTable,setCurrentTable] = useState("");

    const closeModalTables = () => {
        setIsOpenModalTables(false);
        setDisplayTables(false);
    }

    const openModalTables = () => {
        setIsOpenModalTables(true);
    }

    const getUsersByTable = (table) => {
        setDisplayTables(true);
        axios.get('http://localhost:8888/getUsersTable.php?table_number='+table)
        .then((response) => {
            setUsersByTables(response.data);
            setCurrentTable(table);
        });
    }

    const removeUserFromTable = (id_user, table) => {
        axios.post('http://localhost:8888/removeUserTable.php', createForm({
            table : table,
            user : id_user,
        })).then((response) => {
            setPlayOnce(true);
            setUsersByTables(userByTables => userByTables.filter(user => user.id !== id_user));
            closeModalTables();
        });   
    }

    const addUserToTable = (table, id_user) => {
        axios.post('http://localhost:8888/addUserTable.php', createForm({
            table : table,
            user : id_user,
        })).then((response) => {
            setPlayOnce(true);
            setUsersByTables(userByTables => [...userByTables, user]);
            closeModalTables();
        });   
    }

    const [changePrice,setChangePrice] = useState(false);
    const [newPrice,setNewPrice] = useState(0);
    const [oldPrice,setOldPrice] = useState(0);
    const [currentConso,setCurrentConso] = useState(0);

    const changePriceConso = (id_conso) => {
        setChangePrice(true);
        setCurrentConso(id_conso);
    }

    const addNewPrice = (userId,id,newprice,oldPrice) => {
        console.log(consos);
        axios.post('http://localhost:8888/updatePrice.php', createForm({
            id : id,
            price : newprice,
        })).then((response) => {
            console.log(newPrice);
            console.log(oldPrice);
            if(newPrice > oldPrice){
                axios.post('http://localhost:8888/updateTotalAmount.php', createForm({
                id_user : userId,
                type : "add",
                amount : Math.abs(newprice-oldPrice),
                })).then((response) => {
                
                });   
            }
            else{
                axios.post('http://localhost:8888/updateTotalAmount.php', createForm({
                    id_user : userId,
                    type : "remove",
                    amount : Math.abs(newprice-oldPrice),
                })).then((response) => {
                    
                });
            }
            setPlayOnce(true);
            setChangePrice(false);
        });
    }

    return (
        <>
            <div className="flex gap-x-3 mx-3 mt-3">
                <div className="flex flex-col w-5/12">
                    <div className="flex">
                        <div className="flex items-start w-full gap-3">
                            <button onClick={openModal} type="button" class="w-1/12 flex justify-center inline-flex items-center px-2 py-7 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            </button>
                            {user != false ? (
                                <button onClick={openModalTables} type="button" class="w-full flex justify-center inline-flex items-center px-4 py-7 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">{"ATTRIBUER UNE TABLE ("+user.table_number+")"}</button>
                            ) : null}
                        </div>
                    </div>
                    {user != false ? (
                        <CheckCards name={"Consommations de "+user.last_name+" "+user.first_name+" ("+ageUser+" ans)"} className="w-full mt-3">
                            <div className="flex flex-col">
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <div className="overflow-y-scroll h-table-add shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
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
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-2/12">
                                                                    {changePrice && conso.id===currentConso? (
                                                                        <div className="w-full">
                                                                            <InputNoLabel id="new_conso_price" type="text" value={newPrice} onChange={(newPrice) => setNewPrice(newPrice)} placeholder=""/>
                                                                        </div>
                                                                    ):(
                                                                        conso.product_price != conso.newPrice ?(
                                                                            <div className="flex flex-col">
                                                                                <p className="text-red-600">{conso.product_price} €</p>
                                                                                <p className="text-green-600 font-bold">{conso.newPrice} €</p>
                                                                            </div>
                                                                        ):(
                                                                            <p>{conso.product_price} €</p>
                                                                        )
                                                                    )}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{conso.time.substring(0,5)}</td>
                                                                <td>
                                                                    <button onClick={() => shareConso(conso.id)} className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                                        </svg>
                                                                    </button>
                                                                    {changePrice && conso.id===currentConso? (
                                                                        <button onClick={() => addNewPrice(conso.user_id,conso.id,newPrice,conso.newPrice)} className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </button>
                                                                    ):(
                                                                        <button onClick={() => changePriceConso(conso.id)} className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                    </button>
                                                                    )}
                                                                    
                                                                    <button onClick={() => removeConso(conso.id,conso.newPrice,user.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
                                <div className="w-full flex justify-end">
                                    <h1>SOUS TOTAL : {totalPrice} €</h1>
                                </div>
                            </div>

                        </CheckCards>
                    ):null}
                </div>
                {user != false ? (
                    <CheckCards name="Ajouter une consommation" className="w-7/12">
                        <div className="flex flex-col">
                            <div class="hidden sm:block">
                                <nav class="flex gap-3 flex-wrap" aria-label="Tabs">
                                    {categories.map((category => (
                                        <button onClick={() => getCurrentCategory(category.id)} class="flex bg-gray-100 text-gray-500 hover:text-gray-700 px-3 py-4 font-medium text-sm rounded-md"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                                            </svg>
                                            <span>{category.name}</span>
                                        </button>
                                    )))}                               
                                </nav>
                            </div>
                            <div className="flex gap-x-1 flex-wrap">
                                {products.map((product) => {
                                    if (product.id_category === currentIdCategory) {
                                        return <CardProduct id="1" onClick={() => addConso(product.id,user.id)} name={product.name} price={product.price}/>
                                    }
                                })}
                            </div>
                        </div>
                    </CheckCards>
                ):null}
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
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

            <Modal isOpen={isOpenModalTables} onClose={closeModalTables}>
                <div className="flex justify-center">
                    {displayTables ? (
                        <div className="flex flex-col gap-4 w-6/12">
                            <h1 className="text-2xl font-bold mb-6">TABLE N°{currentTable}</h1>
                            <div className="flex gap-3 flex-wrap justify-center">
                                {usersByTables.map((user) => (
                                    <div className="flex gap-x-2">
                                        <p>{user.last_name} {user.first_name} ({user.card_number})</p>
                                        <button onClick={() => removeUserFromTable(user.id,user.table_number)} type="button" class=" text-sm text-red-600 hover:text-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {user.table_number === "0" ? (
                                    <button onClick={() => addUserToTable(currentTable,user.id)} className="justify-center w-full inline-flex items-center px-4 py-6 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        Ajouter {user.last_name + " " + user.first_name} à la table
                                    </button>
                                ):null}
                            </div>
                        </div>
                    ):(
                        <div className="flex flex-col gap-4 w-7/12">
                            <h1 className="text-2xl font-bold mb-6">Liste des utilisateur à la table</h1>
                            <div className="flex gap-3 flex-wrap justify-center">
                                {tables.map((table) => (
                                    table.count === "0" ? (
                                        <button onClick={() => getUsersByTable(table.number)} className="justify-center w-2/12 inline-flex items-center px-4 py-6 border border-transparent text-sm rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-xl">{table.number}</p>
                                                <p>{table.count} personne</p>
                                            </div>
                                        </button>
                                        
                                    ):(
                                        <button onClick={() => getUsersByTable(table.number)} className="justify-center w-2/12 inline-flex items-center px-4 py-6 border border-transparent text-sm rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-xl">{table.number}</p>
                                                <p>{table.count} personnes</p>
                                            </div>
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Add;
