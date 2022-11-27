import React from 'react';
import { Input } from '../components/Input';
import {useState} from 'react';
import { createForm } from '../utils/form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginExist, setLoginExist] = useState(false);

    const navigate=useNavigate();

    const verifLogin = (login) => {
        axios.post('http://localhost:8888/loginExist.php', createForm({
            login: login,
        }))
        .then((response) => {
            if(response.data === true){
                setLoginExist(true);
                console.log("Login existant");
            }
            else{
                console.log("Login non existant");
            }
            
            //traitement
        });
    }

    const cancelLogin = () => {
        setLogin("");
        setPassword("");
        setLoginExist(false);
    }

    const connexion = (login,password) => {
        axios.post('http://localhost:8888/login.php', createForm({
            login: login,
            password: password,
        }))
        .then((response) => {
            console.log(response.data);
            if(response.data === true){
                navigate('/home');
                console.log("connexion reussi");
            }
            else{
                console.log("gros problème");
            }
            
            //traitement
        });
    }

    return (
        <div className="flex justify-center items-center home">
            <div class="bg-white shadow sm:rounded-lg w-6/12">
                <div class="px-4 py-5 sm:p-6 flex flex-col gap-y-4">
                    <h1 className="flex justify-center mb-4 mt-5">CONNEXION</h1>
                    <form method="post">
                        <Input value={login} onChange={(login) => setLogin(login)} type="text" id="login" placeholder="654657667002" labelName="Identifiant" disabled={loginExist}/>
                        {loginExist === true ? (
                            <div>
                                <Input value={password} onChange={(password) => setPassword(password)} type="password" id="password" placeholder="**************" labelName="Mot de passe" />
                                <div className="flex gap-x-2">
                                    <button onClick={cancelLogin} type="button" class="mt-5 w-full flex justify-center inline-flex items-center px-4 py-2 border border-red-600 shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <span className="">RETOUR</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button onClick={() => connexion(login,password)} type="button" class="mt-5 w-full flex justify-center inline-flex items-center px-4 py-2 border border-green-600 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <span className="">CONNEXION</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ):(
                            <button onClick={() => verifLogin(login)} type="button" class="mt-5 w-full flex justify-center inline-flex items-center px-4 py-2 border border-green-600 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <span className="">SUIVANT</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>




        /*<div className="flex justify-center">
            <div className="w-6/12">
                <form method="post">
                    <Input value={login} onChange={(login) => setLogin(login)} type="text" id="login" placeholder="654657667002" labelName="Identifiant" />
                    <Input value={password} onChange={(password) => setPassword(password)} type="password" id="password" placeholder="**************" labelName="Mot de passe" />
                </form>
            </div>
        </div>*/
    );
};

export default Login;