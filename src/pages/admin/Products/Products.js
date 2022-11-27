import React from 'react';
import "./Products.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';
import {InputSelect} from '../../../components/InputSelect';


const Products = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [idCategory, setIdCategory] = useState("");

    const [playOnce, setPlayOnce] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const addProduct = () => {
        setName("");
        setPrice("");
        setIdCategory("");

        axios.post('http://localhost:8888/addProduct.php', createForm({
            name: name,
            price: price,
            id_category: idCategory,
        }))
        .then((response) => {
            console.log(response.data);
            if(response.data === false){
                console.log(response.data); //A MODIFIER POUR AFFICHER L'ERREUR SUR LE SITE
            }
            setPlayOnce(true);
        });
    }

    const deleteButton = (id) => {
        axios.get('http://localhost:8888/removeProduct.php?id='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getProducts.php')
            .then((response) => {
                setProducts(response.data);
                setPlayOnce(false);
            });
            axios.get('http://localhost:8888/getProductsCategories.php')
            .then((response) => {
                setCategories(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Liste des produits">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <div className="flex gap-y-3 flex-col">
                                    <Input id="name" type="text" labelName="Nom" value={name} onChange={(name) => setName(name)} placeholder="Encornets à la plancha" required/>
                                    <Input id="price" type="text" labelName="Prix" value={price} onChange={(price) => setPrice(price)} placeholder="17" required/>
                                    <InputSelect options={categories} id="category" labelName="Catégorie" value={idCategory} onChange={(idCategory) => setIdCategory(idCategory)}/>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button value="AJOUTER" onClick={addProduct}></Button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="text-center py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">NAME</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PRICE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CATEGORIE</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{product.name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.id_category}</td>
                                                        <td><button onClick={() => deleteButton(product.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Products;