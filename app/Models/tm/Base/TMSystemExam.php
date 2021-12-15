<?php
/**
 * Model object generated by: Skipper (http://www.skipper18.com)
 * Do not modify this file manually.
 */

namespace App\Models\tm\Base;

use Illuminate\Database\Eloquent\Model;

/**
* Class TMSystemExam
* @package App\Models\tm\Base
*
* @property bigInteger $id
* @property integer $interval
* @property integer $warning_time
* @property \Carbon\Carbon $last_exam_at
* @property bigInteger $hv_company_id
* @property bigInteger $tm_system_id
* @property bigInteger $hv_form_dev_id
* @property bigInteger $created_by
* @property \Carbon\Carbon $created_at
* @property bigInteger $updated_by
* @property \Carbon\Carbon $updated_at
* @property \App\Models\tm\TMSystem|null $tmSystem
* @property \App\Models\hv\HVFormDev|null $hvFormDev
*/ 
abstract class TMSystemExam extends Model
{
    /**  
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tm_system_exam';
    
    /**  
     * The attributes that should be cast to native types.
     * 
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'interval' => 'integer',
        'warning_time' => 'integer',
        'last_exam_at' => 'datetime:Y-m-d',
        'hv_company_id' => 'integer',
        'tm_system_id' => 'integer',
        'hv_form_dev_id' => 'integer',
        'created_by' => 'integer',
        'created_at' => 'datetime',
        'updated_by' => 'integer',
        'updated_at' => 'datetime'
    ];
    
    public function tmSystem()
    {
        return $this->belongsTo('\App\Models\tm\TMSystem', 'tm_system_id', 'id');
    }
    
    public function hvFormDev()
    {
        return $this->belongsTo('\App\Models\hv\HVFormDev', 'hv_form_dev_id', 'id');
    }
}
