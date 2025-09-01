<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('query_stats', function (Blueprint $table) {
            $table->id();
            $table->text('top_queries')->nullable();     // JSON
            $table->float('avg_duration')->nullable();
            $table->integer('popular_hour')->nullable();
            $table->text('resource_mix')->nullable();    // JSON
            $table->integer('total_queries')->default(0);
            $table->float('error_rate')->default(0);
            $table->text('slowest_queries')->nullable(); // JSON
            $table->text('top_devices')->nullable();     // JSON
            $table->timestamp('computed_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('query_stats');
    }
};
