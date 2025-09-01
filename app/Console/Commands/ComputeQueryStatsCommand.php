<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\ComputeQueryStatsJob;

class ComputeQueryStatsCommand extends Command
{
    protected $signature = 'stats:compute';
    protected $description = 'Recompute search stats and store a snapshot';

    public function handle(): int
    {
        dispatch(new ComputeQueryStatsJob());
        $this->info('ComputeQueryStatsJob dispatched');
        return Command::SUCCESS;
    }
}
