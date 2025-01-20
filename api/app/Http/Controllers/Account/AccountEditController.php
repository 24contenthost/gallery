<?php
namespace App\Http\Controllers\Account;

use App\Http\Requests\Account\AccountEditRequest;
use App\Http\Controllers\Controller;

class AccountEditController extends Controller
{
    public function __invoke(AccountEditRequest $request)
    {
        // Log::info('Authenticated User:', ['user' => Auth::user()]);
        //Log::info('Request Session:', ['session' => session()->all()]);

        $user = auth()->user();
        $user->update($request->only(['name']));
        return response()->json([
            'user' => $user->fresh(),
        ]);
    }
}
