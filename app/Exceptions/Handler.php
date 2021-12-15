<?php

namespace App\Exceptions;

use App\Models\hv\HVAdmin;
use App\Notifications\SlackNotification;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Notification;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [

    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            if (strpos($e->getMessage(), 'Out of memory') === false && strpos($e->getMessage(), 'cache/data') === false)
                Notification::send(new HVAdmin(config('app.name')), new SlackNotification($e->getCode() . ': ' . $e->getMessage()));
        });
    }
}
