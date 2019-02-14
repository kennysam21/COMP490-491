<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        // returns request to log
        // return $request->all();

        // if no email found
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        //if email found send email
        $this->send($request->email);
        //send response if successfully sent
        return $this->successResponse();
    }

    public function send($email){
        // create token
        $token = $this->createToken($email);

        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email){
        //check if old token
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        //return if old token
        if ($oldToken) {
            return $oldToken->token;
        }
        //create token
        $token = str_random(60);
        //save to database
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email){
        // add to password resets table
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email){
        // returns first email from user table that matches
        return !!User::where('email', $email)->first();
    }

    public function failedResponse(){
        // returns error json
        return response()->json([
            'error' => 'Email doesn\'t match any found on our database.'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse(){
        // returns success json
        return response()->json([
            'data' => 'Reset Email is sent, check inbox.'
        ], Response::HTTP_OK);
    }
}
