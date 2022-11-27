import React from 'react';
import "./Promotions.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';
import {InputSelect} from '../../../components/InputSelect';


const Promotions = () => {

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const [playOnce, setPlayOnce] = useState(true);
    const [promotions, setPromotions] = useState([]);

    const addPromotion = () => {
        setName("");
        setCode("");
        setType("");
        setAmount("");
        axios.post('http://localhost:8888/addPromotion.php', createForm({
            name: name,
            code: code,
            type: type,
            amount: amount,
        }))
        .then((response) => {
            console.log(response.data)
            if(response.data === false){
                console.log(response.data); //A MODIFIER POUR AFFICHER L'ERREUR SUR LE SITE
            }
            setPlayOnce(true);
        });
    }

    const deleteButton = (id) => {
        axios.get('http://localhost:8888/removePromotion.php?id_promotion='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getPromotions.php')
            .then((response) => {
                console.log(response.data);
                setPromotions(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Promotions">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <div className="flex gap-y-3 flex-col">
                                    <Input id="name" type="text" labelName="Nom" value={name} onChange={(name) => setName(name)} placeholder="Bienvenue" required/>
                                    <Input id="code" type="text" labelName="Code" value={code} onChange={(code) => setCode(code)} placeholder="BIENVENUE10" required/>
                                    <InputSelect options={
                                            [
                                                {key:"key_options_1", value: "1", label: "€"},
                                                {key:"key_options_2", value:"0", label: "%"}
                                            ]
                                        } id="type" labelName="Type de réduction" value={type} onChange={(type) => setType(type)}/>
                                    <Input id="amount" type="text" labelName="Montant" value={amount} onChange={(amount) => setAmount(amount)} placeholder="10" required/>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button value="AJOUTER" onClick={addPromotion}></Button>
                                </div>
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
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">INTITULE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {promotions.map((promotion) => (
                                                    <tr key={promotion.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{promotion.id}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promotion.name}</td>
                                                        <td><button onClick={() => deleteButton(promotion.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Promotions;