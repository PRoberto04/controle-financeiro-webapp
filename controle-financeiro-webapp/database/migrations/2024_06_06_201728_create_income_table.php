<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->string('sourceOfIncome');
            $table->decimal('incomeValue', 10, 2);
            $table->date('payDay')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('incomes');
    }
};