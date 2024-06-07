<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class IncomeController extends Controller {
    public function index() {
        $incomes = Income::all();
        return Inertia::render('Dashboard', ['incomes' => $incomes]);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'sourceOfIncome' => 'required|string|max:255', //fonte da renda
            'incomeValue' => 'required|numeric', //valor da renda
            'payDay' => 'nullable|date', //data em que obteve
        ]);

        Income::create($validatedData);

        return redirect()->route('rendas');
    }

    public function getIncomesJson(){
        $incomes = Income::all();
        return response()->json(['incomes' => $incomes]);
    }

    public function destroy(Income $income): RedirectResponse
    {
        $income->delete();
        return redirect()->route('dashboard');
    }
}