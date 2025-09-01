<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Execute the command to compute stats every 5 minutes
        $schedule->command('stats:compute')->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        // Load all commands located in app/Console/Commands
        $this->load(__DIR__.'/Commands');

        // Also allows defining closures in routes/console.php
        require base_path('routes/console.php');
    }
}
