import React from 'react';
import "./Payments.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';


const Payments = () => {

    const [payment, setPayment] = useState("");
    const [playOnce, setPlayOnce] = useState(true);
    const [payments, setPayments] = useState([]);


    const addPayment = () => {
        setPayment("");
        axios.post('http://localhost:8888/addPayment.php', createForm({
            payment: payment,
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
        axios.get('http://localhost:8888/removePayment.php?id_payment='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getPayments.php')
            .then((response) => {
                console.log(response.data);
                setPayments(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Moyens de paiements">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <Input id="payment" type="text" labelName="Intitulé du moyen de paiement" value={payment} onChange={(payment) => setPayment(payment)} placeholder="Chèques vacances" required/>
                            </div>
                            <div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none self-end">
                                <Button value="AJOUTER" onClick={addPayment}></Button>
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
                                                {payments.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{payment.id}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.name}</td>
                                                        <td><button onClick={() => deleteButton(payment.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Payments;