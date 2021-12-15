<?php

namespace App\Models\hv;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class HVAdmin extends Model
{
    use Notifiable;

    var $appName;

    /**
     * HVAdmin constructor.
     * @param $appName
     */
    public function __construct($appName)
    {
        $this->appName = $appName;
    }

    public function routeNotificationForSlack()
    {
        switch ($this->appName) {
            case 'tecd':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'prg':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'msh':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'dx':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'iabo':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'msa':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'dev':
                return 'https://hooks.slack.com/services/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';
                break;
            case 'ths':
                return 'https://hooks.slack.com/services/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';
                break;
        }
    }

}
