<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('sourceOfExpense');
            $table->decimal('expenseValue', 10, 2);
            $table->enum('category', ['Casa', 'Transporte', 'Alimentação', 'Saúde', 'Lazer', 'Inesperado']);
            $table->date('expenseDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('expenses');
    }
};