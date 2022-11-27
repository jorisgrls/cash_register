import React from 'react';
import "./Categories.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';


const Categories = () => {

    const [category, setCategory] = useState("");
    const [icon, setIcon] = useState("");
    const [playOnce, setPlayOnce] = useState(true);
    const [categories, setCategories] = useState([]);

    const addCategory = () => {
        setCategory("");
        setIcon("");
        axios.post('http://localhost:8888/addCategory.php', createForm({
            category: category,
            icon : icon
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
        axios.get('http://localhost:8888/removeCategory.php?id_category='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getProductsCategories.php')
            .then((response) => {
                console.log(response.data);
                setCategories(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Liste des catégories">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <div className="flex flex-col gap-y-2">
                                    <Input id="name" type="text" labelName="Nom" value={category} onChange={(category) => setCategory(category)} placeholder="Boissons" required/>
                                    <Input id="icon" type="text" labelName="Code icône" value={icon} onChange={(icon) => setIcon(icon)} placeholder="Code" required/>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button value="AJOUTER" onClick={addCategory}></Button>
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
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CATEGORIES</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ICONE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {categories.map((category) => (
                                                    <tr key={category.id}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.name}</td>
                                                        <td className="flex justify-center mt-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                                                            </svg>
                                                        </td>
                                                        <td><button onClick={() => deleteButton(category.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Categories;