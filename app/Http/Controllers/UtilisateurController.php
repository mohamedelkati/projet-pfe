<?php

namespace App\Http\Controllers;

use App\Models\compte;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UtilisateurController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            "prenom" => 'required|max:191',
            "nom" => 'required|max:191',
            "email" => 'required|email|max:191',
            "password" => 'required|min:8|max:20',
            "telephone" => 'required|max:191',
            "nom_garage" => 'required|max:191'
        ]);
        if($validator->fails()){
            return response()->json([
                "validation_error"=>$validator->messages()
            ]);
        }
        else{
            $user = User::create([
                "nom"=>$request->nom,
                "prenom"=>$request->prenom,
                "telephone"=>$request->telephone,
                "nom_garage"=>$request->nom_garage,
                "email"=>$request->email,
                "password"=>$request->password
            ]);
            return response()->json([
                "status"=>200,
                "user"=>$user,
                "message"=>"Registered Successfully"
            ]);
        }
    }

        // $pas=Hash::make($re->password);



    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            "email" => 'required|email|max:191',
            "password" => 'required|min:8|max:20'
        ]);
        if($validator->fails()){
            return response()->json([
                "validation_error"=>$validator->messages()
            ]);
        }
        else{
            $user = User::where([['email',$request->email],['password',$request->password]])->first();
            if(isset($user)){
                return response()->json([
                                "status"=>200,
                                "user"=>$user,
                                "message"=>"login Successfully"
                            ]);
            }else{
                return response()->json([
                    "message"=>"pas exists"
                ]);
            }
           
        }
    }
    public function index(){
        return User::has('tasks')->get();
    }

}

