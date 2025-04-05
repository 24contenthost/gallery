<?php
namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountEditRequest;
use function App\Http\Controllers\auth;
use function App\Http\Controllers\response;


class AccountController extends Controller
{
    public function update(AccountEditRequest $request)
    {


        $user = auth()->user();
        $user->update($request->only(['name']));
        return response()->json([
            'user' => $user->fresh(),
        ]);
    }
}
