<?php

namespace App\Models\tm;

use DateTimeInterface;

class TMCCTest extends \App\Models\tm\Base\TMCCTest
{
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
