import React from 'react';
import "./Rank.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';


const Rank = () => {

    const [rank, setRank] = useState("");
    const [playOnce, setPlayOnce] = useState(true);
    const [ranks, setRanks] = useState([]);

    const addRank = () => {
        setRank("");
        axios.post('http://localhost:8888/addRank.php', createForm({
            rank: rank,
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
        axios.get('http://localhost:8888/removeRank.php?id_rank='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getRank.php')
            .then((response) => {
                console.log(response.data);
                setRanks(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Liste des grades">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <Input id="grade" type="text" labelName="Nom du grade" value={rank} onChange={(rank) => setRank(rank)} placeholder="Vendeur" required/>
                            </div>  
                            <div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none self-end">
                                <Button value="AJOUTER" onClick={addRank}></Button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CATEGORIES</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {ranks.map((rank) => (
                                                    <tr key={rank.id}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rank.name}</td>
                                                        <td><button onClick={() => deleteButton(rank.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Rank;