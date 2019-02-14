<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\User;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request){
        // check if row is returned and allow user to change password if email is found
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request){
        // checks password resets folder
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    private function tokenNotFoundResponse(){
        return response()->json(['error' => 'Token or Email is incorrect'], 
        Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        //update password
        $user->update(['password'=>$request->password]);
        //delete from password reset table
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['data'=>'Password Successfully Changed'],Response::HTTP_CREATED);
    }
}
