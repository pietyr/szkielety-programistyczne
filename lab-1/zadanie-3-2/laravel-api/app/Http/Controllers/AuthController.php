<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        $user = User::create($fields);
        $token = $user->createToken($request->name);
        return compact('user', 'token');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email:exists',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'The provided credentials are incorrect.'
            ];
        }
        $token = $user->createToken($user->name);
        return compact('user', 'token');
    }

    public function logout(Request $request)
    {
        return 'logout';
    }
}
