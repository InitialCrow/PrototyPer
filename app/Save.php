<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Save extends Model
{
    public $timestamps = false;
    protected $table = 'saves';
    public function admin_id(){
        return $this->belongsTo('App\User');
    }
    protected $fillable = [
        'uri', 'user_id','wireframe'
    ];
}
