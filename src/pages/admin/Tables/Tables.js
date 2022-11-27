import React from 'react';
import "./Tables.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';


const Tables = () => {

    const [table, setTable] = useState("");
    const [playOnce, setPlayOnce] = useState(true);
    const [tables, setTables] = useState([]);


    const addTable = () => {
        setTable("");
        axios.post('http://localhost:8888/addTable.php', createForm({
            number_table: table,
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
        axios.get('http://localhost:8888/removeTable.php?id_table='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getTables.php')
            .then((response) => {
                console.log(response.data);
                setTables(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Liste des tables">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <Input id="table" type="text" labelName="Numéro de table" value={table} onChange={(table) => setTable(table)} placeholder="5" required/>
                            </div>
                            <div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none self-end">
                                <Button value="AJOUTER" onClick={addTable}></Button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-5">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TABLE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {tables.map((table) => (
                                                    <tr key={table.id}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{table.number}</td>
                                                        <td><button onClick={() => deleteButton(table.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Tables;