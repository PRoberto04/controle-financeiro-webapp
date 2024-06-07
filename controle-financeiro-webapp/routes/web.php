<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpensesController;
use App\Models\Income;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//aplication
Route::get('/despesas', [ExpensesController::class, 'getExpensesJson'])->name('despesas');
Route::get('/rendas', [IncomeController::class, 'getIncomesJson'])->name('rendas');

Route::middleware('auth')->group(function () {
    //auth
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //aplication
    Route::get('/dashboard/rendas', [IncomeController::class, 'index'])->name('rendas');
    Route::post('/dashboard/renda', [IncomeController::class, 'store'])->name('renda.store');
    Route::delete('/dashboard/renda/{income}', [IncomeController::class, 'destroy'])->name('renda.destroy');

    Route::get('/dashboard/despesas', [ExpensesController::class, 'index'])->name('despesas');
    Route::post('/dashboard/despesa', [ExpensesController::class, 'store'])->name('despesa.store');
    Route::delete('/dashboard/despesa/{expense}', [ExpensesController::class, 'destroy'])->name('despesa.destroy');
});

require __DIR__ . '/auth.php';
