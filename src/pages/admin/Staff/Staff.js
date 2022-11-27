import React from 'react';
import "./Staff.scss";
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {createForm} from '../../../utils/form';
import {AdminLayout} from '../../../components/AdminLayout';
import {Menu} from '../../../components/Menu';
import {InputSelect} from '../../../components/InputSelect';


const Staff = () => {

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [idRank, setIdRank] = useState("");

    const [playOnce, setPlayOnce] = useState(true);
    const [getRank,setGetRank] = useState(true);
    const [staff, setStaff] = useState([]);
    const [ranksSelect, setRanksSelect] = useState([]);

    const addStaff = () => {
        setLastName("");
        setFirstName("");
        setMail("");
        setPhone("");
        setBirthday("");
        setLogin("");
        setPassword("");
        setIdRank("");
        axios.post('http://localhost:8888/addStaff.php', createForm({
            last_name: lastName,
            first_name: firstName,
            mail: mail,
            phone: phone,
            birthday: birthday,
            login: login,
            password: password,
            id_rank: idRank,
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
        axios.get('http://localhost:8888/removeStaff.php?id_staff='+id)
        .then((response) => {
            setPlayOnce(true);
        });
    }

    useEffect(() => {
        if (playOnce) {
            axios.get('http://localhost:8888/getStaff.php')
            .then((response) => {
                setStaff(response.data);
                setPlayOnce(false);
            });
        }

    }, [playOnce]);

    useEffect(() => {
        if (getRank) {
            axios.get('http://localhost:8888/getRank.php')
            .then((response) => {
                setGetRank(false);
                const ranksList = response.data.map((rank) => (
                    {key:rank.id, value:rank.id , label:rank.name} 
                ))
                setRanksSelect(ranksList);

            });
        }

    }, [getRank]);

    return (
        <div className="page">
            <Menu/>
            <AdminLayout name="Membres de l'équipe">
                <div className="payments-layout__content--payments">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <div className="flex gap-y-3 flex-col">
                                    <Input id="firstname" type="text" labelName="Prénom" value={firstName} onChange={(firstName) => setFirstName(firstName)} placeholder="Arthur" required/>
                                    <Input id="lastname" type="text" labelName="Nom" value={lastName} onChange={(lastName) => setLastName(lastName)} placeholder="Dupont" required/>
                                    <Input id="mail" type="text" labelName="Mail" value={mail} onChange={(mail) => setMail(mail)} placeholder="dupont.arthur@gmail.com" required/>
                                    <Input id="phone" type="text" labelName="Numéro de téléphone" value={phone} onChange={(phone) => setPhone(phone)} placeholder="0611223344" required/>
                                    <Input id="birthday" type="date" labelName="Date de naissance" value={birthday} onChange={(birthday) => setBirthday(birthday)} placeholder="25/05/1990" required/>
                                    <Input id="login" type="text" labelName="Identifiant" value={login} onChange={(login) => setLogin(login)} placeholder="76656775687760" required/>
                                    <Input id="password" type="password" labelName="Mot de passe" value={password} onChange={(password) => setPassword(password)} placeholder="*****************" required/>
                                    <InputSelect options={ranksSelect} id="rank" labelName="Grade" value={idRank} onChange={(idRank) => setIdRank(idRank)}/>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button value="AJOUTER" onClick={addStaff}></Button>
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
                                                    <th scope="col" className="text-center py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">NOM</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PRENOM</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">IDENTIFIANT</th>
                                                    <th scope="col" className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {staff.map((member) => (
                                                    <tr key={member.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{member.last_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.first_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.login}</td>
                                                        <td><button onClick={() => deleteButton(member.id)} className="text-sm text-indigo-600 hover:text-indigo-900">Supprimer</button></td>
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

export default Staff;