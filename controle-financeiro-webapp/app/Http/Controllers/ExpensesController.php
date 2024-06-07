<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class ExpensesController extends Controller
{
    public function index()
    {
        $expenses = Expense::all(); //Retorna todas as linhas da tabela despesas
        return Inertia::render('Dashboard', ['expenses' => $expenses]); //Passa as despesas para serem acessadas a partir da view dashboard
    }

   public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sourceOfExpense' => 'required|string|max:255',
            'expenseValue' => 'required|numeric',
            'category' => 'required|in:Home,Transport,Food,Health,Leisure,Unexpected',
            'expenseDate' => 'nullable|date',
        ]);

        Expense::create($validatedData);

        return redirect()->route('dashboard'); // Redireciona para a rota "dashboard"
    }

    public function getExpensesJson() //Retorna todas as linhas de despesas e transforma em js
    {
        $expenses = Expense::all();
        return response()->json(['expenses' => $expenses]);
    }

    public function destroy(Expense $expense): RedirectResponse
    {
        $expense->delete();
        return redirect()->route('dashboard');
    }

}
