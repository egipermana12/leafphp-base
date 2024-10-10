<?php

namespace App\Controllers;
use Inertia\Inertia;
use App\Validations\UserValidation;
use Leaf\Http\Response;

class LoginController extends \Leaf\Controller
{

    public function index()
    {
        $user = auth()->status();
        if($user){
            $response = new Response();
            return $response->redirect('/dashboard');
        }
        return inertia('Login/Login', ['errors' => [], 'users' => $user]);
    }

    public function login()
    {
        $data = [
            'email' => request()->get('email'),
            'password' => request()->get('password')
        ];

        $validation = new UserValidation();
        $validated = $validation->validasLogin($data);
        if(!$validated){
            $errors = form()->errors();
            return inertia('Login/Login', ['errors' => $errors, 'users' => false]);
        }else{
            $login = auth()->login($data);
            if($login){
                
            }else{
                $errors = auth()->errors();
                foreach ($errors as $key => $error) {
                        // Jika error adalah string, ubah menjadi array
                    if (is_string($error)) {
                        $errors[$key] = [$error];
                    }
                }
                return inertia('Login/Login', ['errors' => $errors, 'users' => false]);
            }
        }
    }

    public function logout()
    {
        $logout = auth()->logout('/');
    }
}
