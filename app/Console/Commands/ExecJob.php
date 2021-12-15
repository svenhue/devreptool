<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ExecJob extends Command
{
    protected $signature = 'exec:job {part} {job} {id?}';

    protected $description = 'Execute job';

    public function handle()
    {
        $part = $this->argument('part');
        if ($part == '.')
            $part = '';
        else
            $part .= '\\';

        $jobClass = 'App\\Jobs\\' . $part . $this->argument('job');
        $jobClass::dispatch($this->argument('id'));
        return true;
    }
}
