<?php

namespace App\Http\Middleware\hv;

use App\Models\hv\HVUser;
use Closure;

class HVAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $obj = HVUser::tokenValid($request->device, $request->token, $request->current_company_id);
        if ($obj) {
            $request->current_company_id = $obj->hv_company_id;
            $request->current_user_id = $obj->hv_user_id;
            $request->current_user_group_id = $obj->hv_user_group_id;
            $request->current_mobile_device_id = $obj->hv_mobile_device_id;
            $request->header('Access-Control-Allow-Origin', '*');
            $request->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $request->header('\'Access-Control-Allow-Headers\', \'X-Requested-With, Content-Type, X-Token-Auth, Authorization');

            return $next($request);
        } else
            return response('Unauthorized.', 403);
    }
}
